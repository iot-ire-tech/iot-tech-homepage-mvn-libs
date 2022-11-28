/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Signup / Registration
$(document).on("change", "#customerId", function () {
	modelContext.customerId = $(this).val();
});
$(document).on("change", "#amount", function () {
	modelContext.amount = $(this).val();
});
$(document).on("change", "#currency", function () {
	modelContext.currency = $(this).val();
});
$(document).on("change", "#description", function () {
	modelContext.description = $(this).val();
});
$(document).on("change", "#receipt_email", function () {
	modelContext.receipt_email = $(this).val();
});
$(document).on("change", "#source", function () {
	modelContext.source = $(this).val();
});


//# sourceURL=stripe_charge_change.js