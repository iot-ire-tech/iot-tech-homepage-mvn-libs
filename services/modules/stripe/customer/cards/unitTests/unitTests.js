/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");

var payload = {};
var payloadRsp = {};
var customerId = "";
var accountId = "";

describe("Create Cards On Customers(Source)", function () {
	this.bail(true);

	modelCardsCustomerViaSource.forEach(function (tc) {

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);

			});

			// SUT - Subscriptions
			// With Account and Customer ID!!!
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /[cus_|cus_]_[a-zA-Z0-9]+/, 'Valid Card Customer Added');

		});

		modelCardsCustomerAddViaSource.forEach(function (tcUpdate) {


			it(tcUpdate.expected.case, function () {
				this.test._timeout = tcUpdate.performance.timeout;
				tcUpdate.startup.forEach(function (tcStartup) {
					// New Sources
					tcUpdate = getIds(tc, tcStartup);

				});
				// Same Account and Customer
				tcUpdate.model.accountId = tc.model.accountId;
				tcUpdate.model.customerId = tc.model.customerId;
				payload = {
					...tcUpdate.model
				}
				payloadRsp = postRequest(tcUpdate.endPoint, payload);
				assert.match(payloadRsp.id, /cus_[a-zA-Z0-9]+/, 'Added New Card Account');

			});


		});
	});


});

//describe("Create Cards On Customers(Dictionary)", function () {
//	this.bail(true);
//
//	modelCardsCustomer.forEach(function (tc) {
//
//		it(tc.expected.case, function () {
//			this.test._timeout = tc.performance.timeout;
//			tc.startup.forEach(function (tcStartup) {
//				tc = getIds(tc, tcStartup);
//
//			});
//
//			// SUT - Subscriptions
//			// With Account and Customer ID!!!
//			payload = {
//				...tc.model
//			}
//			payloadRsp = postRequest(tc.endPoint, payload);
//			assert.match(payloadRsp.id, /[cus_|cus_]_[a-zA-Z0-9]+/, 'Valid Card Customer Added');
//
//		});
//
//		modelCardsCustomerAdd.forEach(function (tc) {
//
//			it(tc.expected.case, function () {
//				this.test._timeout = tc.performance.timeout;
//				tc.model.customerId = customerId;
//				tc.model.accountId = accountId;
//				payload = {
//					...tc.model
//				}
//				payloadRsp = postRequest(tc.endPoint, payload);
//				assert.match(payloadRsp.id, /cus_[a-zA-Z0-9]+/, 'Added To Existing Customer');
//
//			});
//
//
//		});
//	});
//
//
//});




//# sourceURL=stripe_paymentmethods_customer_cards_unit_tests_connect.js


