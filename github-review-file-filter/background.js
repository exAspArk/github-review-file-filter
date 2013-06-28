chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.getSelected(null,function(tab) {
        changeIcon(tab);
    });
});

function changeIcon(tab) {
    var iconPath;

    if (isValidUrl(tab.url)) {
        iconPath = 'active.png';
    }
    else {
        iconPath = 'inactive.png';
    }
    chrome.browserAction.setIcon({ path: iconPath });
}

function isValidUrl(url) {
    var regex = new RegExp('https?://github.com/.+/.+/pull/\\d+/files', 'gi');
    return url.match(regex);
};
