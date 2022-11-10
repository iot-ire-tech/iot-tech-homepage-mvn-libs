/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on('click', '#save', function () {

	modelConnectBankSourceAdd.person.fullName = modelContext.fullName;
	modelConnectBankSourceAdd.person.email = modelContext.email;
	modelConnectBankSourceAdd.iban = modelContext.iban;
	modelConnectBankSourceAdd.transaction.type = "sepa_debit";
	modelConnectBankSourceAdd.transaction.currency = modelContext.currency;
	modelConnectBankSourceAdd.transaction.amount = modelContext.amount;

// Crate banking source
	url = location.origin + contextPath + "/" + "AddSourceSepaDebit";
	modelConnectBankSourceAddRsp = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(modelConnectBankSourceAdd).post().getResponse();


	if (modelConnectBankSourceAddRsp !== undefined) {
		console.log("INF: Source: Good");
		var customerCoordinates = {
			"accountId": accountId,
			"customerId": customerId,
			"sourceId": modelConnectBankSourceAddRsp.id
		};

// Get Customer...
		url = location.origin + contextPath + "/" + "CustomerGet";
		response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(customerCoordinates).post().getResponse();


// Update Customer With Source / payment method
		url = location.origin + contextPath + "/" + "CustomerUpdate";
		response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(customerCoordinates).post().getResponse();

		console.log("INF: Customer: Good");


		if (response !== undefined) {
// add to Payment Source, and Customer To This Charge
			modelCharge.accountId = accountId;
			modelCharge.customerId = customerId;
			modelCharge.sourceId = modelConnectBankSourceAddRsp.id;

			modelCharge.transaction.amount = modelContext.amount;
			modelCharge.transaction.currency = modelContext.currency;
			modelCharge.receiptEmail = modelContext.email;
			modelCharge.description = "Bank Account Charge, Type (" + modelConnectBankSourceAdd.transaction.type + ")";
			url = location.origin + contextPath + "/" + "AddCharge";
			response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(modelCharge).post().getResponse();
			if (response !== undefined) {
				console.log("INF: Charge: Good");
			} else {
//  com.stripe.exception.InvalidRequestException: For 'ach_credit_transfer' payments, we currently require your account to have a bank account in one of the following currencies: usd
				console.log("ERR: Charge: Failed (" + response + ")");
			}
		}
	}


});
//# sourceURL=stripe_bank_sepa_payments_ctrl.js