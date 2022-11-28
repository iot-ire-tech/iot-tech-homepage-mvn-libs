/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('click', '#save', function () {


// Validations

	if (fname !== true || lname !== true || email !== true || iban !== true || country !== true || accountType !== true) {
		alert("INF: You must fill in all form fields, and answer questions. If you request help, contact support")
		return;
	}




// You cannot delete the default external account for your default currency.
// Please make another external account the default using the `default_for_currency` param, and then delete this one.;
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

		var sourceId = postRequest("ExtBankAccountAdd", source);
// Test Is Source
		$(this).attr("disabled", true)
		$("#comfirmationMsg").html("Congratulations, you have just added your bank account source to your account")
		$("#comfirmationMsg").append("You bank account source : (" + tokenId + ") details will be sent to you by email")
// Mail Out
		var mailer = {
			...token,
			...source,
			"sourceId": sourceId.id,
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
