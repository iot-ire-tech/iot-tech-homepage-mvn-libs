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

describe("Workflow Testing - Collect Customer Payment", function () {
	this.bail(true);
	var that = this;

	modelWorkflowDirectChargePlatform2ConnectCard.forEach(function (tc) {
		if (tc.expected.negative)
			that.bail(false);

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);
			});


// Customer is on platform Account - So nullify for Connect Charge
			customerId = tc.model.customerId
			tc.model.customerId = "";
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /_[a-zA-Z0-9]+/, 'Valid Charge Added');
			customerId = payloadRsp.id;
		});

	});

	modelWorkflowDestinationChargePlatform2ConnectBank.forEach(function (tc) {
		if (tc.expected.negative)
			that.bail(false);

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);
			});


// Customer is on platform Account - So nullify for Connect Charge
// Token is on platform Account too - So nullify for Connect Charge ?
			tc.model.transferData.destination = tc.model.accountId;
			customerId = tc.model.customerId
			tc.model.customerId = "";
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /_[a-zA-Z0-9]+/, 'Valid Charge Added');
			customerId = payloadRsp.id;
		});

	});

});




//# sourceURL=stripe_workflow_unit_tests.js


