/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");

// var mytable = new tableDataFunc();

$(document).ready(function () {

// init model
	if (accountId === null)
		alert("INF: Your invite URL is not correct, contact support asap")

	modelContext = {
		...modelUx
	}

// Update model with biz name
	payload = {
		"accountId": accountId
	};
	payloadRsp = postRequest("AccountGet", payload);

	bizName = payloadRsp.business_profile.name;
	modelContext.bizName = bizName;
	website = payloadRsp.business_profile.url;
	modelContext.website = website;

});
//# sourceURL=stripe_invite_init.js


