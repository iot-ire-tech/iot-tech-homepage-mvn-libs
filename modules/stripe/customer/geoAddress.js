/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;


function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(document.getElementById('pac-input'), {types: ['geocode']});
	autocomplete.setFields(['address_component', 'geometry']);

	// When the user selects an address from the drop-down, populate the // address fields in the form.
	autocomplete.addListener('place_changed', fillInAddress);
}
var lat = "", lng = ""
function fillInAddress() {
	// Get the place details from the autocomplete object.
	var place = autocomplete.getPlace();
	lat = place.geometry.location.lat()
	lng = place.geometry.location.lng()
	// https://developers.google.com/maps/documentation/embed/guide#optional_parameters
	url = "https://www.google.com/maps/embed/v1/streetview"
	url += "?key=AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig"
	url += "&location=" + lat + "," + lng

	$("iframe").attr("src", url)

	$("#address1").val(place.address_components[0].long_name).change()
	$("#address2").val(place.address_components[1].long_name).change()
	$("#town").val(place.address_components[2].long_name).change()
	$("#city").val(place.address_components[3].long_name).change()
	$("#country").val(place.address_components[4].long_name).change()
	$("#zip").val(place.address_components[5].long_name).change()
	$("#lng").val(lng).change()
	$("#lat").val(lat).change()
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var geolocation = {lat: position.coords.latitude, lng: position.coords.longitude};
			var circle = new google.maps.Circle({center: geolocation, radius: position.coords.accuracy});
			autocomplete.setBounds(circle.getBounds());
		});
	}
}

//# sourceURL=customer_geo.js