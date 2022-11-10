/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("change", ".Pk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1])
	modelContext.filter.patronId = dbId;
});


//$(document).on("change", "#creditFixed", function () {
//	modelContext.credit = Number($(this).val()).toFixed(2);
//});
//$(document).on("change", "#creditPercentage", function () {
//	billingRulesObj.credit = parseInt($(this).val());
//});


//# sourceURL=finance_billing_br_patrons_onchange.js



