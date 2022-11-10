$(document).on('click', '#login', function () {
    var url = "/services/modules/stripe/customer/login/release/users.jsp?accountId="
    redirectMe(location.origin + contextPath + url + accountId, 10, "_self");
})

//# sourceURL=customer_subscription_events.js
