/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var customerId = parsedUrl.searchParams.get("customerId");

var accountId = parsedUrl.searchParams.get("accountId");
// need for redirect purpose
var accountIdP = parsedUrl.searchParams.get("accountIdP");
var accountIdC = parsedUrl.searchParams.get("accountIdC");


var ts = new getTodaysDate();


$(document).ready(function () {

//	 accountId = acct_1FflMZJpsDSKPGiy
    modelContext = {
        "accountId": accountId,
        ...modelUx
    }


    var uxBuinessMenuWidget = new UxOnboardingMenuWidget();
    $("#menuBarHook").html(uxBuinessMenuWidget.init())


    if (parsedUrl.href.includes("admin")) {
        query = {
            "accountId": accountId,
        };
        var cardSourcesRsp = postRequest("ExtBankAccountList", query);
        uxAccountBankUpdate(cardSourcesRsp);
        uxAccountBankDelete(cardSourcesRsp)
    }


});


//# sourceURL=onboarding_payment_source_sepa_init.js


