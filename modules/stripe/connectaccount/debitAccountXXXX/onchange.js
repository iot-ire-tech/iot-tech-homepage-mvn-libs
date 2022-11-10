/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Banking
$(document).on('change', '#location', function () {
	modelContext.location = $(this).val();
});
$(document).on('change', '#currency', function () {
	modelContext.currency = $(this).val();
});
$(document).on('change', '#account_holder_name', function () {
	modelContext.accountHolderName = $(this).val();
});
$(document).on('change', '#product_description', function () {
	modelContext.productDescription = $(this).val();
});
$(document).on('change blur', '#account_number', function () {
	modelContext.accountNumber = $(this).val();
});
$(document).on('change', '#account_holder_type', function () {
	modelContext.accountHolderType = $(this).val();
});

//# sourceURL=connectAccount_addSepaAccount_change.js
