/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("change blur", "#fname", function () {
	modelContext.person.firstName = $(this).val();
});
$(document).on("change blur", "#lname", function () {
	modelContext.person.lastName = $(this).val();
});
$(document).on("change blur", "#email", function () {
	modelContext.person.email = $(this).val();
});

// Payment Source
$(document).on("change blur", "#iban", function () {
	modelContext.accountNumber = $(this).val();
});
$(document).on("change blur", "#country", function () {
	modelContext.country = $(this).val();
});
$(document).on("change blur", "#accountType", function () {
	modelContext.accountHolderType = $(this).val();
});

//# sourceURL=customer_bank_change.js