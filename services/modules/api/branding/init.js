var parsedUrl = new URL(window.location.href);

// Targeted Account
var accountId = parsedUrl.searchParams.get("accountIdP");
// need for redirect purpose
var accountIdP = parsedUrl.searchParams.get("accountIdP");
var accountIdC = parsedUrl.searchParams.get("accountIdC");

$(document).ready(function () {


    var uxBuinessMenuWidget = new UxClientSubscriptionMenuWidget();
    uxLoad("#menuBarHook", uxBuinessMenuWidget.init())

});

//# sourceURL=api_branding_init.js