/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */






$(document).on("change", "#brName", function () {
	modelContext.modelBillingRules.name = $(this).val();
});

$(document).on("change", "#expiryDate", function () {
	modelContext.timings.ts.$date = new Date().toISOString();

	modelContext.modelBillingRules.timings.publishDate.$date = new Date().toISOString();
	modelContext.modelBillingRules.timings.expiryDate.$date = new Date($(this).val()).toISOString();
});



$(document).on("change", "#discountFixed", function () {
	modelContext.modelBillingRules.discount.type = "fixed";
	modelContext.modelBillingRules.discount.value = parseFloat($(this).val());
});
$(document).on("change", "#discountPercentage", function () {
	modelContext.modelBillingRules.discount.type = "%";
	modelContext.modelBillingRules.discount.value = parseInt($(this).val());
});

$(document).on("change", "#penalityFixed", function () {
	modelContext.modelBillingRules.penality.type = "fixed";
	modelContext.modelBillingRules.penality.value = parseFloat($(this).val());
});
$(document).on("change", "#penalityPercentage", function () {
	modelContext.modelBillingRules.penality.type = "%";
	modelContext.modelBillingRules.penality.value = parseInt($(this).val());
});
//# sourceURL=finance_billing_br_onchange.js