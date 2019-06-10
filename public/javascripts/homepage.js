// Below function commented out - to be usd to retrieve featured restaurants from server
//function FeaturedRestaurants(id) {
//
//  var xhttp = new XMLHttpRequest();
//
//  xhttp.onreadystatechange = function() {
//    if (this.readyState == 4 & this.status == 200) {
//        return JSON.parse(this.responseText);
//    }
//  };
//
//  xhttp.open("GET", "/featuredRestaurants?id=" + id, true);
//  xhttp.send();
//}
function login() {
  // Create new AJAX request
  var xhttp = new XMLHttpRequest();

  // Handle response
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {


    alert("Success");

	  document.getElementById("signUp").style.display = "none"; 
	  document.getElementById("signIn").style.display = "none";
	  $('#signInModal').modal('hide');
	  document.getElementById("account").style.display = "block";
    document.getElementById("email-setting").innerHTML = "<b>Email: </b>"+document.getElementById('email-signIn').value;



    } else if (this.readyState == 4 && this.status == 403){
      alert("E-mail / password incorrect");
    }
  };

  // Open connection
  xhttp.open("POST", "/login", true);

  // Send request
  // Set content type to JSON
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.send(
    JSON.stringify({
      email: document.getElementById('email-signIn').value,
      pass: document.getElementById('psw-signIn').value
    })
  );
};

function signUp() {
  // Check if password matches
  var email = document.getElementById('email-signUp').value;
  var pass = document.getElementById('psw-signUp').value;
  var pass_repeated = document.getElementById('psw-signUp-repeat').value;
  var account_selected= document.querySelectorAll('input[name="account-type"]:checked').length;

  if ((email != '') && (pass != '') && (pass_repeated != '') && (account_selected > 0)) {
    if (pass != pass_repeated) {
      alert("Passwords don't match");
    } else {
      alert("Success!");
      var is_manager = false;
      if (document.querySelector('input[name="account-type"]:checked').value === "manager") {
        is_manager = true;
      }

      // Create new AJAX request
      var xhttp = new XMLHttpRequest();

      // Handle response
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          alert("Success");

        }
      };

      // Open connection
      xhttp.open("POST", "/signUp", true);

      // Set content type to JSON
      xhttp.setRequestHeader("Content-type", "application/json");

      // Send request
      xhttp.send(JSON.stringify({ email: email, pass: pass, manager: is_manager }));
    }
  }
};

// To retrieve profile information for a user, use the getBasicProfile() method.
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.getElementById("signUp").style.display = "none"; 
    document.getElementById("signIn").style.display = "none";
    $('#signInModal').modal('hide');
    document.getElementById("account").style.display = "block";
    document.getElementById("email-setting").innerHTML = "<b>Email: </b>"+ profile.getEmail();
}


function logout()
{
    document.getElementById("signUp").style.display = "block"; 
    document.getElementById("signIn").style.display = "block";
    document.getElementById("account").style.display = "none";  
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    }); 
}


function settings() {
  // Create new AJAX request
  var xhttp = new XMLHttpRequest();

  // Handle response
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    alert("Success");
    document.getElementById("setEmail").style.display = "none";
    document.getElementById("setPsw").style.display = "none";
    }
  };

  // Open connection
  xhttp.open("POST", "/settings", true);

  // Send request
  // Set content type to JSON
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.send(
    JSON.stringify({
      email: document.getElementById('change-email-signIn').value,
      pass: document.getElementById('newPsw').value
    })
  );
};




const FEATUREDRESTAURANTS = [[{id: 1, img: "images/featuredRestaurants/1.jpg",  title: "Parisis"},
                              {id: 2, img: "images/featuredRestaurants/2.jpg",  title: "Raj on Taj"},
                              {id: 3, img: "images/featuredRestaurants/3.jpg",  title: "Vinos"},
                              {id: 4, img: "images/featuredRestaurants/4.jpg",  title: "Winos"}],
                             [{id: 1, img: "images/featuredRestaurants/5.jpg",  title: "McDonalds"},
                              {id: 2, img: "images/featuredRestaurants/6.jpg",  title: "KFC"},
                              {id: 3, img: "images/featuredRestaurants/7.jpg",  title: "Nandos"},
                              {id: 4, img: "images/featuredRestaurants/8.jpg",  title: "McPhresh"}],
                             [{id: 1, img: "images/featuredRestaurants/9.jpg",  title: "Daenerys & Co"},
                              {id: 2, img: "images/featuredRestaurants/10.jpg", title: "Jon & Co"},
                              {id: 3, img: "images/featuredRestaurants/11.jpg", title: "Bran & Co"},
                              {id: 4, img: "images/featuredRestaurants/12.jpg", title: "Ned & Co"}],
                             [{id: 1, img: "images/featuredRestaurants/13.jpg", title: "Winerinos"},
                              {id: 2, img: "images/featuredRestaurants/14.jpg", title: "Dinerinos"},
                              {id: 3, img: "images/featuredRestaurants/15.jpg", title: "Thingerino"},
                              {id: 4, img: "images/featuredRestaurants/16.jpg", title: "Workshoperino"}]];


var vueinst = new Vue({
    el: "#mainVue",
    data: {
      featuredRestaurant1: FEATUREDRESTAURANTS[0],
      featuredRestaurant2: FEATUREDRESTAURANTS[1],
      featuredRestaurant3: FEATUREDRESTAURANTS[2],
      featuredRestaurant4: FEATUREDRESTAURANTS[3]
    }
});

