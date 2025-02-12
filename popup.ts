interface DisplayPreferences {
  album: boolean;
  ep: boolean;
  single: boolean;
}

function getCheckboxValuesFromPopupUI(): DisplayPreferences | null {
  const elements = {
    album: document.getElementById('album') as HTMLInputElement | null,
    ep: document.getElementById('ep') as HTMLInputElement | null,
    single: document.getElementById('single') as HTMLInputElement | null
  };

  if (!elements.album || !elements.ep || !elements.single) {
    console.error('Required checkbox elements not found');
    return null;
  }

  return {
    album: elements.album.checked,
    ep: elements.ep.checked,
    single: elements.single.checked
  };
}

function updateVisibilityFromPopupUI(preferences: DisplayPreferences): void {
  const items = document.querySelectorAll('ytmusic-two-row-item-renderer');
  items.forEach(item => {
    const element = item as HTMLElement;
    const text = element.querySelector('span.style-scope.yt-formatted-string')?.textContent;
    if (text) {
      const textLower = text.toLowerCase();
      element.style.display = 
        (textLower === 'single' && !preferences.single) ||
        (textLower === 'ep' && !preferences.ep) ||
        (textLower === 'album' && !preferences.album)
          ? 'none'
          : '';
    }
  });
}

async function executeVisibilityUpdateFromPopupUI(preferences: DisplayPreferences) {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  if (!tabs[0]?.id) return;

  await chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: updateVisibilityFromPopupUI,
    args: [preferences]
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Load saved preferences
  chrome.storage.sync.get(['album', 'ep', 'single'], (result) => {
    const preferences = getCheckboxValuesFromPopupUI();
    if (preferences) {
      preferences.album = result.album ?? true;
      preferences.ep = result.ep ?? true;
      preferences.single = result.single ?? true;
    }
  });

  const checkboxes = ['album', 'ep', 'single'] as const;
  checkboxes.forEach(type => {
    const element = document.getElementById(type) as HTMLInputElement;
    if (!element) {
      console.error(`${type} checkbox not found`);
      return;
    }

    element.addEventListener('change', async () => {
      const preferences = getCheckboxValuesFromPopupUI();
      if (!preferences) return;

      await chrome.storage.sync.set({ [type]: preferences[type as keyof DisplayPreferences] });
      await executeVisibilityUpdateFromPopupUI(preferences);
    });
  });
});