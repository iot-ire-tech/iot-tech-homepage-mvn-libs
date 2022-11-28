/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// As configured on the product..

function getProductFixturesWidget(accountId, productId, upstreamAccountId, upstreamProductId) {
	var htmlModal = "";
	payloadRsp = getDbRequest("fixtures")

	try {
		htmlModal = "<select class=\"w3-select  w3-hover-grey selectEventDates\" upstreamAccountId=" + upstreamAccountId + " upstreamProductId=" + upstreamProductId + "  productId=" + productId + " accountId=" + accountId + " size=5 style=\"width:75%\" required> "
		var fixtureFound = false;
		payloadRsp.forEach(function (calanader) {
			// Is product on list
			if (calanader.productId === productId) {
				// Ok does it have clash dates
				fixtureFound = true
				calanader.fixtures.forEach(function (fixture) {
					from = new TimeConverter(fixture.from);
					from.getEpoch();
					to = new TimeConverter(fixture.to);
					to.getLocalDateTime();
					htmlModal += "<option  from=" + fixture.from + " to=" + fixture.to + " dbId=" + calanader._id + ">"
					htmlModal += "From: " + from.getLocalDateTime() + " To: " + to.getLocalDateTime()
					htmlModal += "</option>"
				}.bind(this));
			}
		}.bind(this));
		htmlModal += "</select>"
		htmlModal += "<br>"
		htmlModal += "<span class=fixturesBookingMsg></span>"
		htmlModal += "<br>"

	} catch (fixture) {

	}
	if (fixtureFound === false) {
		// no fixture found
		alert("INF: No fixture found for (" + accountId + ") / ProductId(" + productId + ") / UpstreamId(" + upstreamProductId + "), contact support asap")
	}
	return htmlModal;
}

function fixturesLookup(reservationDateraw, productId) {

	// As configured on the product..
	var availabilityRsp = {
		"status": false,
		"reason": ""
	}


	payloadRsp = getDbRequest("fixtures")

	try {
		payloadRsp.forEach(function (calendar) {
			// Is product on list
			if (calendar.productId === productId)
				// Ok does it have clash dates
				calendar.fixtures.forEach(function (fixture) {
					from = new TimeConverter(fixture.from).getEpoch();
					to = new TimeConverter(fixture.to).getEpoch();
					dateIn = new TimeConverter(reservationDateraw).getEpoch();
					// In Event Window Slot?
					if (dateIn >= from && dateIn < to) {
						// Ok clash detect get reason and exit
						throw fixture;

					}

				}.bind(this));
		}.bind(this));

	} catch (fixture) {
		if (fixture.stack === undefined) {
			availabilityRsp.reason = fixture.reason;
			availabilityRsp.status = fixture.status;
			return availabilityRsp;
		} else {
			availabilityRsp.reason = "Fixtures lookup error (" + fixture.stack + ")";
			availabilityRsp.status = false;
			return availabilityRsp;
		}

	}
	availabilityRsp.reason = "Fixture open for business";
	availabilityRsp.status = true;
	return availabilityRsp;
}
//# sourceURL=api_fixtures_utils.js