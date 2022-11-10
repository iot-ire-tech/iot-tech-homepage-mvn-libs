/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Signup / Registration

$(document).on("change", "#name", function () {
	nsCustomerService.modelItem.person.fullName = $(this).val();
});
$(document).on("dblclick", "#name", function () {
	nsCustomerService.modelItem.card.fullName = "Anthony Ennis"
    $(this).val(nsCustomerService.modelItem.card.fullName)
});
$(document).on("change", "#number", function () {
	nsCustomerService.modelItem.card.number = $(this).val();
});
$(document).on("dblclick", "#number", function () {
	nsCustomerService.modelItem.card.number = "4319350499173570"
	$(this).val(nsCustomerService.modelItem.card.number)
});




$(document).on("change", "#month", function () {
	nsCustomerService.modelItem.card.month = parseInt($(this).val());
});
$(document).on("dblclick", "#month", function () {
	nsCustomerService.modelItem.card.month = 02
	$(this).val(nsCustomerService.modelItem.card.month)
});
$(document).on("change", "#year", function () {
	nsCustomerService.modelItem.card.year = parseInt($(this).val());
});
$(document).on("dblclick", "#year", function () {
	nsCustomerService.modelItem.card.year = 2022
	$(this).val(nsCustomerService.modelItem.card.year)
});

$(document).on("change", "#cvs", function () {
	nsCustomerService.modelItem.card.cvs = parseInt($(this).val());
});
$(document).on("dblclick", "#cvs", function () {
	nsCustomerService.modelItem.card.cvs = "791"
	$(this).val(nsCustomerService.modelItem.card.cvs)
});


$(document).on("change", "input[name=extAccountsDelete]", function () {

	var source = {
		"customerId": customerId,
		"cardId": $(this).attr("id")
	};

	var extAccountRsp = postRequest("CardCustomerDelete", source);

	query = {
		"object": "card",
		"customerId": customerId
	};
	var cardSourcesRsp = postRequest("CustomerSourcesList", query);
	var i = setTimeout(function () {
		clearInterval(i)
		uxAccountCardDelete(cardSourcesRsp.data)

	}, 1000)
});




//# sourceURL=customer_card_change.js