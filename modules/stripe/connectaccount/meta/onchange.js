
$(document).on("click ", '#checkout', function () {

	var customerModel = {
		"accountId": item.accountId,
		"customerId": customerId,
		"sourceId": sourceId
	}
	customerId = postRequest("CustomerUpdate", customerModel).id;

});

//# sourceURL=stripe_account_meta_change.js
