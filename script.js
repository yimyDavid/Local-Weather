
$(document).ready(function () {
  //data to display the date;
  var days = ["Sunday","Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = new Date();
  var day = days[date.getDay()];
  //alert(day);
  var month = months[date.getMonth()];
 // alert(month);
  var theDate = day + " " + (date.getDate()) + ", " + month + " " + (date.getYear()+1900);
  $("#the-date").text(theDate);
  
 //variable to store values about the current location
  var currentTemp = 0;
  
 var myLocation = {};
 
  function getLocation(){
     //get location values using javascript.gp
     var countryName = geoplugin_countryName();
     var region = geoplugin_region();
     var city = geoplugin_city();
     var lat = geoplugin_latitude();
     var lon = geoplugin_longitude();
    
    myLocation.countryName = countryName;
    myLocation.city = city;
    myLocation.region = region;
    myLocation.lat = lat;
    myLocation.lon = lon;
    //api requires a key, sorry
     var weatherAPICall = "http://api.openweathermap.org/data/2.5/weather?" 
     weatherAPICall += "lat=" + myLocation.lat + "&lon=" + myLocation.lon + "&APPID=061f24cf3cde2f60644a8240302983f2&units=imperial";

  $.getJSON(weatherAPICall,function(info){
        $("#town").html(myLocation.city + " " + myLocation.region +", " + myLocation.countryName);
        $("#weather-icon").attr("src","http://openweathermap.org/img/w/"+ info.weather[0].icon + ".png");
         currentTemp = Math.floor(info.main.temp);
        $("#temp").text(Math.floor(info.main.temp));
        $("#humidity").text("Humidity: " + info.main.humidity + "%");
    
        $("#wind").text("Wind: " + info.wind.speed + " mph");
   
  }); 
  };
 
//get and fill in values
  getLocation();
  
  $( "#centi" ).click(function(e) {
    e.preventDefault();
    //couldn't get value with selectors so I 
    //use a global var for the current temperature.
    var centi = Math.floor((currentTemp-32)*(5/9));
    $("#temp").text(centi);
  });
  
  $( "#fare" ).click(function(e) {
    e.preventDefault();
    //No need to convert since I have it store as global.
     $("#temp").text(currentTemp);
  });
  
});

 
 