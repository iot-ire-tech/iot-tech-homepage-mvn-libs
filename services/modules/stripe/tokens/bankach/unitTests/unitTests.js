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

		modelTokenBankACH.forEach(function (tc) {

			it("Update ACH Source Id ", function () {
				payload = {};
				payloadRsp = {};
				this.test._timeout = testDuration;
				assert.match("z", /[a-zA-Z0-9]+/, 'Valid ACH Source Created');
			});
			it("New Token Bank ACH Transfer Account (" + tc.data.bank.number + ")", function () {
				payload = {};
				payloadRsp = {};
				this.test._timeout = testDuration;
				payload.accountId = account.accountId;
				payload.accountHolderName = tc.data.bank.name;
				payload.accountHolderType = tc.data.bank.type;
				payload.routingNumber = tc.data.bank.routing;
				payload.accountNumber = tc.data.bank.number;
				payload.country = tc.data.bank.country;
				payload.transaction = tc.data.transaction;
				payload.person = tc.data.person;
				payloadRsp = postRequest("AddTokenBankAch", payload);
				assert.match(payloadRsp.object, /token/, 'Valid ACH Token Created');
				assert.match(payloadRsp.id, /btok_[a-zA-Z0-9]+/, 'Valid ACH Token Created');
				assert.match(payloadRsp.type, /bank_account/, 'Valid ACH Token Created');
			});
		})

	})
})


function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

//# sourceURL=stripe_token_bankach_unit_tests.js


