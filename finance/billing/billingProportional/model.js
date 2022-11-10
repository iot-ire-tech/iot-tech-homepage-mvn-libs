/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelPaymentSplitAmounts = {
	"exists": false,
	"dueAmount": 0,
	"clientAmountDue": 0,
	"patronAmountDue": 0
};

var modelPaymentSplitDefault = {
	"clientId": 0,
	"type": "member",
	"client": 95,
	"patron": 5
};
var modelPaymentSplitMoreCode = {
	"clientId": 0,
	"splits": [{
			"type": "member",
			"client": 95,
			"patron": 5
		}]
};
var modelPaymentSplit = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
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
	"split": {
		"name": "",
		"client": -1,
		"patron": -1
	}
};
var modelPaymentSplits = [];



modelPaymentObj = {
	"status": "[open, submitted, closed, rejected]",
	"amount": 10.00,
	"type": {
		"cc": false,
		"dd": false
	},
	"timings": {
		"date": "30th May",
		"time": "10:00am",
		"daily": true,
		"weekly": false,
		"monthly": false
	}
};

// Each time a payment is recieved, its noted, and bill status is updated to paid!!
// this is async
var modelPaymentHistory = {

};