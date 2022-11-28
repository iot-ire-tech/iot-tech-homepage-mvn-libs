/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// MailEr
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
$(document).on("change blur", "#name", function () {
	modelContext.person.fullName = $(this).val();
});
$(document).on("change blur", "#number", function () {
	modelContext.number = $(this).val();
});
$(document).on("change blur", "#day", function () {
	modelContext.day = parseInt($(this).val());
});
$(document).on("change blur", "#month", function () {
	modelContext.month = parseInt($(this).val());
});
$(document).on("change blur", "#year", function () {
	modelContext.year = parseInt($(this).val());
});
$(document).on("change blur", "#cvs", function () {
	modelContext.cvs = parseInt($(this).val());
});



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
	var i = setTimeout(function () {
		clearInterval(i)
		uxAccountCardDelete(cardSourcesRsp)
		uxAccountCardUpdate(cardSourcesRsp);

	}, 1000)
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
	var i = setTimeout(function () {
		clearInterval(i)
		uxAccountCardUpdate(cardSourcesRsp);
		uxAccountCardDelete(cardSourcesRsp)
	}, 1000)

});

//# sourceURL=onboarding_payment_source_card_change.js