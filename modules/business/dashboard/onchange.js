/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).on('click ', '#embedMe', function () {
    clipboardCopy('#embedMeText')
})
$(document).on('click ', '#inlineMe', function () {

    clipboardCopy('#inlineMeText')
})

$(document).on('click ', '#launchOnboarding', function () {

    if (originId === null) {
        url = "/services/modules/business/onboarding/release/portal.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "originId=dashboard"
    } else {
        url = "/services/modules/business/onboarding/release/portal.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + originId + "&" +
            "accountIdC=" + accountId + "&" +
            "originId=dashboard"
    }

    redirectMe2({
        "alocation": location.origin + contextPath + url,
        "where": "_self"
    });
});

$(document).on('click ', '#launchProvisioning', function () {

    if (originId === null) {
        url = "/services/modules/stripe/customer/login/release/business.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "originId=dashboard"
    } else {
        url = "/services/modules/stripe/customer/login/release/business.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + originId + "&" +
            "accountIdC=" + accountId + "&" +
            "originId=dashboard"
    }

    redirectMe2({
        "alocation": location.origin + contextPath + url,
        "where": "_self"
    });
});
$(document).on('click ', '#launchCustomers', function () {

    if (originId === null) {
        url = "/services/modules/stripe/customer/login/release/users.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "originId=dashboard"
    } else {
        url = "/services/modules/stripe/customer/login/release/users.jsp?" +
            "accountId=" + originId + "&" +
            "accountIdP=" + originId + "&" +
            "accountIdC=" + accountId + "&" +
            "originId=dashboard"
    }

    redirectMe2({
        "alocation": location.origin + contextPath + url,
        "where": "_self"
    });

});

$(document).on('click ', '#launchBranding', function () {


    if (originId === null) {
        url = "/services/modules/api/branding/release/branding.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "originId=dashboard"
    } else {
        url = "/services/modules/api/branding/release/branding.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + originId + "&" +
            "accountIdC=" + accountId + "&" +
            "originId=dashboard"
    }

    redirectMe2({
        "alocation": location.origin + contextPath + url + accountId,
        "where": "_self"
    });
});

$(document).on('click ', '#launchAnalytics', function () {


    if (originId === null) {
        url = "/services/modules/stripe/customer/login/release/business_analytics.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "originId=dashboard"
    } else {
        url = "/services/modules/stripe/customer/login/release/business_analytics.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + originId + "&" +
            "accountIdC=" + accountId + "&" +
            "originId=dashboard"
    }

    redirectMe2({
        "alocation": location.origin + contextPath + url,
        "where": "_self"
    });
});


$(document).on('click ', '#launchBusinessGrowth', function () {

    if (originId === null) {
        url = "/services/modules/stripe/customer/login/release/business_growth.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "originId=dashboard"
    } else {
        url = "/services/modules/stripe/customer/login/release/business_growth.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + originId + "&" +
            "accountIdC=" + accountId + "&" +
            "originId=dashboard"
    }

    redirectMe2({
        "alocation": location.origin + contextPath + url + accountId,
        "where": "_self"
    });
});


$(document).on('click', '.userNewCfo2', function () {
    var url = ""

    if (originId === null) {
        url = "/services/modules/stripe/customer/release/customer.jsp?accountId=" + accountId + "&originId=dashboard"


    } else {
        url = "/services/modules/stripe/customer/release/customer.jsp?" +
            "accountId=" + originId + "&" +
            "accountIdP=" + originId + "&" +
            "accountIdC=" + accountId + "&" +
            "originId=dashboard"
    }
    redirectMe2({
        "alocation": location.origin + contextPath + url,
        "where": "_self"
    });

});

$(document).on('click', '.userSubscription2', function () {
    // CFO
    // Might have
    nsCustomerService.modelQuery = {
        "accountId": platformId,
        "role": "cfo"
    }
    nsCustomerService.getCfo()
    // returns a customer set!!
    // 1. platform customer!
    // 2. primary customer
    // Invitee Only Mode (therefore optional)
    // 3. affiliate customer#1
    // 4. affiliate customer#2
    // .. affiliate customer#3

    var urlx = "/services/modules/stripe/billing/subscription/release/signup.jsp?"
// accountId=acct_1GRdJxF6KR5nnzB2
    if (originId === null) {
        urlx += "accountIdPlt=" + platformId + "&"
        urlx += "customerIdPlt=" + nsCustomerService.customerIdP + "&"

        urlx += "accountIdP=" + accountId + "&"
        urlx += "customerIdP=" + nsCustomerService.customerId + "&"

        // affiliate
        urlx += "accountIdC=&"
        urlx += "customerIdC=&"

        urlx += "originId=dashboard"


// accountId=acct_1HPtUNC7HMYXL8w8&originId=acct_1GRdJxF6KR5nnzB2
    } else {
        urlx += "accountIdPlt=" + platformId + "&"
        urlx += "customerIdPlt=" + nsCustomerService.customerIdP + "&"

        urlx += "accountIdP=" + originId + "&"
        urlx += "customerIdP=" + nsCustomerService.customerId + "&"

        // affiliate
        urlx += "accountIdC=" + accountId + "&"
        urlx += "customerIdC=" + nsCustomerService.customerId + "&"

        urlx += "originId=dashboard"

    }
    redirectMe2({
        "alocation": location.origin + contextPath + urlx,
        "where": "_self"
    });


});

//# sourceURL=client_dashboard_change.js