/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("click", ".processRefundWithVender", function () {

	srvContext.setPayload(modelContext)
	if (srvContext.makeRefund() === true) {
		alert("INF: Card Refund Made (" + modelContext.amount + ")");

	} else
		alert("ERR: Card Payment Rejected (" + topupAmount + "), try smaller amount?");

	$("#topupAmount").empty();
	// Update Analytics of bounce
})

//# sourceURL=finance_payments_card_refund_ctrl.js
