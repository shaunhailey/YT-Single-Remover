"use strict";
function getCheckboxValuesFromPopupUI() {
    const elements = {
        album: document.getElementById('album'),
        ep: document.getElementById('ep'),
        single: document.getElementById('single')
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
function updateVisibilityFromPopupUI(preferences) {
    const items = document.querySelectorAll('ytmusic-two-row-item-renderer');
    items.forEach(item => {
        var _a;
        const element = item;
        const text = (_a = element.querySelector('span.style-scope.yt-formatted-string')) === null || _a === void 0 ? void 0 : _a.textContent;
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
async function executeVisibilityUpdateFromPopupUI(preferences) {
    var _a;
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!((_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.id))
        return;
    await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: updateVisibilityFromPopupUI,
        args: [preferences]
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Load saved preferences
    chrome.storage.sync.get(['album', 'ep', 'single'], (result) => {
        var _a, _b, _c;
        const preferences = getCheckboxValuesFromPopupUI();
        if (preferences) {
            preferences.album = (_a = result.album) !== null && _a !== void 0 ? _a : true;
            preferences.ep = (_b = result.ep) !== null && _b !== void 0 ? _b : true;
            preferences.single = (_c = result.single) !== null && _c !== void 0 ? _c : true;
        }
    });
    const checkboxes = ['album', 'ep', 'single'];
    checkboxes.forEach(type => {
        const element = document.getElementById(type);
        if (!element) {
            console.error(`${type} checkbox not found`);
            return;
        }
        element.addEventListener('change', async () => {
            const preferences = getCheckboxValuesFromPopupUI();
            if (!preferences)
                return;
            await chrome.storage.sync.set({ [type]: preferences[type] });
            await executeVisibilityUpdateFromPopupUI(preferences);
        });
    });
});
