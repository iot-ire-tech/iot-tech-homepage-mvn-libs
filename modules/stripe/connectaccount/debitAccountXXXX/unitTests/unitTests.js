/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");



describe("External Bank On Connect Account", function () {
	var that = this;
	this.bail(true);

	modelBankAccountCreate.forEach(function (tc) {
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
			assert.match(payloadRsp.id, /[acct_|acct_]_[a-zA-Z0-9]+/, 'Valid (Account) Bank Account Created');

		});

		modelBankAccountAdd.forEach(function (tcUpdate) {

			it(tcUpdate.expected.case, function () {
				this.test._timeout = tcUpdate.performance.timeout;
				tcUpdate.startup.forEach(function (tcStartup) {
					tcUpdate = getIds(tc, tcStartup);

				});
				tcUpdate.model.accountId = tc.model.accountId;
				payload = {
					...tcUpdate.model
				}
				payloadRsp = postRequest(tcUpdate.endPoint, payload);
				assert.match(payloadRsp.id, /acct_[a-zA-Z0-9]+/, 'Added (Account) Bank Account');

			});


		});
	});


});


//# sourceURL=stripe_bank_account_external_unit_tests.js


