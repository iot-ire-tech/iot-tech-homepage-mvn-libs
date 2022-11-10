$(document).on('change ', '#bankAccountService', function () {

    redirectMe2({
        "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/extBankAccount/release/form.jsp?accountId=" + accountId + "&customerId=" + customerId + "&originId=bankAccountService" ,
        "where": "_self"
    });
});


$(document).on('change ', '#ltdProfile', function () {
    redirectMe2({
        "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/business/release/profile.jsp?accountId=" + accountId + "&customerId=" + customerId + "&originId=ltdProfile" ,
        "where": "_self"
    });
});

$(document).on('change ', '#individualProfile', function () {
    redirectMe2({
        "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/individual/release/profile.jsp?accountId=" + accountId + "&customerId=" + customerId + "&originId=individualProfile" ,
        "where": "_self"
    });
});
$(document).on('change ', '#nonProfitProfile', function () {
    redirectMe2({
        "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/individual/release/profile.jsp?accountId=" + accountId + "&customerId=" + customerId + "&originId=nonProfitProfile",
        "where": "_self"
    });
});
$(document).on('change ', '#soleTraderProfile', function () {
    redirectMe2({
        "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/individual/release/profile.jsp?accountId=" + accountId + "&customerId=" + customerId + "&originId=soleTraderProfile",
        "where": "_self"
    });
});
$(document).on('change ', '#accountStatus', function () {
    redirectMe2({
        "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/accountstatus/release/check.jsp?accountId=" + accountId + "&customerId=" + customerId + "&originId=" + modelContext.offering,

        "where": "_self"
    });
});
$(document).on('change ', '#subscriptionService', function () {

    var urlx = "/services/modules/stripe/billing/subscription/release/signup.jsp?"

    urlx += "accountIdC=" + accountId + "&"
    urlx += "customerIdC=" + nsCustomerService.customerId + "&"
    urlx += "accountIdP=acct_1CBNZCFOjjfpNUIx" + "&"
    urlx += "customerIdP=" + nsCustomerService.customerIdP + "&"
    urlx += "originId=" + window.location.pathname
    redirectMe2({
        "alocation": location.origin + contextPath + urlx,
        "where": "_self"
    });


});


//# sourceURL=client_onboarding_change2.js
