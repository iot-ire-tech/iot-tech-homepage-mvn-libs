/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var originId = parsedUrl.searchParams.get("originId");


// Targeted Account
var accountId = parsedUrl.searchParams.get("accountId");
// need for redirect purpose
var accountIdP = parsedUrl.searchParams.get("accountIdP");
var accountIdC = parsedUrl.searchParams.get("accountIdC");

var newEntry = {}
var existingAnalytics = {}
var modelAnalytics = {}
var messageRsp = {}


$(document).ready(function () {


    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        var apiKey = "AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig";
        var url = "https://www.google.com/maps/embed/v1/streetview?location=53.3375%2C-6.2194&key=AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig"

        url = "https://www.google.com/maps/embed/v1/view"
        url += "?key=AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig"
        url += "&center="
        url += crd.latitude
        url += ","
        url += crd.longitude
        url += "&zoom="
        url += 10
        url += "&maptype=satellite"
        $("iframe").attr("src", url);

    }

    function error(error) {
//		console.warn(`ERROR(${err.code}): ${err.message}`);
        switch (error.code) {
            case error.PERMISSION_DENIED:
                // User denied access to location. Perhaps redirect to alternate content?
                alert('Permission was denied');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Position is currently unavailable.');
                break;
            case error.PERMISSION_DENIED_TIMEOUT:
                alert('User took to long to grant/deny permission.');
                break;
            case error.UNKNOWN_ERROR:
                alert('An unknown error occurred.')
                break;
        }
    }

    // navigator.geolocation.getCurrentPosition(success, error, options);

    if ("geolocation" in navigator) {
        /* geolocation is available */

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("hi")
        }, function (error) {
            //	alert("ERR:Navigator Error (" + error + ")")
        }, {maximumAge: 10000, timeout: 5000, enableHighAccuracy: true});
    } else {
        /* geolocation IS NOT available */
        alert("INF: Your browser doesnt support location, try different browser, Explore, Firefox, Chrome")
    }


    uxLoadDatePicker("#dob", {
        showOn: "button",
        buttonImage: "../../../../../resources/media/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: "yy-mm-dd"
    })


    var repeatHdr = setInterval(function () {
        if ($('#hdr')) {
            clearInterval(repeatHdr)
            nsBrandingService.accountId = accountId
            nsBrandingService.brandMe();
        }
    }, 10)

    if (originId.includes("customer"))
        var uxBuinessMenuWidget = new UxCovidMenuWidget();
    else if (originId.includes("onboarding"))
        var uxBuinessMenuWidget = new UxOnboardingMenuWidget();
    else if (originId.includes("provisioning"))
        var uxBuinessMenuWidget = new UxProvisioningMenuWidget();
    else if (originId.includes("dashboard"))
        var uxBuinessMenuWidget = new UxClientSubscriptionMenuWidget();

    uxLoad('#menuBarXHook', uxBuinessMenuWidget.init())

    tabsInit();


});

//# sourceURL=customer_init.js


