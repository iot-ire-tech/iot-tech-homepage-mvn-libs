/*
 " * To change this license header, choose License Headers in Project Properties.
 " * To change this template file, choose Tools | Templates
 " * and open the template in the editor.
 " */

var chargeId = "", reason = "";
var modelRefundRsp = {}
var modelRefund = {
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
	"refundDate": {"$date": new Date().toISOString()},
	"refund": ""
};
//# sourceURL=module_refunds_model.js