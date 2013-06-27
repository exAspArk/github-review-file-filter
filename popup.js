// TODO
// - hide files by extension
// - disable extension if not github
// - make it more pretty
// - add settings (default active file extensions)

// execute file_extensions.js in the current tab
window.onload = function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.id, { file: 'file_extensions.js', allFrames: true });
  });
};

// get allFileExtensions from file_extensions.js
chrome.extension.onRequest.addListener(function(allFileExtensions) {
  var divFileExtensions = document.getElementById('fileExtensions');

  for (var i = 0; i < allFileExtensions.length; i++) {
    var checkbox = createFileExtensionCheckbox(allFileExtensions[i]);
    divFileExtensions.appendChild(checkbox);
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

  return div;
}
