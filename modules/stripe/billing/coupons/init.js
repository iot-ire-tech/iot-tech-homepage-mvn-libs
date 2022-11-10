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

// Init Data Model
// Flat Data Model, Must Match Server Model Form
//	modelContext = modelConnectBankSourceAdd
	if (accountId !== null)
		modelContext.accountId = accountId;
	else {
		accountId = "";
		modelContext.accountId = "";
	}

	modelContext.customerId = customerId;

});

//# sourceURL=stripe_bank_sepa_payments_init.js


