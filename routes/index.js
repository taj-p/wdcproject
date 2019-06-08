var express = require('express');
var router = express.Router();
const uuid = require('uuid');
var moment = require('moment');

// cuisines that are available in the database
const cuisines = [
  "Italian",  "Mexican", "Japanese", "Steakhouse", "Indian",  "Vietnamese", "Australian",
  "Filipino", "Chinese", "Dessert", "Malaysian", "Polish", "Pakistani", "Korean"
];
const costs = [ "$", "$$", "$$$" ];
const diet_options = [ "Vegetarian", "Vegan", "Halal", "Gluten-free" ];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const noise = ["Quiet", "Moderate", "Loud"];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Returns all cuisines stored in the database */
router.get('/cuisines.txt', function(req, res) {
  res.send(cuisines);
});

/* Returns all forms of costs stored in the database */
router.get('/costs.txt', function(req, res) {
  res.send(costs);
});

/* Returns all forms of diet options stored in the database */
router.get('/diet_options.txt', function(req, res) {
  res.send(diet_options);
});

/* Returns all the days of the week stored in the database */
router.get('/days.txt', function(req, res) {
  res.send(days);
});

/* Returns all forms of noise levels stored in the database */
router.get('/noise.txt', function(req, res) {
  res.send(noise);
});

// Logging in
router.post('/login', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(402);
      throw err;
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
        return;
      }
    })
  });
});


// Sign up
router.post('/signup', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {

    if (err) {
      res.sendStatus(402);
      throw err;
    }

    var accountid = uuid.v4();
    // Start query
    var query = "INSERT INTO account (account_id, email, password_hash, is_manager) " +
      "VALUES (?, ?, SHA2(?, 256), ?);";
    connection.query(query, [accountid, req.body.email, req.body.pass, req.body.manager], function(err, result, fields) {
      connection.release();
      req.session.user = true;
      req.session.userid = accountid;
      req.session.manager = req.body.manager;
      res.send();
    });
  });
});

// To set session user = false
router.post('/logout', function(req, res, next) {
  // If valid session present, unset user.
  if(req.session.user !== undefined) {
      delete req.session.user;
      delete req.session.userid;
      delete req.session.manager;
  }

  res.sendStatus(200);
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
// rating_value, rating_service, rating_food, rating_ambience)
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


/////////////// Reservations with just booking id and last name
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

// Request body: JSON object containing (must contain all of them, even if no changes are made)
//    booking_id, time, date, pax, additional_info, name_first, name_last (can NOT be NULL),
//    phone_number
// Response: nothing (200)
// Response body: empty (200)
router.post('/updateReservationWBookingId', function(req, res, next) {
  // connect to the database
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.send();
      throw err;
    }
    var date = moment(req.body.date).format("YYYY-MM-DD");
    var time = moment(req.body.time).format("kk:mm:ss");
    var query = "UPDATE booking INNER JOIN guest ON booking.guest_id=guest.guest_ID " +
      "SET booking.start_time=? AND booking.date=? AND booking.guest_number=? " + 
      "booking.additional_info=? AND guest.name_first=? AND guest.name_last=? "+
      "AND guest.phone_number=? WHERE booking.booking_id=? AND "+
      "guest.name_last=? AND DATE >= NOW();";

    var inserts = [time, date, req.body.pax, req.body.additional_info, req.body.name_first,
      req.body.name_last, req.body.phone_number, req.body.booking_id, req.body.name_last];
    connection.query(query, inserts, function(err, results, fields) {
      if (err) {
        console.log(err);
        res.send();
      }

      connection.release();
      res.send();
    });
  });
});

// Request body: booking_id, last name
// Response body: empty (200)
router.post('/deleteReservationWBookingId', function(req, res, next) {
  // connect to the database
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.send();
      throw err;
    }

    var query = "DELETE booking.* FROM booking "+
      "INNER JOIN guest ON booking.guest_id = guest.guest_id " +
      "WHERE booking.booking_id=? AND guest.name_last=?;";  
    connection.query(query, [req.body.booking_id, req.body.name_last],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          res.send();
        }
        connection.release();
        res.send();
    });
  });
});

// Returns array of restaurant objects
// request: NONE
// possible query (encode before get request): cuisine, diet_options, search
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
      console.log(query);
      console.log(inserts);

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

// Returns a Promise of an array of times of the availability for the given restaurant_id for the
// date, time, and total number of guests
// To await the conclusion of this promise before continuing, use the syntax:
// determineAvailability(...)
// .then(function(availability) {/* CODE */});
function determineAvailability(connection, req, date, time, restaurant_id, pax) {

  var query = "SELECT booking.guest_number, booking.start_time, rest_booking_est_time.duration FROM " +
    "booking INNER JOIN rest_booking_est_time " +
    "ON (booking.restaurant_id = rest_booking_est_time.restaurant_id) " +
    "WHERE ((booking.guest_number - guest_min) <= (guest_max - guest_min)) " +
    "AND (booking.guest_number - guest_min >= 0) AND "+
    "booking.date=? AND rest_booking_est_time.restaurant_id=?;";

  return new Promise((resolve, reject) => {
    connection.query(query, [date, restaurant_id], function(err, results, fields) {
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
        connection.query(query, [restaurant_id, date, time, time], function(err, results, fields) {
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
            connection.query(query, [restaurant_id], function(err, results, fields) {
              connection.release();
              var capacity = results;
              var available_seats = [];

              // initialise available_seats to the capacity of the restaurant
              for (var i=0; i < availabilites_length; i++) {
                available_seats.push(capacity[0].capacity);
              }

              // subtract available_seats by the number of bookings made in each time range
              var mom_begin = moment(available_begin, "kk:mm:ss");
              var mom_end = moment(available_end, "kk:mm:ss");

              for (var i=0; i < bookings.length; i++) {

                var mom_start = moment(bookings[i].start_time, "kk:mm:ss");

                if (mom_start.diff(mom_begin, 'minutes') <= mom_end.diff(mom_begin, 'minutes') &&
                    mom_start.diff(mom_begin, 'minutes') >= 0) {
                  var start_index = (mom_start.diff(mom_begin)) / 30;

                  // Duration is given in hours
                  for (var j=0; j < (bookings[i].duration)*2; j++) available_seats[start_index + j] -= bookings[i].guest_number;
                }
              }

              // return array of times where available_seats >= pax
              var available_times = []
              for (var i=0; i < available_seats.length; i++) {
                var to_add = mom_begin.clone();
                to_add.add(30*i, 'minutes');
                var add_obj = {hour: to_add.toObject().hours,minute: to_add.toObject().minutes}
                if (available_seats[i] >= pax) {
                  available_times.push(add_obj);
                }
              }
              availability = available_times;
              resolve(availability);
            });
          });
        });
      });
    });
  });
}

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
    determineAvailability(connection, req, moment(req.body.date).format("YYYY-MM-DD"),
                          moment(req.body.time).format("kk:mm:ss"), req.body.restaurant_id, req.body.pax)
      .then(function(result) {res.send(availability);});
    connection.release();
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

// Determines the overall rating of the given restaurant_id
function determineOverallRating(connection, restaurant_id) {
  return new Promise((resolve, reject) => {
    var query = `SELECT rating_overall
                 FROM review
                 WHERE restaurant_id = ?;`

    var overallRating = 5;
    connection.query(query, [restaurant_id], function(err, rows, fields){
      if (err) {
        res.send(400);
        throw err;
      }

      var rating = 0;
      for (var i = 0; i < rows.length; i++) {
        rating += rows[i].rating_overall;
      }
      overallRating = rating / rows.length;
    });
    resolve(overallRating);
  });
}

// sends RESTAURANTRESULTS for populating the search results page
router.get('/restaurantResults.txt', function(req, res) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.send(400);
      throw err;
    }

    var query = `SELECT restaurant.restaurant_id, name, cuisine, cost, address, diet_options, img_url
                 FROM restaurant, rest_img_url
                 WHERE restaurant.restaurant_id = rest_img_url.restaurant_id;`;
                 //AND (name LIKE ? OR JSON_EXTRACT(address, \"$.street\") LIKE ?
                 //OR JSON_EXTRACT(address, \"$.suburb\") LIKE ? OR description LIKE ?)
                 //LIMIT 50;`
    connection.query(query, [req.query.search, req.query.search, req.query.search, req.query.search], function(err, rows, fields) {
      if (err) {
        res.send(400);
        throw err;
      }

      // The following code requires many async calls to determineAvailability and determineOverallRating, so
      // we need to group them into an array for use with Promise.all(...);

      // get availability of restaurants and overall rating
      var availability_promises = [];
      var overall_ratings_promises = [];
      for (var i = 0; i < rows.length; i++) {
        var time = moment(req.query.date + " " + req.query.time, 'YYYY-MM-DD HH:mm');
        availability_promises.push(determineAvailability(connection, req, time.format("YYYY-MM-DD"), time.format("kk:mm:ss"), rows[i].restaurant_id, req.query.numguests));
        overall_ratings_promises.push(determineOverallRating(connection, rows[i].restaurant_id));
      }

      Promise.all(availability_promises)
        .then((availabilities) => {
          for (i = 0; i < rows.length; i++) {
            rows[i].availableTimes = availabilities[i];
          }
        })
        .then(() => {
          return Promise.all(overall_ratings_promises);
        })
        .then((overall_ratings) => {
          for (i = 0; i < rows.length; i++) {
            rows[i].overallRating = overall_ratings[i];
          }
        })
        .then(() => {
          for (i = 0; i < rows.length; i++) {
            rows[i].cuisine = Object.keys(JSON.parse(rows[i].cuisine))[0];
            rows[i].cost = rows[i].cost.length;
            rows[i].diet_options = Object.keys(JSON.parse(rows[i].diet_options));
          }
          return rows;
        })
        .then((finalRows) => {
          res.send(finalRows);
          connection.release();
     });
    });
  });
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
//

/////////////////////////////
/* GOOGLE CALENDAR EXAMPLE */
/////////////////////////////
//
//Const fs = require('fs');
//Const readline = require('readline');
//Const {google} = require('googleapis');
//
//// If modifying these scopes, delete token.json.
//Const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
//// The file token.json stores the user's access and refresh tokens, and is
//// created automatically when the authorization flow completes for the first
//// time.
//Const TOKEN_PATH = 'token.json';
//
//// Load client secrets from a local file.
//Fs.readFile('credentials.json', (err, content) => {
//  if (err) return console.log('Error loading client secret file:', err);
//  // Authorize a client with credentials, then call the Google Calendar API.
//  authorize(JSON.parse(content), listEvents);
//});
//
///**
// * Create an OAuth2 client with the given credentials, and then execute the
// * given callback function.
// * @param {Object} credentials The authorization client credentials.
// * @param {function} callback The callback to call with the authorized client.
// */
//Function authorize(credentials, callback) {
//  const {client_secret, client_id, redirect_uris} = credentials.installed;
//  const oAuth2Client = new google.auth.OAuth2(
//      client_id, client_secret, redirect_uris[0]);
//
//  // Check if we have previously stored a token.
//  fs.readFile(TOKEN_PATH, (err, token) => {
//    if (err) return getAccessToken(oAuth2Client, callback);
//    oAuth2Client.setCredentials(JSON.parse(token));
//    callback(oAuth2Client);
//  });
//}
//
///**
// * Get and store new token after prompting for user authorization, and then
// * execute the given callback with the authorized OAuth2 client.
// * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
// * @param {getEventsCallback} callback The callback for the authorized client.
// */
//Function getAccessToken(oAuth2Client, callback) {
//  const authUrl = oAuth2Client.generateAuthUrl({
//    access_type: 'offline',
//    scope: SCOPES,
//  });
//  console.log('Authorize this app by visiting this url:', authUrl);
//  const rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout,
//  });
//  rl.question('Enter the code from that page here: ', (code) => {
//    rl.close();
//    oAuth2Client.getToken(code, (err, token) => {
//      if (err) return console.error('Error retrieving access token', err);
//      oAuth2Client.setCredentials(token);
//      // Store the token to disk for later program executions
//      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//        if (err) return console.error(err);
//        console.log('Token stored to', TOKEN_PATH);
//      });
//      callback(oAuth2Client);
//    });
//  });
//}
//
///**
// * Lists the next 10 events on the user's primary calendar.
// * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
// */
//Function listEvents(auth) {
//  const calendar = google.calendar({version: 'v3', auth});
//  calendar.events.list({
//    calendarId: 'primary',
//    timeMin: (new Date()).toISOString(),
//    maxResults: 10,
//    singleEvents: true,
//    orderBy: 'startTime',
//  }, (err, res) => {
//    if (err) return console.log('The API returned an error: ' + err);
//    const events = res.data.items;
//    if (events.length) {
//      console.log('Upcoming 10 events:');
//      events.map((event, i) => {
//        const start = event.start.dateTime || event.start.date;
//        console.log(`${start} - ${event.summary}`);
//      });
//    } else {
//      console.log('No upcoming events found.');
//    }
//  });
//}

/////////////////////////////
/* END GOOGLE CALENDAR EXAMPLE */
/////////////////////////////

module.exports = router;
