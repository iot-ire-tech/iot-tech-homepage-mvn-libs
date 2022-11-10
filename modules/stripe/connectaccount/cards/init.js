/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");
var ts = new getTodaysDate();


$(document).ready(function () {

//	 accountId = acct_1FflMZJpsDSKPGiy
	modelContext = {
		"accountId": accountId,
		...modelUx
	}

});

//# sourceURL=onboarding_payment_source_card_init.js


