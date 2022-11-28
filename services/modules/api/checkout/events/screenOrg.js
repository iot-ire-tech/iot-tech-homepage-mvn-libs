/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


cart: {


	$(document).on("change ", '.quantity', function () {
		var id = parseInt($(this).attr("id").split("_")[1])
		tmp = shoppingItems.get(id)
		tmp.quantity = parseInt($("#quantity_" + id).val());
		shoppingItems.set(id, tmp)

		calcRt(shoppingItems)
	});

	$(document).on("click", '.shop', function () {
		var id = parseInt($(this).attr("id").split("_")[1])

		if ($(this).is(':checked')) {
			shoppingItems.set(id,
				{
					"trId": $(this).attr("trId"),
					"accountId": $(this).attr("accountId"),
					"productId": $(this).attr("productId"),
					"webinarId": $(this).attr("webinarId"),
// Asset Management
					"offering": $(this).attr("offering"),
					"desc": $(this).attr("desc"),
					"description": $(this).attr("desc"),
					"poc": parseFloat($(this).attr("idPoc")),
// Used by Cart
					"name": $(this).attr("title"),
					"cost": parseFloat($(this).attr("cost")),
					"quantity": 1,

					"discount": parseFloat($(this).attr("discount")),
					pnpMgt: {
						"cost": parseFloat($(this).attr("pnpcost")),
						"grade": $(this).attr("pnpgrade"),
						"annotate": $(this).attr("pnpannotate"),
						"dbId": $(this).attr("dbpnpMgtId")
					},
					bookingInfo: {
						"bookingId": $(this).attr("bookingId"),
					},
					inventoryMgt: {
						"units": parseInt($(this).attr("idUnits")),
						"units_total": parseInt($(this).attr("idUnitsTotal")),
						"unit_ratio_upper": parseFloat($(this).attr("unitRatioUpper")),
						"unit_ratio_lower": parseFloat($(this).attr("unitRatioLower")),
						"stockUtilization": parseFloat($(this).attr("stockUtilization")),
						"stockActive": ($(this).attr("stockActive") == 'true'),
						"stockLevel1": ($(this).attr("stockLevel1") == 'true'),
						"stockLevel2": ($(this).attr("stockLevel2") == 'true'),
						"stockLevel3": ($(this).attr("stockLevel3") == 'true'),
						"stockSms": $(this).attr("stockSms"),
						"stockEmail": $(this).attr("stockEmail"),
						"alertReminderCap": parseInt($(this).attr("alertReminderCap")),
						"alertSchedule": $(this).attr("alertSchedule"),
						"bufferoverflow": parseInt($(this).attr("bufferoverflow")),
						"dbInventoryMgtId": $(this).attr("dbInventoryMgtId")
					},
					usage: {
						"videoHub": $(this).attr("videoHubUsage"),
						"webinarHub": $(this).attr("webinarHubUsage"),
						"bookingSms": $(this).attr("bookingSmsUsage"),
						"bookingEmail": $(this).attr("bookingEmailUsage")
					},
					videoHub: {
						"mediaLink": $(this).attr("mediaLink")
					}
				}
			)

			modelCheckoutItems.accountId = $(this).attr("accountId")
			modelCheckoutItems.productId = $(this).attr("productId")
			modelCheckoutItems.revenue = {
				"discount": parseFloat($(this).attr("discount")),
				"cost": parseFloat($(this).attr("cost")),
				"quantity": 1
			}
			modelCheckoutItems.modules = {
				"dbInventoryMgtId": $(this).attr("dbInventoryMgtId"),
				"webinarId": $(this).attr("webinarId"),
				"pocId": parseFloat($(this).attr("idPoc")),
				"pnpId": $(this).attr("dbpnpMgtId"),
				"bookingId": $(this).attr("bookingId"),
				"videoHubId": ""
			}

			modelCheckoutItemsMap.set(id, modelCheckoutItems)

			$("#firstrow").after(mycart.addItem(shoppingItems.get(id), id))
			calcRt(shoppingItems)
		} else {

			shoppingItems.delete(id)
			$("#item_" + id).empty().remove();
			calcRt(shoppingItems)

			modelCheckoutItemsMap.delete(id)
		}

	});



}


$(document).on("keyup click ", 'input.global_filter', function () {
	filterGlobal();
});
$(document).on("change ", 'input[name=receipt]', function () {

	if ($(this).val() === "sms") {
		smsUsage = true;
	}

	if ($(this).val() === "email") {
		emailUsage = true;
	}
});
$(document).on("click ", '#checkout', function () {
	var shopItemsArr = Array.from(modelCheckoutItemsMap.values())
	modelCheckout.items = shopItemsArr;



	var receipts = checkoutRoutineByAccount(shoppingItems, modelCheckout)

	grandTotal = checkoutReset(receipts, shoppingItems)
	$("#msgHook").fadeIn('fast').html("Thank your for your purchase, look forward to your return.").delay(15000).fadeOut('slow')
	// Modal
	checkOutModal(grandTotal)
	grandTotal = 0;
});
function checkoutRoutineByAccount(shoppingItems, checkoutJsonObj) {

	var receipts = []
	try {
		if (shoppingItems.size === 0) {
			$("#msgHook").fadeIn('fast').html("You have added no items to your cart").delay(15000).fadeOut('slow')
			return;
		}

		// primary customer Id from above  !!!
		var customerPrimaryRsp = customerGet({"accountId": accountId, "customerId": customerId})
		var customerRootToken = customerPrimaryRsp.email // primary customer Id from above  !!!




		// One show fits all model...
		// https://iottech-0d28.restdb.io/rest/billingmodel?q={%22name%22:%22default%22,%22members%22:{%22$in%22:[%22acct_1GRdJxF6KR5nnzB2%22]}}
		// https://iottech-0d28.restdb.io/rest/billing-model?q={%22name%22:%22default%22,%22members%22:{%22$in%22:[%22acct_1GRdJxF6KR5nnzB2%22]}}
		billingModelDetail:{
			var payload = {"name": "default", "accountId": accountId}
			payload = {"name": "default", "members": {"$in": [accountId]}}
			var billingModelRsp = getDbRequestQuery("billing-model", payload);
		}


		customerUsage:{
			var payload = {"accountId": accountId, "productId": productId, "customerId": customerId}
			var customerUsageRsp = nsUsageService.usageServiceGet(payload)
		}


		checkoutJsonObj.items.forEach(function (poItem) {
			customerAccountMatch : {
				if (accountId !== poItem.accountId)
					customerRsp = customerFind({"accountId": poItem.accountId, "email": customerRootToken}) // Scan accounts for this customer ID!!!
				else
					customerRsp = customerPrimaryRsp
				poItem.customerId = customerRsp.id;
			}

		});

		var checkoutRsp = nsCheckoutService.service(checkoutJsonObj)
		return
		shoppingItems.forEach(function (poItem) {

			responsesReset :{
				var billingModelRsp = {}
				var costsCalculatorRsp = {}
				var customerRsp = {}
				var chargeRsp = {}
				var barCodeRsp = {}
				var analyticsRsp = {}
				var smsMsgRsp = {}
				var pnpMgtRsp = {}
				var pnpEventHandlerRsp = {}
				var zoomWebinarRsp = {};

			}
			customerAccountMatch : {
				// No need to find connected account customer Id for Primary Connected Account
				if (accountId !== poItem.accountId)
					customerRsp = customerFind({"accountId": poItem.accountId, "email": customerRootToken}) // Scan accounts for this customer ID!!!
				else
					customerRsp = customerPrimaryRsp
			}

			uxUpdate :{
				// Disable the purchase button
				$("input[productId=" + poItem.productId + "]").attr("disabled", true)
				// Show spinner...
			}

			billCustomer:{

				accountSpecificBilling:{
					var payload = {"name": "default", "accountId": poItem.accountId, "productId": poItem.productId}
					payload = {"name": "default", "members": {"$in": [poItem.accountId]}}
					billingModelRsp = getDbRequestQuery("billing-model", payload);
					if (billingModelRsp === undefined)
						throw Error("Billing model not found for account (" + poItem.accountId + ")")
				}

				costsCalculatorRsp = costsCalculator(poItem, billingModelRsp, customerUsageRsp)
			}

			chargeCustomer:{
				var chargeCardmodel = {
					"customerId": customerRsp.id, // Must provide source or customer
					"transaction": new Transaction({"amount": costsCalculatorRsp.transaction, "currency": "eur", "description": poItem.description}),
					"applicationFeeAmount": costsCalculatorRsp.fee
				}
				if (mode !== "debug")
					console.log("")
//					chargeRsp = chargeCard({"accountId": poItem.accountId, "payload": chargeCardmodel})
			}




// Client Purchased Service
			if (poItem.offering !== "videoHub" && poItem.offering !== "webinarHub" && poItem.offering !== "activity")
				stockEventHandler:{
					decrementCap:{
						var payload = {"accountId": poItem.accountId, "productId": poItem.productId}
						var inventorymgtRsp = getDbRequestQuery("capacitymgt", payload);
						inventorymgtRsp.alerting.alertReminderCap -= 1;
						putDbRequestAsync("capacitymgt", inventorymgtRsp, inventorymgtRsp._id)
					}
					var stockEventHandlerRsp = stockEventHandler(poItem, inventorymgtRsp)
				}

			if (poItem.offering !== "videoHub" && poItem.offering !== "webinarHub" && poItem.offering !== "activity")
				pnpMgt: {
					if (poItem.pnpMgt.cost > 0) {
						// Charge Client For Service
						pnpServiceDetail:{
							var payload = {"accountId": poItem.accountId, "productId": poItem.productId}
							pnpMgtRsp = getDbRequestId("pnpmgt", poItem.pnpMgt.dbId);
						}
						pnpEventHandlerRsp = pnpEventHandler(poItem, pnpMgtRsp)
					}
				}

// Imagize Barcode
			barCodeRsp = generateBarCode(poItem)

			if (smsUsage === true && billingModelRsp.iot.smsOption === true)
				smsMsgRsp = sendSmsReceipt(poItem)

//			if (billingModelRsp.iot.analyticsOption === true)
//				analyticsRsp = postAnalytics(poItem)



			if (poItem.offering === "webinarHub") {
				// Create Registrant
				payload = {
					"webinarId": poItem.webinarId,
					"email": customerRsp.email,
					"first_name": customerRsp.name
				}
				zoomWebinarRsp = postRequest("ZoomWebinarRegistrant", payload);
			}



			if (poItem.offering === "videoHub") {
				var mediaContent = poItem.videoHub.mediaLink.toString().split(",");
			}

			receipts.push({
				"offering": poItem.offering,
				"mediaLink": mediaContent,
				"webinarData": zoomWebinarRsp.join_url + "," + zoomWebinarRsp.registrant_id + "," + new Date(zoomWebinarRsp.start_time) + "," + zoomWebinarRsp.topic,
				"email": customerRsp.email,
				"accountId": poItem.accountId,
				"customerId": customerRsp.id,
				"chargeId": chargeRsp.id,
				"productId": poItem.productId,
				"discountedAmount": costsCalculatorRsp.discountedAmount,
				"barcode": barCodeRsp,
				"shoppingItem": new Product({"name": poItem.name, "description": poItem.description, "quantity": poItem.quantity, "cost": parseFloat(costsCalculatorRsp.transaction / 100).toFixed(2)})
			})
		})


	} catch (errMsg) {
		// Present Model (Send Mail Report)
		alert("INF: We are not able to charge your presently, update card details, and/or contact support")
		return [];
	}

	return receipts;
}

// Destination Charge
// https://stripe.com/docs/connect/destination-charges#application-fee
// When creating charges with an application_fee_amount, the full charge amount is immediately transferred from the platform to the transfer_data[destination] account after the charge is captured. The application_fee_amount (capped at the full amount of the charge) is then transferred back to the platform.



// Source
// Account cannot make charges unless made good - complete business onboarding
//			var sourceModel = {
//				"card": new Card({"number": "4242424242424242", "currency": "usd", "year": 2021, "month": 12, "day": 22}),
//				"cc": {"flow": "none", "usage": "single_use"},
//				"transaction": new Transaction({"amount": totalCent, "currency": "eur", "description": "charging card"})
//			}
//			var sourceId = postRequest("AddSourceCard", sourceModel).id;
//// Direct Charge
//			var shoppingItems = {
//				"customerId": customerId,
//				"sourceId": sourceId
//			}
//			customerRsp = postRequest("CustomerUpdate", shoppingItems);
//			customerId = customerRsp.id;


// https://help.gigwell.com/en/articles/1263385-connecting-multiple-bank-accounts-to-stripe-and-activating-payment-methods
// https://help.gigwell.com/en/articles/1263385-connecting-multiple-bank-accounts-to-stripe-and-activating-payment-methods
// https://www.sepa.ch/en/home/direct-debits/creditor-identifier/allocation-application.html
// https://support.stripe.com/questions/cannot-activate-a-payment-method
// https://stripe.com/docs/sources/sepa-debit#obtaining-a-creditor-identifier
// https://gocardless.com/guides/sepa/creditor-identifiers/
// https://support.stripe.com/questions/request-a-sepa-creditor-id-from-your-bank
// https://www.slimpay.com/blog/sepa-101-creditor-id/
//It also allows a debtor to:
//– verify a SEPA Direct Debit transaction
//– ask for a refund or initiate a dispute with the right Creditor
//– check a mandate

function sepaCharge(accountId, customerId) {
//	var paymentMethodRsp = paymentMethodAdd({"accountId": poItem.accountId, "payload": {"iban": "IE71IPBS99062612653802"}})
//					customerRsp = customerUpdate({"accountId": poItem.accountId, "customerId": customerId, "payload": {"paymentMethod": paymentMethodRsp.id}})
//	customer = {
//		"accountId": poItem.accountId,
//		"paymentMethodId": paymentMethodRsp.id,
//		"person": new Person({firstName: "Anto", lastName: "Who", sex: "male", email: "tonyennis@yahoo.com", phone: "0877461070", year: 1972, month: 2, day: 1})
//	}
//					customerRsp = postRequest("CustomerAdd", customer)
//					return;
// One time token, attached to customer
	bankToken: {
		var token = {
			"accountId": accountId,
			...new Bank({"accountNumber": "IE71IPBS99062612653802", "country": "IE", "accountHolderType": "individual", "accountHolderName": "Anto Who"}),
			"transaction": {"currency": "eur"}
		}
		var tokenId = postRequest("AddTokenBankSepa", token).id;
	}
	addPaymentSource: {
		var source = {
			"accountId": accountId,
			"customerId": customerId,
			"tokenId": tokenId
		};
		customerRsp = postRequest("CustomerSourceAdd", source);
	}
}

//
//# sourceURL=api_checkout_events.js