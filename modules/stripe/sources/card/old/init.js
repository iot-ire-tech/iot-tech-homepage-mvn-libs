/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");
var ts = new getTodaysDate();

// API : https://stripe.com/docs/api/tokens/create_card
//
// Test : Connect Account
// http://localhost:8084/services/modules/stripe/card/release/cardInfo.jsp?clientId=117543&accountId=acct_1FG0S6L4EJM4TcRu
// Check Dashboard
// https://dashboard.stripe.com/test/logs?method[]=post&method[]=delete&direction[]=connect_in&direction[]=self
// Test : Platform Account
// http://localhost:8084/services/modules/stripe/card/release/cardInfo.jsp?clientId=117543


$(document).ready(function () {

	modelContext = modelCard;
	if (accountId === null)
		modelContext.accountId = "";
	else
		modelContext.accountId = accountId;

});

//# sourceURL=stripe_card_init.js


