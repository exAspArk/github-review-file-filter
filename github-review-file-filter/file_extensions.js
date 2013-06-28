var allFiles          = getAllElementsWithAttribute('class', 'meta');
var allFileExtensions = getAllFileExtensions(allFiles);

// send allFileExtensions to popup.js
chrome.extension.sendMessage(allFileExtensions);

// ----------------------------------------------------------------------------

// action if checkbox with file extension was toggled
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.action === 'checkboxToggled') {
        for (var i = 0; i < allFiles.length; i++) {
            var fileExtension = getFileExtension(allFiles[i]);
            if (fileExtension === message.fileExtension) {
                toggleFileVisibility(allFiles[i], message.visible);
            }
        }
    }
});

function toggleFileVisibility(divFile, visible) {
    var display;
    if (visible) {
        display = 'block';
    }
    else {
        display = 'none';
    }

    divFile.parentNode.style.display = display;
}

// ----------------------------------------------------------------------------

function getAllElementsWithAttribute(attribute, value) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) {
        if (allElements[i].getAttribute(attribute) == value) {
        matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}

function getAllFileExtensions(allFiles) {
    var allFileExtensions = [];
    for (var i = 0; i < allFiles.length; i++) {
        var fileExtension = getFileExtension(allFiles[i]);
        if (allFileExtensions.indexOf(fileExtension) === -1) {
            allFileExtensions.push(fileExtension);
        }
    }
    return allFileExtensions;
}

function getFileExtension(divFile) {
    var fileName = divFile.getAttribute('data-path');

    if (fileName.indexOf('.') !== -1) {
        return '.' + fileName.split('.').pop();
    }
    else {
        return fileName;
    }
}