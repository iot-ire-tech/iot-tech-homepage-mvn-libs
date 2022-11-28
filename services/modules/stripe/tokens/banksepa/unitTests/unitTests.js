/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");



describe("Bank Token Test Suite", function () {
	var that = this;
//	this.bail(false);

	modelTokenBankSepa.forEach(function (tc) {
		if (tc.expected.negative)
			that.bail(false);
		else
			that.bail(true);

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
			assert.match(payloadRsp.id, /[tok_|tok_|cus_]_[a-zA-Z0-9]+/, 'Valid Token Note Added');
		});
	});

//	modelTokenBankSepaLink.forEach(function (tc) {
//		if (account.type === "connect")
//			it("Creating Token Based on a Customer/Card Id Combo For Charge Purposes", function () {
//				payload = {};
//				payloadRsp = {};
//				this.test._timeout = testDuration;
//				payload = {
//					"accountId": account.accountId,
//					"customerId": tc.data.customer.platfromCustomerId,
//					"bankId": tc.data.bank.id
//				}
//
//				payloadRsp = postRequest("AddTokenBankSepa", payload);
//				assert.match(payloadRsp.id, /tok_[a-zA-Z0-9]+/, 'Valid Sepa Token Created');
//			});
//	});

});
//# sourceURL=stripe_token_bank_unit_tests.js


