/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Signup / Registration
$(document).on("change", "#name", function () {
	modelContext.name = $(this).val();
});
$(document).on("change", "#number", function () {
	modelContext.number = $(this).val();
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

$(document).on("change", "#cvs", function () {
	modelContext.cvs = $(this).val();
});


//# sourceURL=stripe_bank_change.js