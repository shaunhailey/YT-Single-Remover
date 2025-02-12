document.addEventListener('DOMContentLoaded', () => {
  // Load saved preferences
  chrome.storage.sync.get(['album', 'ep', 'single'], (result) => {
    document.getElementById('album').checked = result.album ?? true;
    document.getElementById('ep').checked = result.ep ?? true;
    document.getElementById('single').checked = result.single ?? true;
  });

  // Add listeners to checkboxes
  const checkboxes = ['album', 'ep', 'single'];
  checkboxes.forEach(type => {
    document.getElementById(type).addEventListener('change', (e) => {
      chrome.storage.sync.set({ [type]: e.target.checked });
      // Update content in active tab
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: updateVisibility
        });
      });
    });
  });
});