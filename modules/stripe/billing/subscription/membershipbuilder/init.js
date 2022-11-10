/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// var parsedUrl = new URL(window.location.href);
// var primaryId = parsedUrl.searchParams.get("primaryId");
// var accountId = parsedUrl.searchParams.get("accountId");
// var customerId = parsedUrl.searchParams.get("customerId");
// var ts = new getTodaysDate();


$(document).ready(function () {
//
//     modelContext = Object.assign(modelContext, modelUxSubscription)
//
// //	if (primaryId === null) {
// //		alert("WRN: Url malformed, platform owner not found, contact support asap")
// //		return
// //	} else {
// //		accountId = primaryId;
// //	}
// //	if (accountId === null) {
// //		// Primary Mode
// //	}
//
//     var i = setTimeout(function () {
//
//         refreshProductPlansWidgetListing()
//         widgetUpdateProducts("init")
//         widgetUpdateProducts("planBuilder")
//         clearInterval(i)
//     }, 4000)
//
//
// //	modelContext.subscription.customerId = customerId;
// //	modelContext.subscription.accountId = accountId;
//
//     modelContext.subscription.media.vids = []
//     modelContext.subscription.media.pics = []


    // only when a plan is available and select should the subscription button be enabled.
    // $("#saveSub, #addSub").attr("disabled", true)
    var attribs = new Map()
    attribs.set("disabled", true);
    uxLoadAttrib("#saveSub", attribs)

});
//# sourceURL=stripe_membership_builder_init.js


