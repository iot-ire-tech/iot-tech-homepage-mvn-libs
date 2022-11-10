/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Used By Asset, Event, Activities for modification

$(document).on("change", ".Fk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	fk.id = id;
	fk.dbId = dbId;
	triageId = id;
});
/*
 * Modification Relationships
 */
$(document).on("change", ".Pk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
	modelContext.pk.dbId = dbId;
	modelContext.pk.id = id;
	modelContext.fk = fk;
	modelContextRsp = srvContext.setPayload(modelContext).queryByType("Q. By DbId?")[0];
	if (srvContext.answer()) {
		modelContext = modelContextRsp;
		srvContext.uxFormUpdate(modelContextRsp)
	} else
		alert("ERR: Couldnt retrieve seleted, contact support ASAP")
});





//# sourceURL=entity_integrity.js



