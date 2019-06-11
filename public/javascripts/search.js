// Search Results /////////////////////////////////////////////////////////////////

function queryDatabase() {
  determineFiltersLayout();
  getCuisines();
  getResults();
}

// Retrieves cuisines from server and fills in Cuisine div with the results
function getCuisines() {
  var cuisineDiv = document.getElementById("cuisineFilter");

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 & this.status == 200) {
      const CUISINES = JSON.parse(this.responseText);
      CUISINES.forEach(function(element) {
        var cuisineCheckboxDiv = document.createElement("DIV");
        cuisineCheckboxDiv.className = "checkbox";
        var label = document.createElement("LABEL");
        label.innerHTML = "<input type='checkbox' checked onchange='reconstructRestaurantClientResultsAndFilter()' name="+element+"/>"+element;
        cuisineCheckboxDiv.appendChild(label);
        cuisineDiv.appendChild(cuisineCheckboxDiv);
      });
    }
  };

  xhttp.open("GET", "/cuisines.txt", true);
  xhttp.send();
}

function createRestaurantResultDivs(Restaurants) {
  Restaurants.forEach(function(Restaurant) {
    createRestaurantResultDiv(Restaurant);});
}

// Holds the restaurant results retrieved from the server
var RestaurantServerResults;

// Holds the restaurant results to be displayed in the client
var RestaurantClientResults;

// returns false if id is in array, else true
function isUnique(id, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].id == id) return false;
  }
  return true;
}

// Filters out client results that according to the filter section on the client
function filterRestaurants() {
  RestaurantClientResults = [];
  const PRICEFILTERS = document.getElementById("priceFilter").getElementsByTagName("INPUT");
  for (var i = 0; i < PRICEFILTERS.length; i++) {
    if (PRICEFILTERS[i].checked == true) RestaurantClientResults = RestaurantClientResults.concat(RestaurantServerResults.filter(object => object.cost === parseInt(PRICEFILTERS[i].name)));
  }

  var cuisineResults = [];
  const CUISINEFILTERS = document.getElementById("cuisineFilter").getElementsByTagName("INPUT");
  for (i = 0; i < CUISINEFILTERS.length; i++) {
    if (CUISINEFILTERS[i].checked == true) cuisineResults = cuisineResults.concat(RestaurantClientResults.filter(object => object.cuisine === CUISINEFILTERS[i].name));
  }
  RestaurantClientResults = [...cuisineResults];

  var dietResults = [];
  const DIETFILTERS = document.getElementById("dietFilter").getElementsByTagName("INPUT");
  for (i = 0; i < DIETFILTERS.length; i++) {
    if (DIETFILTERS[i].checked == true) dietResults = dietResults.concat(RestaurantClientResults.filter(object => object.dietOptions.indexOf(DIETFILTERS[i].name) > -1 && isUnique(object.id, dietResults)));
  }
  RestaurantClientResults = [...dietResults];
}

// sorts the restaurants according to the specified sort option
function sortRestaurants() {
  const SORTINGOPTION = document.getElementById("sortingMode").value;
  if (SORTINGOPTION === "Rating (high to low)") RestaurantClientResults.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
  else if (SORTINGOPTION === "Rating (low to high)") RestaurantClientResults.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
  else if (SORTINGOPTION === "Cost (high to low)") RestaurantClientResults.sort((a, b) => (a.cost > b.cost) ? -1 : 1);
  else if (SORTINGOPTION === "Cost (low to high)") RestaurantClientResults.sort((a, b) => (a.cost > b.cost) ? 1 : -1);
  else if (SORTINGOPTION === "A-Z") RestaurantClientResults.sort((a, b) => (a.name > b.name) ? 1 : -1);
}

function reconstructRestaurantClientResults() {
  document.getElementById("restaurantResults").innerHTML = "";
  sortRestaurants();
  createRestaurantResultDivs(RestaurantClientResults);
}

function reconstructRestaurantClientResultsAndFilter() {
  filterRestaurants();
  reconstructRestaurantClientResults();
}

// Retrieves the restaurants for the given query from the server and adds in the options in HTML
function getResults() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 & this.status == 200) {
      RestaurantServerResults = JSON.parse(this.responseText);
      RestaurantClientResults = JSON.parse(this.responseText);

      document.getElementById("numberOfTablesFound").innerHTML = String(RestaurantClientResults.length);

      sortRestaurants();
      createRestaurantResultDivs(RestaurantClientResults);
    }
  };

  xhttp.open("GET", "/restaurantResults.txt", true);
  xhttp.send();
}

// creates a restaurant result div for Restaurant
function createRestaurantResultDiv(Restaurant) {
  var restaurantResultDiv = document.createElement("DIV");
  restaurantResultDiv.className = "restaurantResultDiv row my-3";

    // creating preview image
  var imageDiv = document.createElement("DIV");
  imageDiv.className = "float-left col-3 pr-0";
  var img = document.createElement("IMG");
  img.className = "resultsImage img-fluid w-100";
  img.alt = Restaurant.name + "restaurant image";
  img.src = "images/restaurants/" + String(Restaurant.id) + ".jpg";
  imageDiv.appendChild(img);
  restaurantResultDiv.appendChild(imageDiv);

  var restaurantInfo = document.createElement("DIV");
  restaurantInfo.className = "col-9 col-md-8";

    // adding name of restaurant
  var name = document.createElement("DIV");
  name.className = "float-left";
  name.innerHTML = "<p>" + Restaurant.name + " - <i>" + Restaurant.cuisine + "</i></p>";
  restaurantInfo.appendChild(name);

    // adding rating (in number of stars) and cost (in number of '$')
  var ratingAndCost = document.createElement("P");
  ratingAndCost.className = "text-right";
  var rating = "";
  for (var i = 0; i < Restaurant.rating; i++) rating += "<i class=\"far fa-star\"></i>";
  var cost = "";
  for (var j = 0; j < Restaurant.cost; j++) cost += "$";
  ratingAndCost.innerHTML = rating + "|" + cost;
  restaurantInfo.appendChild(ratingAndCost);

    // adding address
  var address = document.createElement("P");
  address.innerHTML = Restaurant.address;
  restaurantInfo.appendChild(address);

    // adding buttons for booking
  var buttonGroup = document.createElement("DIV");
  buttonGroup.className = "btn-group btn-group-justified";

  var url = new URL(window.location.href);
  const numGuestsQuery = url.searchParams.get("numguests");
  const searchQuery = url.searchParams.get("search");
  const dateQuery = url.searchParams.get("date");

  for (var k = 0; k < 3; k++) {
    var button = document.createElement("A");
    button.className = "btn btn-info reservationButtons";
    button.innerHTML = Restaurant.availableTimes[k];
    var uri = URI('restaurantPage.html');

    // set URL of button to store pertinent booking parameters
    var query = uri.query(true);
    query.search = searchQuery;
    query.date = dateQuery;
<<<<<<< HEAD
    query.time = Restaurant.availableTimes[k];
=======
    var time24 = bestAvailableTimes[k];
    var hour = time24.hour;
    var minute = time24.minute;

    var time = moment(query.date + " " + hour + ":" + minute, 'YYYY-MM-DD HH:mm').format('HH:mm');
    query.time = time;
>>>>>>> restaurantPage-taj
    query.numguests = numGuestsQuery;
    query.restaurantid = Restaurant.id;
    uri.query(query);
    button.href = uri;
    buttonGroup.appendChild(button);
  }
  restaurantInfo.appendChild(buttonGroup);
  restaurantResultDiv.appendChild(restaurantInfo);

  document.getElementById("restaurantResults").appendChild(restaurantResultDiv);
}

// determines whether the filters are presented on the sidebar or as a modal (with accompnanying button)
 function determineFiltersLayout() {
  if (window.innerWidth < 768) {
    addFilterModalButton();
    moveFilterDivToModal();
  } else {
    removeFilterModalButton();
    moveFilterDivToSidebar();
  }
}

// adds a button to the html for activating the filter modal
function addFilterModalButton() {
  if (document.getElementById("modalFilterButton") !== null) return;
  var buttonDiv = document.createElement("DIV");
  buttonDiv.className = "col-12";
  buttonDiv.innerHTML = "<button id=\"modalFilterButton\"type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#modalFilters\"> Filters </button>";
  document.getElementById("searchRow").prepend(buttonDiv);
}

// removes the filter modal button from the html
function removeFilterModalButton() {
  var modalFilterButton = document.getElementById("modalFilterButton");
  if (modalFilterButton !== null) modalFilterButton.remove();
}

// moves the filters (assumed to be) present in the filter sidebar to the filter modal
function moveFilterDivToModal() {
  var filterSidebarDiv = document.getElementById("filterSidebarDiv");
  var filterModalDiv = document.getElementById("filterModalDiv");

  if (filterModalDiv.innerHTML != "") return; // already moved to modal

  filterModalDiv.innerHTML = filterSidebarDiv.innerHTML;
  filterSidebarDiv.innerHTML = "";
}

// moves the filters (assumed to be) present in the filter modal to the filter sidebar
function moveFilterDivToSidebar() {
  var filterSidebarDiv = document.getElementById("filterSidebarDiv");
  var filterModalDiv = document.getElementById("filterModalDiv");

  if (filterSidebarDiv.innerHTML != "") return; // already moved to sidebar

  filterSidebarDiv.innerHTML = filterModalDiv.innerHTML;
  filterModalDiv.innerHTML = "";
}

