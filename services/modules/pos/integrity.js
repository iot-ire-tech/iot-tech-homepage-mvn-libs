/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Used By Asset, Event, Activities for modification

//$(document).on("change", ".Fk", function () {
//	val = $(this).dropdown("get value");
//	dbId = val.split("_")[0];
//	id = parseInt(val.split("_")[1]);
//
//	fk.id = id;
//	fk.dbId = dbId;
//	triageId = id;
//});
/*
 * Modification Relationships
 */

// My Record
$(document).on("change", ".RetrivePatron", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	modelContext.players.myId.dbId = dbId;
	modelContext.players.myId.id = id;

	modelContextRsp = srvContext.setPayload(modelContext).queryByType("Q. By Player MyId?")[0];
	if (srvContext.answer()) {
//		modelContext = modelContextRsp;
		srvContext.uxFormUpdate(modelContextRsp)
	} else
		alert("INF: No Results Found")
});





//# sourceURL=module_squash_integrity.js




