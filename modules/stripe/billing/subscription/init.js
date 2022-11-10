/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var parsedUrl = new URL(window.location.href);
var originId = parsedUrl.searchParams.get("originId");

// Targeted Account
var accountIdPlt = parsedUrl.searchParams.get("accountIdPlt");
var customerIdPlt = parsedUrl.searchParams.get("customerIdPlt");

var accountIdP = parsedUrl.searchParams.get("accountIdP");
var customerIdP = parsedUrl.searchParams.get("customerIdP");

var accountIdC = parsedUrl.searchParams.get("accountIdC");
var customerIdC = parsedUrl.searchParams.get("customerIdC");

var ts = new getTodaysDate();

//
// DEV TESTS - Mock Endpoints use Tokens!!!
//

// card (i.e., credit or debit card)
// a bank account
// a source
// a token
// a connected account.
// Rule If cards, bank accounts, and attached sources—you must also pass the ID of the associated customer.


$(document).ready(function () {

    modelContext = modelUx;



    var uxBuinessMenuWidget = new UxClientSubscriptionMenuWidget();
    uxLoad("#menuBarHook", uxBuinessMenuWidget.init())


});

//# sourceURL=signup_subscription_init.js


