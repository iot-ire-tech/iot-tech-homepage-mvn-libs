/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Signup / Registration
$(document).on("change", "#email", function () {
	modelContext.email = $(this).val();
});
$(document).on("change", "#firstname", function () {
	modelContext.firstname = $(this).val();
});
$(document).on("change", "#lastname", function () {
	modelContext.lastname = $(this).val();
});
$(document).on("change", "#gender", function () {
	modelContext.gender = $(this).val();
});
$(document).on("change", "#phone", function () {
	modelContext.phone = $(this).val();
});
$(document).on("change", "#year", function () {
	modelContext.dob.year = $(this).val();
});
$(document).on("change", "#month", function () {
	modelContext.dob.month = $(this).val();
});
$(document).on("change", "#day", function () {
	modelContext.dob.day = $(this).val();
});

$(document).on("change", "#address1", function () {
	modelContext.address.addressLine1 = $(this).val();
});
$(document).on("change", "#address2", function () {
	modelContext.address.addressLine2 = $(this).val();
});
$(document).on("change", "#town", function () {
	modelContext.address.town = $(this).val();
});
$(document).on("change", "#city", function () {
	modelContext.address.city = $(this).val();
});
$(document).on("change", "#country", function () {
	modelContext.address.country = $(this).val();
});
$(document).on("change", "#postalCode", function () {
	modelContext.address.postalCode = $(this).val();
});


//# sourceURL=stripe_person_change.js