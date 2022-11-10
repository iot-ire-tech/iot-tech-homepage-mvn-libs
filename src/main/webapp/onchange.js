/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


if (location.origin.toString().includes("local")) {
    var contextPath = ""
} else {
    var contextPath = "/"
}

$(document).on('click ', '.btnSignup', function () {
    var sp = $(this).attr("id")
//	redirectMe(location.origin + contextPath + "/services/modules/stripe/connectaccount/head/release/signup.jsp?subscriptionPlan=" + sp, 0);
    redirectMe(location.origin + contextPath + "/services/modules/stripe/connectaccount/head/release/signup.jsp", 0);
});


$(document).on("click", "#newAccount", function () {
    // Redirect to account page
    // redirectMe(location.origin + contextPath + "/services/modules/stripe/client/release/account.jsp", 0);
    redirectMe(location.origin + contextPath + "/services/modules/stripe/connectaccount/head/release/signup.jsp", 0);

});

$(document).on("click", "#id02", function () {


    $('#ourstoryvid').get(0).pause();
    $('#ourstoryvid').get(0).currentTime = 0;

});

$(document).on("click", ".demoMailAnchor", function () {

    redirectMe(location.origin + contextPath + "contactus.jsp?origins=homepage", 0);
});


//# sourceURL=homepage_onchange.js
