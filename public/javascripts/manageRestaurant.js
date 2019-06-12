function setOpeningFormat() {
    $('.business-hours-input').timepicker({
      timeFormat: 'h:mmp',
      interval: 30,
      minTime: '0',
      maxTime: '23',
      defaultTime: '7',
      startTime: '9:00',

      dynamic: false,
      dropdown: true,
      scrollbar: true
	});
}

function setDatePicker() {
    $('.reservation-date').datepicker({
		format: 'dd mmm yyyy',
		icons: {
            rightIcon: '<i class="material-icons">date_range</i>'
        },
        showOnFocus: true,
        footer: true,
        modal: true,
        header: true,
        // Default value
        value: '01 Jan 2018'
	});
}

$(document).ready(function(){
	setOpeningFormat();
	setDatePicker();
});

$(document).on("click", ".addOpenings", function () {
     setOpeningFormat();
});

$(document).on("click", "#restaurantInfoSelected", function () {
     setOpeningFormat();
});

$(document).on("click", "#manageReservationSelected", function () {
     setDatePicker();
});

// Name (string), address (string), description (string), cusines (array of string)
// Cost (string), openings (JSON object with day, and count),
// reservations(JSON object with date, start/end time, seatsAvailable, newReservation (T/F), name, notes, 
// people, duration, phone),
// var restaurantInfo = [
// 	{name: '', address: '', description: ' ', cuisines: [], cost: '', openings: [], timeSlots: [],
// 		reservations:[]}
// ];

function checkValidUser() {
	// Create new AJAX request
	var xhttp = new XMLHttpRequest();

	// Handle response
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			restaurantInfo.validUser = true;
		} else if (this.readyState == 4 && this.status == 403) {
			restaurantInfo.validUser = false;
		}
	};

	// Open connection
	xhttp.open("GET", "/users/manager.json", true);

	// Send request
	xhttp.send();
};

function getCuisines() {
	// Create new AJAX request
	var xhttp = new XMLHttpRequest();

	// Handle response
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			restaurantInfo.cuisineList = JSON.parse(this.responseText);
		}
	};

	// Open connection
	xhttp.open("GET", "/cuisines.txt", true);

	// Send request
	xhttp.send();
};

function getDietOptions() {
	// Create new AJAX request
	var xhttp = new XMLHttpRequest();

	// Handle response
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			restaurantInfo.dietList = JSON.parse(this.responseText);
		}
	};

	// Open connection
	xhttp.open("GET", "/diet_options.txt", true);

	// Send request
	xhttp.send();
};


function fillRestaurantInfo() {
	// Create new AJAX request
	var xhttp = new XMLHttpRequest();

	// Handle response
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var results = JSON.parse(this.responseText);
			restaurantInfo.name = results[0].name;
			// Address
			var add = JSON.parse(results[0].address);
			restaurantInfo.address = add.street;
			restaurantInfo.suburb = add.suburb;
			restaurantInfo.state = add.state;
			restaurantInfo.postal_code = add.postal_code;
			restaurantInfo.description = results[0].description;
			restaurantInfo.cost = results[0].cost;
			restaurantInfo.initialCost = restaurantInfo.cost;
			var cuisines = JSON.parse(results[0].cuisine);
			for (var k in cuisines) {
				if (cuisines[k] == true) {
					restaurantInfo.selectedCuisine.push(k);
				}
			}
			restaurantInfo.selectedCuisine = restaurantInfo.selectedCuisine[0];
			restaurantInfo.phone = results[0].phone;
			restaurantInfo.availableSeats = results[0].capacity;
			var diets = JSON.parse(results[0].diet_options);
			restaurantInfo.originalDiets = diets;
			for (var k in diets) {
				if (diets[k] == true) {
					restaurantInfo.selectedDiets.push(k);
				}
			}
			restaurantInfo.originalReviewCounts = results[0].review_count;
		}
	};

	// Open connection
	xhttp.open("GET", "/users/restInfo.json", true);

	// Send request
	xhttp.send();
};


function updateRestaurantInfo() {
	// Create new AJAX request
	var xhttp = new XMLHttpRequest();

	// Handle response
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Update successful");
		}
	};

	// Open connection
	xhttp.open("POST", "/users/updateRestInfo", true);

	// Set content type to JSON
  	xhttp.setRequestHeader("Content-type", "application/json");


  	var jsonCuisine = {};
  	jsonCuisine[restaurantInfo.selectedCuisine] = true;

  	// Send request
  	xhttp.send(JSON.stringify({ 
  		name: restaurantInfo.name,
  		address: JSON.stringify({street: restaurantInfo.address, suburb: restaurantInfo.suburb,
  				state: restaurantInfo.state, postal_code: restaurantInfo.postal_code}),
  		phone: restaurantInfo.phone,
  		capacity: restaurantInfo.availableSeats,
  		description: restaurantInfo.description,
  		cost: restaurantInfo.cost,
  		diet_options: JSON.stringify(restaurantInfo.originalDiets),
  		cuisine: JSON.stringify(jsonCuisine),
  		review_counts: restaurantInfo.originalReviewCounts
  	}));
};

var restaurantInfo = new Vue({
	el: '#restaurantInfo',
	data: {
		validUser: false,
		name: '',
		address: '',
		suburb: '',
		state: '',
		postal_code: '',
		description: '',
		cuisineList: [],
		selectedCuisine: [],
		dietList: [],
		originalDiets: '',
		selectedDiets: [],
		initialCost: '',
		cost: '',
		phone: '',
		originalReviewCounts: '',
		openings: [
			{day: "Monday", 	count:1},
			{day: "Tuesday", 	count:1},
			{day: "Wednesday", 	count:1},
			{day: "Thursday", 	count:1},
			{day: "Friday", 	count:1},
			{day: "Saturday", 	count:1},
			{day: "Sunday", 	count:1},
		],
		restaurantInfo: true,
		manageReservation: false,
		nReservations: 5,
		nGuests: 20,
		availableSeats: '',
		timeSlots: [
			{min: "0", 	max: "3", 		duration: 2},
			{min: "4", 	max: "7", 		duration: 2.5},
			{min: "8", 	max: "10+", 	duration: 3}
		],
		reservations: [
			{start:"09:00am", end:"06:00pm",	seatsAvailable:20, newReservation:false,	name: "",	notes: "", people: "", duration:"", phone:""},
			{start:"06:00pm", end:"",	seatsAvailable:16, newReservation:true,	name:"John", notes:"", people: "4", duration:"2.5", phone:"0490 109 312"},
			{start:"06:15pm", end:"",	seatsAvailable:14, newReservation:true,	name:"Sam",	notes:"", people: "2", duration:"2", phone:"0412 324 123"},
			{start:"06:30pm", end:"07:15pm",	seatsAvailable:14, newReservation:false,	name: "",	notes: "", people: "", duration:"", phone:""},
			{start:"07:15pm", end:"",	seatsAvailable:6, newReservation:true,	name:"Frodo",	notes:"", people: "8", duration:"3", phone:"0409 876 543"},
			{start:"07:30pm", end:"",	seatsAvailable:4, newReservation:true,	name:"Tammy",	notes:"Vegeterian", people: "2", duration:"2", phone:"0487 654 321"},
			{start:"08:45pm", end:"",	seatsAvailable:0, newReservation:true,	name:"Aca",	notes:"Birthday party", people: "4", duration:"2.5", phone:"0411 111 111"},
			{start:"09:00pm", end:"09:15pm",	seatsAvailable:0, newReservation:false,	name: "",	notes: "", people: "", duration:"", phone:""},
			{start:"09:30pm", end:"00:30pm",	seatsAvailable:2, newReservation:false,	name: "",	notes: "", people: "", duration:"", phone:""}
		],
		stopOnline: false
	},
	mounted: function() {
		checkValidUser();
		getDietOptions();
		getCuisines();
		fillRestaurantInfo();
	},
	methods: {
		selectDietContains: function(d) {
			for (var i = 0; i < this.dietList.length; i++) {
				if (d == this.selectedDiets[i]) {
					return true;
				}
			}
			return false;
		}
	}
});
