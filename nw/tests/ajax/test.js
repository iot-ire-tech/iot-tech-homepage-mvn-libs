/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var postUrl = "https://api.mlab.com/api/1/databases/dev/collections/analytics?apiKey=wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"

$(document).ready(function () {
//window.on("load", function () {

//var newPayload = JSON.parse(payload)
	analytics(
		"post",
		postUrl,
		{
			"item": {
//				"pk": newPayload.pk,
				"reason": "post"
			}
		}
	)

})
//logEvent('Tab.NewTabScriptStart', true);
//window.addEventListener('load', function (e) {
//	logEvent('Tab.NewTabOnload', true);
//});
//document.addEventListener('DOMContentLoaded', function (e) {
//	logEvent('Tab.NewTabDOMContentLoaded', true);
//});

function analytics(mode, url, payload) {

	$.ajax({
		url: url,
		type: mode,
		async: this.async,
		timeout: this.timeout,
		data: JSON.stringify(payload),
		contentType: "application/json; charset=utf-8"
	}).done(function (data, text) {

	}).fail(function (request, status, error) {
		this.ajaxErrorHandler(request, status, error);
	});
}

//# sourceURL=testIt.js