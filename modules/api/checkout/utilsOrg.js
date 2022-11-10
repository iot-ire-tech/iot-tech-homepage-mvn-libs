/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// https://www.merchantmaverick.com/paypal-vs-stripe/
// https://stripe.com/ie/pricing
// Granular Charges
// Service Level Costs (Fees)
// Pnp / Inventory / Notification (Email/SmS)
// Stripe


extCharges:{
// Sub Totals - Fixed
// - DB/ Google / Git / Wages / Support Widget / Stripe / SMS
}


function calcRtx(shoppingItems) {
	var rt = 0.00;
	var st = 0.00;
	shoppingItems.forEach(function (item) {
		// If we are dealing with a booking we need to consider extras
//		bookingUsageRsp = bookingUsage(item)
		addUp: {
//			st = item.cost * (item.quantity + bookingUsageRsp.bookingQuanity)
			st = item.cost * (item.quantity)
//			st += (smsCost * bookingUsageRsp.smsQuanity)
//			st += (bookingUsageRsp.seatingCost)
			rt += st;
		}

// Reset
	})
	$("#rt").text((Math.round(rt * 100) / 100).toFixed(2));
}


function costsCalculatorx(rt, billing, usage) {
	var subtotal = 0;
	var costs = {
		"transaction": 0.00, // Deciam
		"discountedAmount": 0.00, // Deciam
		"fee": 0, // Int only // applicaiton fee
		"tax": 0.00	//
	}
	var costsFree = {
		"transaction": 0.00, // Deciam
		"discountedAmount": 0.00, // Deciam
		"fee": 0, // Int only // applicaiton fee
		"tax": 0.00	//
	}

	try {
		var taxCost = 0.20; // Percentage
		var discountAmount = 0; // Percentage

		feeTime:{
			AnalysisCustomerUsage : {
				costs.transaction = (rt.revenue.cost * rt.revenue.quantity);
				costs.transaction *= 100

				// Apply discount if any
				if (rt.discount > 0) {
					discountAmount = costs.transaction * (rt.discount / 100)
					costs.discountedAmount = parseInt(discountAmount) * 1;
					costs.transaction -= costs.discountedAmount;
				}


				usage.items.forEach(function (item) {

					if (item.name === "bookingengine") {
						if (item.features.customer.booking.ttb)
							costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
						if (item.features.customer.booking.bizhours)
							costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
						if (item.features.customer.booking.booking)
							costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)

						if (item.features.customer.notification.email)
							costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
						if (item.features.customer.notification.sms)
							costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)

						if (item.features.customer.alerts.email)
							costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
						if (item.features.customer.alerts.sms)
							costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)

					}

					social: {
						if (item.name === "contactMe") {
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.sms)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.email)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
						}
						if (item.name === "followMe") {
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.sms)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.email)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
						}
						if (item.name === "likeMe") {
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.sms)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.email)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
						}
						if (item.name === "linkedIn") {
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.sms)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.email)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
						}
						if (item.name === "followMe") {
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.sms)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.tel)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
							if (item.features.customer.notification.email)
								costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
						}
					}


// Notification Service
					if (supportUsage)
						costs.fee += (billing.costs.supportCost + billing.costs.supportFeeCost)
					if (rt.usage.videoHub === "true")
						costs.fee += (billing.costs.videoHubCost + billing.costs.videoHubFeeCost)
					if (rt.usage.webinarHub === "true")
						costs.fee += (billing.costs.webinarHubCost + billing.costs.webinarHubFeeCost)
				})
			}

// Hard Stop - Stripe
			if (costs.transaction < 50) {
				throw  Error("The charge amount +" + costs.transaction + " doesnt meet application min amount 50 cents.");
			}


			chargeTime:{

				// percentageCosts Transaction
				var percentageCosts = billing.costs.stripe.stripCCPerCost + billing.costs.applicationPerFee; // 5% of transaciton cost or .....max 10 Euro
				var percentageAmount = costs.transaction * (percentageCosts / 100)
				percentageAmount = Math.ceil(percentageAmount)  // back to int (ceil
				costs.fee += percentageAmount

				var fixedCosts = billing.costs.stripe.stripCCFixCost + billing.costs.emailCost + billing.costs.emailFeeCost; // 40 Cent Fix Profit
				costs.fee += fixedCosts

				// Limit Cap Fee Check
				if (costs.fee > billing.costs.cappedMaxChargeAmount) {
					costs.fee = billing.costs.cappedMaxChargeAmount
				}
			}

// Hard Stop - IoT
			if (costs.transaction < costs.fee) {
				if (billing.hardstop == true)
					throw  Error("The charge amount +" + costs.transaction + " doesnt meet application fee amount " + costs.fee + ")");
				else
					window.console.log("WRN: The charge amount +" + costs.transaction + " doesnt meet application fee amount " + costs.fee + ")")
			}
		}


	} catch (errMsg) {
// Present Model (Send Mail Report)
		throw  Error(errMsg);
	}

// Finalize
	costs.fee = parseInt(costs.fee)
	costs.transaction = parseFloat(costs.transaction).toFixed(2) * 1
	costs.tax = parseFloat(costs.tax).toFixed(2) * 1

	return costs;
}


var grandTotal = 0;
function checkoutReset(receiptItems, shoppingItems) {
	updateUx: {
		// Reciept Sent via email / sms
	}
// Disable booking buttons
	receiptItems.forEach(function (poItem) {
		$("[bookingButtonId=" + poItem.productId + "]").attr("disabled", true)
		grandTotal += (parseFloat(poItem.shoppingItem.cost).toFixed(2) * 1)
	});
// Reset SMS
	smsUsage = false;
	$('#sms').each(function () {
		this.checked = false
	})
// Reset Applicaiton Fee

// Send Mail Reciept (need to include all barcodes not just last one
	if (receiptItems.length > 0)
		postRequest("MailBusinessReciept", receiptItems);
// Update Ux - Unit Value
	// Less one!!

// Empty Cart Data
	shoppingItems.clear()

// Empty Cart Widget
	$(".cart_items").remove();
	$("#rt").text("");
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

	return grandTotal;
}
//# sourceURL=api_checkout_utils.js