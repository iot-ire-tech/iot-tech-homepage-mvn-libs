/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// likeMe_mon  01:00_60__13:00_780__(sfsdf)
//

// init file
//var uxShoppingCartWidgetListing = new uxShoppingCartWidgetListing();
//var uxShoppingCartWidget = new uxShoppingCartWidget();
var mydb = "likeMemodel"
var modelCreate = modelLikeMe
var modelQuery = modelLikeMe

function likeMeService( {accountId, productId, customerId}, likeMe) {

	var payload = {"accountId": accountId, "productId": productId, "customerId": customerId}

	var rsp = likeMeServiceGet(payload)

	if (rsp === null) {
		var newRsp = likeMeServiceCreate(payload, modelCreate, likeMe)
	} else {
		var newRsp = likeMeServiceUpdate(rsp, likeMe)
	}

	return newRsp;
}

query: {
	function likeMeServiceGet(query) {

		var rspNew = {
			"dataExists": false
		}

		var rsp = getDbRequestQuery(mydb, query)

		if (rsp.length === 1)
			return rsp[0];
		else
			return null;
	}

	function likeMeServiceList(query) {
		var rsp = getDbRequestQuery(mydb, query)
		return rsp;
	}
}


Create: {
	function likeMeServiceCreate(payload, modelCreate, likeMe) {

		modelCreate.accountId = payload.accountId;
		modelCreate.productId = payload.productId;
		modelCreate.customerId = payload.customerId;
		modelCreate.ts = getTs();
		modelCreate.items.push(likeMe)

		rsp = postDbRequest(mydb, modelCreate)

		return rsp;
	}

	function likeMeServiceUpdate(rsp, likeMe) {

		rsp.items.push(likeMe)
		rsp = postDbRequest(mydb, rsp, rsp._id)

		return rsp;
	}
}


function likeMeServiceDelete() {

}

//# sourceURL=api_likeMe_service.js