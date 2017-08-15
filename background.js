// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function (tab) {
    'use strict';
    chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function (tab) {
    // Tab opened.
    
    });
});

var clientId = '70942204848-ik5i0tfk5ufu0dgol8i3hl6u4oudpf9h.apps.googleusercontent.com';
var apiKey = 'AIzaSyCkgHgxu27ts4zdBmum2Sjq5K0bREo6tuw';
var scopes = 'https://www.googleapis.com/auth/gmail.readonly';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');


function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth, 1);
}

function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}

function handleAuthClick() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, handleAuthResult);
  return false;
}

function handleAuthResult(authResult) {
  if(authResult && !authResult.error) {
    loadGmailApi();
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    signoutButton.onclick = handleSignoutClick;
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    authorizeButton.onclick = handleAuthClick;
  }
}

function loadGmailApi() {
  gapi.client.load('gmail', 'v1', displayInbox);
}

window.onload = handleClientLoad();

