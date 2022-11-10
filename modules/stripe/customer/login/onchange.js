/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Form : Authentication!!!
$(document).on('change ', '#username', function () {
    modelContext.userAccount.user = $(this).val();
});
$(document).on('change ', '#password', function () {
    modelContext.userAccount.pass = $(this).val();
});

$(document).on('click', '#newUserPasswordReset', function () {

    if (accountIdC === "") {
        url = "/services/modules/stripe/customer/reset/release/emailconfirmation.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "customerId=" + customerId + "&" +
            "originId=customer"
    } else {
        url = "/services/modules/stripe/customer/reset/release/emailconfirmation.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountIdP + "&" +
            "accountIdC=" + accountId + "&" +
            "customerId=" + customerId + "&" +
            "originId=customer"
    }

    redirectMe2({
        "alocation": location.origin + contextPath + url, "where": "_self"
    });
});


$(document).on('click', '#newUser', function () {

    if (accountIdC === "") {
        url = "/services/modules/stripe/customer/release/customer.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "customerId=" + customerId + "&" +
            "originId=customer"
    } else {
        url = "/services/modules/stripe/customer/release/customer.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountIdP + "&" +
            "accountIdC=" + accountId + "&" +
            "customerId=" + customerId + "&" +
            "originId=customer"
    }
    redirectMe2({
        "alocation": location.origin + contextPath + url, "where": "_self"
    });
});

var btnMembershipOptionsClicked = false;
$(document).on('click', '#btnMembershipOptions', function () {
    btnMembershipOptionsClicked = true;
});


$(document).on('change', '.offering', function () {
    modelContext.offering = $(this).val();
});


//# sourceURL=customer_login_change.js