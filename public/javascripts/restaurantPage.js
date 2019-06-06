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

// To do, automate overallNegRating
var restaurantPageInfo = new Vue({
  el: '#restaurantDetails',
  data: {
    name: "Parisi's",
    address: 'Goodwood, Adelaide',
    overallPosRating: 4,
    overallNegRating: 1,
    nReviews: 200,
    cuisine: 'Italian',
    // Update guestSelected when user enters webpage
    guestsSelected: '1',
    // dateSelected: '',
    // timeSelected: '',
    cost: "$$$",
    photos: [
      "/images/restaurantPage/1",
      "/images/restaurantPage/2",
      "/images/restaurantPage/3",
      "/images/restaurantPage/4",
      "/images/restaurantPage/5",
      "/images/restaurantPage/6",
      "/images/restaurantPage/7"
    ],
    about:  'Parisi’s Hyde Park is a modern Italian restaurant that we and the rest of Adelaide can’t get enough of. Right on King William Road, ' + 
            'Parisi’s Hyde Park is run by a family with hospitality running through their veins hence you can rest assured of nothing but absolute quality. ' +
            'It’s a simple yet stylish space boasting a menu that’s brimming with everything from refined antipasti to pasta, traditional mains and pizzas ' +
            'that are either classic or gourmet and a little more experimental. Whatever you’re in the mood for, Parisi’s Hyde Park means some of the best ' +
            'Italian fare in this part of Adelaide and we’re sure you’re going to love it.',
    menu: '',
    reviews: [  
      {reviewerName: "Kate", id: 1, overallPosRating: 5, noiseRating: 2, foodRating: 5, serviceRating: 5, ambienceRating: 4, valueRating: 5, comment: "The food was fantastic as always and amazing service with a friendly staff who are always happy to help with suggestions and changes if needed."},
      {reviewerName: "Tomoko", id: 2, overallPosRating: 5, noiseRating: 2, foodRating: 5, serviceRating: 5, ambienceRating: 4, valueRating: 5, comment: "It was an amazing experience to have such delicious dishes and nice service! Lam shake was fantastic , so does pasta!! Deserts are also fantastic and presentation was also beautiful!!"},
      {reviewerName: "Rebecca", id: 3, overallPosRating: 5, noiseRating: 2, foodRating: 5, serviceRating: 5, ambienceRating: 4, valueRating: 5, comment: "Always a fantastic dinner experience at Parisis. Great service, delicious food, beautiful atmosphere. It’s our favourite place to take family and friends for a guaranteed perfect evening"},
      {reviewerName: "Charles", id: 4, overallPosRating: 5, noiseRating: 2, foodRating: 5, serviceRating: 5, ambienceRating: 4, valueRating: 5, comment: "The food is great and filling. The service from the staff is warm and friendly. I will pass on the recommendation to friends of mine."},
      {reviewerName: "Susan", id: 5, overallPosRating: 5, noiseRating: 2, foodRating: 5, serviceRating: 5, ambienceRating: 4, valueRating: 5, comment: "Enjoyed a very pleasant dinner with a friend on a quiet tuesday evening The food was excellent- Baramundi for me and a calamari salad for my friend . Friendly and efficient service."}
    ]
  }
});

// Populates the DOM HTML with the selected restaurant data (from server)
function populateDomElements(RESTAURANTDATA) {
  // document.getElementById("breadcrumbName").innerHTML = RESTAURANTDATA.name;
  // document.getElementById("restaurantName").innerHTML = RESTAURANTDATA.name;
  // document.getElementById("nameCB").innerHTML = RESTAURANTDATA.name;
  // document.getElementById("location").innerHTML = RESTAURANTDATA.address;
  // document.getElementById("aboutInfo").innerHTML = RESTAURANTDATA.about;
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
  // document.getElementById("reviewInfo").innerHTML = RESTAURANTDATA.reviews.join(); // replace this

  // rating, reviews, cuisine and cost info at top of page
  var cost = "";
  for (var j = 0; j < RESTAURANTDATA.cost; j++) cost += "$";

  var rating = "";
  for (var i = 0; i < RESTAURANTDATA.rating; i++) rating += "<i class=\"far fa-star\"></i>";

  var numberOfReviews = RESTAURANTDATA.numberOfReviews;
  var cuisine = RESTAURANTDATA.cuisine;

  document.getElementById("topInfo").innerHTML = rating + " | " + numberOfReviews + " reviews | " + cuisine + " | " + cost;
}

// var topInfo = new Vue({
//   el: "#topInfo",
//   data: {
//     numberOfReviews: 200,
//     cuisine: "Italian",
//     cost: "$",
//     rating: 5
//   }

// });

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
  // var people = document.getElementById("peopleSelector").value;
  // document.getElementById("guestsCB").innerHTML = " " + people + " people";

  var date = document.getElementById("datePicker").value;
  document.getElementById("dateCB").innerHTML = " " + date;

  var time = document.getElementById("timePicker").value;
  document.getElementById("timeCB").innerHTML = " " + time;
}

