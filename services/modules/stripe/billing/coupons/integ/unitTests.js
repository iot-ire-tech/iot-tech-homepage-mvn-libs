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

	describe("Account Type (" + account.type + ") Account Id (" + account.accountId + ")", function () {

		modelSourceBankSepa.forEach(function (tc) {
			it("New Sepa Account IBAN(" + tc.data.bank.iban + ")", function () {
				payload = {};
				payloadRsp = {};
				this.test._timeout = testDuration;
				payload.accountId = account.accountId;

				payload.iban = tc.data.bank.iban;
				payload.transaction = tc.data.transaction;
				payload.person = tc.data.person;

				payloadRsp = postRequest("AddSourceSepa", payload);
				assert.match(payloadRsp.id, /src_[a-zA-Z0-9]+/, 'Valid Sepa Source Created');
				assert.match(payloadRsp.type, /sepa_debit/, 'Valid Sepa Source Created');
			});
			it("Update SEPA Source Id (" + payloadRsp.id + ")", function () {

			});
		})





	})

});

function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

//# sourceURL=stripe_source_sepa_unit_tests.js


