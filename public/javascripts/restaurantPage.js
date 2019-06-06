// sets the search bradcrumb href to refer back to the previously searched result
function setSearchBreadcrumbHref() {
  var url = new URL(window.location.href);
  const numGuestsQuery = url.searchParams.get("numguests");
  const searchQuery = url.searchParams.get("search");
  const timeQuery = url.searchParams.get("time");
  const dateQuery = url.searchParams.get("date");
  const restaurantid = url.searchParams.get("restaurantid");

  var uri = URI('search.html');

  var query = uri.query(true);
  if (searchQuery != null) query.search = searchQuery;
  if (dateQuery != null) query.date = dateQuery;
  if (timeQuery != null) query.time = timeQuery;
  if (numGuestsQuery != null) query.numguests = numGuestsQuery;
  query.restaurantid = restaurantid;
  uri.query(query);
  document.getElementById("searchBreadcrumb").href = uri;
}
setSearchBreadcrumbHref();

// Switch from 'confirm your details' modal to 'successfully made a booking' modal
$(document).on("click", "#finalConfirm", function(){
    $('#confirmBookingTwo').modal('show');
    $('#modalConfirmBooking').modal('hide');
});

// Switch from 'successfully made a booking' modal to 'manage your bookings' modal
$(document).on("click", "#goManageBookings", function(){
    $('#bookingModal').modal('show');
    $('#confirmBookingTwo').modal('hide');
});

// Go to top
$("#topButton").click(function() {
    $('html,body').animate({
        scrollTop: $("#top").offset().top},
        'slow');
});

// Go to about section
$("#aboutButton").click(function() {
    $('html,body').animate({
        scrollTop: $("#aboutSection").offset().top},
        'slow');
});

// Go to menu section
$("#menuButton").click(function() {
    $('html,body').animate({
        scrollTop: $("#menuSection").offset().top},
        'slow');
});

// Go to reviews section
$("#reviewsButton").click(function() {
    $('html,body').animate({
        scrollTop: $("#reviewsSection").offset().top},
        'slow');
});

// Go to map section
$("#mapButton").click(function() {
    $('html,body').animate({
        scrollTop: $("#mapSection").offset().top},
        'slow');
});

// Populates the DOM HTML with the selected restaurant data (from server)
function populateDomElements(RESTAURANTDATA) {
  document.getElementById("breadcrumbName").innerHTML = RESTAURANTDATA.name;
  document.getElementById("restaurantName").innerHTML = RESTAURANTDATA.name;
  document.getElementById("nameCB").innerHTML = RESTAURANTDATA.name;
  document.getElementById("location").innerHTML = RESTAURANTDATA.address;
  document.getElementById("aboutInfo").innerHTML = RESTAURANTDATA.about;
  document.getElementById("menuInfo").innerHTML = RESTAURANTDATA.menu;

  for (var i = RESTAURANTDATA.images.length - 1; i >= 0; i--) {
    imageURL = RESTAURANTDATA.images[i];
    var bigImageSection = document.getElementById("bigImageSection");
    var gridImageSection = document.getElementById("gridImageSection");

    // Creating large image IMG
    var bigImageDiv = document.createElement("DIV");
    bigImageDiv.className = "slides";
    var bigImageImg = document.createElement("IMG");
    bigImageImg.className = "bigImage";
    bigImageImg.src = imageURL + ".jpg";
    bigImageImg.alt = "picture of restaurant";
    bigImageDiv.appendChild(bigImageImg);

    bigImageSection.prepend(bigImageDiv);

    // Creating grid image IMG
    var gridImageDiv = document.createElement("DIV");
    gridImageDiv.className = "column";
    var gridImageImg = document.createElement("IMG");
    gridImageImg.className = "demo cursor smallImage";
    gridImageImg.alt = "small image of restaurant in grid";
    gridImageImg.src = imageURL + ".jpg";
    gridImageImg.setAttribute("onclick", "currentSlide("+String(i + 1)+")");
    gridImageDiv.appendChild(gridImageImg);

    gridImageSection.prepend(gridImageDiv);
  }

  currentSlide(1);

  // create new review section for each review
  document.getElementById("reviewInfo").innerHTML = RESTAURANTDATA.reviews.join(); // replace this

  // rating, reviews, cuisine and cost info at top of page
  var cost = "";
  for (var j = 0; j < RESTAURANTDATA.cost; j++) cost += "$";

  var rating = "";
  for (var i = 0; i < RESTAURANTDATA.rating; i++) rating += "<i class=\"far fa-star\"></i>";

  var numberOfReviews = RESTAURANTDATA.numberOfReviews;
  var cuisine = RESTAURANTDATA.cuisine;

  document.getElementById("topInfo").innerHTML = rating + " | " + numberOfReviews + " reviews | " + cuisine + " | " + cost;
}

function populateFields() {

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 & this.status == 200) {
      const RESTAURANTDATA = JSON.parse(this.responseText);
      populateDomElements(RESTAURANTDATA);
    }
  };

  var url = new URL(window.location.href);
  const RESTAURANTID = url.searchParams.get("restaurantid");

  var restaurantSelection = URI('/restaurantSelection.txt');
  var query = restaurantSelection.query(true);
  query.restaurantid = RESTAURANTID;
  restaurantSelection.query(query);

  xhttp.open("GET", restaurantSelection, true);
  xhttp.send();
}

// Slideshow functions
var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function confirmBookingDetails() {
  var people = document.getElementById("peopleSelector").value;
  document.getElementById("guestsCB").innerHTML = " " + people + " people";

  var date = document.getElementById("datePicker").value;
  document.getElementById("dateCB").innerHTML = " " + date;

  var time = document.getElementById("timePicker").value;
  document.getElementById("timeCB").innerHTML = " " + time;
}

