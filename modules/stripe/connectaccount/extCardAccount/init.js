/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("primaryId");
var customerId = parsedUrl.searchParams.get("customerId");
var ts = new getTodaysDate();


$(document).ready(function () {

//	 accountId = acct_1FflMZJpsDSKPGiy
	modelContext = {
		"accountId": accountId,
		...modelUx
	}


	query = {
		"accountId": accountId
	};
	var cardSourcesRsp = postRequest("ExtBankAccountList", query);

//	var cardsDetected = false
//	var cardCounter = 0
//	var cardHtml = "<table class='w3-table-all'>"
//	cardHtml += "<span>Some Card Management Needed?</span>"
//	cardHtml += "<tr><th>Brand</th><th>Country</th><th>Curreny</th><th>Funding</th><th>Last Four Digits</th><th>Expiry Date[yyyy/mm]</th><th>Tick Card As New Default Payment Source</th></tr>"
//	cardSourcesRsp.forEach(function (card) {
//		if (card.object === "card") {
//			cardCounter++
//			cardsDetected = true
//			cardHtml += "<tr ><td>" + card.brand + "</td><td>" + card.country + "</td><td>" + card.currency + "/" + card.default_for_currency + "</td><td>" + card.funding + "</td><td>" + card.last4 + "</td><td>" + card.exp_year + "/" + card.exp_month + "</td><td> <input id=" + card.id + " type=radio checked name=extAccounts> </td></tr>"
//		}
//	})
//	cardHtml += "</table>"
//	cardHtml += "<br>"
//	cardHtml += "<hr>"
//	cardHtml += "<br>"
//
//
//	if (cardsDetected && cardCounter > 1)
//		$("#banksList").html(cardHtml)

	if (parsedUrl.href.includes("admin")) {
		query = {
			"accountId": accountId,
		};
		var cardSourcesRsp = postRequest("ExtBankAccountList", query);
		uxAccountCardUpdate(cardSourcesRsp);
		uxAccountCardDelete(cardSourcesRsp)

	}


});

//# sourceURL=onboarding_payment_source_card_init.js


