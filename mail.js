// Client ID and API key from the Developer Console
var CLIENT_ID = '954908633240-3tli9i57jit9cjgprtgbrfeev274ebdu.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');




/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
    'use strict';
    gapi.load('client:auth2', initClient);
}

document.onload = function () {
    'use strict';
    handleClientLoad();
    if (this.readyState === 'complete') {
        this.onload();
    }
};

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
    'use strict';
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
    'use strict';
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listLabels();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
    'use strict';
    gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
    'use strict';
    gapi.auth2.getAuthInstance().signOut();
}

/**
* Append a pre element to the body containing the given message
* as its text node. Used to display the results of the API call.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {
    'use strict';
    var pre, textContent;
    pre = document.getElementById('content');
    textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
* Print all Labels in the authorized user's inbox. If no labels
* are found an appropriate message is printed.
*/
function listLabels() {
    'use strict';
    var labels, label;
    gapi.client.gmail.users.labels.list({
        'userId': 'me'
    }).then(function (response) {
        labels = response.result.labels;
        appendPre('Labels:');

        if (labels && labels.length > 0) {
            for (i = 0; i < labels.length; i++) {
                label = labels[i];
                appendPre(label.name);
            }
        } else {
            appendPre('No Labels found.');
        }
    });
}