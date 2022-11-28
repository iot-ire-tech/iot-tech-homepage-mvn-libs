/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


initUx:{


}
uxModification: {

	dataImpact: {
	}
}

exitUx: {

}

dataIn:{


// Send Email Direct!!!
	$(document).on("click ", '.usedMeEmailDirect', function () {
		var productId = $(this).attr("productId")
		var accountId = $(this).attr("accountId")
	});

// Send Email Service!!!
	$(document).on("click ", '.usedMeEmail', function () {
		var productId = $(this).attr("productId")
		var accountId = $(this).attr("accountId")
		modelUsageSocial.contactMe.features.customer.notification.email = true
		nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.contactMe)
	});

	$(document).on("click ", '.usedMePhone', function () {
		var productId = $(this).attr("productId")
		var accountId = $(this).attr("accountId")

		modelUsageSocial.contactMe.features.customer.notification.tel = true
		nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.contactMe)
	});

// Send Web SMS
	$(document).on("click ", '.usedMeSMS', function () {
		var productId = $(this).attr("productId")
		var accountId = $(this).attr("accountId")

		modelUsageSocial.contactMe.features.customer.notification.sms = true
		nsUsageService.usageService({"accountId": accountId, "productId": productId, "customerId": customerId}, modelUsageSocial.contactMe)
	});


	$(document).on("click ", '.btnContactMeClose', function () {
		$("#dialogFollowMe").dialog("close");
	});




}

dataSave:{

}

dataDelete:{

}


//# sourceURL=api_social_contactme_events.js