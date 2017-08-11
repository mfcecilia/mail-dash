// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function (tab) {
    'use strict';
    chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function (tab) {
    // Tab opened.
    });
});