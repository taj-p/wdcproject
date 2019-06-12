function fillManagerPage() {
	// Create new AJAX request
	var xhttp = new XMLHttpRequest();

	// Handle response
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			managerInst.restaurants = JSON.parse(xhttp.response);
		} else if (this.readyState == 4 && this.status == 403) {
			managerInst.validUser = false;
		}
	};

	// Open connection
	xhttp.open("GET", "/users/manager.json", true);

	// Send request
	xhttp.send();
};



var managerInst = new Vue({
	el: '#manager',
	data: {
		restaurants: [],
		validUser: true
	},
	methods: {
		selectRestaurant: function (selected) {
			// Create new AJAX request
			var xhttp = new XMLHttpRequest();

			// Handle response
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// do nothing
				}
			};

			// Open connection
			xhttp.open("POST", "/users/selectRest", true);

			// Set content type to JSON
		  	xhttp.setRequestHeader("Content-type", "application/json");

		  	// Send request
		  	xhttp.send(JSON.stringify({ restaurantid: selected.restaurant_id }));
		}
	},
	mounted: function() {
		fillManagerPage();
	}
});