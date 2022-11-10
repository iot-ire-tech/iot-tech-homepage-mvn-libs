/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Generation
$(document).on("click", "#save", function () {
	// Fk.id, fk.dbId, and fk.type already set
// Assset Only, No FK in rule
	srvContext.setPayload(modelContext)
	srvContext.uxUpdateNameTag()

	if (srvContext.isValid("props")) {
		modelContextRsp = srvContext.create();
		srvContext.modPkDbId();
		alert("INF: Item Created ");
	} else
		alert("ERR: Item note created, contact support asap");

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

//# sourceURL=module_digiBarCode_controller.js