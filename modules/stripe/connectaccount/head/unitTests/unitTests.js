/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");

describe("Connect Accounts", function () {
	this.bail(false);

	modelAccountAdd.forEach(function (tc) {

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
			assert.match(payloadRsp.id, /[acct_|acct_]_[a-zA-Z0-9]+/, 'Valid Card Account Added');

		});

//		modelAccountUpdate.forEach(function (tcUpdate) {
//
//			it(tcUpdate.expected.case, function () {
//				this.test._timeout = tcUpdate.performance.timeout;
//				tcUpdate.model.accountId = tc.model.accountId;
//				payload = {
//					...tcUpdate.model
//				}
//				payloadRsp = postRequest(tc.endPoint, payload);
//				assert.match(payloadRsp.id, /acct_[a-zA-Z0-9]+/, 'Added New Card Account');
//
//			});
//
//
//		});
	});


});
//# sourceURL=stripe_connect_head_unit_tests.js


