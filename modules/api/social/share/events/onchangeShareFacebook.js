/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click ", '.facebookMsgShare', function () {

    var productId = $(this).attr("productId")
    var accountId = $(this).attr("accountId")
    var title = $(this).attr("description")
    var description = $(this).attr("description")
    var hashtags = $(this).attr("hashtags")

    $.ajaxSetup({cache: true});
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
        FB.init({
            appId: '278337369887438',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v7.0'
        });
        FB.ui({
                method: 'send',
                link: "https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?accountId=" + accountId + "&customerId=guestId&productId=" + productId + "/",
                redirect_uri: window.URL
            },
            function (response) {
                if (response && !response.error_message) {
//					alert('Posting completed.');
                } else {
//					alert('Error while posting.');
                }
            }
        );

    });
    $.ajaxSetup({cache: false});


    modelUsageSocial.shareMe.features.customer.messenger = true
    // nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.shareMe.features.customer)

});

$(document).on("click ", '.facebookShare', function () {

    var productId = $(this).attr("productId")
    var accountId = $(this).attr("accountId")
    var title = $(this).attr("description")
    var description = $(this).attr("description")
    var hashtags = $(this).attr("hashtags")

    nsMetaService.accountId = accountId
    nsMetaService.productId = productId
    nsMetaService.get().obj.items[0].name
    nsMetaService.get().obj.items[0].description
    var msg = ""

    msg += "\n"
    msg += "Share information..."
    msg += "\n"
    msg += "Product: " + nsMetaService.get().obj.items[0].name
    msg += "\n"
    msg += "Description: " + nsMetaService.get().obj.items[0].description
    msg += "\n"
    // msg += "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
    msg += "Thanks for sharing"
    msg += "\n"
    // MM

    // hashtags = "#mybusinesspal.com"

    $.ajaxSetup({cache: true});
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
        FB.init({
            appId: '278337369887438',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v7.0'
        });
        FB.ui({
                method: 'share',
                hashtag: hashtags,
                quote: msg,
                href: "https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?accountId=" + accountId
                // href: "https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?accountId=" + accountId + "&customerId=guestId&productId=" + productId + "/"
            },
            function (response) {
                if (response && !response.error_message) {
//					alert('Posting completed.');
                } else {
//					alert('Error while posting.');
                }
            }
        );

    });
    $.ajaxSetup({cache: false});
    modelUsageSocial.shareMe.features.customer.faceBook = true
    // nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.shareMe.features.customer)

});

$(document).on("click ", '.facebookShareBusiness', function () {

    var accountDetailsRsp = accountDetails(accountId);
    var msg = ""

    msg += "\n"
    msg += "Congratulations, you have been invited to join our business network. Click on the link below, to have your invite considered. The hosts details are..."
    msg += "\n"
    msg += "\n"
    msg += "Business Name: " + accountDetailsRsp.business_profile.name
    msg += "\n"
    msg += "Description:" + accountDetailsRsp.business_profile.product_description
    msg += "\n"
    msg += "\n"
    msg += "Thanks for sharing"
    msg += "\n"
    hashtags = "#mybusinesspal "

    $.ajaxSetup({cache: true});
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
        FB.init({
            appId: '278337369887438',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v7.0'
        });
        FB.ui({
                method: 'share',
                hashtag: hashtags,
                quote: msg,
                href: "https://www.mybusinesspal.com/services/modules/stripe/connectaccount/head/release/signup.jsp?hostId=" + accountId
            },
            function (response) {
                if (response && !response.error_message) {
//					alert('Posting completed.');
                } else {
//					alert('Error while posting.');
                }
            }
        );

    });
    $.ajaxSetup({cache: false});
    modelUsageSocial.shareMe.features.customer.faceBook = true

});

$(document).on("dblclick click", '.dialogPreviewMedia', function () {

    var id = $(this).attr("id")
//
//// Get Iframe source
    $("#dialogPreviewMedia" + id).removeClass("w3-hide")
    $("#dialogPreviewMedia" + id).addClass("w3-show")

    $("#dialogPreviewMedia" + id).dialog(dialogueProps)
//

});
//# sourceURL=api_social_share_events_facebook.js
