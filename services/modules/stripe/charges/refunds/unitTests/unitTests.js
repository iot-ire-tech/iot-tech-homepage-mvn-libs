/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");



describe("Connect Account, Create Customer Refunds", function () {
	this.bail(true);

	modelCustomerRefund.forEach(function (tc) {

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
			assert.match(payloadRsp.id, /[re_|re_]_[a-zA-Z0-9]+/, 'Valid Customer Refund Added');
			assert.match(payloadRsp.status, /succeeded/, 'Status succeeded ');
		});
	});

});




//# sourceURL=stripe_customer_refund_unit_tests.js


