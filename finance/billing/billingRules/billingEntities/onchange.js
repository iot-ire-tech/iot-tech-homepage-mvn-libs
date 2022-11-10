/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("change", ".PkEntity", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1])
	modelContext.filter.targetId = dbId;
});

$(document).on("change", "#catEntity", function () {
	modelContext.filter.category = $(this).val();

});


//# sourceURL=finance_billing_br_entities_onchange.js





