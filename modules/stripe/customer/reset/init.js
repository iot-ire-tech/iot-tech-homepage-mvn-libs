/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");
var email = parsedUrl.searchParams.get("email");

$(document).ready(function () {

    nsBrandingService.accountId = accountId
    nsBrandingService.brandMe();


    var uxBuinessMenuWidget = new UxCovidMenuWidget();

    var repeatMenu = setInterval(function () {
        if ($('#menuBarXHook')) {
            clearInterval(repeatMenu)
            $("#menuBarXHook").html(uxBuinessMenuWidget.init())
        }
    }, 10)

});

//# sourceURL=customer_reset_init.js


