/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var customerId = parsedUrl.searchParams.get("customerId");
var originId = parsedUrl.searchParams.get("originId");

var accountId = parsedUrl.searchParams.get("accountId");
// need for redirect purpose
var accountIdP = parsedUrl.searchParams.get("accountIdP");
var accountIdC = parsedUrl.searchParams.get("accountIdC");


var ts = new getTodaysDate();


$(document).ready(function () {

//	 accountId = acct_1FflMZJpsDSKPGiy
    modelContext = {
        ...modelUx
    }

    var uxBuinessMenuWidget = new UxOnboardingMenuWidget();
    $("#menuBarHook").html(uxBuinessMenuWidget.init())


    // Corporation Onboarding Request
    if (originId === "ltdProfile")
        $("#onboardingtype").text("Corporation")
    if (originId === "nonProfitProfile")
        $("#onboardingtype").text("Non Profit")
    if (originId === "soleTraderProfile")
        $("#onboardingtype").text("Sole Trader")


    tabsInit();


    var accountRsp = accountDetails(accountId)
    if (accountRsp.company !== null) {
        $("#businessNameLtd").val(accountRsp.business_profile.name).trigger("change")
        $("#businessName").val(accountRsp.business_profile.name).trigger("change")
        $("#mcc").val(accountRsp.business_profile.mcc).trigger("change")
        $("#description").val(accountRsp.business_profile.product_description).trigger("change")
        $("#supportUrl").val(accountRsp.business_profile.support_url).trigger("change")
        $("#supportPhone").val(accountRsp.business_profile.support_phone).trigger("change")
        $("#url").val(accountRsp.business_profile.url).trigger("change")
        // "charges_enabled": true,

        $("#email").val(accountRsp.company.email).trigger("change")
        $("#businessPhoneLtd").val("0" + accountRsp.company.phone.toString().split("+353")[1]).trigger("change")


        $("#address1Ltd").val(accountRsp.company.address.line1).trigger("change")
        $("#postalCodeLtd").val(accountRsp.company.address.postal_code).trigger("change")
        $("#stateLtd").val(accountRsp.company.address.state).trigger("change")
        $("#cityLtd").val(accountRsp.company.address.city).trigger("change")
        $("#countryLtd").val(accountRsp.company.address.country).trigger("change")


        $("#agree").prop("checked", "true").trigger("change")

    }
});

//# sourceURL=onboarding_legal_biz_init.js


