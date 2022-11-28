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
	if (account.type === "platform") {
		describe("Connect Account Update", function () {

			modelAccountAddToC.forEach(function (tc) {

				it(tc.expected.case, function () {
					payload = {};
					payloadRsp = {};
					this.test._timeout = testDuration;

					payload = {
						"accountId": tc.model.accountId
					}
					payloadRsp = postRequest(tc.endPoint, payload);
					assert.match(payloadRsp.id, /acct_[a-zA-Z0-9]+/, 'Valid ToC Connect');
				});
			})

		});
	}

});

function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

//# sourceURL=stripe_connect_toc_unit_tests.js


