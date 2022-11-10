/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var clientData = {};
var regData = {};
var iotDbObj = new clientDbUtil(iotDbCtrt, "Retrieving Available DB from master DB")

$(document).on('click', '#save', function () {

	try {

		var token = {
			"accountId": accountId,
			// Source Payload
			...modelContext
		};
		token.accountHolderName = modelContext.person.firstName + " " + modelContext.person.lastName;
		var tokenId = postRequest("AddTokenBankSepa", token).id;

		var source = {
			"accountId": accountId,
			"tokenId": tokenId
		};

// ExtAccountCardAdd
		var sourceId = postRequest("ExtBankAccountAdd", source).id;
// Test Is Source


// Mail Out
		var mailer = {
			...token,
			...source,
			"sourceId": sourceId,
			"ts": new Date().toLocaleString()
		};
		postRequest("MailerRegistrationPaymentsSepa", mailer);
		console.log("INF: Payments SEPA Complete")

	} catch (e) {
		var err = "Payments Registration Error, contact support asap"
		alert("INF: " + err)
		console.log("INF: " + err)
	}


});
//# sourceURL=onboarding_payment_source_sepa_ctrl.js
