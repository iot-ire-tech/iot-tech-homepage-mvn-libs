/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");


var htmlBanner;

function initTrace() {



    checkOnMessages()

}


$(window).ready(function () {
    var items = []


    if (parsedUrl.toString().includes("backend"))
        var uxBuinessMenuWidget = new UxProvisioningMenuWidget();

    if (parsedUrl.toString().includes("business/tracing/release/portal.jsp"))
        var uxBuinessMenuWidget = new UxCovidMenuWidget();

    $("#menuBarBizHook").html(uxBuinessMenuWidget.init())


    customerListing:{
        var uxWidgetCustomerListRsp = uxWidgetCustomerList({
            "accountId": accountId,
            "productId": "",
            "className": "pocCustomerList messagingUsers",
            "size": 5,
            "multiple": ""
        })
        var htmlMembersList = uxWidgetCustomerListRsp.getHtml();
        var htmlPocWidget = UxPoCInline().build(htmlMembersList).getHtml();
        $(".customerListHook").html(htmlPocWidget)
    }

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    $("#datetime").val(new Date())

    nsCovidService.accountId = accountId;
    nsCovidService.customerId = customerId;

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

    if (!parsedUrl.toString().includes("backend"))
        if ("geolocation" in navigator) {
            /* geolocation is available */

            navigator.geolocation.getCurrentPosition(function (position) {
                nsCovidService.modelItem.geo.lat = position.coords.latitude
                nsCovidService.modelItem.geo.lon = position.coords.longitude
                $("td#long").text(nsCovidService.modelItem.geo.lon)
                $("td#lat").text(nsCovidService.modelItem.geo.lat)

            }, function (error) {
                //	alert("ERR:Navigator Error (" + error + ")")
            }, {maximumAge: 10000, timeout: 5000, enableHighAccuracy: true});
        } else {
            /* geolocation IS NOT available */
            alert("INF: Your browser doesnt support location, try different browser, Explore, Firefox, Chrome")
        }

    nsBrandingService.accountId = accountId
    nsBrandingService.brandMe();

    initTrace()

})

//# sourceURL=stripe_covid_init.js


