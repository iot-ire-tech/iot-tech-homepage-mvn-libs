/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function openCity(evt, cityName) {
	var i, x, tablinks;
	x = document.getElementsByClassName("city");
// Close
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	// Update Tab
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < x.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" w3-gray", "");
	}

	// Open
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " w3-gray";
}