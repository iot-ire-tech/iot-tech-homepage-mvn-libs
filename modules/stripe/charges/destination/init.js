/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");
var ts = new getTodaysDate();

//
// DEV TESTS - Mock Endpoints use Tokens!!!
//


// API : https://stripe.com/docs/api/charges/create
//
// Test Card Tokens to be applied to source
// tok_visa	Visa
// tok_visa_debit	Visa (debit)


// Test : Platfrom
// /modules/stripe/charge/release/chargeIt.jsp?clientId=117543
// Check Dashboard

// Test : Connect Account
// /modules/stripe/charge/release/chargeIt.jsp?clientId=117543&accountId=acct_1FG0S6L4EJM4TcRu
// Check Dashboard


// Source Types
// card (i.e., credit or debit card)
// a bank account
// a source
// a token
// a connected account.
// Rule If cards, bank accounts, and attached sources—you must also pass the ID of the associated customer.


$(document).ready(function () {

	modelContext = modelCharge;

	if (accountId === null)
		modelContext.accountId = "";
	else
		modelContext.accountId = accountId;

});

//# sourceURL=stripe_charge_init.js


