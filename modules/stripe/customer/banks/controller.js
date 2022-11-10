/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Test Works
// accountId=platform
// customerId=platform (cus_GC9fH5oGmdxwPv)
$(document).on('click', '#save', function () {

	try {

// User Data / Create Token
		var bank = {
//			"accountId": accountId,
			...modelContext
		};
		var tokenId = postRequest("AddTokenBankSepa", bank).id;

// Token / Source
		var source = {
//			"accountId": accountId,
			"tokenId": tokenId,
			...modelContext
		};
		var sourceId = postRequest("AddSourceSepa", source).id;

// From Token Create.....Payment Source
		var source = {
//			"accountId": accountId,
			"customerId": customerId,
			"sourceId": sourceId
		};

		customerId = postRequest("CustomerSourceAdd", source).id;
// Test Is Source
// Mail Out
		var mailer = {
			...modelContext,
			"customerId": customerId,
			"tokenId": tokenId,
			"sourceId": sourceId
		};
		postRequest("MailerCustomerPaymentsSepa", mailer);
		console.log("INF: Payments SEPA Complete")

	} catch (e) {
		var err = "Payments Registration Error, contact support asap"
		alert("INF: " + err)
		console.log("INF: " + err)
	}


});
//# sourceURL=customer_bank_ctrl.js
