var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Artificial response from database with all available cuisines */
const CUISINES = ["Italian",
                  "Mexican",
                  "Japanese",
                  "Steakhouse",
                  "Indian",
                  "Vietnamese",
                  "Australian",
                  "Filipino",
                  "Chinese",
                  "Dessert",
                  "Malay",
                  "Polish",
                  "Pakistani",
                  "Korean"];

/* Returns all cuisines stored in the database */
router.get('/cuisines.txt', function(req, res) {
  res.send(CUISINES);
});

/* Restaurant object to simulate fetches from the database */
function Restaurant(id, name, cuisine, rating, cost, address, availableTimes, dietOptions, about = "", menu = "", numberOfReviews = 50, reviews = [], images = []) {
  this.id = id;
  this.name = name;
  this.cuisine = cuisine;
  this.rating = rating;
  this.cost = cost;
  this.address = address;
  this.availableTimes = availableTimes;
  this.dietOptions = dietOptions;
  this.about = about;
  this.menu = menu;
  this.numberOfReviews = numberOfReviews;
  this.reviews = reviews;
  this.images = images;
}

/* Artificial database results for a restaurant search */
const RESTAURANTRESULTS = [new Restaurant(1, "Parisi's", "Italian", 5, 3, "Goodwood, Adelaide", ["6:00pm", "6:30pm", "7:00pm"], ["Vegan", "Vegetarian", "Gluten free"], "ABOUT PARISIS", "MENU", 200, ["5", "4", "3"], ["/images/restaurantPage/1", "/images/restaurantPage/2","/images/restaurantPage/3","/images/restaurantPage/4", "/images/restaurantPage/5","/images/restaurantPage/6"]),

                           new Restaurant(2, "50SixOne", "Dessert", 4, 2, "Goodwood, Adelaide", ["6:00pm", "6:30pm", "7:30pm"], ["Vegan", "Vegetarian", "Gluten free"], "ABOUT PARISIS", "MENU", 220, ["5", "4", "3"], ["/images/restaurantPage/1", "/images/restaurantPage/2","/images/restaurantPage/3","/images/restaurantPage/4", "/images/restaurantPage/5","/images/restaurantPage/6"]),

                           new Restaurant(3, "Vino's", "Italian", 2, 1, "Goodwood, Adelaide", ["6:30pm", "7:00pm", "7:30pm"], ["Vegan", "Vegetarian", "Gluten free"], "ABOUT PARISIS", "MENU", 300, ["5", "4", "3"], ["/images/restaurantPage/1", "/images/restaurantPage/2","/images/restaurantPage/3","/images/restaurantPage/4", "/images/restaurantPage/5","/images/restaurantPage/6"]),

                           new Restaurant(4, "Farina", "Italian", 2, 1, "Goodwood, Adelaide", ["6:30pm", "7:00pm", "7:30pm"], ["Gluten free"], "ABOUT PARISIS", "MENU", 250, ["5", "4", "3"], ["/images/restaurantPage/1", "/images/restaurantPage/2","/images/restaurantPage/3","/images/restaurantPage/4", "/images/restaurantPage/5","/images/restaurantPage/6"]),

                           new Restaurant(5, "Lil'NNQ", "Vietnamese", 2, 1, "Goodwood, Adelaide", ["6:30pm", "7:00pm", "7:30pm"], ["Vegetarian", "Gluten free"], "ABOUT PARISIS", "MENU", 250, ["5", "4", "3"], ["/images/restaurantPage/1", "/images/restaurantPage/2","/images/restaurantPage/3","/images/restaurantPage/4", "/images/restaurantPage/5","/images/restaurantPage/6"])];

/* Review objects to simulate fetches from the database */
function Review(id, noiseRating, overallRating, foodRating, serviceRating, ambienceRating, valueRating, comment) {
    this.id = id;
    this.noiseRating = noiseRating;
    this.overallRating = overallRating;
    this.foodRating = foodRating;
    this.serviceRating = serviceRating;
    this.ambienceRating = ambienceRating;
    this.valueRating = valueRating;
    this.comment = comment;
}

/* Artificial restaurant reviews for an arbitrary restaurant */
const RESTAURANTREVIEWS = [new Review(1, "Moderate", "5", "5", "5", "4", "4", "This is a review of the restaurant"), new Review(2, "Quiet", "4", "5", "4", "4", "4", "this is another review of the restaurant")];

// sends RESTAURANTRESULTS for populating the search results page
router.get('/restaurantResults.txt', function(req, res) {
  res.send(RESTAURANTRESULTS);
});

// sends reviews to the restaurant page reviews section
router.get('/restaurantReviews.txt', function(req, res) {
  res.send(RESTAURANTREVIEWS);
});

// sends a restaurant object for viewing on a restaurant page
router.get('/restaurantSelection.txt', function(req, res) {
    res.send(RESTAURANTRESULTS[parseInt(req.query.restaurantid) - 1]);
});

// returns a list of featured restaurants with their accompanying images
// To be used once the database is set up
//router.get('/featuredRestaurants', function(req, res) {
//    res.send(ALL FEATURED RESTAURANTS FROM THE DATABASE);
//});

module.exports = router;
