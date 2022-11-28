/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// share_mon  01:00_60__13:00_780__(sfsdf)
//

// init file
//var uxShoppingCartWidgetListing = new uxShoppingCartWidgetListing();
//var uxShoppingCartWidget = new uxShoppingCartWidget();
var mydb = "sharemodel"
var modelCreate = modelShare
var modelQuery = modelShareQuery

function shareService( {accountId, productId, customerId}, share) {

	var payload = {"accountId": accountId, "productId": productId, "customerId": customerId}

	var rsp = shareServiceGet(payload)

	if (rsp === null) {
		var newRsp = shareServiceCreate(payload, modelCreate, share)
	} else {
		var newRsp = shareServiceUpdate(rsp, share)
	}

	return newRsp;
}

query: {
	function shareServiceGet(query) {

		var rspNew = {
			"dataExists": false
		}

		var rsp = getDbRequestQuery(mydb, query)

		if (rsp.length === 1)
			return rsp[0];
		else
			return null;
	}

	function shareServiceList(query) {
		var rsp = getDbRequestQuery(mydb, query)
		return rsp;
	}
}


Create: {
	function shareServiceCreate(payload, modelCreate, share) {

		modelCreate.accountId = payload.accountId;
		modelCreate.productId = payload.productId;
		modelCreate.customerId = payload.customerId;
		modelCreate.ts = getTs();
		modelCreate.items.push(share)

		rsp = postDbRequest(mydb, modelCreate)

		return rsp;
	}

	function shareServiceUpdate(rsp, share) {

		rsp.items.push(share)
		rsp = postDbRequest(mydb, rsp, rsp._id)

		return rsp;
	}
}


function shareServiceDelete() {

}

//# sourceURL=api_share_service.js