/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('click', '#save', function () {

	try {

		var token = {
			"accountId": accountId,
			// Source Payload
			...modelContext
		};
		token.accountHolderName = modelContext.person.firstName + " " + modelContext.person.lastName;
		var tokenId = postRequest("AddTokenCard", token).id;

		var source = {
			"accountId": accountId,
			"tokenId": tokenId
		};

		var sourceId = postRequest("ExtAccountCardAdd", source).id;

// Test Is Source
		$(this).attr("disabled", true)
		$("#comfirmationMsg").html("Congratulations, you have just added a card source:(" + tokenId + ") to your account")
		$("#comfirmationMsg").after("<br>Click here if you wish to review card settings (" + sourceId + ") ")

// Mail Out
		var mailer = {
			...token,
			...source,
//			"sourceId": sourceId,
			"ts": new Date().toLocaleString()
		};
		postRequest("MailerRegistrationPaymentsCard", mailer);
		console.log("INF: Payments Card Complete")

	} catch (e) {
		var err = "Card Payments Registration Error, contact support asap"
		alert("INF: " + err)
		console.log("INF: " + err)
	}


});
//# sourceURL=onboarding_payment_source_card_ctrl.js
