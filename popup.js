document.getElementById('removeButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: removeSingleItems
      });
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