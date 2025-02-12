interface DisplayPreferences {
  album: boolean;
  ep: boolean;
  single: boolean;
}

function updateVisibilityFromContextMenu(preferences: DisplayPreferences): void {
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

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  try {
    const result = await chrome.storage.sync.get(['album', 'ep', 'single']);
    const preferences: DisplayPreferences = {
      album: result.album ?? true,
      ep: result.ep ?? true,
      single: result.single ?? true
    };

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: updateVisibilityFromContextMenu,
      args: [preferences]
    });
  } catch (error) {
    console.error('Failed to update visibility:', error);
  }
});