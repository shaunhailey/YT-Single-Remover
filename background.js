chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: updateVisibility
  });
});

function updateVisibility() {
  chrome.storage.sync.get(['album', 'ep', 'single'], (preferences) => {
    const items = document.querySelectorAll('ytmusic-two-row-item-renderer');
    items.forEach(item => {
      const text = item.querySelector('span.style-scope.yt-formatted-string')?.textContent;
      if (text) {
        const textLower = text.toLowerCase();
        if (textLower === 'single' && !preferences.single) {
          item.style.display = 'none';
        } else if (textLower === 'ep' && !preferences.ep) {
          item.style.display = 'none';
        } else if (textLower === 'album' && !preferences.album) {
          item.style.display = 'none';
        } else {
          item.style.display = '';
        }
      }
    });
  });
}