/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// contactMe_mon  01:00_60__13:00_780__(sfsdf)
//

// init file
//var uxShoppingCartWidgetListing = new uxShoppingCartWidgetListing();
//var uxShoppingCartWidget = new uxShoppingCartWidget();
var mydb = "contactMemodel"
var modelCreate = modelContactMe
var modelQuery = modelContactMe

function contactMeService( {accountId, productId, customerId}, contactMe) {

	var payload = {"accountId": accountId, "productId": productId, "customerId": customerId}

	var rsp = contactMeServiceGet(payload)

	if (rsp === null) {
		var newRsp = contactMeServiceCreate(payload, modelCreate, contactMe)
	} else {
		var newRsp = contactMeServiceUpdate(rsp, contactMe)
	}

	return newRsp;
}

query: {
	function contactMeServiceGet(query) {

		var rspNew = {
			"dataExists": false
		}

		var rsp = getDbRequestQuery(mydb, query)

		if (rsp.length === 1)
			return rsp[0];
		else
			return null;
	}

	function contactMeServiceList(query) {
		var rsp = getDbRequestQuery(mydb, query)
		return rsp;
	}
}


Create: {
	function contactMeServiceCreate(payload, modelCreate, contactMe) {

		modelCreate.accountId = payload.accountId;
		modelCreate.productId = payload.productId;
		modelCreate.customerId = payload.customerId;
		modelCreate.ts = getTs();
		modelCreate.items.push(contactMe)

		rsp = postDbRequest(mydb, modelCreate)

		return rsp;
	}

	function contactMeServiceUpdate(rsp, contactMe) {

		rsp.items.push(contactMe)
		rsp = postDbRequest(mydb, rsp, rsp._id)

		return rsp;
	}
}


function contactMeServiceDelete() {

}

//# sourceURL=api_social_contactMe_service.js