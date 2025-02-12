"use strict";
function updateVisibilityFromContextMenu(preferences) {
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
chrome.action.onClicked.addListener(async (tab) => {
    var _a, _b, _c;
    if (!tab.id)
        return;
    try {
        const result = await chrome.storage.sync.get(['album', 'ep', 'single']);
        const preferences = {
            album: (_a = result.album) !== null && _a !== void 0 ? _a : true,
            ep: (_b = result.ep) !== null && _b !== void 0 ? _b : true,
            single: (_c = result.single) !== null && _c !== void 0 ? _c : true
        };
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: updateVisibilityFromContextMenu,
            args: [preferences]
        });
    }
    catch (error) {
        console.error('Failed to update visibility:', error);
    }
});
