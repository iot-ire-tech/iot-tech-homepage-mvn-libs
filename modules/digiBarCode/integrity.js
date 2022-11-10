/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Used By Asset, Event, Activities for modification

$(document).on("change", ".entity", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	fk.id = id;
	fk.dbId = dbId;
	modelEntityRsp = srvEntity.setPayload({"pk": {"id": id}}).queryByType("Q. List By PkId?")[0];

// Context now charged with
	modelContext = modelEntityRsp;
	$("#quantity").attr("title", "FYI: Max Value Already Set At(" + modelContext.quanity.max + ")")
});


// Writing to BarCode Payload, not Entities
$(document).on("change", ".entityGen", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	fk.id = id;
	fk.dbId = dbId;
	modelContext.fk = fk;
});


//# sourceURL=module_digiBarCode_integrity.js




