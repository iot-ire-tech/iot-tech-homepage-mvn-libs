/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Used By Asset, Event, Activities for modification

// Card Reference FK!!!
$(document).on("change", ".Fk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	fk.id = id;
	fk.dbId = dbId;
	triageId = id;

});

//
$(document).on("change", ".Pk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	modelContext.pk.dbId = dbId;
	modelContext.pk.id = id;

});

$(document).on("change", "#PkSpecific", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	modelContext.pk.dbId = dbId;
	modelContext.pk.id = id;

});



//# sourceURL=finance_payments_card_integ.js




