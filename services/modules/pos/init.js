/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var srvEntity = new EntityX(bs.entityCtrl, "Life Cycle Entity");
var qAllEntitiesAsset = srvEntity.queryByType("Q. List all items type(resource)?");
var uxAllEntitiesAssets = {
	"data": qAllEntitiesAsset, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var qAllEntitiesEvent = srvEntity.queryByType("Q. List all items type(event)?");
var uxAllEntitiesEvents = {
	"data": qAllEntitiesEvent, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var qAllEntitiesActivities = srvEntity.queryByType("Q. List all items type(subEvent)?");
var uxAllEntitiesActivities = {
	"data": qAllEntitiesActivities, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};

// Associate Services
var srv = new Patron(bs.patronCtrl, "Life Cycle Patron Tests");
var qAllPatrons = srv.queryByType("Q. List all?");
var uxAllPatronsCashier = {
	"data": qAllPatrons, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "cashier", "provider": "semantic"
};
var uxAllPatronsPayee = {
	"data": qAllPatrons, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "payee", "provider": "semantic"
};

var srvCardDevice = new CardPayment(bs.cardTopUpCtrl, "INIT: Card Services");
var srvPatron = new Patron(bs.patronCtrl, "INIT: Patron Details");
var srvPosReciept = new PosReciept(bs.posRecieptCtrl, "INIT: Pos Receipt");

$(document).ready(function () {

// Load Homepage
	$("#todaysDate").html(new Date().toLocaleDateString() + " / " + new Date().toLocaleTimeString());
	$("#targetAssets").html(buildRegister(qAllEntitiesAsset));
	$("#targetEvents").html(buildRegister(qAllEntitiesEvent));
	$("#targetActivities").html(buildRegister(qAllEntitiesActivities));

// Load Registered Users
	var intervalId = setTimeout(function () {
		clearTimeout(intervalId);
		loadPatrons()
	}, 1000);


	loadCamera()

	modelContext = modelEntityReceipt;
	srvContext = srvPosReciept;

	// read runtime config


});

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


//# sourceURL=module_shop_init.js