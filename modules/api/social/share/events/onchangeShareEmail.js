/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("click ", '.emailShare', function () {


    var productId = $(this).attr("productId")
    var accountId = $(this).attr("accountId")
    var description = $(this).attr("description")
    var title = $(this).attr("atitle")

// https://blog.escapecreative.com/customizing-mailto-links/

    var urlProductId = new URL("https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?accountId=" + accountId + "\&customerId=guestId\&productId=" + productId + "/")

    var urlShareEmail = "mailto:<add destination email here>?"
    urlShareEmail += "subject=MyBusinessPal.com is sharing product information with you for your consideration&"
    urlShareEmail += "body=Hey!!!"
    urlShareEmail += "%0A"
    urlShareEmail += "Thank you for showing interest in our http%3A%2F%2Fwww.mybusinesspal.com%2F"
    urlShareEmail += "%0A"
    urlShareEmail += "%0A"
    urlShareEmail += "Title: " + title + ""
    urlShareEmail += "%0A"
    urlShareEmail += "Description: " + description + ""
    urlShareEmail += "%0A"
    urlShareEmail += "Product link: " + urlProductId + ""
    urlShareEmail += "%0A"
    urlShareEmail += "All the best, thank your for your interest, and loyalty!"
    urlShareEmail += "%0A"
    urlShareEmail += "%0A"
    urlShareEmail += "%0A"
    urlShareEmail += "Best Regards,"
    urlShareEmail += "%0A"
    urlShareEmail += "From the folks atMyBusinessPal.Com"
    urlShareEmail += "%0A"
    urlShareEmail += "%0A"
// fa fa-facebook
    var win = redirectMe2({"alocation": urlShareEmail});
//https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=MyBusinessPal.com+is+sharing+product+information+with+you+for+your+consideration&to=%3Cadd+destination+email+here%3E&body=Hey!!!%0AThank+you+for+showing+interest+in+our+http://www.mybusinesspal.com/%0A%0ATitle:+devops%0ADescription:+kjkljjkljkl%0AProduct+link:+https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?accountId%3Dacct_1GRdJxF6KR5nnzB2
// "mailto:<add destination email here>?subject=MyBusinessPal.com is sharing product information with you for your consideration&body=Hey!!!%0AThank you for showing interest in our http%3A%2F%2Fwww.mybusinesspal.com%2F%0A%0ATitle: devops%0ADescription: kjkljjkljkl%0AProduct link: https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?accountId=acct_1GRdJxF6KR5nnzB2&customerId=guestId&productId=prod_HTJZFrPXR3yDle/%0AAll the best, thank your for your interest, and loyalty!%0A%0A%0ABest Regards,%0AFrom the folks atMyBusinessPal.Com%0A%0A"


    modelUsageSocial.shareMe.features.customer.email = true
    // nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.shareMe.features.customer)

});

$(document).on("click ", '.emailShareBusiness', function () {

    var accountDetailsRsp = accountDetails(accountId);

    var urlShareEmail = "mailto:<invitees email address>?"
    urlShareEmail += "subject=MyBusinessPal.com business invite!&"
    urlShareEmail += "body=Hey!!!"
    urlShareEmail += "%0A"
    urlShareEmail += "Congratulations, you have been invited to join our business network. Click on the link below, to have your invite considered. The hosts details are..."
    urlShareEmail += "%0A"
    urlShareEmail += "%0A"
    urlShareEmail += "Business Name: " + accountDetailsRsp.business_profile.name + ""
    urlShareEmail += "%0A"
    urlShareEmail += "Description: " + accountDetailsRsp.business_profile.product_description + ""
    urlShareEmail += "%0A"
    urlShareEmail += "Link: https://www.mybusinesspal.com/services/modules/stripe/connectaccount/head/release/signup.jsp?hostId=" + accountId
    urlShareEmail += "%0A"
    // urlShareEmail += "Link: <a href=https://www.mybusinesspal.com/services/modules/stripe/connectaccount/head/release/signup.jsp?inviterId=" + accountId + ">Test</a>"
    // urlShareEmail += "%0A"
    urlShareEmail += "%0A"
    urlShareEmail += "All the best, thank you for sharing!"
    urlShareEmail += "%0A"
    urlShareEmail += "%0A"
    urlShareEmail += "%0A"
    urlShareEmail += "Best Regards,"
    urlShareEmail += "%0A"
    urlShareEmail += "From the folks at MyBusinessPal.Com"
    urlShareEmail += "%0A"
    urlShareEmail += "%0A"
// fa fa-facebook
    var win = redirectMe2({"alocation": urlShareEmail});

    modelUsageSocial.shareMe.features.customer.email = true
    // nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.shareMe.features.customer)

});


//# sourceURL=api_social_share_events_email.js
