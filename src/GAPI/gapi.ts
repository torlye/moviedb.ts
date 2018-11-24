import IMyWindow from './../windowextensions';
declare var window: IMyWindow;

const CLIENT_ID = '43661732061-nce4m8c8pngqe9955diecj6vstk7k9i6.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDsToaVKOYkXMZE44Ea6oUb2VrtsfysYMI';

// Array of API discovery doc URLs for APIs 
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

export function loadClient(callback: () => void, thisArg: object) {
    window.gapi.load('client:auth2', () => {
      initClient(callback, thisArg);
    });
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient(successCallback: () => void, thisArg:object) {
    window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        // Listen for sign-in state changes.
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    
        // Handle the initial sign-in state.
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());

        const authorizeButton = document.getElementById('authorize_button');
        if (authorizeButton) {
            authorizeButton.onclick = handleAuthClick;
        }
        //signoutButton.onclick = handleSignoutClick;
        successCallback.apply(thisArg);
    }, (error: any) => {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn : boolean) {
    if (isSignedIn) {
        const authorizeButton = document.getElementById('authorize_button');
        if (authorizeButton) {
      authorizeButton.style.display = 'none';
        }
      //signoutButton.style.display = 'block';
      //listMajors();
    } else {
        const authorizeButton = document.getElementById('authorize_button');
        if (authorizeButton) {
      authorizeButton.style.display = 'block';
        }
      //signoutButton.style.display = 'none';
    }
  }
  
/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
    window.gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
//function handleSignoutClick() {
//    window.gapi.auth2.getAuthInstance().signOut();
//}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message:string) {
    const pre = document.getElementById('content');
    const textContent = document.createTextNode(message + '\n');
    if (pre) {
        pre.appendChild(textContent);
    }
}

function getValues(spreadsheet: string, sheetName: string, range:string,
  successCallback: (data: string[][]) => void,
  thisArg: object)
{
  window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheet,
    range: sheetName+'!'+range,
  })
  .then((response: any) => {
    //successCallback(response.result.values);

    console.log("got the results "+response.result.values.length);
    
    successCallback.apply(thisArg, [response.result.values]);
  }, (response:any) => {
    console.error("Failed to get rows");
  });
}

export function getRows(
  successCallback: (data: string[][]) => void, 
  thisArg: object) {
  getValues('1TkuaGyHUT5yHHvMEDu1rygHoQ4QhrC0he62GvwSt994', 'nocover', 'A2:AH', successCallback, thisArg);
}
  