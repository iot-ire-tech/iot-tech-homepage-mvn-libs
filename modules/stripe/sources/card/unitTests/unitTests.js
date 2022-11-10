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

describe("Card Sources", function () {
	this.bail(true);
	var that = this;

	modelSourceCard.forEach(function (tc) {
		if (tc.expected.negative)
			that.bail(false);

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
			assert.match(payloadRsp.id, /[src_|src_]_[a-zA-Z0-9]+/, 'Valid Source Note Added');
		});
	});
});

//# sourceURL=stripe_source_cards_unit_tests.js


