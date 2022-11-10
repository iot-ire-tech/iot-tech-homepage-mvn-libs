/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var customerId = ""
var customerRsp = {}
$(document).on('click', '#btnOnboardMe', function () {

    var isChecked = false
    $("input[name=offering]").each(function () {
//			isChecked = $(this).val()
        if ($(this).is(':checked'))
            isChecked = true
    })
    if (!isChecked)
        throw Error("INF: You must select an offering before proceeding")

    onboardingNavi()

})


function onboardingNavi() {

    // Invitee mode


    if (offering === "bankAccountService") {
        if (accountIdC === "") {
            url = "/services/modules/stripe/connectaccount/extBankAccount/release/form.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + offering
        } else {
            url = "/services/modules/stripe/connectaccount/extBankAccount/release/form.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + offering
        }

        redirectMe2({
            "alocation": location.origin + contextPath + url,
            "where": "_self"
        });
    }


    if (accountIdC === "") {
        url = "/services/modules/stripe/connectaccount/individual/release/profile.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "customerId=" + customerId + "&" +
            "originId=" + offering
    } else {
        url = "/services/modules/stripe/connectaccount/individual/release/profile.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountIdP + "&" +
            "accountIdC=" + accountId + "&" +
            "customerId=" + customerId + "&" +
            "originId=" + offering
    }

    if (offering === "individualProfile" || offering === "nonProfitProfile" || offering === "soleTraderProfile") {
        redirectMe2({
            "alocation": location.origin + contextPath + url,
            "where": "_self"
        });
    }

    if (accountIdC === "") {
        url = "/services/modules/stripe/connectaccount/business/release/profile.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "customerId=" + customerId + "&" +
            "originId=" + offering
    } else {
        url = "/services/modules/stripe/connectaccount/business/release/profile.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountIdP + "&" +
            "accountIdC=" + accountId + "&" +
            "customerId=" + customerId + "&" +
            "originId=" + offering
    }

    if (offering === "ltdProfile") {
        redirectMe2({
            "alocation": location.origin + contextPath + url,
            "where": "_self"
        });
    } else if (offering === "nonProfitProfile") {
        redirectMe2({
            "alocation": location.origin + contextPath + url,
            "where": "_self"
        });


    }


    if (accountIdC === "") {
        url = "/services/modules/stripe/connectaccount/accountstatus/release/check.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "customerId=" + customerId + "&" +
            "originId=" + offering
    } else {
        url = "/services/modules/stripe/connectaccount/accountstatus/release/check.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountIdP + "&" +
            "accountIdC=" + accountId + "&" +
            "customerId=" + customerId + "&" +
            "originId=" + offering
    }

    if (offering === "accountStatus") {
        redirectMe2({
            "alocation": location.origin + contextPath + url,
            "where": "_self"
        });
    } else if (offering === "accountDeletion") {
        redirectMe2({
            "alocation": location.origin + contextPath + url,
            "where": "_self"
        });
    }


}

//# sourceURL=client_onboarding_ctrl.js