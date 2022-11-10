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

    // onboardingNavi()

})


function onboardingNavi() {

    if (offering === "subscriptionServices") {
        // need source p
        nsCustomerService.modelQuery = {
            "accountId": "acct_1CBNZCFOjjfpNUIx",
            "role": "cfo"
        }
        nsCustomerService.getCfo()

        var urlx = "/services/modules/stripe/billing/subscription/release/signup.jsp?"

        urlx += "accountIdC=" + accountId + "&"
        urlx += "customerIdC=" + nsCustomerService.customerId + "&"
        urlx += "accountIdP=acct_1CBNZCFOjjfpNUIx" + "&"
        urlx += "customerIdP=" + nsCustomerService.customerIdP + "&"
        // urlx += "originId=onboarding"
        urlx += "originId=" + window.location.pathname
        redirectMe2({
            "alocation": location.origin + contextPath + urlx,
            "where": "_self"
        });

    } else if (offering === "newUser") {
        redirectMe2({
            "alocation": location.origin + contextPath + "/services/modules/stripe/customer/release/customer.jsp?accountId=" + accountId + "&originId=onboarding",
            "where": "_self"
        });

    } else if (offering === "bankAccountService") {
        redirectMe2({
            "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/extBankAccount/release/form.jsp?accountId=" + accountId + "&originId=" + offering,
            "where": "_self"
        });
    } else if (offering === "individualProfile"
        || offering === "nonProfitProfile"
        || offering === "soleTraderProfile"

    ) {
        redirectMe2({
            "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/individual/release/profile.jsp?accountId=" + accountId + "&originId=" + offering,
            "where": "_self"
        });
    } else if (offering === "ltdProfile") {
        redirectMe2({
            "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/business/release/profile.jsp?accountId=" + accountId + "&originId=" + offering,
            "where": "_self"
        });
    } else if (offering === "nonProfitProfile") {
        redirectMe2({
            "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/business/release/profile.jsp?accountId=" + accountId + "&originId=" + offering,
            "where": "_self"
        });
    } else if (offering === "accountStatus") {
        redirectMe2({
            "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/accountstatus/release/check.jsp?accountId=" + accountId + "&originId=" + offering,
            "where": "_self"
        });
    } else if (offering === "accountDeletion") {
        redirectMe2({
            "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/accountstatus/release/check.jsp?accountId=" + accountId + "&originId=" + offering,
            "where": "_self"
        });
    }

    // else if (offering === "newUser") {
    //     http://localhost:8084/services/modules/stripe/customer/release/customer.jsp?accountId=acct_1GRdJxF6KR5nnzB2&originId=customer
    //     redirectMe2({
    //         "alocation": location.origin + contextPath + "/services/modules/stripe/customer/release/customer.jsp?accountId=" + accountId +"&originId=onboarding",
    //         "where": "_self"
    //     });
    // }

    //

}

//# sourceURL=client_onboarding_ctrl.js