/*
 * To change this license header, choose License Headers in Project Propemsgies.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function postAnalytics(poItem) {

	var newEntry = {
		"productId": poItem.productId,
		"source": "joinup",
		"purpose": "purchase",
		"ts": []
	}
	if (window.location.pathname.includes("shop")) {
		newEntry.source = "shop"
	} else if (window.location.pathname.includes("activity")) {
		newEntry.source = "activity"
	} else if (window.location.pathname.includes("shop")) {
		newEntry.source = "shop"
	}
	var existingAnalytics = {}
	var modelAnalytics = {
		"accountId": "",
		"usage": [],
		"entries": [
			{
				"productId": "",
				"source": "",
				"purpose": "",
				"ts": []
			}
		]
	};
	existingAnalytics = modelAnalytics;
	var messageRsp = getDbRequestXByY("analytics", "accountId", poItem.accountId);
	if (messageRsp.length >= 1) {
		existingAnalytics = messageRsp[0]
		existingAnalytics.usage.push(getTs())
		// New TimeStamp entry
		existingAnalytics.entries.forEach(function (entry) {
			if (entry.productId === poItem.productId) {
				entry.ts.push(getTs())
			}
		})
		putDbRequest("analytics", existingAnalytics, existingAnalytics._id);
	} else {
		// First Time
		modelAnalytics.accountId = poItem.accountId;
		modelAnalytics.usage.push(getTs())
		// New entry
		modelAnalytics.entries.push(newEntry)

		postDbRequest("analytics", modelAnalytics);
	}


}
//# sourceURL=api_checkout_analytics.js