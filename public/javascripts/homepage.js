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

