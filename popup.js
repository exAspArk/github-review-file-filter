// TODO
// - disable extension if not github
// - make it more pretty
// - add documentation
// - add settings (default active file extensions)

// execute file_extensions.js in the current tab
window.onload = function() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.executeScript(tab.id, { file: 'file_extensions.js' });
    });
};

// get allFileExtensions from file_extensions.js
chrome.extension.onMessage.addListener(function(allFileExtensions) {
    var divFileExtensions = document.getElementById('fileExtensions');

    for (var i = 0; i < allFileExtensions.length; i++) {
        var divCheckbox = createFileExtensionCheckbox(allFileExtensions[i]);
        divFileExtensions.appendChild(divCheckbox);
    }
});

function createFileExtensionCheckbox(name) {
    var div      = document.createElement('div');
    var nameDiv  = document.createElement('div');
    var checkbox = document.createElement('input');

    nameDiv.innerHTML = name;
    nameDiv.className = 'name';

    checkbox.type    = 'checkbox';
    checkbox.checked = true;
    checkbox.id      = name;

    div.appendChild(nameDiv);
    div.appendChild(checkbox);

    checkbox.onchange = function() {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, { action: 'checkboxToggled', fileExtension: checkbox.id, visible: checkbox.checked }, function(response) {});
        });
    };

    return div;
}
