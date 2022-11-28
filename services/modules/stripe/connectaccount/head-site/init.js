/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var hostId = parsedUrl.searchParams.get("hostId");


$(document).ready(function () {

    var html = '<div id=vistor_container class="w3-panel w3-light-grey w3-padding" style="margin-left: -45%; margin-right: -45%;">'
    html += "<h6>Congratulations!</h6>"
    html += '<p>You have been invited to join as a partner, by the following platform owner...'
    html += "<div class=w3-center>"
    html += '<b>Name</b>: <span id="platformOwner"></span><br>'
    html += '<b>Website</b>: <span id="platformSite"></span><br>'
    html += '<b>Email</b>: <span id="platformEmail"></span><br>'
    html += '<b>Location</b>: <span id="platformLocation"></span>'
    html += "</div>"
    html += 'Upon completion of the form below, you will need to complete the Onboarding process<br>'
    html += 'If you have any questions, contact us at the support center, and we will guide your through the process.</p>'
    html += "</div>"
    if (hostId !== null) {
        // is host enabled
        if (!getAccountCompliance(hostId)) {
            $("#newAccount").attr("disabled", true)
            var msg = '<div id=vistor_container class="w3-panel w3-light-grey w3-padding w3-center" style="margin-left: -45%; margin-right: -45%;">'
            msg += "<br>"
            msg += "<h1>This account is not fully compliant yet.</h1>"
            msg += "<h3>Please return to your dashboard to resolve, thereafter reissue your invite request</h3>"
            msg += "<h5>If you need further assistance, contact support asap</h5>"
            msg += "<br>"
            msg += "</div>"
            uxLoad("#vistorHook", msg)
            return
        }

        // Get Business Name
        var account = {
            "accountId": hostId
        };
        accountRsp = postRequest("AccountGet", account);
        // Update Vistors wiget
        uxLoad("#vistorHook", html)
        uxLoad("#platformOwner", accountRsp.business_profile.name);
        uxLoad("#platformSite", accountRsp.business_profile.support_url);
        uxLoad("#platformEmail", accountRsp.email);
        uxLoad("#platformLocation", accountRsp.country);
        uxLoad("#offerings", accountRsp.country);
//		uxLoad("#vistor_container").delay(10000).fadeOut("slow")
    } else
        hostId = ""

    modelContext = {
        ...new Person(),
        ...new Address()
    };


});

//# sourceURL=onboarding_head_init.js


