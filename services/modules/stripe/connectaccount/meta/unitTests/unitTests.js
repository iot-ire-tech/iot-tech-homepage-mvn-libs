/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");


describe("Create Subscription Products...", function () {
	this.bail(true);

	modelProducts.forEach(function (tc) {

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
			assert.match(payloadRsp.id, /[prod|prod]_[a-zA-Z0-9]+/, 'Valid Product Added');
//			assert.match(payloadRsp.status, /succeeded/, 'Status succeeded ');
		});
	});

});



//# sourceURL=stripe_billing_products_unit_tests.js


