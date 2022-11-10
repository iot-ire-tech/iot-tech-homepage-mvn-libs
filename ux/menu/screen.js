// TODO session management, not to be able to switch between login and logout without authentication..

$(document).on('click', '.userLogout', function () {


    try {

        logout:{
            nsAuthenticationService.accountId = accountId
            nsAuthenticationService.customerId = customerId
            nsAuthenticationService.modelItem = {
                "ts": new Date().toISOString(),
                "type": "logout",
                "offering": "",
                "username": nsAuthenticationService.modelItem.username,
                "password": nsAuthenticationService.modelItem.password,
                "role": "user"
            }
            nsAuthenticationService.service()
        }
    } catch (e) {
        console.log("ERR: Navigation Screen userLogout (" + e + ")")
    }

    if (accountIdC !== "")
        var url = "/services/modules/stripe/customer/login/release/users.jsp?" +
            "accountId=" + accountIdP + "&" +
            "accountIdP=" + accountIdP + "&" +
            "accountIdC=" + accountIdC + "&" +
            "originId=customer"
    else
        var url = "/services/modules/stripe/customer/login/release/users.jsp?" +
            "accountId=" + accountIdP + "&" +
            "accountIdP=" + accountIdP + "&" +
            "accountIdC=" + "&" +
            "originId=customer"

    redirectMe(location.origin + contextPath + url, 1000, "_self");

});


$(document).on('click', '.userHome', function () {
    var url = "/index.jsp"
    redirectMe(location.origin + contextPath + url, 0, "_self");
});


// $(document).on('click', '.provisioningHome', function () {
//     var url = "/services/modules/stripe/customer/login/release/business.jsp?accountId="
//     redirectMe(location.origin + contextPath + url + accountId, 1000, "_self");
// });


// $(document).on('click', '.onboardingHome', function () {
//     var url = "/services/modules/business/onboarding/release/portal.jsp?accountId="
//     redirectMe(location.origin + contextPath + url + accountId, 1000, "_self");
// });

$(document).on('click', '.meetTeam', function () {
    var url = "/services/modules/stripe/customer/login/release/business.jsp?accountId="
    // redirectMe(location.origin + contextPath + url + accountId, 1000, "_self");
});

$(document).on('click', '.education', function () {
    var url = "/services/modules/stripe/customer/login/release/business.jsp?accountId="
    // redirectMe(location.origin + contextPath + url + accountId, 1000, "_self");
});


$(document).on('click', '.dashboardHome, .provisioningHome, .onboardingHome', function () {

    if (accountIdC !== "")
        var url = "/services/modules/business/dashboard/release/home.jsp?accountId=" + accountIdC + "&originId=" + accountIdP
    else
        var url = "/services/modules/business/dashboard/release/home.jsp?accountId=" + accountIdP
    redirectMe(location.origin + contextPath + url, 1000, "_self");
});

//# sourceURL=ux_menu_events.js
