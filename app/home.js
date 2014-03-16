// JavaScript Document
define(['async!http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false'],function (placemaker) {
  	var app = require('durandal/app'),
      ko = require('knockout');
 	var startUrl = "http://api.openweathermap.org/data/2.5/weather?q=" ;  // The base URI to access the Openweather API
 	var fullUrl; // stores the complete URI to request the openweather API data with the city required included
 	var baseIconUrl =  "http://openweathermap.org/img/w/" // base URL for the graphic icon for weather condition
 	var iconName;
	// Declare observables 
	var cityName = ko.observable("");
	var cityLat = ko.observable("");
	var cityLon = ko.observable("");
	var cityDescription = ko.observable("");
	var cityIcon = ko.observable("");
	var cityHumidity = ko.observable("");
	var cityTemparate = ko.observable("");
	var cityTemp_min = ko.observable("");
	var cityTemp_max = ko.observable("");
	var cityPressure = ko.observable("");
	
	
	/*** function to retreive weather data ***/
  	var getWeather = function(fullUrl){
	  	var weatherAPI = fullUrl;
	  
		$.ajax({url:weatherAPI,dataType:"jsonp"})
		.done(function(object){
			//console.log(JSON.stringify(object));
			// no weather found for location
			if(object.message === "Error: Not found city"){
				var errorMsg = 'City not found';
				renderErrorMsg(errorMsg);
			}
			else{
				///call function to display weather data received 
				renderWeather(object);
			}
		})
	   .fail(function(){
			var errorMsg = 'Error retrieving City weather';
			renderErrorMsg(errorMsg);
	   });
	};
	
	/*** function to display updated weather data ***/
  	var renderWeather = function(object){
		$("#weatherBox").show();
		iconUrl = object.weather[0].icon;
		iconName = baseIconUrl + iconUrl; // url for weather condition icon
		//setup variable to store template values
		var wObj = 	{'cityName': object.name, 'cityLat': object.coord.lat, 'cityLon': object.coord.lon, 
					'cityDescription': object.weather[0].description, 'cityIcon': iconName, 'cityHumidity': object.main.humidity, 'cityTemparate': object.main.temp,
					'cityTemp_min':object.main.temp_min, 'cityTemp_max':object.main.temp_max, 'cityPressure': object.main.pressure
					}
		console.log(JSON.stringify(wObj));
		// data bind elements with new value
		cityName(wObj.cityName);
		cityLat(wObj.cityLat);
		cityLon(wObj.cityLon);
		cityDescription(wObj.cityDescription);
		cityIcon(wObj.cityIcon);
		cityHumidity(wObj.cityHumidity);
		cityTemparate(wObj.cityTemparate);
		cityTemp_min(wObj.cityTemp_min);
		cityTemp_max(wObj.cityTemp_max);
		cityPressure(wObj.cityPressure);
  	};

	/*** function to handle error messages ***/
	var renderErrorMsg = function(errorMsg){
		app.showMessage(_errorMsg);
  	};
  
  
  
  	return {
	 cityName:cityName,
	 cityLat:cityLat,
	 cityLon:cityLon,
	 cityDescription:cityDescription,
	 cityIcon:cityIcon,
	 cityHumidity:cityHumidity,
	 cityTemparate:cityTemparate,
	 cityTemp_min:cityTemp_min,
	 cityTemp_max:cityTemp_max,
	 cityPressure:cityPressure,
     name: ko.observable(),
	 Address: ko.observable(),
	 setLocation: function(){
		this.Address.subscribe(function(cityChosen) {
			try{
					fullUrl = startUrl + encodeURIComponent(cityChosen) ;
					this.getWeather(fullUrl); // call function to retreive weather details passing fullurl address
			}
			catch(err) {
				var errorMsg = 'City input autocomplete suggestion not working';
				renderErrorMsg(errorMsg);
			}
		}.bind(this));
	 },
	 getWeather:getWeather,
	 renderWeather:renderWeather,
	 renderErrorMsg:renderErrorMsg
   	};
});