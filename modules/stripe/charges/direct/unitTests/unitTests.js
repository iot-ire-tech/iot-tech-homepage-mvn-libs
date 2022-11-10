/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var payload = {};
var payloadRsp = {};


describe("From The Connect Account, Create Direct Charges Per Accounts Types", function () {
	this.bail(true);
	modelChargeDirect.forEach(function (tc) {

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);
			});
			// SUT -
			// With
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /[ch_|ch_]_[a-zA-Z0-9]+/, 'Valid Charge Added');
		});
	});

});


//# sourceURL=stripe_chargedirect_unittests.js


