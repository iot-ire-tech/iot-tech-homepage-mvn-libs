/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");



accountTypes.forEach(function (account) {
	var payload = {};
	var payloadRsp = {};
	var accountRsp = {};
	var accountId = {};
	if (account.type === "platform") {
		describe("Connect Account Update", function () {

			modelAccountAddBankAccountSepa.forEach(function (tc) {
				if (tc.run) {
					// For Each Startup
					tc.startup.testcase.forEach(function (tcStartup) {

						it(tc.expected.case + "(" + tcStartup.expected.case + ")", function () {
							this.test._timeout = tc.performance.timeout;
							// Update Account As Charable..
							payload = {};
							payloadRsp = {};
							// Setup Tests!!! - Create Account
							payload = {
								...tcStartup.startup.testcase.model
							}
							accountRsp = postRequest(tcStartup.startup.testcase.endPoint, payload);
							accountId = accountRsp.id;
							assert.match(accountId, /acct_[a-zA-Z0-9]+/, 'Tearup Test Created');


							// Setup Tests!!! - Create Account - Business/Indivual
							tcStartup.model.accountId = accountId;
							payload = {
								...tcStartup.model
							}
							accountRsp = postRequest(tcStartup.endPoint, payload);
							accountId = accountRsp.id;
							assert.match(accountId, /acct_[a-zA-Z0-9]+/, 'Tearup Test Created');



							// SUT!!!
							payload = {
								"accountId": accountId,
								"transaction": tc.model.transaction,
								...tc.model.bank
							}
							payloadRsp = postRequest(tc.endPoint, payload);
							assert.match(payloadRsp.id, /acct_[a-zA-Z0-9]+/, 'Valid Sepa Account Attached To Connect');
						})
					});
				}
			})

		});
	}

});

function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

//# sourceURL=stripe_connect_sepa_unit_tests.js


