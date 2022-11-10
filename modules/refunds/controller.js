/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("click", "#makeRefundCard", function () {




// Entry Criteria, think hard.....?
	if (reason.length > 0) {
		url = location.origin + contextPath + "/Refund";
		this.response = new httpHandler("Card Payment Server Call", responseStrucObj)
			.setUrl(url)
			.setAsync(false).setTimeout(300000).setMessage("HTTP Transaction")		// set payload, then post
			.setPayload({"chargeId": chargeId, "reason": reason, "amount": amount})
			.post();



// Entry Criteria, think hard.....?
		if (this.response.responseLoad.status === "succeeded") {
			// Update Pos Reciept As Refunded!!!
			modelEntityReceiptRsp = srvPosReciept.setPayload({"pk": {"dbId": posReceiptDbId}}).queryByType("Q. By DbId?")[0]
			modelEntityReceiptRsp.refunded = true
			// srvContext.uxUpdateNameTag()
			srvPosReciept.setPayload(modelEntityReceiptRsp).mod(posReceiptDbId)

			// Record Refund
			modelContext = modelRefund;
			modelContext.pk.type = "card";
			modelContext.pk.id = getRand();
			modelContext.refund = this.response.responseLoad;

			srvContext = srvPosRefund;
			srvContext.setPayload(modelContext)
			srvContext.uxUpdateNameTag()

			if (srvContext.isValid("props")) {
				modelContextRsp = srvContext.create();
				srvContext.modPkDbId();
				alert("INF: Card Item Created ");
			} else
				alert("ERR: Card Item note created, contact support asap");

			$("#targetMessageResult").fadeIn(1000, function () {
				$(this).text("Card Refund Processed")
			});
		}
	}

});
$(document).on("click", "#makeRefundCash", function () {

// Override card notes
	reason = $("#notes").val()

	// Update Pos Reciept As Refunded!!!
	if (reason.length > 0) {
		modelEntityReceiptRsp = srvPosReciept.setPayload({"pk": {"dbId": posReceiptDbId}}).queryByType("Q. By DbId?")[0]
		modelEntityReceiptRsp.refunded = true
		// srvContext.uxUpdateNameTag()
		srvPosReciept.setPayload(modelEntityReceiptRsp).mod(posReceiptDbId)

		// Record Refund
		modelContext = modelRefund;
		modelContext.pk.type = "cash";
		modelContext.pk.id = getRand();
		modelContext.refund = {"chargeId": chargeId, "reason": reason, "amount": amount}

		srvContext = srvPosRefund;
		srvContext.setPayload(modelContext)
		srvContext.uxUpdateNameTag()

		if (srvContext.isValid("props")) {
			modelContextRsp = srvContext.create();
			srvContext.modPkDbId();
			alert("INF: Cash Item Created ");
		} else
			alert("ERR: Cash Item note created, contact support asap");

		$("#targetMessageResult").fadeIn(1000, function () {
			$(this).text("Cash Refund Processed")
		});

	}
});

$(document).on("click", "#mod", function () {
	// Fk.id, fk.dbId, and fk.type already set

// Assset Only, No FK in rule
	srvContext.setPayload(modelContext)
	srvContext.uxUpdateNameTag()

	if (srvContext.isValid("props")) {
		srvContext.mod(modelContext.pk.dbId);
		alert("INF: Item (" + modelContext.socialize.name + ")");
	} else
		alert("ERR: Item (" + modelContext.socialize.name + "), contact support asap");

});

//# sourceURL=module_refunds_controller.js