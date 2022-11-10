/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("click ", '.linkedInShare', function () {


    var productId = $(this).attr("productId")
    var accountId = $(this).attr("accountId")
    var description = $(this).attr("description")
    var title = $(this).attr("atitle")

    var urlProductId = "https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?accountId=" + accountId + "&customerId=guestId&productId=" + productId + "/"
    var title = "MyBusinessPal Item Share"
    var summary = "Product Description"

    var urlShareLinkedIn = "http://www.linkedin.com/shareArticle?mini=true&"
    urlShareLinkedIn += "url=" + urlProductId + "&"
    urlShareLinkedIn += "title=" + title + "&"
    urlShareLinkedIn += "summary=" + summary + "&"
    urlShareLinkedIn += "source=mybusinesspal.com"

//	$(".shareFrame").attr("src", urlShareLinkedIn)
//	$.get(urlShareLinkedIn, function (response) {
//		var html = response;
//		var html_src = 'data:text/html;charset=utf-8,' + html;
//		$(".shareFrame").attr("src", html_src);
//	});
    var win = redirectMe2({"alocation": urlShareLinkedIn});
//	win.document.write("<p>A new window!</p>");         // Some text in the new window
//	win.focus();

    modelUsageSocial.shareMe.features.customer.linkedIn = true
    // nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.shareMe.features.customer)
});


$(document).on("click ", '.linkedInShareBusiness', function () {

    var accountDetailsRsp = accountDetails(accountId);

    var urlProductId = "https://www.mybusinesspal.com/services/modules/stripe/connectaccount/head/release/signup.jsp?hostId=" + accountId + "/"
    var title = "MyBusinessPal.com business invite!"
    var summary = "Congratulations, you have been invited to join " + accountDetailsRsp.business_profile.name + " business network. Click on the link below, to have your invite considered."
    // summary += "%0A"
    // summary += "Business Name: " + accountDetailsRsp.business_profile.name + ""
    // summary += "%0A"
    // summary += "Description: " + accountDetailsRsp.business_profile.product_description + ""
    // summary += "%0A"

    var urlShareLinkedIn = "http://www.linkedin.com/shareArticle?mini=true&"
    urlShareLinkedIn += "url=" + urlProductId + "&"
    urlShareLinkedIn += "title=" + title + "&"
    urlShareLinkedIn += "summary=" + summary + "&"
    urlShareLinkedIn += "source=mybusinesspal.com"

    var win = redirectMe2({"alocation": urlShareLinkedIn});

    modelUsageSocial.shareMe.features.customer.linkedIn = true
    // nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.shareMe.features.customer)
});
//# sourceURL=api_social_share_events_linkedIn.js
