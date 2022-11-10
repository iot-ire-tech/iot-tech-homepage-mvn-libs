/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//
// Fk :  Link to Entites, an PAtrons...
//
$(document).on("change", ".Fk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
// fk type is applied at TAB Context Level
	fk.id = id;
	fk.dbId = dbId;
});

/*
 *
 * Modification Relationships
 *
 */
// PK
// Link to self(type=visual), for modification purposes.
$(document).on("change", ".Pk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

// We have the following
// 1. FK Reference - lets update it
// 2. Form Data
	modelContext.pk.dbId = dbId;
	modelContext.pk.id = id;

// "Q. By DbId?
	modelContextRsp = srvContext.setPayload(modelContext).queryByType("Q. By DbId?")[0];
	modelContext = modelContextRsp;
	if (srvContext.answer()) {
		srvContext.uxFormUpdate(modelContextRsp)
	} else
		alert("ERR: Couldnt retrieve seleted, contact support ASAP")
});

//# sourceURL=services_module_branding_integ.js