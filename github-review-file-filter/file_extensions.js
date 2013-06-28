var allFiles          = getAllElementsWithAttribute('class', 'meta');
var allFileExtensionsInfo = getAllFileExtensionsInfo(allFiles);

// send allFileExtensionsInfo to popup.js
chrome.extension.sendMessage(allFileExtensionsInfo);

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

function getAllFileExtensionsInfo(allFiles) {
    var allFileExtensionsInfo = [];
    for (var i = 0; i < allFiles.length; i++) {
        var isVisible         = allFiles[i].parentNode.style.display !== 'none';
        var fileExtension     = getFileExtension(allFiles[i]);
        var fileExtensionInfo = findFileExtensionInfo(allFileExtensionsInfo, fileExtension);

        if (fileExtensionInfo) {
            fileExtensionInfo.count++;
            fileExtensionInfo.isVisible = isVisible;
        }
        else {
            fileExtensionInfo = { name: fileExtension, isVisible: isVisible, count: 1 }
            allFileExtensionsInfo.push(fileExtensionInfo);
        }
    }
    return allFileExtensionsInfo;
}

// fileExtensionInfo: { name: ".rb", isVisible: true, count: 3 }
function findFileExtensionInfo(allFileExtensionsInfo, fileExtension) {
    for (var i = 0; i < allFileExtensionsInfo.length; i++) {
        if (allFileExtensionsInfo[i].name === fileExtension) {
            return allFileExtensionsInfo[i];
        }
    }
    return null;
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
