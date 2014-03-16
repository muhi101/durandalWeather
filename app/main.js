// JavaScript Document
requirejs.config({
  paths: {
    'text': '../lib/require/text',
    'durandal':'../lib/durandal/js',
    'plugins' : '../lib/durandal/js/plugins',
    'transitions' : '../lib/durandal/js/transitions',
    'knockout': '../lib/knockout/knockout-2.3.0',
    'jquery': '../lib/jquery/jquery-1.9.1',
	 "async": "../lib/require/async"
    } 
});
 
define(function (require) {
   var system = require('durandal/system'),
       app = require('durandal/app'), 
	   ko = require('knockout');
 	
	
	ko.bindingHandlers.addressAutocomplete = {
	init: function (element, valueAccessor, allBindingsAccessor) {
		var value = valueAccessor(), allBindings = allBindingsAccessor();
	
		var options = { types: ['geocode'], componentRestrictions: {country: "uk"} };
		ko.utils.extend(options, allBindings.autocompleteOptions)
	
		var autocomplete = new google.maps.places.Autocomplete(element, options);
	
		google.maps.event.addListener(autocomplete, 'place_changed', function () {
			result = autocomplete.getPlace();
			value(result.formatted_address);
		});
	},
	update: function (element, valueAccessor, allBindingsAccessor) {
		ko.bindingHandlers.value.update(element, valueAccessor);
	}
	};
	
   system.debug(true);
 
   app.title = 'Weather appssss';
 
   app.configurePlugins({
     router:true,
     dialog: true
   });
 
   app.start().then(function() {
     app.setRoot('shell');
   });
});