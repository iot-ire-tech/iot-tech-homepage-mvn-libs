/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Flat Model
$(document).on("change blur", "#name", function () {
	modelContext.fullName = $(this).val();
});
$(document).on("change blur", "#email", function () {
	modelContext.email = $(this).val();
});

// Source
$(document).on("change blur", "#iban", function () {
	modelContext.iban = $(this).val();
});
// Source +
$(document).on("change blur", "#currency", function () {
	modelContext.currency = $(this).val();
});
$(document).on("change blur", "#amount", function () {
	modelContext.amount = $(this).val();
});

