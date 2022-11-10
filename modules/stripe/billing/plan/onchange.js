/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Signup / Registration
$(document).on("change", "#name", function () {
	modelContext.product.name = $(this).val();
});
$(document).on("change", "#interval", function () {
	modelContext.schedule.interval = $(this).val();
});
$(document).on("change", "#currency", function () {
	modelContext.transaction.currency = $(this).val();
});
$(document).on("change", "#amount", function () {
	modelContext.transaction.amount = $(this).val();
});


//# sourceURL=stripe_plan_change.js