function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  handleClientLoad();
}

function onFailure(error) {
  console.log(error);
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email https://www.googleapis.com/auth/calendar.events',
    'width': 0,
    'height': 0,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

var CLIENT_ID = '643552353446-qodgotkr7t3qr9vjnm0sao0qa8bj86jv.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBb6I0bOmq8szwIDTsKa3ihesSX_T89AN8';

// Array of API discovery doc URLs
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Scopes used by Google (in this case the calendar events of the user are in scope)
var SCOPES = "https://www.googleapis.com/auth/calendar.events";

// After the Google sign in button has been rendered, there will be a new authorize and signout button
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

// On load, called to load the auth2 library and API client library.
// This is the first function called on successful client library load.
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

// Initialise gapi client
// The gapi client is used to add events to the users' calendar
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
  }, function(error) {
    // Send any errors to the browser console
    console.log(JSON.stringify(error, null, 2));
  });
}

// Calendar /////////////////////////////////////////////////////////////////////

// Add the event to the calendar
function addToCalendar() {
  const people = document.getElementById("peopleSelector").value;
  const date = document.getElementById("datePicker").value;
  const time = document.getElementById("timePicker").value;
  var timemom = moment(time, "HH:mm")
  const time_start = timemom.format("HH:mm");
  const time_end = timemom.add(1, "hour").format("HH:mm");
  const restaurant = document.getElementById("restaurantName").innerHTML;
  const restaurant_address = document.getElementById("location").innerHTML;

  console.log(restaurant);

  var event = {
    'summary': 'Reservation at ' + restaurant,
    'location': restaurant_address,
    'description': 'A booking made with TheTable',
    'start': {
      'dateTime': date + "T" + time_start + ":00",
      'timeZone': 'Australia/Adelaide'
    },
    'end': {
      'dateTime': date + "T" + time_end + ":00",
      'timeZone': 'Australia/Adelaide'
    },
    'recurrence': [
    ],
    'attendees': [
    ],
    'reminders': {
      'useDefault': true
    }
  };

  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });

  request.execute(function(event) {
    console.log('Event created: ' + event.htmlLink);
    var calendarLink = document.getElementById("calendarLink");
    calendarLink.href = event.htmlLink;
    $('#calendarSuccessModal').modal('show');
  });
}
