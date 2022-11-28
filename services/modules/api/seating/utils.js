/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// As configured on the product..

function getEventSeatingBestPrice(accountId, productId) {
	nsSeatingService.modelQuery.accountId = accountId
	nsSeatingService.modelQuery.productId = productId
	var seatingRsp = nsSeatingService.get()

	return seatingRsp[0].item[0].cost
}

function getEventSeatingWidget(accountId, productId, upstreamAccountId, upstreamProductId) {
	var htmlModal = "";
// Input = Query
	getData:{
		payload = {
			"accountId": accountId,
			"productId": productId
		}
		payloadRsp = postRequest("ProductGet", payload);
	}

	var keyfound = false;
	for (key in payloadRsp) {
		if (key === "metadata") {
			seating = payloadRsp.metadata.seating;
			seatingObj = JSON.parse(seating);
			keyfound = true;
		}
	}
	if (keyfound === false) {
		seatingObj = [{"bestprice": "yes", "seating": "Standing Event", "currency": "EUR", "cost": -0.0}];
		keyfound = false;
	}

// Handover = DATA
// {"seating":"level_1","currency":"EUR","+ " " + item.currency +":"sdfsdf","cost":0.01}

	buildUx:{
		try {
			htmlModal = "<select class=\"w3-select  w3-hover-grey selectEventSeats\"  upstreamAccountId=" + upstreamAccountId + "  upstreamProductId=" + upstreamProductId + "  productId=" + productId + " accountId=" + accountId + " size=5 style=\"width:60%\" required> "

			seatingObj.forEach(function (item) {

				htmlModal += "<option seatingCostId=" + item.cost + ">"
//				if (item.annotate.length > 0)
//					htmlModal += "Seating Grade: " + item.seating + " Costs: " + item.cost + " [" + item.currency + "] Note: " + item.annotate
//				else
				htmlModal += "Seating Grade: " + item.grade + " Costs: " + item.cost + " [" + item.currency + "]"
				htmlModal += "</option>"

			}.bind(this));
			htmlModal += "</select>"
			htmlModal += "<br>"
			htmlModal += "<span class=seatingBookingMsg></span>"
			htmlModal += "<br>"

		} catch (item) {

		}
	}


	return htmlModal;
}
//# sourceURL=api_seating_utils.js