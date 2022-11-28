/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelUx = {

// Model plus defaults
	"plan": {
		"active": true,
		"usageType": "licensed",
		"suffix": "",
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
		"units": 1,
		"active": true,
		"name": "",
		"type": "service",
		"description": ""
	},
// Model plus defaults
	"subscription": {
		// Trials
		"trialFromPlan": false,
		// Recurring
		"cancelAtPeriodEnd": false,
		// Are there others...
		"collectionMethod": "send_invoice",
		"dueDateDays": 1,
//		"collectionMethod": "charge_automatically",
		"applicationFeePercent": 0
	}
}

//# sourceURL=signup_subscription_model.js
