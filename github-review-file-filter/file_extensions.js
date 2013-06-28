var allFileElements       = getAllFiles(getAllElementsWithAttribute('class', 'meta'));
var allFileExtensionsInfo = getAllFileExtensionsInfo(allFileElements);

// send allFileExtensionsInfo to popup.js
chrome.extension.sendMessage(allFileExtensionsInfo);

// ----------------------------------------------------------------------------

function getAllFiles(elements) {
    allFiles = [];
    for (var i = 0; i < elements.length; i++) {
        if (hasClass(elements[i].parentNode, 'file')) {
            allFiles.push(elements[i]);
        }
    }
    return allFiles;
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') !== -1;
}

function getAllElementsWithAttribute(attributeName, value) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('div');
    for (var i = 0; i < allElements.length; i++) {
        if (allElements[i].getAttribute(attributeName) == value) {
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}

function getAllFileExtensionsInfo(allFileElements) {
    var allFileExtensionsInfo = [];

    for (var i = 0; i < allFileElements.length; i++) {
        var isVisible         = allFileElements[i].parentNode.style.display !== 'none';
        var fileExtension     = getFileExtension(allFileElements[i]);
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

function getFileExtension(fileElement) {
    var fileName = fileElement.getAttribute('data-path');

    if (fileName.indexOf('.') !== -1) {
        return '.' + fileName.split('.').pop();
    }
    else {
        return fileName;
    }
}

// ----------------------------------------------------------------------------

// action if checkbox with file extension was toggled
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.action === 'checkboxToggled') {
        for (var i = 0; i < allFileElements.length; i++) {
            var fileExtension = getFileExtension(allFileElements[i]);
            if (fileExtension === message.fileExtension) {
                toggleFileVisibility(allFileElements[i], message.visible);
            }
        }
    }
});

// ----------------------------------------------------------------------------

function toggleFileVisibility(fileElement, visible) {
    var display;
    if (visible) {
        display = 'block';
    }
    else {
        display = 'none';
    }

    fileElement.parentNode.style.display = display;
}
