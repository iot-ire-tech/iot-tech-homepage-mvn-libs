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




describe("Bank Accounts and Customer(Sources)!", function () {
	var that = this;
	this.bail(true);

	modelCustomerBank.forEach(function (tc) {
		if (tc.expected.negative)
			that.bail(false);

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);

			});

			// SUT - Add Bank Account Customer
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /[cus_|cus_]_[a-zA-Z0-9]+/, 'Attached Default Bank Account');

		});

		modelCustomerBankAdd.forEach(function (tcUpdate) {

			it(tcUpdate.expected.case, function () {
				this.test._timeout = tcUpdate.performance.timeout;
				tcUpdate.startup.forEach(function (tcStartup) {
					// New Sources
					tcUpdate = getIds(tc, tcStartup);

				});
				// Same Account and Customer
				tcUpdate.model.accountId = tc.model.accountId;
				tcUpdate.model.customerId = tc.model.customerId;
				payload = {
					...tcUpdate.model
				}
				payloadRsp = postRequest(tcUpdate.endPoint, payload);
				assert.match(payloadRsp.id, /cus_[a-zA-Z0-9]+/, 'Added New Bank Account');

			});


		});


	});


});


describe("Bank Accounts and Customer(Token)!", function () {
	var that = this;
	this.bail(true);

	modelCustomerBankViaToken.forEach(function (tc) {
		if (tc.expected.negative)
			that.bail(false);

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);

			});

			// SUT - Add Bank Account Customer
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /[cus_|cus_]_[a-zA-Z0-9]+/, 'Attached Default Bank Account');

		});

		modelCustomerBankAddViaToken.forEach(function (tcUpdate) {

			it(tcUpdate.expected.case, function () {
				this.test._timeout = tcUpdate.performance.timeout;
				tcUpdate.startup.forEach(function (tcStartup) {
					// New Sources
					tcUpdate = getIds(tc, tcStartup);

				});
				// Same Account and Customer
				tcUpdate.model.accountId = tc.model.accountId;
				tcUpdate.model.customerId = tc.model.customerId;
				payload = {
					...tcUpdate.model
				}
				payloadRsp = postRequest(tcUpdate.endPoint, payload);
				assert.match(payloadRsp.id, /cus_[a-zA-Z0-9]+/, 'Added New Bank Account');

			});


		});


	});


});


//# sourceURL=stripe_paymentmethods_customer_bank_unit_tests.js


