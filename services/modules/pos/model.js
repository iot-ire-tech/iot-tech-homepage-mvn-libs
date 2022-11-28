/*
 " * To change this license header, choose License Headers in Project Properties.
 " * To change this template file, choose Tools | Templates
 " * and open the template in the editor.
 " */

var paymentMethod = "ePayment"


var total = 0
var itemCost = 0
var minSpend = 0

var modelPoSRsp = {}
var modelPoS = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "pos/booking"
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
		"size": {
			"width": 150,
			"height": 150
		},
		"keys": {
			"across": 5,
			"down": 10 	// After which scroll kicks in
		},
		"color": {
			"backgroud": "w3-white",
			"keys": "w3-white" 	// After which scroll kicks in
		},
		"visible": {
			"free": false,
			"complimentary": true,
			"specials": true
		},
		"defaults": {
			"sms": true,
			"email": false,
			"ePayment": true,
			"cash": false
		},
		"name": "",
		"visible": false,
		"tag": ""
	},
	"props": {
		"stock": {
			"manageOwn": true,
			"thresholds": {"high": .50, "med": .25, "low": .1}
		},
	},
	// Default settings till stock is enabled.
	"stockLevel": {
		"high": .50, "med": .25, "low": .1
	},
	"tillReceipt": {
		"chargeId": "",
		"bene": {
			"id": -1,
			"dbId": ""
		},
		"payee": {
			"id": -1,
			"dbId": ""
		},
		"hardCopy": false,
		"sms": false,
		"email": false,
		"item": -1,
		"cost": -1
	}

};

var modelEntityReceiptRsp = {}
var modelEntityReceipt = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "cash/card"
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		}
	},
	"receipt": "",
	"refunded": false,
	"timings": {
		"purchaseDate": {"$date": new Date().toISOString()},
		"refundDate": {"$date": ""}
	},
	// Entities Bought, Hired, Leased
	"fk": []
};




//# sourceURL=module_pos_model.js