/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");


describe("Create Customer Subscription...", function () {
	this.bail(true);

	modelSubscription.forEach(function (tc) {

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
			assert.match(payloadRsp.id, /[sub|sub]_[a-zA-Z0-9]+/, 'Valid Subscription Added');

		});
	});


});


//# sourceURL=stripe_billing_subsscription_unit_tests.js


