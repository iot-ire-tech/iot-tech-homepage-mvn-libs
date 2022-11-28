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

		modelSourceBankACH.forEach(function (tc) {

			it("New Sepa Account IBAN(" + tc.data.bank.iban + ")", function () {
				payload = {};
				payloadRsp = {};
				this.test._timeout = testDuration;
				payload.accountId = account.accountId;

				payload.accountHolderName = tc.data.bank.name;
				payload.accountHolderType = tc.data.bank.type;
				payload.routingNumber = tc.data.bank.routing;
				payload.accountNumber = tc.data.bank.number;

				payload.transaction = tc.data.transaction;
				payload.person = tc.data.person;

				payloadRsp = postRequest("AddSourceACH", payload);
				assert.match(payloadRsp.id, /src_[a-zA-Z0-9]+/, 'Valid ACH Source Created');
				assert.match(payloadRsp.type, /ach_credit_transfer/, 'Valid ACH Source Created');
			});
			it("Update ACH Source Id (" + payloadRsp.id + ")", function () {

			});
		})





	})

});

function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

//# sourceURL=stripe_source_ach_unit_tests.js


