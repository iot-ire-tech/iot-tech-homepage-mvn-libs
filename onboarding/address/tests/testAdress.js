/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

try {
	//console.clear()

// Test Data
// Test Case
	var address = {
		"fk": {
			"type": "address",
			"id": -1
		},
		"id": -1,
		"clientId": -1,
		"patronId": -1,
		"street": "",
		"number": "",
		"town": "",
		"city": "",
		"country": "",
//		Service UX
		"name": ""
	};
	address.fk.id = getRand();
	address.fk.type = "home";
	address.id = getRand();
	address.clientId = getRand();
	address.patronId = getRand();
	//console.log("INF: Address Id : %s", address.fk.id);

	address.street = "street";
	address.number = "number";
	address.town = "town";
	address.city = "home";
	address.country = "country";

// New Address!!
	var addressObj = new Address(address, bs.patronAccountCtrl, "Home Address - Ireland!");
//	var response = addressObj.add();

// Update Address!!
//	var modId = response._id.$oid;
	delete address._id;
	address.number = "19";
	addressObj.setPayload(address);
//	var response = addressObj.mod(modId);

// Query Modified#1!!!
	addressObj.setPayload("{\"clientId\":" + address.clientId + "}");
//	response = addressObj.query();

// Query Modified#2!!!
//	addressObj.setPayload("{\"fk\" : { \"id\":" + modId + "}}");
	addressObj.setPayload("{\"fk.id\" :" + address.fk.id + "}");
//	response = addressObj.query();

// Query Modified#3!!! -fails
	addressObj.setPayload("{\"fk\" : { \"id\":" + address.fk.id + "}}");
//	response = addressObj.query();


// Load UX !!!

	$(document).ready(function () {

		var url = location.origin + contextPath + "/services/onboarding/address/ux/address.html";
//		url = "http://localhost:8084/iot-base/services/authentication/ux/authenticate.html";
		new PageLoad(url, "addressTarget", "n/a").put();
//		or
//		$("#addressTarget").load("../ux/address.html");

	});
	throw "End Of Test";


} catch (exception) {
//	//console.error("INF: Msg : %s", exception.message)
//	//console.error("INF: stack : %s", exception.stack)

}

