/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Lookup Registration.

$(document).on("blur change", "#name", function () {
	modelContext.name = $(this).val().toString().trim();
});
$(document).on("blur change", "#number", function () {
	modelContext.number = $(this).val().toString().trim();
});
$(document).on("blur change", "#csv", function () {
	modelContext.csv = $(this).val().toString().trim();
});
$(document).on("blur change", "#expYear", function () {
	modelContext.expYear = $(this).val().toString().trim();
});
$(document).on("blur change", "#expMonth", function () {
	modelContext.expMonth = $(this).val().toString().trim();
});
$(document).on("blur change", "#email", function () {
	modelContext.email = $(this).val().toString().trim();
});

// Full Addition
$(document).on("blur change", "#adddress1", function () {
	modelContext.adddress1 = $(this).val().toString().trim();
});
$(document).on("blur change", "#adddress2", function () {
	modelContext.adddress2 = $(this).val().toString().trim();
});
$(document).on("blur change", "#city", function () {
	modelContext.city = $(this).val().toString().trim();
});
$(document).on("blur change", "#state", function () {
	modelContext.state = $(this).val().toString().trim();
});
$(document).on("blur change", "#zip", function () {
	modelContext.zip = $(this).val().toString().trim();
});
$(document).on("blur change", "#country", function () {
	modelContext.country = $(this).val().toString().trim();
});



//# sourceURL=card_reg_onchange.js