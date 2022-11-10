/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("click", "#save", function () {
	// Fk.id, fk.dbId, and fk.type already set

// Assset Only, No FK in rule
	modelContext.fk = []
	modelContext.fk.push(fkRule)
	modelContext.fk.push(fkEntity)

	srvContext.setPayload(modelContext)
	srvContext.uxUpdateNameTag()

	if (srvContext.isValid("props")) {
		modelContextRsp = srvContext.create();
		srvContext.modPkDbId();
	} else
		alert("ERR: Stock/Sales Rule Issue, contact support asap");

	alert("INF: Stock Rule Added");
});



//# sourceURL=module_monitoring_stock_controller.js