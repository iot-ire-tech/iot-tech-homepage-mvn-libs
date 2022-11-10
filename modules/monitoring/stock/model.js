/*
 " * To change this license header, choose License Headers in Project Properties.
 " * To change this template file, choose Tools | Templates
 " * and open the template in the editor.
 " */
var modelStockControlRsp = {}
var modelStockRule = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "stock"
	},
//	Entities that have left the building
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
//Form Data
	"name": "",
	"rule": {
		"high": .50,
		"low": .1,
		// As a percentage
		// https://stackoverflow.com/questions/4672652/get-the-percent-of-time-elapsed-between-two-javascript-dates
		"expiry": .1,
		"activate": false,
	},
	"action": {
		"sms": false,
		"email": false,
		"notes": ""
	}
};
var fkRule = []
var fkEntity = []
var modelStockItem = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "monitoredEntity"
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
//Form Data
//	Two FK, one referencing rule, and one ref entity
	"fk": [],
};
//# sourceURL=module_stock_model.js