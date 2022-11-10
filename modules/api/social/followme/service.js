/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// followme_mon  01:00_60__13:00_780__(sfsdf)
//



var mydb = "likeability"
var modelCreate = modelFollowMe
var modelItem = modelFollowMeItem
var modelQuery = modelFollowMeQuery

function followmeService( {accountId, productId, customerId}, followme) {

	var payload = {"accountId": accountId, "productId": productId, "customerId": customerId}

	var rsp = followmeServiceGet(payload)

	if (rsp === null) {
		var newRsp = followmeServiceCreate(payload, modelCreate, followme)
	} else {
		var newRsp = followmeServiceUpdate(rsp, followme)
	}

	return newRsp;
}

query: {
	function followmeServiceGet(query) {

		var rspNew = {
			"dataExists": false
		}

		var rsp = getDbRequestQuery(mydb, query)

		if (rsp.length === 1)
			return rsp[0];
		else
			return null;
	}

	function followmeServiceList(query) {
		var rsp = getDbRequestQuery(mydb, query)
		return rsp;
	}
}


Create: {
	function followmeServiceCreate(payload, modelCreate, followme) {

		modelCreate.accountId = payload.accountId;
		modelCreate.productId = payload.productId;
		modelCreate.customerId = payload.customerId;
		modelCreate.ts = getTs();
		modelCreate.items.push(followme)

		rsp = postDbRequest(mydb, modelCreate)

		return rsp;
	}

	function followmeServiceUpdate(rsp, followme) {

		rsp.items.push(followme)
		rsp = postDbRequest(mydb, rsp, rsp._id)

		return rsp;
	}
}


function followmeServiceDelete() {

}

//# sourceURL=api_social_followme_service.js