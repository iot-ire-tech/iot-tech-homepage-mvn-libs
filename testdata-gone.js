/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// https://stripe.com/docs/connect/setting-mcc#list
var mcc = "";
var phone = "000 000 0000";
var sms = "000-000";
// Use TOKENS stubs were possible!!!!
var cardPaymentMethods = ["pm_card_visa"];
// Tokens return Is!!
var cardTokens = ["tok_unionpay", "tok_jcb", "tok_diners", "tok_discover", "tok_amex", "tok_mastercard_prepaid", "tok_mastercard_debit", "tok_mastercard", "tok_visa_debit", "tok_visa", "tok_ie", "tok_gb", "tok_gb_debit"];
// The type is a payment method, one of a
// ch_credit_transfer, ach_debit, alipay, bancontact, card, card_present, eps, giropay, ideal, multibanco, klarna, p24, sepa_debit, sofort, three_d_secure, or wechat
var sourceTypes = ["sepa_debit", "ach_credit_transfer", "card"]


//payment_method_details:
//ach_credit_transfer: null
//ach_debit: null
//acss_debit: null
//alipay: null
//bancontact: null
//bitcoin: null
//card: null
//card_present: null
//eps: null
//giropay: null
//ideal: null
//multibanco: null
//p24: null
//sepa_debit: {bank_code: "37040044", branch_code: null, country: "DE", fingerprint: "ebwTS1i702QrXgqN", last4: "3002"}
//sofort: null
//stripe_account: null
//type: "sepa_debit"
//wechat: null
var sourcePaymentMethods = [
	{
		"type": "sepa",
		"id": "src_1FQGXGFOjjfpNUIxOeKUqXn3",
		"msg": "German Amount 10 Euro SEPA Source"
	}
]
var sourcePaymentMethodsach_credit_transfer = [
	{
		"type": "sepa",
		"id": " src_1FQGDAFOjjfpNUIxrXeoMJMW",
		"msg": "German Amount 10 Euro SEPA Source"
	}
	,
	{
		"type": "ach_credit_transfer",
		"id": "src_1FQGDAFOjjfpNUIxrXeoMJMW",
		"msg": "Amount 10 Euro Source"
	}
]
//cardTokens = ["tok_visa"];
// Plans define the base price, currency, and billing cycle for subscriptions.
// For example, you might have a €5/month plan that provides limited access to your products, and a €15/month plan that allows full access.
var testDuration = 10000
var productId = "";
var customerId = "cus_FqXXNhXF3OPzE0"
customerId = "cus_FvFjkqDJjKcYit" // Active Payment Source Attached
customerId = "cus_FvFhDFlCXJnO3M" // No Payment Sources.
customerId = "cus_Fw2M5CByn6B3Xk"
customerId = "cus_Fz3UpY8jCjYzT7"
var stripePlatform = {
	"type": "platform",
	"accountId": "",
	"customerId": customerId,
	"planId": "plan_FuKOxJwM0WIEWq",
	"productId": "prod_FuKOVDIH3S7l41",
	"subscriberId": "",
	"sourceId": {
		"ach": "src_1FQzlQFOjjfpNUIxi8PgKktg", // Flow: receiver Status: chargeable Usage: reusable
		// Test Germany Account, Could be Sportsco Too.
		"sepa": sourcePaymentMethods,
		//"card": cardTokens,	// Works
		//  // 1.01 Credit on it. https://dashboard.stripe.com/test/sources/src_1FQxtRFOjjfpNUIxYBrSnAVG
		"card": [{
				"id": "src_1FQy0fFOjjfpNUIxspdNb7zc", // charagble single-use
				"id2": "src_1FQy0gFOjjfpNUIxHePO6jns" // charagle, reusable
			}
		],
		"person": ""
	}
}
// IOT X
var accountIdConnect = "acct_1FVHKKIgqDhDavxp"
accountIdConnect = "acct_1FWq5FK51WFZ46kX"; // test
accountIdConnect = "acct_1FWr1FGyA0IQub2z"; // live
accountIdConnect = "acct_1FXChSGjfLzIBBwL"; // test

var customerIdConnect = "cus_FqXXNhXF3OPzE0"
customerIdConnect = "cus_FqXXNhXF3OPzE0"
var stripeConnect = {
	"type": "connect",
	"accountId": accountIdConnect,
	"customerId": customerIdConnect,
	"planId": "plan_FuKDZT17V5y2lB",
	"productId": "prod_FuKC0LRXrwjd79",
	"subscriberId": "",
	"sourceId": {
		"ach": "src_1FQzlRL4EJM4TcRumFpAQeAJ", // Type: ach_credit_transfer Flow: receiver Status: chargeable Usage: reusable // Routing number: 110000000 Account number: test_5f377d9718b6
		"sepa": "",
		//"card": cardTokens,
		"card": [{
				"id": "src_1FQy0hL4EJM4TcRuJS0MFD2x", // charagble single-use
				"id2": "src_1FQy0iL4EJM4TcRufgIIcfkq" // charagle, reusable
			}
		],
		//
		"person": ""
	}
}
var accountTypes = [stripePlatform, stripeConnect];
//accountTypes = [stripePlatform];
// accountTypes = [stripeConnect];


var currency = "usd"




//////////////////////////
// Authentication Methods
//////////////////////////
// https://stripe.com/docs/connect/authentication
// Stripe Header
// OAuth
// API Keys



//////////////////////////
// Account Banks
//////////////////////////
// Results
// https://dashboard.stripe.com/acct_1FG0S6L4EJM4TcRu/test/connect/accounts/acct_1FG0S6L4EJM4TcRu
///



var modelCustomerList =
	[
		{
			"data": {
				"list": 100,
				"expected": {"case": "Create Destination Charge On Connect Account from Card Id source", "object": "list", "size": 0, "regEx": ""}
			}
		}
	]

// Notes
//  https://stripe.com/docs/api/customers/create



//
//"sourceId": {
//		"ach": "src_1FQzlRL4EJM4TcRumFpAQeAJ", // Type: ach_credit_transfer Flow: receiver Status: chargeable Usage: reusable // Routing number: 110000000 Account number: test_5f377d9718b6
//		"sepa": "",
//		//"card": cardTokens,
//		"card": [{
//				"id": "src_1FQy0hL4EJM4TcRuJS0MFD2x", // charagble single-use
//				"id2": "src_1FQy0iL4EJM4TcRufgIIcfkq" // charagle, reusable
//			}
//		],
//		//
//		"person": ""
//	}




//
// Billing
//
// https://stripe.com/docs/billing/lifecycle
// https://stripe.com/docs/billing/subscriptions/payment
//

//# sourceURL=testdata.js