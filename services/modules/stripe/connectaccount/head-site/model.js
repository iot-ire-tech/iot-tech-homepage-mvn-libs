/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var toc = false;
var tries = 0


var modelConnectAccountRsp = {}
var modelConnectAccount = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"visible": false,
		"tag": ""
	},
	"signupDate": {"$date": new Date().toISOString()},
	"terms": false,
	"account": {
		"username": "",
		"password": ""
	},
	"person": {
		"fname": "",
		"lname": ""
	},
	"company": {
		"accountId": "",
		"sector": "",
		"location": "IE",
		"name": "",
		"email": "",
		"phone": "",
		"website": ""
	},
	"bankAccount": {
		"location": "IE",
		"currency": "",
		"account_holder_name": "",
		"product_description": "",
		"account_number": "",
		"account_holder_type": ""
	},
	// US only for custom accounts
	"bankDebitCard": {
		"country": "",
		"account_holder_type": ""
	}
};

var modelClientRsp = {}
var modelClient = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"visible": false,
		"tag": ""
	},
	"status": "trail",
	"signupDate": {"$date": new Date().toISOString()},
	"sector": "",
	"company": "",
	"fname": "",
	"lname": "",
	"email": "",
	"phone": "",
	"password": "",
	"terms": false
};

var modelClientEntitlementsRsp = {}
var modelClientEntitlements = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"visible": false,
		"tag": ""
	},
// This is what the client gets when they sign up!!!
	"type": "default",
	"mode": {
		"runtime": "test",
		"key": "sk_test_PWxKayhQchfhGUlEaMT6DE8x"
	},
	"advertisments": {
		"enabled": true
	},
	"paymentsModel": {
		"enabled": true,
		"ccPaymentsEnabled": true,
		"coreAccountingPaymentsEnabled": true,
		"internalCreditPayment": true
	},
	"billingModel": {
		"enabled": true,
		"patron": true,
		"patronGroups": true,
		"entities": true,
		"splitPayment": true
	},
	"bookingModel": {
		"enabled": true,
		"maxBookingWindow": {
			"size": 1,
			"units": "months"
		}
	},
	"brandingModel": {
		"enabled": true,
		"targetAudience": false,
		"social": false,
		"vidWelecome": false,
		"publishDate": false
	}
};

// Default Offerings - Client X
var clientOfferings = {
	"mode": "test",
	"name": "sportsco",
	"advertisments": {
		"enabled": true
	},
	"paymentsModel": {
		"enabled": true, //
		// Patron can enable payment route, you as the client, will purchase the capability
		"ccPaymentsEnabled": true, // No topup, cost deduced from CC
		"coreAccountingPaymentsEnabled": true, // No topup, cost deduced from Bank Account
// Client has decided to top up there strip account, with Patrons CC
		"internalCreditPayment": true, // Prepaid Top up over the phone using top up UX
	},
// To bill or not to bill
	"billingModel": {
		"enabled": true, // Means no payment processing is run
		"patron": true,
		"patronGroups": true,
		"entities": true,
		"splitPayment": true // Payment Stream
	},
// Booking or just portal services
	"bookingModel": {
		"enabled": true, // Means no payment processing is run
		"splitPayment": true // Payment Stream
	},
	"branding": {
		"enabled": true,
		"targetAudience": false,
		"social": false,
		"vidWelecome": false,
		"publishDate": false
	}
}

