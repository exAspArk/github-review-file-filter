// execute file_extensions.js in the current tab
window.onload = function() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.executeScript(tab.id, { file: 'file_extensions.js' });
    });
};

// get allFileExtensionsInfo from file_extensions.js
chrome.extension.onMessage.addListener(function(allFileExtensionsInfo) {
    var divFileExtensions = document.getElementById('fileExtensions');

    for (var i = 0; i < allFileExtensionsInfo.length; i++) {
        var divCheckbox = createFileExtensionCheckbox(allFileExtensionsInfo[i]);
        divFileExtensions.appendChild(divCheckbox);
    }
});

// ----------------------------------------------------------------------------

function createFileExtensionCheckbox(fileExtensionInfo) {
    var div      = document.createElement('div');
    var nameDiv  = document.createElement('div');
    var checkbox = document.createElement('input');

    nameDiv.innerHTML = fileExtensionInfo.name + ' (' + fileExtensionInfo.count + ')';
    nameDiv.className = 'name';

    checkbox.type    = 'checkbox';
    checkbox.checked = fileExtensionInfo.isVisible;
    checkbox.id      = fileExtensionInfo.name;

    div.appendChild(nameDiv);
    div.appendChild(checkbox);

    checkbox.onchange = function() {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, { action: 'checkboxToggled', fileExtension: checkbox.id, visible: checkbox.checked });
        });
    };

    return div;
}
