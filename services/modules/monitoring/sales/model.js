/*
 " * To change this license header, choose License Headers in Project Properties.
 " * To change this template file, choose Tools | Templates
 " * and open the template in the editor.
 " */

var modelSalesRuleRsp = {}
var modelSalesRule = {
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

	"name": "",
	"alerts": {
		"sms": false,
		"email": false,
		"thresholds": {
			"money": "high",
			"weight": "high",
			"selfLife": "low",
			"Delicacy": "low",
			"DeliveryLeadTime": "high"
		}
	},
	"notes": ""
};
//# sourceURL=module_sales_model.js