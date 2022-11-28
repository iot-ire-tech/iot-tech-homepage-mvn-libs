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


$(window).ready(function () {

//	 accountId = acct_1FflMZJpsDSKPGiy
    modelContext = {
        ...modelUx
    }

// Onboarding Request
    if (originId === "ltdProfile")
        $("#onboardingtype").text("Corporation")
    if (originId === "nonProfitProfile")
        $("#onboardingtype").text("Non Profit")
    if (originId === "soleTraderProfile")
        $("#onboardingtype").text("Sole Trader")

    tabsInit();

    var accountRsp = accountDetails(accountId)
    if (accountRsp.individual !== null) {
        $("#businessName").val(accountRsp.business_profile.name).trigger("change")
        $("#mcc").val(accountRsp.business_profile.mcc).trigger("change")
        $("#description").val(accountRsp.business_profile.product_description).trigger("change")
        $("#supportUrl").val(accountRsp.business_profile.support_url).trigger("change")
        $("#supportPhone").val(accountRsp.business_profile.support_phone).trigger("change")
        $("#url").val(accountRsp.business_profile.url).trigger("change")

        $("#gender").val(accountRsp.individual.gender).trigger("change")
        $("#fname").val(accountRsp.individual.first_name).trigger("change")
        $("#lname").val(accountRsp.individual.last_name).trigger("change")
        $("#email").val(accountRsp.individual.email).trigger("change")
        $("#phone").val("0" + accountRsp.individual.phone.toString().split("+353")[1]).trigger("change")
        $("#dobyear").val(accountRsp.individual.dob.year).trigger("change")
        $("#dobmonth").val(accountRsp.individual.dob.month).trigger("change")
        $("#dobday").val(accountRsp.individual.dob.day).trigger("change")
        //
        $("#addressLine1").val(accountRsp.individual.address.line1).trigger("change")
        $("#postalCode").val(accountRsp.individual.address.postal_code).trigger("change")
        $("#state").val(accountRsp.individual.address.state).trigger("change")
        $("#city").val(accountRsp.individual.address.city).trigger("change")
        $("#country").val(accountRsp.individual.address.country).trigger("change")

//		$("#agree").attr("value", "checked").trigger("change")
        $("#agree").prop("checked", "true").trigger("change")

        verificationNeeded = false;
        accountRsp.individual.requirements.currently_due.forEach(function (item) {
            if (item.toString().includes("verification")) {
                verificationNeeded = true;
            }
        })
        if (verificationNeeded === false) {
//disable buttons
            $("input[name=front_1]").attr("disabled", true)
            $("input[name=back_1]").attr("disabled", true)
            $("input[name=front_2]").attr("disabled", true)
            $("input[name=back_2]").attr("disabled", true)
        }
        if (accountRsp.individual.id_number_provided === true)
            $("#idNumber").attr("disabled", true)

// Validation
//	var accountRspValidation = accountRequirements(accountId)
    }

    var uxBuinessMenuWidget = new UxOnboardingMenuWidget();
    uxLoad("#menuBarHook", uxBuinessMenuWidget.init())


});


//# sourceURL=onboarding_legal_indi_init.js


