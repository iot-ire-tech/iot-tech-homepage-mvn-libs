/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");
var primaryId = parsedUrl.searchParams.get("primaryId");
var customerId = parsedUrl.searchParams.get("customerId");
var originId = parsedUrl.searchParams.get("originId");
var backFillCustomerNewAccount = parsedUrl.searchParams.get("backFillCustomerNewAccount");
var dbId = parsedUrl.searchParams.get("dbId");
var ts = new getTodaysDate();

var backFillCustomerNewAccountMode = false;

var modelContext = {}
$(document).ready(function () {

//	 accountId = acct_1FflMZJpsDSKPGiy
    modelContext = Object.assign(modelContext, modelUxCard)

    if (originId.includes("onboarding")) {
        var uxBuinessMenuWidget = new UxOnboardingMenuWidget();
    }
    if (originId.includes("business")) {
        var uxBuinessMenuWidget = new UxProvisioningMenuWidget();
    }

    $("#menuBarHook").html(uxBuinessMenuWidget.init())


//	try {
//
//		var query = {
//			"accountId": accountId,
//			"customerId": customerId
//		};
//
//		var customerRsp = postRequest("CustomerGet", query);
//		if (customerRsp.status !== undefined && customerRsp.status === 400)
//			throw Error("INF: no customer (" + customerId + ") found for account (" + accountId + ")")
//
//		var defaultSource = ""
//		if (customerRsp.default_source !== undefined) {
//			defaultSource = customerRsp.default_source.id
//		}
//
//	} catch (errMsg) {
//		alert(errMsg)
//		return;
//	}


    if (null !== backFillCustomerNewAccount) {
        backFillCustomerNewAccountMode = true
    } else {

        backFillCustomerNewAccountMode = false
    }


// Q. Customer Sources..
    if (parsedUrl.href.includes("admin")) {
        query = {
//			"accountId": accountId,
            "object": "card",
            "customerId": customerId
        };
        var cardSourcesRsp = postRequest("CustomerSourcesList", query);
        uxAccountCardDelete(cardSourcesRsp.data)
    }


//	var cardsDetected = false
//	var cardCounter = 0
//	var cardHtml = "<table class='w3-table-all'>"
//	cardHtml += "<span>Some Card Management Needed?</span>"
//	cardHtml += "<tr><th>Brand</th><th>Last Four Digits</th><th>Expiry Date[yyyy/mm]</th><th>Tick Card As New Default Payment Source</th></tr>"
//	cardSourcesRsp.data.forEach(function (card) {
//		cardCounter++
//		cardsDetected = true
//		var today = new Date()
//		var cardDate = new Date();
//		cardDate.setFullYear(card.exp_year)
//		cardDate.setMonth(card.exp_month - 1)
//
//		if (cardDate.getTime() >= today.getTime())
//			if (defaultSource === card.id)
//				cardHtml += "<tr ><td>" + card.brand + "</td><td>" + card.last4 + "</td><td>" + card.exp_year + "/" + card.exp_month + "</td><td> <input id=" + card.id + " type=radio checked name=defaultcards> </td></tr>"
//			else
//				cardHtml += "<tr ><td>" + card.brand + "</td><td>" + card.last4 + "</td><td>" + card.exp_year + "/" + card.exp_month + "</td><td> <input id=" + card.id + " type=radio name=defaultcards> </td></tr>"
//	})
//	cardHtml += "</table>"
//	if (cardsDetected && cardCounter > 1)
//		$("#cardsList").html(cardHtml)
//
//	cardsDetected = false;
//
//	cardHtml = "<br>"
//	cardHtml += "<br>"
//	cardHtml += "<table class='w3-table-all'>"
//	cardHtml += "<span>Some Card Housekeeping Needed!!!</span>"
//	cardHtml += "<tr><th>Brand</th><th>Last Four Digits</th><th>Expiry Date[yyyy/mm]</th><th>Tick Card(s) to Remove</th></tr>"
//	cardSourcesRsp.data.forEach(function (card) {
//		var today = new Date()
//		var cardDate = new Date();
//		cardDate.setFullYear(card.exp_year)
//		cardDate.setMonth(card.exp_month - 1)
//
//		if (cardDate.getTime() < today.getTime()) {
//			cardsDetected = true
//			cardHtml += "<tr ><td>" + card.brand + "</td><td>" + card.last4 + "</td><td>EXPIRED</td><td> <input id=" + card.id + " type=checkbox name=cards> </td></tr>"
//		}
//	})
//	cardHtml += "</table>"
//	cardHtml += "<br>"
//	cardHtml += "<br>"
//	if (cardsDetected)
//		$("#cardsList").after(cardHtml)
//
//
//	query = {
////			"accountId": accountId,
//		"object": "bank_account",
//		"customerId": customerId
//	};
//	var bankSourcesRsp = postRequest("CustomerSourcesList", query);


});

//# sourceURL=customer_card_init.js


