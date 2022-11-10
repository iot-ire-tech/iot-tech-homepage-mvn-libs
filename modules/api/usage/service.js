/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// usage_mon  01:00_60__13:00_780__(sfsdf)
//

var nsUsageData = {

}



var nsUsageService = {
	mydb: "usagemodel",
	modelCreate: "",
	modelQuery: "",
	// Create or Update
	usageService: function (usage) {

		var payload = usage;

		var rsp = this.usageServiceGet(payload)

		if (rsp === undefined) {
			var newRsp = this.usageServiceCreate(payload, usage)
		} else {
			var newRsp = this.usageServiceUpdate(rsp, usage)
		}

		return newRsp;
	}
	,
	usageServiceGet: function (payload) {
		var query = {
			"accountId": payload.accountId,
			"customerId": payload.customerId
		}
		var rsp = getDbRequestQuery(this.mydb, query)[0]

		return rsp;
	}
	,
	usageServiceList: function (payload) {
		var query = {
			"accountId": payload.accountId
		}
		var rsp = getDbRequestQuery(this.mydb, query)
		return rsp;
	}
	,
	usageServiceCreate: function (payload) {


		rsp = postDbRequest(this.mydb, payload)

		return rsp;
	}
	,
	usageServiceUpdate: function (rsp, usage) {

		rsp.items.push(usage)
		rsp = postDbRequest(this.mydb, rsp, rsp._id)

		return rsp;
	}
	,
	usageServiceDelete: function () {

	}

}
//# sourceURL=api_usage_service.js