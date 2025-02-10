chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeSingleItems
    });
  });
  
  function removeSingleItems() {
    const items = document.querySelectorAll('ytmusic-two-row-item-renderer');
    items.forEach(item => {
      if (item.querySelector('span.style-scope.yt-formatted-string')?.textContent === 'Single') {
        item.remove();
      }
    });
    console.log("Sections containing 'Single' removed successfully.");
  }