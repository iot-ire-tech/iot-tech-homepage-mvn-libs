/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var modelUxSubscription = {
// Owner of this subscription
	"accountId": "",
// Model plus defaults
	"planIds": [],
	"plan": {
		"accountId": "",
		"productId": "",
		"active": true,
		"usageType": "licensed",
		"name": "",
		"scheme": "",
		"transaction": {"amount": 0, "amountDec": 0, "currency": ""},
		"schedule": {
			"trialPeriodDays": 0,
			"interval": "month", "count": 0
		}
	},
// Model plus defaults
	"product": {
		"accountId": "",
		"units": 1,
		"active": true,
		"name": "",
		"type": "service",
		"description": ""
	},
// Model plus defaults
	"subscription": {
		"accountId": "",
		"customerId": "",
		"subscriptionId": "",
		"couponId": "",
		"members": [],
		"title": "",
// Revenue
		// Trials
		"trialFromPlan": false,
		// Recurring
		"cancelAtPeriodEnd": false,
		// Are there others...
		"collectionMethod": "send_invoice",
		"dueDateDays": 1,
//		"collectionMethod": "charge_automatically",
		"applicationFeePercent": 5,
// UX
		"media": {"vids": [], "pics": [], "youtube": [], "facebook": []},
		"coupon": {
			...new Coupon()
		}
	}

};