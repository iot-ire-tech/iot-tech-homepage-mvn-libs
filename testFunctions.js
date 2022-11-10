/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Client Match Server Model
// This entity could be used by Pos, Booking Modules, etc
// We are not interested the cost or details per sei, more about the item.

var pk = {
	"id": -1,
	"dbId": "",
	"type": ""
}

var modelStripeIds = {
	"clientId": "",
	"accountId": "acct_1FG0S6L4EJM4TcRu",
	"customerId": "cus_FlvjSAstpd1IiB",
	"sourceId": ""
};

function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

function getIds(tc, tcStartup) {

// Basic Account + TOC
	if (tcStartup.tag === "accountConnect") {
		payload = {
			...tcStartup.extTc.model
		}
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /acct_[a-zA-Z0-9]+/, 'Tearup Account Created');
		tc.model.accountId = payloadRsp.id;
		accountId = payloadRsp.id;
	}
	if (tcStartup.tag === "accountPlatform") {
		tc.model.accountId = "";
		accountId = "";
	}

// Add Indivual To Account
	if (tcStartup.tag === "individualAccountConnect") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": tc.model.accountId
		}
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /acct_[a-zA-Z0-9]+/, 'Tearup Indivual Account Created');
		tc.model.accountId = payloadRsp.id;
		accountId = payloadRsp.id;
	}


// Add Biz To Account
	if (tcStartup.tag === "bizAccountConnect") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": tc.model.accountId
		}
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /acct_[a-zA-Z0-9]+/, 'Tearup Biz Account Created');
		tc.model.accountId = payloadRsp.id;
		accountId = payloadRsp.id;
	}


// Product
	if (tcStartup.tag === "productPlatform") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": ""
		}
	}
	if (tcStartup.tag === "productConnect") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": tc.model.accountId
		}
	}
	if (tcStartup.tag.includes("product")) {
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /prod_[a-zA-Z0-9]+/, 'Tearup Product Created');
		tc.model.productId = payloadRsp.id;
		productId = payloadRsp.id;
	}

// Plans
	if (tcStartup.tag === "planPlatform") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": "",
			"productId": tc.model.productId
		}
	}
	if (tcStartup.tag === "planConnect") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": tc.model.accountId,
			"productId": tc.model.productId
		}
	}
	if (tcStartup.tag.includes("plan")) {
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /plan_[a-zA-Z0-9]+/, 'Tearup Plan Created');
		tc.model.planId = payloadRsp.id;
		planId = payloadRsp.id;
	}
// Subscriptions
	if (tcStartup.tag === "subscriptionPlatform") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": "",
			"customerId": tc.model.customerId,
			"planId": tc.model.planId
		}
	}
	if (tcStartup.tag === "subscriptionConnect") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": tc.model.accountId,
			"customerId": tc.model.customerId,
			"planId": tc.model.planId
		}
	}
	if (tcStartup.tag.includes("subscription")) {
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /sub_[a-zA-Z0-9]+/, 'Tearup Subscription Created');
		tc.model.subscriptionId = payloadRsp.id;
		tc.model.invoiceId = payloadRsp.latest_invoice;
		subscriptionId = payloadRsp.id;
		invoiceId = payloadRsp.latest_invoice;
	}

// Coupons
	if (tcStartup.tag === "couponPlatform") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": ""
		}
	}
	if (tcStartup.tag === "couponConnect") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": tc.model.accountId
		}
	}
	if (tcStartup.tag.includes("coupon")) {
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /[a-zA-Z0-9]+/, 'Tearup Coupon Created');
		tc.model.couponId = payloadRsp.id;
		couponId = payloadRsp.id;
	}




// Sources
	if (tcStartup.tag === "sourcePlatform") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": ""
		}
	}
	if (tcStartup.tag === "sourceConnect") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": tc.model.accountId
		}
	}
	if (tcStartup.tag.includes("source")) {
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /src_[a-zA-Z0-9]+/, 'Tearup Source Created');
		tc.model.sourceId = payloadRsp.id;
		sourceId = payloadRsp.id;
	}
// Token
	if (tcStartup.tag === "tokenPlatform") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": ""
		}
	}
	if (tcStartup.tag === "tokenConnect") {
		payload = {
			...tcStartup.extTc.model,
			"accountId": tc.model.accountId
		}
	}
	if (tcStartup.tag.includes("token")) {
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /tok_[a-zA-Z0-9]+/, 'Tearup Token Created');
		// Tokens Can Be used as payment source , customer source param takes tokenId
//		tc.model.sourceId = payloadRsp.id;
		tc.model.tokenId = payloadRsp.id;
		tokenId = payloadRsp.id;
	}

// chargeConnect
	if (tcStartup.tag === "chargePlatform") {
		payload = {
			...tcStartup.extTc.model,
			"customerId": tc.model.customerId,
			"sourceId": tc.model.sourceId,
			"accountId": ""
		}
	}
	if (tcStartup.tag === "chargeConnect") {
		payload = {
			...tcStartup.extTc.model,
			"customerId": tc.model.customerId,
			"sourceId": tc.model.sourceId,
			"accountId": tc.model.accountId
		}
	}
	if (tcStartup.tag.includes("charge")) {
		payloadRsp = postRequest(tcStartup.extTc.endPoint, payload);
		assert.match(payloadRsp.id, /ch_[a-zA-Z0-9]+/, 'Tearup Charge Created');
		tc.model.chargeId = payloadRsp.id;
		chargeId = payloadRsp.id;
	}




// Customer
// If you want to create customer with Payment Source, lets add
	if (tcStartup.tag === "customerPlatform") {
		payload = {
			"sourceId": tc.model.sourceId,
			"accountId": "",
			... new Customer()
		}
	}
	if (tcStartup.tag === "customerConnect") {
		payload = {

//			"accountId": accountId,
			"accountId": tc.model.accountId,
// Equip Customer With Payment Source!!!
			"sourceId": tc.model.sourceId,
			... new Customer()
		}
	}
	if (tcStartup.tag.includes("customer")) {
		payloadRsp = postRequest("CustomerAdd", payload);
		assert.match(payloadRsp.id, /cus_[a-zA-Z0-9]+/, 'Tearup Connect Customer Created');
		tc.model.customerId = payloadRsp.id;
		customerId = payloadRsp.id;
	}





	return tc;
}


// # Test Data
// ## Mandatory
// # items : List of subscription items, each with an attached plan.
//
// ## Optional
// #collection_method: Either charge_automatically, or send_invoice.
// When charging automatically, Stripe will attempt to pay this subscription at the end of the cycle using the default source attached to the customer.
// When sending an invoice, Stripe will email your customer an invoice with payment instructions. Defaults to charge_automatically
// #days_until_due: Number of days a customer has to pay invoices generated by this subscription. Valid only for subscriptions where collection_method is set to send_invoice.
//
// # Rules
// Create a subscription on a connected account by performing a standard create subscription call while authenticated as the connected account.
// Again, both the customer and the plan must be defined on the connected account for this to work.
//
// # Returns
// if the call succeeded. If the attempted charge fails, the subscription is created in an incomplete status.










//# sourceURL=common_model.js