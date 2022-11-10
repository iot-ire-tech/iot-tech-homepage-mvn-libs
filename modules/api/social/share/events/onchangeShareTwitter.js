/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click ", '.twitterShareBusiness', function () {

	var accountDetailsRsp = accountDetails(accountId);

	var description = 	"Congratulations, you have been invited to join " + accountDetailsRsp.business_profile.name + " business network."
	var hashtags = "myBusinessPal.social"


	var urlShareTwitter = "https://twitter.com/intent/tweet?"
	urlShareTwitter += "url=https://www.mybusinesspal.com/services/modules/stripe/connectaccount/head/release/signup.jsp\?hostId=" + accountId+"&"
	//140 or 280
	if (description.toString().length < 280)
		urlShareTwitter + "text=" + description + "&"
	else {
		alert("Sorry your tweet is too long, max length less than 140 characters, spaces included!")
		return
	}

	if (hashtags.toString().length > 0)
		urlShareTwitter += "hashtags=www.myBusinessPal.com," + hashtags
	else
		urlShareTwitter += "hashtags=www.myBusinessPal.com"


	modelUsageSocial.shareMe.features.customer.twitter = true
	// nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.shareMe.features.customer)

	var win = redirectMe2({"alocation": urlShareTwitter});
});

$(document).on("click ", '.twitterShare', function () {


	var productId = $(this).attr("productId")
	var accountId = $(this).attr("accountId")
	var description = $(this).attr("description")
	var hashtags = $(this).attr("hashtags")


	var urlShareTwitter = "https://twitter.com/intent/tweet?"
	urlShareTwitter += "url=https:/www.MyBusinessPal.com&"
	if (description.toString().length < 140)
		urlShareTwitter + "text=" + description + "&"
	else {
		alert("Sorry your tweet is too long, max length less than 140 characters, spaces included!")
		return
	}

	if (hashtags.toString().length > 0)
		urlShareTwitter += "hashtags=myBusinessPal.com," + hashtags + ""
	else
		urlShareTwitter += "hashtags=myBusinessPal.com"


	modelUsageSocial.shareMe.features.customer.twitter = true
	// nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.shareMe.features.customer)

	var win = redirectMe2({"alocation": urlShareTwitter});
});
//# sourceURL=api_social_share_events_twitter.js
