/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var customerId = parsedUrl.searchParams.get("customerId");

var accountId = parsedUrl.searchParams.get("accountId");
// need for redirect purpose
var accountIdP = parsedUrl.searchParams.get("accountIdP");
var accountIdC = parsedUrl.searchParams.get("accountIdC");

var ts = new getTodaysDate();


$(document).ready(function () {

    var uxBuinessMenuWidget = new UxOnboardingMenuWidget();
    $("#menuBarHook").html(uxBuinessMenuWidget.init())


    var status = getAccountRequirementsStatus(accountId)
    if (status.eventually_due === false && status.currently_due === false && status.pending_verification === false && status.disabled_reason === false) {
        // add account to community family
        // addAccountToPrimary(accountId)
    }

    var accountStatu = getAccountRequirementsWidget(accountId)


});

//# sourceURL=onboarding_account_status_init.js


