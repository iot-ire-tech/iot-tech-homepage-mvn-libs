/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Checkout Cart



$(document).on("click ", '#checkout', function () {

// Items To Charge

	if (shoppingItems.size === 0) {
		$("#msgHook").fadeIn('fast').html("<br> You have no items in your cart<br> tick on some items below that you would like to purchase<br>").delay(15000).fadeOut('slow')
		return;
	}

// Charge Customer!!!
	var total = 0.00;
	var totalCent = 0;
	var subtotal = 0;
	shoppingItems.forEach(function (item) {

		subtotal = item.cost * item.quantity
		subtotal *= 100;
		totalCent = parseInt(subtotal);
//	alert("INF: Total Cost " + totalCent)

		var sourceModel = {
			"accountId": item.accountId,
			"card": testDataCards.get("VisaCard_US"),
			"cc": {"flow": "none", "usage": "single_use"},
			"transaction": new Transaction({"amount": totalCent, "currency": "eur", "description": "charging card"})
		}
		var sourceId = postRequest("AddSourceCard", sourceModel).id;



// Update Customer With Source
		var customerModel = {
			"accountId": item.accountId,
			"customerId": customerId,
			"sourceId": sourceId
		}
		customerId = postRequest("CustomerUpdate", customerModel).id;


// Charge
		var chargingModel = {
			"accountId": item.accountId,
			"customerId": customerId,

			"transaction": new Transaction({"amount": totalCent, "currency": "eur", "description": "charging card"}),
			"email": "tonyennis@yahoo.com",
			"fee": {
				"type": "percentage",
				"percentage": 5
			}
		}

		var chargeId = postRequest("AddDirectCharge", chargingModel).id;
	})
	$("#msgHook").fadeIn('fast').html("<br> Thank your for your purchase, lookforward to your return.").delay(15000).fadeOut('slow')

// Empty Cart Data
	shoppingItems.delete()

// Empty Cart Widget
	$(".items").empty().remove();
	$(".items").att
// Remove checkboxes
	$('.shop').each(function () {
		this.checked = false
	})
// Remove selected
	$('.display tbody tr').each(function () {
		var cn = this.className

		if (cn.includes("selected"))
			$(this).removeClass('selected');

	})

// Update Analytics
// Send Reciepts

}
);

//# sourceURL=stripe_shop_change_checkout.js