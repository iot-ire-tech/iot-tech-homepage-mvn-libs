/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");



describe("From The Platform Account, Create Destination Charges On Connect Accounts Types", function () {
	this.bail(true);
	modelChargeDestinationCharge.forEach(function (tc) {

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);
			});
			// SUT - Subscriptions
			// With Account and Customer ID!!!
			tc.model.transferData.destination = tc.model.accountId;
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /[ch_|ch_]_[a-zA-Z0-9]+/, 'Valid Charge Added');
		});
	});

	modelChargeDestinationPayment.forEach(function (tc) {

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);
			});
			// SUT - Subscriptions
			// With Account and Customer ID!!!
			tc.model.transferData.destination = tc.model.accountId;
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /[py_|py_]_[a-zA-Z0-9]+/, 'Valid Payment Added');
		});
	});
});




//# sourceURL=stripe_charge_destination_unit_tests.js


