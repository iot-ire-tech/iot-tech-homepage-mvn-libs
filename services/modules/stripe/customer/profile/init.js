/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");

$(document).ready(function () {

	modelContext = {
		...modelUx
	}

	brandMe(accountId, "login")
// Query Customer On Platform
	customer = {
		"accountId": accountId,
		"customerId": customerId
	};
	customerIdRsp = postRequest("CustomerGet", customer);

	$("#username").val(customerIdRsp.metadata.username)
	modelContext.userAccount.user = customerIdRsp.metadata.username;
});

//# sourceURL=customer_reset_init.js


