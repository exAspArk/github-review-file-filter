var allFiles          = getAllElementsWithAttribute('class', 'meta');
var allFileNames      = getAllFileNames(allFiles);
var allFileExtensions = getAllFileExtensions(allFileNames);

// send allFileExtensions to popup.js
chrome.extension.sendRequest(allFileExtensions);

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

function getAllFileNames(allFiles) {
  for (var i = 0; i < allFiles.length; i++) {
    allFiles[i] = allFiles[i].getAttribute('data-path');
  }
  return allFiles;
}

function getAllFileExtensions(allFileNames) {
  var allFileExtensions = [];
  for (var i = 0; i < allFileNames.length; i++) {
    var fileExtension = getFileExtension(allFileNames[i]);
    if (allFileExtensions.indexOf(fileExtension) == -1) {
      allFileExtensions.push(fileExtension);
    }
  }
  return allFileExtensions;
}

function getFileExtension(fileName) {
  return fileName.split('.').pop();
}
