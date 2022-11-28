/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");


describe("Create Coupons...", function () {
	this.bail(true);

	modelBillingCoupon.forEach(function (tc) {

		if (tc.run) {
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
				assert.match(payloadRsp.id, /[a-zA-Z0-9]+/, 'Valid Coupon Added');

			});
		}
	});


});



function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

//# sourceURL=stripe_billing_coupons_unit_tests.js


