/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Compan
$(document).on('change', '#sector', function () {
	modelContext.company.sector = $(this).val();
});
$(document).on('change', '#location', function () {
	modelContext.company.location = $(this).val();
});
$(document).on('change', '#company', function () {
	modelContext.company.name = $(this).val();
});

$(document).on('change', '#email', function () {
	modelContext.company.email = $(this).val();
});
$(document).on('change', '#phone', function () {
	modelContext.company.phone = $(this).val();
});
$(document).on('change', '#website', function () {
	modelContext.company.website = $(this).val();
});

// Personal
$(document).on('change', '#fname', function () {
	modelContext.person.fname = $(this).val();
});
$(document).on('change', '#lname', function () {
	modelContext.person.lname = $(this).val();
});

$(document).on('change', '#pass', function () {
	modelContext.person.password = $(this).val();
});
// Banking
$(document).on('change', '#location', function () {
	modelContext.bankAccount.location = $(this).val();
});
$(document).on('change', '#currency', function () {
	modelContext.bankAccount.currency = $(this).val();
});
$(document).on('change', '#account_holder_name', function () {
	modelContext.bankAccount.account_holder_name = $(this).val();
});
$(document).on('change', '#product_description', function () {
	modelContext.bankAccount.product_description = $(this).val();
});
$(document).on('change', '#account_number', function () {
	modelContext.bankAccount.account_number = $(this).val();
});
$(document).on('change', '#account_holder_type', function () {
	modelContext.bankAccount.account_number = $(this).val();
});



$(document).on('checked change', '#agree', function () {
	if (this.checked) {
		modelContext.terms = true;
	} else {
		modelContext.terms = false;
		modelContext.tries++;
	}
});



//# sourceURL=client_account_onchange.js
