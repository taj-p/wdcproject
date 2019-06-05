var express = require('express');
var router = express.Router();
const uuid = require('uuid');
var moment = require('moment');

// var RESTAURANTREVIEWS = [
//   {id: 1, noise: "Moderate", overall: 5, food: 5, service: 5, ambience: 4, value: 4,
//     comment: "This is a review of the restaurant"},
//   {id: 2, noise: "Quiet", overall: 4, food: 5, service: 4, ambience: 4, value: 4,
//     comment: "This is another review of the restaurant"}
// ];

var cuisines = [ 
  "Italian",  "Mexican", "Japanese", "Steakhouse", "Indian",  "Vietnamese", "Australian", 
  "Filipino", "Chinese", "Dessert", "Malaysian", "Polish", "Pakistani", "Korean" 
];
var costs = [ "$", "$$", "$$$" ];
var diet_options = [ "Vegetarian", "Vegan", "Halal", "Gluten-free" ];
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var noise = ["Quiet", "Moderate", "Loud"];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Returns all cuisines stored in the database */
router.get('/cuisines.txt', function(req, res) {
  res.send(cuisines);
});

router.get('/costs.txt', function(req, res) {
  res.send(costs);
});


router.get('/diet_options.txt', function(req, res) {
  res.send(diet_options);
});

router.get('/days.txt', function(req, res) {
  res.send(days);
});

router.get('/noise.txt', function(req, res) {
  res.send(noise);
});

// Logging in
router.post('/login', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(402);
    }
    // Start query
    var query = "SELECT account_id, is_manager FROM account " + 
      "WHERE email = ? AND password_hash = SHA2(?, 256);";
    connection.query(query, [req.body.email, req.body.pass], function(err, rows, fields) {
      connection.release();  // release connection
      if(rows.length > 0) {
        req.session.user = true;
        req.session.userid = rows[0].account_id;
        req.session.manager = rows[0].is_manager;
        res.send();
      } else {
        res.sendStatus(403);
      }
    })
  });
});


// Sign up
router.post('/signup', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(402);
    }
    var accountid = uuid.v4();
    // Start query
    var query = "INSERT INTO account (account_id, email, password_hash, is_manager) " + 
      "VALUES (?, ?, SHA2(?, 256), ?);";
    connection.query(query, [accountid, req.body.email, req.body.pass, req.body.manager], function(err, result, fields) {
      connection.release();  // release connection
      req.session.user = true;
      req.session.userid = accountid;
      req.session.manager = req.body.manager;
      res.send();
    })
  });
});

// To set session user = false
router.post('/logout', function(req, res, next) {
  req.session.user = false;
  res.send();
});

// get restaurant image - doesn't require having an account
// request: restaurant_id
// response: array of JSON (img_url)
router.get('/restImg.json', function(req, res, next) {
  // connect to the database
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.send();
      throw err;
    }

    var query = "SELECT img_url FROM rest_img_url WHERE restaurant_id=? AND is_menu=false;";  
    connection.query(query, [req.body.restaurant_id],
      function(err, rows, fields) {
        connection.release();
        res.json(rows);
    });
  });
});

// get restaurant image - doesn't require having an account
// request: restaurant_id
// response: array of JSON (img_url)
router.get('/restMenuImg.json', function(req, res, next) {
  // connect to the database
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.send();
      throw err;
    }

    var query = "SELECT img_url FROM rest_img_url WHERE restaurant_id=? AND is_menu=true;";  
    connection.query(query, [req.body.restaurant_id],
      function(err, rows, fields) {
        connection.release();
        res.json(rows);
    });
  });
});

// get restaurant opening times - doesn't require having an account
// request: restaurant_id
// response: array of JSON (day, start, end)
// todo: will have to modify date and time to JSON
// start and end are JSON objects (hour, minute)
router.get('/restOpenings.json', function(req, res, next) {
  // connect to the database
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.send();
      throw err;
    }

    var query = "SELECT day, start, end FROM rest_open_times WHERE restaurant_id=?;";  
    connection.query(query, [req.body.restaurant_id],
      function(err, rows, fields) {
        connection.release();
        res.json(rows);
    });
  });
});


// get restaurant reviews - doesn't require having an account
// request: restaurant_id
// response: array of JSON (review_id, name_display, description, noise, rating_overall,
// rating_value, rating_service, rating_food, rating_ambience), each represents a review
// NOTE: ratings are integers
router.get('/restReviews.json', function(req, res, next) {
  // connect to the database
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.send();
      throw err;
    }

    var query = "SELECT review_id, name_display, description, noise, rating_overall, rating_value, "+ 
      "rating_service, rating_food, rating_ambience FROM review WHERE restaurant_id=?;";  
    connection.query(query, [req.body.restaurant_id],
      function(err, rows, fields) {
        connection.release();
        res.json(rows);
    });
  });
});

// get booking for guests without account
// request: booking_id, name_last
// response: array of JSON (booking_id, restaurant_id, guest_id, start_time, date, guest_number, 
// additional_info, account_id, name_first, name_last, phone_number)
// todo: will have to modify date to JSON
router.get('/reservationWBookingId.json', function(req, res, next) {
  // connect to the database
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.send();
      throw err;
    }

    var query = "SELECT * FROM booking INNER JOIN guest ON booking.guest_id = guest.guest_id " +
      "WHERE booking.booking_id=? AND guest.name_last=?;";  
    connection.query(query, [req.body.booking_id, req.body.name_last],
      function(err, rows, fields) {
        connection.release();
        res.json(rows);
    });
  });
});

// Returns array of restaurant objects
// request: NONE
// possible query (encode before get request): cuisine, diet_options, search 
// NOTE: queries are case-sensitive, 
//  keep cuisine and diet_option values lower case
//  Name and street/suburb names should start with upper case
// response: array of JSON (restaurant_id, name, address, phone, description, cost, cuisine, 
// diet_options, review_count)
router.get('/restaurant.json', function(req, res, next) {
  if (Object.keys(req.query).length > 0) {
    // Send all restaurants not in any particular order
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.send();
        throw err;
      }

      var query = "SELECT restaurant_id, name, address, phone, description, cost, cuisine, " + 
        "diet_options, review_count FROM restaurant ";  

      var inserts = [];
      var query_string = [];
      var query_length = 0;
      for (var param in req.query) {
        var current_query = "";
        // deal with json in query
        if (param === "diet_options" || param === "cuisine") {
          if (req.query[param] instanceof Array) {
            current_query = "JSON_EXTRACT(" + param +", \"$."+ req.query[param][0] +"\")=true ";
            for (var i=1; i<req.query[param].length; i++) {
              current_query += "AND JSON_EXTRACT(" + param +", \"$."+ req.query[param][i] +"\")=true ";
            }
          } else {
            current_query="JSON_EXTRACT(" + param +", \"$."+ req.query[param] +"\")=true ";
          }
        }

        // When query type is a string
        else if (param === "cost") {
          current_query += "cost=? ";
          inserts.push(req.query[param]);
        }

        // Query from search bar, query can appear in name, address, description
        else if (param === "search") {
          current_query += "(name LIKE ? OR JSON_EXTRACT(address, \"$.street\") LIKE ? " + 
          "OR JSON_EXTRACT(address, \"$.suburb\") LIKE ? OR description LIKE ?) ";
          inserts.push("%"+req.query[param]+"%");
          inserts.push("%"+req.query[param]+"%");
          inserts.push("%"+req.query[param]+"%");
          inserts.push("%"+req.query[param]+"%");
        }
        query_string.push(current_query);
        query_length++;
      }

      // cuisines, cost, diet options
      var search_condition = "";
      if (query_length >= 0) {
        search_condition += "WHERE " + query_string[0];
        for (var i=1; i < query_length; i++) {
          search_condition = search_condition + "AND " + query_string[i];
        }
      } 
      query = query + search_condition + " LIMIT 50;";

      connection.query(query, inserts, function(err, rows, fields) {
          if (err) {
            res.send();
            throw err;
          }
          connection.release();
          res.json(rows);
      });
    });
  } else {
    // Send all restaurants not in any particular order
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.send();
        throw err;
      }

      var query = "SELECT restaurant_id, name, address, phone, description, cost, cuisine, " +
        "diet_options, review_count FROM restaurant LIMIT 50;";  
      connection.query(query, function(err, rows, fields) {
          if (err) {
            res.send();
            throw err;
          }
          connection.release();
          res.json(rows);
      });
    });
  }
});

// Returns available times to book as array of JSON (hour (24 hour), minute)
// GIVEN pax, restaurant_id, date (JSON: year, month (index 0), date
// which will be handled by moment), time (JSON: hour (in 24 hour time), minute)
router.post('/availability.json', function(req, res, next) {
  // req contains time in format {hour:, minute:}
  
  // Get all bookings in +/-x hour range from DB
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.send();
      throw err; 
    }

    var date = moment(req.body.date).format("YYYY-MM-DD");
    var time = moment(req.body.time).format("kk:mm:ss");
    var query = "SELECT booking.guest_number, booking.start_time, rest_booking_est_time.duration FROM " +
      "booking INNER JOIN rest_booking_est_time " + 
      "ON (booking.restaurant_id = rest_booking_est_time.restaurant_id) " +
      "WHERE ((booking.guest_number - guest_min) <= (guest_max - guest_min)) " + 
      "AND (booking.guest_number - guest_min >= 0) AND "+
      "booking.date=? AND rest_booking_est_time.restaurant_id=?;";
    connection.query(query, [date, req.body.restaurant_id], function(err, results, fields) {
      if (err) {
        res.send();
        throw err;
      }
      connection.release();
      var bookings = results;

      // Initialise array to rest. capacity for each bin
      // Showing +/- 1hour range
      // availabilities is incremented every half hour
      req.pool.getConnection(function(err, connection) {
        if (err) {
          res.send();
          throw err;
        }

        var query = "SELECT start, end, TIME_TO_SEC(TIMEDIFF(end, start))/60/30 AS intervals FROM rest_open_times WHERE " + 
          "restaurant_id=? AND day=DAYNAME(?) AND TIMEDIFF(TIME(?), start) <= TIMEDIFF(end, start) AND " + 
          "TIMEDIFF(TIME(?),start) >= 0;";
        connection.query(query, [req.body.restaurant_id, date, time, time], function(err, results, fields) {
          if (err) {
            res.send();
            throw err;
          }

          connection.release();
          var availabilites_length = 0;
          var available_begin = 0;
          var available_end = 0;
          if (results.length > 0) {
            var availabilites_length = results[0].intervals;
            var available_begin = results[0].start;
            var available_end = results[0].end;
          }
          
          // Get capacity
          req.pool.getConnection(function(err, connection) {
            if (err) {
              res.send();
              throw err;
            }

            var query = "SELECT capacity FROM restaurant WHERE restaurant_id=? ;";
            connection.query(query, [req.body.restaurant_id], function(err, results, fields) {
              connection.release();
              var capacity = results;
              var available_seats = [];
              for (var i=0; i < availabilites_length; i++) {
                available_seats.push(capacity[0].capacity);
              }

              var mom_begin = moment(available_begin, "kk:mm:ss");
              var mom_end = moment(available_end, "kk:mm:ss");
              for (var i=0; i < bookings.length; i++) {
                var mom_start = moment(bookings[i].start_time, "kk:mm:ss");
                if (mom_start.diff(mom_begin, 'minutes') <= mom_end.diff(mom_begin, 'minutes') 
                    && mom_start.diff(mom_begin, 'minutes') >= 0) {
                  var start_index = (mom_start.diff(mom_begin)) / 30;
                  // Duration is given in hours
                  for (var j=0; j < (bookings[i].duration)*2; j++) {
                    available_seats[start_index + j] -= bookings[i].guest_number;
                  }
                }
              }

              var available_times = []
              for (var i=0; i < available_seats.length; i++) {
                var to_add = mom_begin;
                var add_obj = {hour: to_add.toObject().hours,minute: to_add.toObject().minutes}
                if (available_seats[i] >= req.body.pax) {
                  available_times.push(add_obj);
                }
              }
              res.send(available_times);
            });
          });
        });
      });
    });
  });
});

// Add reservation
// request: JSON object (date, time, restaurant_id, pax, additionalInfo, account_id (can be null))
// date can be in JSON (year, month (index at 0 so December is 11), date) OR "YYYY-MM-DD", 
// time is JSON (hour, minute), name_first (not NULL), name_last (can be null for 
// non-registered users), phone (not NULL),
// response: 200 status
router.post('/addReservation', function(req, res, next) {
  var newBookID = uuid.v4();
  var guest_id = uuid.v4();
  var date = moment(req.body.date).format("YYYY-MM-DD");
  var time = moment(req.body.time).format("kk:mm:ss");

  if (req.session.user != true) {
    // not registered
    // connect to the database
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.send();
        throw err;
      }

      // Must create guest first
      var query = "INSERT INTO guest (guest_id, account_id, name_first, name_last, phone_number) " +
        "VALUES (?, NULL, ?, ?, ?);";
      connection.query(query, [guest_id, req.body.name_first, req.body.name_last,
        req.body.phone_number], function(err, results, fields) {
          req.pool.getConnection(function(err, connection) {
            if (err) {
              console.log(err);
              res.send();
            }

            var query = "INSERT INTO booking (booking_id, restaurant_id, guest_id, start_time, " + 
              "date, guest_number, additional_info) " + 
              "VALUES (?, ?, ?, ?, ?, ?, ?);";  
            connection.query(query, [newBookID, req.body.restaurant_id, guest_id, time, date, req.body.pax,
              req.body.additionalInfo], function(err, rows, fields) {
                  if (err) {
                    console.log(err);
                    res.send();
                  }
                  connection.release();
                  res.send();
          });
        })
      });
    });
  } else {
    // connect to the database
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.send();
        throw err;
      }

      var query = "SELECT guest_id FROM guest WHERE account_id=? AND name_first=? AND name_last=?;";
      connection.query(query, [req.body.account_id, req.body.name_first, req.body.name_last],
        function(err, results, fields) {
          connection.release();
          if (results.length > 0) {
            guest_id = results[0].guest_id;
          }
          
          var query = "INSERT INTO booking (booking_id, restaurant_id, guest_id, start_time, " + 
            "date, guest_number, additional_info) " + 
            "VALUES (?, ?, ?, ?, ?, ?, ?);";  
          connection.query(query, [newBookID, req.body.restaurant_id, guest_id,
            time, date, req.body.pax, req.body.additionalInfo],
            function(err, rows, fields) {
              connection.release();
              res.send();
            }
          ); 
        }
      );
    });
  }
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
