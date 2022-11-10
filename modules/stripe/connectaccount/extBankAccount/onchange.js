/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var fname = false;
$(document).on("change ", "#fname", function () {
	fname = true;
	modelContext.person.firstName = $(this).val();
});
$(document).on("dblclick ", "#fname", function () {

	alert('accountNumber = "IE29AIBK93115212345678", country = "IE", accountHolderType = "", accountHolderName = "Anto Who"')
});
var lname = false;
$(document).on("change ", "#lname", function () {
	lname = true;
	modelContext.person.lastName = $(this).val();
});
var email = false;
$(document).on("change ", "#email", function () {
	email = true;
	modelContext.person.email = $(this).val();
});

// Payment Source
var iban = false;
$(document).on("change ", "#iban", function () {
	iban = true;
	modelContext.accountNumber = $(this).val();
});
var country = false;
$(document).on("change blur", "#country", function () {
	country = true;
	modelContext.country = $(this).val();
});
var currency = false;
$(document).on("change blur", "#currency", function () {
	currency = true;
	modelContext.transaction.currency = $(this).val();
});
var accountType = false;
$(document).on("change blur", "#accountType", function () {
	accountType = true;
	modelContext.accountHolderType = $(this).val();
});


/// Admin Form
$(document).on("change", "input[name=extAccountsDelete]", function () {

	var source = {
		"accountId": accountId,
		"tokenId": $(this).attr("id")
	};

	var extAccountRsp = postRequest("ExtBankAccountDelete", source);

	query = {
		"accountId": accountId,
	};
	var cardSourcesRsp = postRequest("ExtBankAccountList", query);
	uxAccountBankDelete(cardSourcesRsp)
	uxAccountBankUpdate(cardSourcesRsp);
});



$(document).on("change", "input[name=extAccountsUpdate]", function () {

	var source = {
		"accountId": accountId,
		"tokenId": $(this).attr("id"),
		"defaultForCurrency": true
	};

	var extAccountRsp = postRequest("ExtBankAccountUpdate", source);


	query = {
		"accountId": accountId,
	};
	var cardSourcesRsp = postRequest("ExtBankAccountList", query);
	uxAccountBankUpdate(cardSourcesRsp);
	uxAccountBankDelete(cardSourcesRsp)

});


//# sourceURL=onboarding_payment_source_sepa_change.js