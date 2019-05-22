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

var restaurantInfo = new Vue({
	el: '#restaurantInfo',
	data: {
		restaurantManagerName: 'manager name',
		name: '',
		address: '',
		mondayopening: [],
		description: '',
		cuisines: [
        "All cuisines",
        "Italian",
        "Mexican",
        "Japanese",
        "Steakhouse",
        "Indian",
        "Vietnamese",
        "Australian",
        "Filipino",
        "Chinese",
        "Malay",
        "Polish",
        "Pakistani",
        "Korean"
		],
		cost: '',
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
		availableSeats: 20,
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
	}
});
