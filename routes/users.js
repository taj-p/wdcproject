var express = require('express');
var router = express.Router();
var moment = require('moment');
var uuid = require('uuid');

router.use(function(req, res, next) {
	if (req.session.user === true) {
		next();
	} else {
		res.sendStatus(403);
	}
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
 ANY REGISTERED USERS
 */
router.post('/updatePassword', function(req, res, next) {
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "UPDATE account SET password_hash=SHA2(?,256) WHERE account_id=?;";
		connection.query(query, [req.body.pass, req.session.userid], function(err, rows, fields) {
			connection.release();
			res.send();
		});
	});
});

router.post('/updateEmail', function(req, res, next) {
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "UPDATE account SET email=? WHERE account_id=?;";
		connection.query(query, [req.body.email, req.session.userid], function(err, rows, fields) {
			connection.release();
			res.send();
		});
	});
});

router.post('/deleteAccount', function(req, res, next) {
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "DELETE FROM account WHERE account_id=?;";
		connection.query(query, [req.session.userid], function(err, rows, fields) {
			connection.release();
			res.send();
		});
	});
});

/*
 RESTAURANT GUEST REGISTERED USERS
 */
// Get user's upcoming reservations
// Possible queries: history (value true), upcoming (value true).
//   Eg. /userReservations.json?history=true
// Request: depends on query. If no query, send empty request body
// If history/upcoming: send JSON object with
//   date in format "YYYY-MM-DD", or JSON {year (int), month (indexed at 0, e.g. Jan = 0), day}
//   time in format JSON {hour, minute}
// Response: array of json object that contains
// guest_id, account_id, name_first, name_last, phone_number, booking_id, restaurant_id, guest_id,
// start_time, date, guest_number, additional_info
router.get('/userReservations.json', function (req, res, next) {
	if (req.session.manager === true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "SELECT * FROM guest INNER JOIN booking ON guest.guest_id = booking.guest_id " +
			"WHERE guest.account_id=? ";
		var inserts = [req.session.userid];

		var subqueries = "";
		if (Object.keys(req.query).length > 0) {
			var date = moment(req.body.date).format("YYYY-MM-DD");
    		var time = moment(req.body.time).format("kk:mm:ss");

			if (param === "history") {
				if (req.query[param] === "true") {
					subqueries = "AND DATE < ? AND start_time < ? ";
					inserts.push(date);
					inserts.push(time);
				}
			} else if (param === "upcoming") {
				if (req.query[param] === "true") {
					"AND DATE >= ? AND start_time >= ? ";
					inserts.push(date);
					inserts.push(time);
				}
			}
		}

		query = query + subqueries + " LIMIT 10;";
		connection.query(query, inserts, function(err, results, fields) {
			if (err) {
				console.log(err);
				res.send();
			}

			connection.release();
			res.send(results);
		});
	});
});

// Request: JSON object containing (must contain all of them, even if no changes are made)
//    booking_id, time, date, pax, additional_info, name_first, name_last (can be "NULL"),
//    phone_number
// Response: nothing (200)
router.post('/updateUserReservation', function (req, res, next) {
	if (req.session.manager === true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		// Update booking info (date, time, pax, additional info)
		var date = moment(req.body.date).format("YYYY-MM-DD");
    	var time = moment(req.body.time).format("kk:mm:ss");
		var query = "UPDATE booking SET start_time=? AND date=? AND guest_number=? " +
			"additional_info=? WHERE booking_id=? AND account_id=? AND DATE >= NOW();";
		var inserts = [time, date, req.body.pax, req.body.additional_info,
			req.body.booking_id, req.session.userid];
		connection.query(query, inserts, function(err, results, fields) {
			if (err) {
				console.log(err);
				res.send();
			}
			connection.release();

			// Update guest info (name, phone)
			req.pool.getConnection(function(err, connection) {
				if (err) {
					res.send();
					throw err;
				}

				var query = "UPDATE guest INNER JOIN booking ON guest.guest_id=booking.guest_id "+
					"SET guest.name_first=? AND guest.name_last=? AND guest.phone_number=? " +
					"WHERE booking.booking_id=? AND guest.account_id=?;";
				var inserts = [req.body.name_first, req.body.name_last, req.body.phone_number,
					req.body.booking_id, req.session.userid];
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
	});
});

// Request: JSON object containing booking_id
// Response: nothing (200)
router.post('/deleteUserReservation', function (req, res, next) {
	if (req.session.manager === true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "DELETE FROM booking WHERE booking_id=? AND account_id=?;";
		var inserts = [req.body.booking_id, req.session.userid];
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

/////// USER REVIEW
// Get all current reviews made by user
router.get('/userReviews.json', function (req, res, next) {
	if (req.session.manager === true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "SELECT * FROM review WHERE account_id=?;";
		var inserts = [req.session.userid];
		connection.query(query, inserts, function(err, results, fields) {
			if (err) {
				console.log(err);
				res.send();
			}
			connection.release();
			res.json(results);
		});
	});
});

// Modify a current review made by user
// request body: JSON containing review_id, name_display, description, noise (in lower case),
//    rating_overall (INT out of 5), rating_value(INT out of 5), rating_service (INT out of 5),
//    rating_food(INT out of 5), rating_ambience (INT out of 5),
// respondy body: empty (200)
router.post('/updateUserReview', function (req, res, next) {
	if (req.session.manager === true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "UPDATE review SET name_display=?, description=?, noise=?, rating_overall=?, " +
			"rating_value=?, rating_service=?, rating_food=?, rating_ambience=? " +
			"WHERE account_id=? AND review_id=?;";
		var inserts = [req.body.name_display, req.body.description, req.body.noise,
			req.body.rating_overall, req.body.rating_value, req.body.rating_service,
			req.body.rating_food, req.body.rating_ambience, req.session.userid, req.body.review_id];
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

// ADD a current review from a user
// request body: JSON containing review_id, name_display, description, noise (in lower case),
//    rating_overall (INT out of 5), rating_value(INT out of 5), rating_service (INT out of 5),
//    rating_food(INT out of 5), rating_ambience (INT out of 5),
// respondy body: empty (200)
// NOTE: Can't seem to do a insert query wtith a WHERE clause (to check if user has been to the
// restaurant). Should only call this post, when user has been to the restaurant. Can do this by
// showing user a list of restaurants they've been to through GET /userReservations.json so users
// can only review retaurants they've been to
router.post('/addUserReview', function (req, res, next) {
	if (req.session.manager === true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var newReviewID = uuid.v4();
		var query = "INSERT INTO review (review_id, restaurant_id, account_id, name_display, " +
			"description, noise, rating_overall, rating_value, rating_service, rating_food, " +
			"rating_ambience) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
		var inserts = [newReviewID, req.body.restaurant_id, req.session.userid,
			req.body.name_display, req.body.description, req.body.noise,
			req.body.rating_overall, req.body.rating_value, req.body.rating_service,
			req.body.rating_food, req.body.rating_ambience, req.session.userid, req.body.review_id];
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

// DELETE a user review
// Request body: JSON object with review_id
// Response body: empty (200)
router.post('/deleteUserReview', function (req, res, next) {
	if (req.session.manager === true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "DELETE FROM review WHERE review_id=? AND account_id=?;";
		var inserts = [req.body.review_id, req.session.userid];
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

/*
 MANAGER
 */
// GET request of manager - parameter : account id
router.get('/manager.json', function(req, res, next) {
	if (req.session.manager != true) {
		console.log("Error: not manager");
		res.sendStatus(403);
	} else {
		// connect to the database
		req.pool.getConnection(function(err, connection) {
			if (err) {
				res.send();
				throw err;
			}

			var manageraccount = req.session.userid;
			var query = "SELECT restaurant_id, name " +
				"FROM restaurant WHERE account_id=?;";	
			connection.query(query, [manageraccount], function(err, rows, fields) {
				connection.release();
				res.json(rows);
			});
		});
	}
});

/////// RESTAURANT INFO
// Select restaurant to manage
router.post('/selectRest', function (req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	req.session.restaurantid = req.body.restaurantid;
	next();
});

// GET request of manager - parameter : account id
router.get('/restInfo.json', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}
	
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var query = "SELECT * FROM restaurant WHERE restaurant_id=? AND account_id=?;";	
		connection.query(query, [req.session.restaurantid, req.session.userid], function(err, rows, fields) {
			if (err) {
				console.log(err);
				res.send();
			}
			connection.release();
			res.json(rows);
		});
	});
});

// POST request of manager
router.post('/addNewRestInfo', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}
	
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var newRestID = uuid.v4();
		var query = "INSERT INTO restaurant (restaurant_id, account_id, name, address, " + 
			"phone, capacity, description, cost, cuisine, diet_options) " + 
			"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";	
		connection.query(query, [newRestID, req.session.userid, req.body.name,
			req.body.address, req.body.phone, req.body.capacity, req.body.description, req.body.cost,
			req.body.cuisine, req.body.diet_options],
			function(err, rows, fields) {
				if (err) {
					console.log(err);
					res.send();
				}
				connection.release();
				req.session.restaurantid = newRestID;
				res.send();
		});
	});
	next();
});

// POST request of manager
router.post('/updateRestInfo', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}
	
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var query = "UPDATE restaurant SET name=?, address=?, phone=?, capacity=?, description=?, "+
			"cost=?, cuisine=?, diet_options=? WHERE restaurant_id=? AND account_id=?;";	
		connection.query(query, [req.body.name, req.body.address, req.body.phone, req.body.capacity,
			req.body.description, req.body.cost, req.body.cuisine, req.body.diet_options,
			req.session.restaurantid, req.session.userid],
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

// POST request of manager
router.post('/deleteRestInfo', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}
	
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var query = "DELETE FROM restaurant WHERE restaurant_id=? AND account_id=?;";	
		connection.query(query, [req.session.restaurantid, req.session.userid],
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


/////// RESTAURANT IMG
// GET restaurant image
router.get('/restImg.json', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var query = "SELECT img_url FROM rest_img_url INNER JOIN restaurant "+
		"ON rest_img_url.restaurant_id=restaurant.restaurant_id " +
		"WHERE rest_img_url.restaurant_id=? AND restaurant.account_id=? AND rest_img_url.is_menu=false;";
		connection.query(query, [imgID, req.session.restaurantid, req.session.restaurantid, req.body.url],
			function(err, rows, fields) {
				if (err) {
					console.log(err);
					res.send();
				}
				connection.release();
				res.json(rows);
		});
	});
});

// ADD restaurant image - request is just JSON object with one url
router.post('/addRestImg', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}
	
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var imgID = uuid.v4();
		var query = "INSERT INTO rest_img_url (img_id, restaurant_id, img_url, is_menu) VALUES " +
			"(?, (SELECT restaurant.restaurant_id FROM restaurant INNER JOIN account ON " +
			"restaurant.account_id = account.account_id WHERE restaurant.restaurant_id=? " +
			"AND account.account_id=?), ?, false);";
		connection.query(query, [imgID, req.session.restaurantid, req.session.userid, req.body.url],
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

// DELETE adding restaurant image  (can be menu image)- request is just JSON object with one url
router.post('/deleteRestImg', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var imgID = uuid.v4();
		var query = "DELETE rest_img_url.* FROM rest_img_url " +
			"INNER JOIN restaurant ON rest_img_url.restaurant_id = restaurant.restaurant_id " +
			"INNER JOIN account ON restaurant.account_id = account.account_id " +
			"WHERE rest_img_url.restaurant_id=? AND rest_img_url.img_id=? AND restaurant.account_id=?;";
		connection.query(query, [req.session.restaurantid, req.session.userid,req.body.url],
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

/////// RESTAURANT MENU IMG
// GET restaurant image
router.get('/restMenuImg.json', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var query = "SELECT img_url FROM rest_img_url INNER JOIN restaurant "+
		"ON rest_img_url.restaurant_id=restaurant.restaurant_id " +
		"WHERE rest_img_url.restaurant_id=? AND restaurant.account_id=? AND rest_img_url.is_menu=true;";
		connection.query(query, [imgID, req.session.restaurantid, req.session.restaurantid, req.body.url],
			function(err, rows, fields) {
				if (err) {
					console.log(err);
					res.send();
				}
				connection.release();
				res.json(rows);
		});
	});
});


// POST adding restaurant MENU image - request is just JSON object with one url
router.post('/addRestMenuImg', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var imgID = uuid.v4();
		// var query = "INSERT INTO rest_img_url (img_id, restaurant_id, img_url, is_menu) VALUES " +
		// 	"(?, ?, ?, true);";
		var query = "INSERT INTO rest_img_url (img_id, restaurant_id, img_url, is_menu) VALUES " +
			"(?,(SELECT restaurant.restaurant_id FROM restaurant INNER JOIN account ON " +
			"restaurant.account_id = account.account_id WHERE restaurant.restaurant_id=? " +
			"AND account.account_id=?), ?, true);"
		connection.query(query, [imgID, req.session.restaurantid, req.session.userid, req.body.url],
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

/////// RESTAURANT OPENINGS
// GET restaurant openings
router.get('/restOpenings.json', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}
	
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var query = "SELECT day, start, end FROM rest_open_times INNER JOIN restaurant "+
		"ON rest_open_times.restaurant_id=restaurant.restaurant_id " +
		"WHERE rest_open_times.restaurant_id=? AND restaurant.account_id=?;";
		connection.query(query, [imgID, req.session.restaurantid, req.session.restaurantid],
			function(err, rows, fields) {
				if (err) {
					console.log(err);
					res.send();
				}
				connection.release();
				res.send(rows);
		});
	});
});

// Add a restaurant opening - recieve a JSON object in request, containing day, start, end
router.post('/addRestOpenings', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}
		var query = "INSERT INTO rest_open_times (restaurant_id, day, start, end) VALUES " +
			"((SELECT restaurant.restaurant_id FROM restaurant INNER JOIN account ON " + 
			"restaurant.account_id = account.account_id WHERE restaurant.restaurant_id=? " + 
			"AND account.account_id=?), ?, ?, ?);";
		connection.query(query, [imgID, req.session.restaurantid, req.session.userid, req.body.day,
			req.body.start, req.body.end],
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

// Modify a restaurant booking estimate time - recieve a JSON object in request, containing duration,
// min guests, and max guest
router.post('/updateRestOpenings', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}
	
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var query = "UPDATE rest_open_times " +
			"INNER JOIN restaurant ON rest_img_url.restaurant_id = restaurant.restaurant_id " +
			"INNER JOIN account ON restaurant.account_id = account.account_id " +
			"SET rest_open_times.day=?, rest_open_times.start=?, rest_open_times.end=? "+
			"WHERE rest_img_url.restaurant_id=? AND restaurant.account_id=? AND rest_open_times.day=? " +
			"rest_open_times.start=?, rest_open_times.end=?;";
		connection.query(query, [req.body.day, req.body.start, req.body.end,
			req.session.restaurantid, req.session.userid, req.body.prev_day, req.body.prev_start,
			req.body.prev_end],
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

// Delete a restaurant opening
router.post('/deleteRestOpenings', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "DELETE rest_open_times.* FROM rest_open_times " +
			"INNER JOIN restaurant ON rest_img_url.restaurant_id = restaurant.restaurant_id " +
			"INNER JOIN account ON restaurant.account_id = account.account_id " +
			"WHERE rest_img_url.restaurant_id=? AND restaurant.account_id=? AND rest_open_times.day=? "+
			"rest_open_times.start=?, rest_open_times.end=?;";
		connection.query(query, [req.session.restaurantid, req.session.userid, req.body.day,
			req.body.start, req.body.end],
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

/////// RESTAURANT BOOKING ESTIMATION
// Get restaurant booking estimate time
router.get('/restBookEst.json', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}
		var query = "SELECT duration, guest_min, guest_max FROM rest_booking_est_time WHERE " +
			"restaurant_id=? AND account_id=?;";
		connection.query(query, [req.session.restaurantid, req.session.userid],
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

// Add a restaurant booking estimate time - it recieve a JSON object in request, containing duration,
// min guests, and max guest
router.post('/addRestBookEst', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}
		var query = "INSERT INTO rest_booking_est_time (restaurant_id, account_id, duration, " +
			"guest_min, guest_max) VALUES (?, ?, ?, ?, ?);";
		connection.query(query, [req.session.restaurantid, req.session.userid, req.body.duration,
			req.body.guest_min, req.body.guest_max],
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

// Add a restaurant booking - it recieve a JSON object in request, containing duration,
// min guests, and max guest
router.get('/addBooking', function(req, res, next) {
	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

    const booking_id = uuid.v4();
    const guest_id = uuid.v4();

    new Promise((resolve) => {
      var query = `INSERT INTO guest
                   VALUES(?, ?, ?, ?, ?)`
		  connection.query(query, [guest_id, req.session.userid, req.query.name_first, req.query.name_last, req.query.phone_number],
		  	function(err, rows, fields) {
		  		if (err) {
		  			console.log(err);
		  		}
          resolve();
		  });
    }).then(() => {
		  var query = `INSERT INTO booking
		  	           VALUES (?, ?, ?, ?, ?, ?, ?);`;
		  connection.query(query, [booking_id, req.query.restaurant_id, guest_id, req.query.time,
		  	req.query.date, req.query.numguests, req.query.additionalinformation],
		  	function(err, rows, fields) {
		  		if (err) {
		  			console.log(err);
		  			res.send();
		  		}
		      connection.release();
		  		res.send(booking_id);
		  });
    });

	});
});

// Modify a restaurant booking estimate time - recieve a JSON object in request, containing new and old
// duration, min guests, and max guest
router.post('/updateRestBookEst', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var query = "UPDATE rest_booking_est_time SET duration=?, guest_min=?, guest_max=? " +
			"WHERE restaurant_id=? AND account_id=? AND duration=? AND guest_min=? AND guest_max=?;";
		connection.query(query, [req.body.duration, req.body.guest_min, req.body.guest_max,
			req.session.restaurantid, req.session.userid, req.body.prev_duration,
			req.body.prev_guest_min, req.body.prev_guest_max],
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

// Delete a restaurant opening
router.post('/deleteRestBookEst', function(req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	// connect to the database
	req.pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
			res.send();
		}

		var query = "DELETE FROM rest_booking_est_time WHERE restaurant_id=? AND account_id=? " +
			"AND duration=? AND guest_min=? AND guest_max=?;";
		connection.query(query, [req.session.restaurantid, req.session.userid, req.body.duration,
			req.body.guest_min, req.body.guest_max],
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


/////// RESTAURANT RESERVATIONS
// Get restaurant's reservations for the day
// Request:
//   date in format "YYYY-MM-DD", or JSON {year (int), month (indexed at 0, e.g. Jan = 0), day}
// Response: array of json object that contains
// guest_id, account_id, name_first, name_last, phone_number, booking_id, restaurant_id, guest_id,
// start_time, date, guest_number, additional_info
router.get('/restaurantReservations.json', function (req, res, next) {
	if (req.session.manager != true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "SELECT guest.*, booking.* FROM guest" +
			"INNER JOIN booking ON guest.guest_id=booking.guest_id " +
			"INNER JOIN restaurant ON booking.restaurant_id=restaurant.restaurant_id " +
			"WHERE booking.restaurant_id=? AND restaurant.account_id=? ";
		var inserts = [req.session.restaurantid, req.session.userid];

		var subqueries = "";
		if (Object.keys(req.query).length > 0) {
			var date = moment(req.body.date).format("YYYY-MM-DD");

			if (param === "history") {
				if (req.query[param] === "true") {
					subqueries = "AND booking.date < ? ";
					inserts.push(date);
				}
			} else if (param === "upcoming") {
				if (req.query[param] === "true") {
					"AND booking.date >= ? ";
					inserts.push(date);
				}
			}
		}

		query = query + subqueries + " LIMIT 10;";
		connection.query(query, inserts, function(err, results, fields) {
			if (err) {
				console.log(err);
				res.send();
			}
			connection.release();
			res.json(results);
		});
	});
});

// Request: JSON object containing (must contain all of them, even if no changes are made)
//    booking_id, time, date, pax, additional_info, name_first, name_last (can be "NULL"),
//    phone_number
// Response: nothing (200)
router.post('/updateUserReservation', function (req, res, next) {
	if (req.session.manager === true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}


		// Update booking info (date, time, pax, additional info)
		var date = moment(req.body.date).format("YYYY-MM-DD");
    	var time = moment(req.body.time).format("kk:mm:ss");
		// var query = "UPDATE booking SET start_time=? AND date=? AND guest_number=? " +
		// 	"additional_info=? WHERE booking_id=? AND restaurant_id=? AND date >= NOW();";
		var query = "UPDATE booking " +
			"INNER JOIN restaurant ON restaurant.restaurant_id=booking.restaurant_id "+
			"SET booking.start_time=? AND booking.date=? AND booking.guest_number=? " +
			"booking.additional_info=? "+
			"WHERE booking.booking_id=? AND booking.restaurant_id=? AND restaurant.account_id=? "+
			"AND booking.date >= NOW();";
		var inserts = [time, date, req.body.pax, req.body.additional_info, req.body.booking_id,
			req.session.restaurantid, req.session.userid];
		connection.query(query, inserts, function(err, results, fields) {
			if (err) {
				console.log(err);
				res.send();
			}
			connection.release();

			// Update guest info (name, phone)
			req.pool.getConnection(function(err, connection) {
				if (err) {
					res.send();
					throw err;
				}

				var query = "UPDATE guest "+
					"INNER JOIN booking ON booking.guest_id=guest.guest_id "+
					"INNER JOIN restaurant ON restaurant.restaurant_id=booking.restaurant_id "+
					"SET guest.name_first=? AND guest.name_last=? AND guest.phone_number=? "+
					"WHERE booking.booking_id=? AND booking.restaurant_id=? AND "+
					"restaurant.account_id=?;";
				var inserts = [req.body.name_first, req.body.name_last, req.body.phone_number,
					req.body.booking_id, req.session.restaurantid, req.session.userid];
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
	});
});

// Request: JSON object containing booking_id
// Response: nothing (200)
router.post('/deleteUserReservation', function (req, res, next) {
	if (req.session.manager === true) {
		res.sendStatus(403);
	}

	req.pool.getConnection(function(err, connection) {
		if (err) {
			res.send();
			throw err;
		}

		var query = "DELETE booking .* FROM booking "+
			"INNER JOIN restaurant ON restaurant.restaurant_id=booking.restaurant_id " +
			"WHERE booking.booking_id=? AND booking.restaurant_id=? restaurant.account_id=?;";
		var inserts = [req.body.booking_id, req.session.restaurantid, req.session.userid];
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

module.exports = router;
