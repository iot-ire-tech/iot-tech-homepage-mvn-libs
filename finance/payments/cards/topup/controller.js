/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("click", ".processPaymentWithVender", function () {

	srvContext.setPayload(modelContext)
	if (srvContext.makePayment() === true) {
		alert("INF: Card Payment Accepted (" + modelContext.amount + ")");

		// Log your credit balance - to be cross check before making direct payments
		// Last Card Topup is Current Credit Available!!!
//		srvPatronCredit.id = getRand();
//		srvPatronCredit.amount = modelContext.amount
//		srvPatronCredit.setPayload(patronCredit).create()

	} else
		alert("ERR: Card Payment Rejected (" + modelContext.amount + "), try smaller amount?");
	$("#topupAmount").empty();
	// Update Analytics of bounce
});

//# sourceURL=finance_payments_card_top_ctrl.js
