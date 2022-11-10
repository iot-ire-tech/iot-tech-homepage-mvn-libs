/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Quick Registration
var modelCardRegistrationRsp = {}
var modelCardRegistrationQuick = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "user" // If group then dont use patronId
	},
	"fk": {
		"id": -1, // Team MemberShip
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
	"name": "",
	"number": "",
	"csv": "",
	"expYear": "",
	"expMonth": "",
	"email": "",
	"customerId": ""
};

var modelCardRegistrationFull = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "user" // If group then dont use patronId
	},
	"fk": {
		"id": -1, // Team MemberShip
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
	"name": "",
	"number": "",
	"csv": "",
	"expYear": "",
	"expMonth": "",

	"email": "",
	"adddress1": "",
	"adddress2": "",
	"city": "",
	"state": "",
	"zip": "",
	"country": "",
	"customerId": ""
};