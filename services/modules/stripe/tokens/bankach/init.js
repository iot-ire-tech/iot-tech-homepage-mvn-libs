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

	modelContext = modelConnectBankAdd;
	modelContext.accountId = accountId;
	modelContext.customerId = customerId;

});

//# sourceURL=stripe_bank_init.js


