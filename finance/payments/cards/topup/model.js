/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Payments associated with Cards
var modelCardPayment = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "user" // If group then dont use patronId
	},
	"fk": {
		"id": -1, // Card Registration Reference
		"dbId": "single!",
		"type": ""
	},
	"timings": {
		"ts": {
			"$date": new Date().toISOString()
		}
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"tag": ""
	},
	"patronId": "",
	"customerId": "",
	"email": "",
	"amount": ""
};
var modelCardRefund = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "user" // If group then dont use patronId
	},
	"fk": {
		"id": -1, // Card Registration Reference
		"dbId": "single!",
		"type": ""
	},
	"timings": {
		"ts": {
			"$date": new Date().toISOString()
		}
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"tag": ""
	},
	"patronId": "",
	"customerId": "",
	"email": "",
	"amount": ""
};
