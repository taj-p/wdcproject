// Search bar /////////////////////////////////////////////////////////////////////
var moment = rome.moment; // moment handles all time objects

// returns the query parameter for time or, if null, returns the nearest half hour
function getInitialTime() {
  var url = new URL(window.location.href);
  const timeQuery = url.searchParams.get("time");
  const dateQuery = url.searchParams.get("date");
  if (timeQuery == null || dateQuery == null) return nearestHalfHour;
  else return moment(dateQuery + " " + timeQuery, 'YYYY-MM-DD HH:mm').format('HH:mm');
}

// returns the query parameter for date or, if null, returns today
function getInitialDate() {
  var url = new URL(window.location.href);
  const timeQuery = url.searchParams.get("time");
  const dateQuery = url.searchParams.get("date");
  if (timeQuery == null || dateQuery == null) return moment().format('YYYY-MM-DD');
  else return moment(dateQuery + " " + timeQuery, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD');
}

// rounding current time to nearest 30 minute increment...
const currentTime = moment();
const remainder = 30 - (currentTime.minute() % 30);
const nearestHalfHour = moment(currentTime).add(remainder, "minutes");

// Date Picker
var datePickerObj = rome(datePicker, {
                           time: false,                         // do not display time
                           min: moment().format('YYYY-MM-DD'),  // set the minimum time as today
                           initialValue: getInitialDate()});


// Time Picker
var timePickerObj = rome(timePicker, {
                           date: false,                      // do not display date
                           min: nearestHalfHour,             // set the minimum time to the nearest half hour
                           initialValue: getInitialTime()});

// Remove the minimum and initial time of Time Picker when a future date is selected
datePickerObj.on('data', (newDate) => {
  var date = moment(newDate);
  if (date > currentTime) {
    timePickerObj.destroy();
    timePickerObj.restore({date:false});
  }
  else {
    timePickerObj.destroy();
    timePickerObj.restore({date:false, min: nearestHalfHour, initialValue: getInitialTime()});
  }
});

// Set the iniital value of number of guests if set in the URL parameters
function setInitialNumGuests() {
  var url = new URL(window.location.href);
  const numGuestsQuery = url.searchParams.get("numguests");
  if (numGuestsQuery == null) return;
  else document.getElementById("peopleSelector").value = numGuestsQuery;
}
setInitialNumGuests();

// Set the iniital search query if set in the URL parameters
function setInitialSearchQuery() {
  var url = new URL(window.location.href);
  const searchQuery = url.searchParams.get("search");
  if (searchQuery == null) return;
  var searchQueryBox = document.getElementById("searchQuery");
  if (searchQueryBox == null) return;
  else document.getElementById("searchQuery").value = searchQuery;
}
setInitialSearchQuery();

// Symbols in the search bar are only shown by medium or larger viewports
function determineWhetherToShowSymbols() {
  var searchSymbols = document.getElementsByClassName("searchSymbol");

  if (window.innerWidth < 768) {
    [].forEach.call(searchSymbols, function(symbol) { symbol.style.display = "none";});
  }
  else {
    [].forEach.call(searchSymbols, function(symbol) { symbol.style.display = "";});
  }
}

// The widths of the elements in the search bar are adjusted depending on the size of the page
function calculateSearchBarWidths() {
  determineWhetherToShowSymbols();
  var topRowWidth = document.getElementById("findTableButton").offsetWidth;
  var symbolWidth = document.getElementById("topRowSymbol").offsetWidth;

  var inputWidth = (topRowWidth - (3 * symbolWidth)) / 3;

  document.getElementById("datePicker").style.width = String(inputWidth) + "px";
  document.getElementById("timePicker").style.width = String(inputWidth) + "px";
  document.getElementById("peopleSelector").style.width = String(inputWidth) + "px";

  document.getElementById("middleRowSymbol").style.width = String(symbolWidth) + "px";
  document.getElementById("searchQuery").style.width = String(inputWidth * 3 + (2 * symbolWidth)) + "px";
}

function findTable() {
  const SELECTEDDATE = moment(datePickerObj.getDate()).format('YYYY-MM-DD');
  const SELECTEDTIME = moment(timePickerObj.getDate()).format('HH:mm');
  const NUMBEROFGUESTS = document.getElementById("peopleSelector").value;
  const SEARCHQUERY = document.getElementById("searchQuery").value;

  var uri = URI('search.html');
  var query = uri.query(true);
  query.date = SELECTEDDATE;
  query.time = SELECTEDTIME;
  query.numguests = NUMBEROFGUESTS;
  query.search = SEARCHQUERY;

  uri.query(query);

  location.href = uri;
}

// Populates booking modal via Vue and local objects
// **Future implementation will use AJAX calls to retrieve objects from server
var bookingInfo = new Vue({
  el: "#bookingInfo",
  data: {
    bookings: [
      {url:"/images/restaurantPage/1.jpg", name:"Parisi's", date:"23/05/2019", time:"6pm",  guests:"3"},
      {url:"/images/restaurantPage/2.jpg", name:"50SixOne", date:"30/05/2019", time:"8pm",  guests:"3"},
      {url:"/images/restaurantPage/3.jpg", name:"Vino's", date:"4/06/2019", time:"6:30pm",  guests:"2"},
      {url:"/images/restaurantPage/4.jpg", name:"Farina", date:"16/06/2019", time:"6pm",  guests:"5"},
      {url:"/images/restaurantPage/5.jpg", name:"Lil'NNQ", date:"30/06/2019", time:"1pm",  guests:"4"}
    ]
  }
});

