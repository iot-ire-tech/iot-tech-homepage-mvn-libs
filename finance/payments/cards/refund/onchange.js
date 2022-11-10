/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).on("change", ".PkRegisteredCardOwnerLookup", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	modelContext.pk.dbId = dbId;
	modelContext.pk.id = id;



	// Switch Context : Get Card Registration Details
	modelCardRegistrationRsp = srvCardReg.setPayload(modelContext).queryByType("Q. By id?")[0];
	// Update modelContext so that a standalone/proxy assited payment can be made to client
	if (srvCardReg.answer()) {
		modelContext.fk = modelCardRegistrationRsp.fk	// Link Top To Patron
		modelContext.email = modelCardRegistrationRsp.email
		modelContext.customerId = modelCardRegistrationRsp.customerId
	} else {
		alert("INF: Registered Card details cannot be retrieved, contact support ASAP")
	}




});

$(document).on("blur change", "#topupAmount", function () {
	modelContext.amount = Math.round(parseFloat($(this).val()) * 100)
});

//# sourceURL=card_topup_onchange.js



