/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("click", "#makeTopUp", function () {

// Entry Criteria, think hard.....?
	if (reason.length > 0) {
		url = location.origin + contextPath + "/TopUp";
		this.response = new httpHandler("TopUp Server Call", responseStrucObj)
			.setUrl(url)
			.setAsync(false).setTimeout(300000).setMessage("HTTP Transaction")
			.setPayload({"reason": reason, "amount": amount})
			.post();

// Entry Criteria, think hard.....?
		if (this.response.responseLoad.status === "succeeded") {

			// Record TopUp Response
			modelContext = modelRefund;
			modelContext.pk.type = "card";
			modelContext.pk.id = getRand();
			modelContext.topUp = this.response.responseLoad;

			srvContext = srvPosTopUp;
			srvContext.setPayload(modelContext)
			srvContext.uxUpdateNameTag()

			if (srvContext.isValid("props")) {
				modelContextRsp = srvContext.create();
				srvContext.modPkDbId();
				alert("INF: Item Created ");
			} else
				alert("ERR: Item note created, contact support asap");

			$("#targetMessageResult").fadeOut(60000, function () {
				$(this).html("<h1>Card TopUp Processed</h1>")
			});
		}
	}

});

//# sourceURL=module_topup_controller.js