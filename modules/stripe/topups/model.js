/*
 " * To change this license header, choose License Headers in Project Properties.
 " * To change this template file, choose Tools | Templates
 " * and open the template in the editor.
 " */

var modelTopRsp = {}
var modelTopUp = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "stock"
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
	"timing": {"$date": new Date().toISOString()},
	"topUp": ""
};
//# sourceURL=module_topup_model.js