/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsSmsService = {
	mydb: "smsmgt",
	modelCreate: {
		"accountId": "",
		"productId": "",
		"shippable": false,
		"ts": getTs(),
		// Service
		"alerting": {
			"active": false,
			"email": "",
			"sms": ""
		},
		// Cost Of Service
		"item": []
	},
	modelItem: {
		"grade": "",
		"cost": 0.00,
		"annotate": ""
	},
	modelQuery: {
		"accountId": "",
		"productId": "",
		"shippable": false
	},
	modelQueryList: {
		"accountId": ""
	},
	// Create or Update
	service: function (modelSmsMgt) {

		var payload = modelSmsMgt;

		var rsp = this.serviceGet(payload)[0]

		if (rsp === undefined) {
			var newRsp = this.serviceCreate(payload)
		} else {
			var newRsp = this.serviceUpdate(rsp, payload)
		}

		return newRsp;
	}
	,
	serviceGet: function () {
		var rsp = getDbRequestQuery(this.mydb, this.modelQuery)
		return rsp;
	}
	,
	serviceList: function () {
		var rsp = getDbRequestQuery(this.mydb, this.modelQueryList)
		return rsp;
	}
	,
	serviceCreate: function () {
		var rsp = postDbRequest(this.mydb, this.modelCreate)

		return rsp;
	}
	,
	serviceUpdate: function (rsp) {
		rsp = postDbRequest(this.mydb, rsp, rsp._id)

		return rsp;
	}
	,
	serviceDelete: function () {

	}

}
//# sourceURL=api_sms_service.js