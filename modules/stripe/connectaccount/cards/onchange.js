/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Signup / Registration
$(document).on("blur change", "#name", function () {
	modelContext.name = $(this).val();
});
$(document).on("blur change", "#number", function () {
	modelContext.number = $(this).val();
});

$(document).on("blur change", "#year", function () {
	modelContext.year = $(this).val();
});
$(document).on("blur change", "#month", function () {
	modelContext.month = $(this).val();
});
$(document).on("blur change", "#day", function () {
	modelContext.day = $(this).val();
});

$(document).on("blur change", "#cvs", function () {
	modelContext.cvs = $(this).val();
});

//# sourceURL=onboarding_payment_source_card_change.js