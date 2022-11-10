/* 
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */




function w3_open() {
	document.getElementById("main").style.marginLeft = "25%";
	document.getElementById("mySidebar").style.width = "25%";
	document.getElementById("mySidebar").style.display = "block";
	document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
	document.getElementById("main").style.marginLeft = "0%";
	document.getElementById("mySidebar").style.display = "none";
	document.getElementById("openNav").style.display = "inline-block";
}


function openCityBooking(cityName) {
	var i;
	var x = document.getElementsByClassName("city");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	document.getElementById(cityName).style.display = "block";
}


function openCity(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}
