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

describe("Customer Testing", function () {
	this.bail(true);
	var that = this;

	modelCustomer.forEach(function (tc) {
		if (tc.expected.negative)
			that.bail(false);

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
			assert.match(payloadRsp.id, /[cus_|cus_]_[a-zA-Z0-9]+/, 'Valid Card Customer Added');
			customerId = payloadRsp.id;
		});

		modelCustomerUpdate.forEach(function (tcUpdate) {
			if (tcUpdate.expected.negative)
				that.bail(false);

			it(tcUpdate.expected.case, function () {
				this.test._timeout = tcUpdate.performance.timeout;
				tcUpdate.startup.forEach(function (tcStartup) {
					// New Sources
					tcUpdate = getIds(tc, tcStartup);
				});
				// Same Account and Customer
				tcUpdate.model.accountId = accountId;
				tcUpdate.model.customerId = customerId;
				payload = {
					...tcUpdate.model
				}
				payloadRsp = postRequest(tcUpdate.endPoint, payload);
				assert.match(payloadRsp.id, /cus_[a-zA-Z0-9]+/, 'Added New Card Account');
			});
		});
	});
});

//		it("Update Retrieve ", function () {
//			this.test._timeout = testDuration;
//
//			modelCustomer.accountId = account.accountId;
//			modelCustomer.customerId = account.customerId;
//			account.customerId = postRequest("CustomerGet", modelCustomer).id;
//			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Details Retrieved');
//		});
//
//
//		it("List All", function () {
//			this.test._timeout = testDuration;
//
//			modelCustomer.accountId = account.accountId;
//			modelCustomer.customerId = account.customerId;
//			var customerList = postRequest("CustomerGetAll", modelCustomer);
//			assert.isArray(customerList.data, 'Valid Customer Detail List Retrieved');
//		});





//# sourceURL=stripe_customer_unit_tests.js


