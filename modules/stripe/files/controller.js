/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('click', '#save', function () {

	try {

		var token = {
			"accountId": accountId,
			// Token Payload
			...modelContext
		};
		var tokenId = postRequest("FileIt", token).id;

// Mail Out
//		var mailer = {
//			...token,
//			...source,
//			"sourceId": sourceId,
//			"ts": new Date().toLocaleString()
//		};
//		postRequest("MailerRegistrationPaymentsCard", mailer);
//		console.log("INF: Payments SEPA Complete")

	} catch (e) {
		var err = "Payments Registration Error, contact support asap"
		alert("INF: " + err)
		console.log("INF: " + err)
	}


});
//# sourceURL=file_ctrl.js
