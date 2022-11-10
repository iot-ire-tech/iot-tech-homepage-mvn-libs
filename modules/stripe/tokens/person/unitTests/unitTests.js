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


describe("Card Token Test Suite", function () {
	this.bail(true);

	modelTokenCard.forEach(function (tc) {

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);
			});
			// SUT - Subscriptions
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /[tok_|tok_]_[a-zA-Z0-9]+/, 'Valid Token Note Added');
		});
	});

});

//	modelTokenCardCustomerCardLink.forEach(function (tc) {
//		if (account.type === "connect")
//			it("Creating Token Based on a Customer/Card Id Combo For Charge Purposes", function () {
//				this.test._timeout = testDuration;
//				payload = {
//					"accountId": account.accountId,
//					"customerId": tc.data.customer.platfromCustomerId,
//					"cardId": tc.data.card.id
//				}
//
//				payloadRsp = postRequest("AddTokenCard", payload);
//				assert.match(payloadRsp.id, /tok_[a-zA-Z0-9]+/, 'Valid Card Token Created');
//			});
//	});


//# sourceURL=stripe_token_person_unit_tests_connect.js


