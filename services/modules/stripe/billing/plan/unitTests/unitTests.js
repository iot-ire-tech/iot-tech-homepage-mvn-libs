/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");


describe("Create Product Plans...", function () {

	this.bail(true);
	modelPlans.forEach(function (tc) {

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);

			});


			// SUT - Create Customer
			// With Account and Customer ID!!!
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /[plan|plan]_[a-zA-Z0-9]+/, 'Valid Plan Added');

		});
	});


});


//# sourceURL=stripe_billing_plans_unit_tests.js


