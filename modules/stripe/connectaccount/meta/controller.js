/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//# sourceURL=stripe_person_controller.js

$(document).on('click', '#save', function () {


// Below is the sequence to carry out, when adding a new account to platform account.

// 1. Retrieve Existing Account Meta
	account = {
		"accountId": accountId,
	};
	var item = {}
	var newMetadata = []
	var existingMetadata = []
	existingMetadata = postRequest("AccountGet", account).metadata;

// case 1.1 : First Time
	// total = 0
// case 1.2 : Existing Accounts
// update new total
	newtotal = parseInt(existingMetadata.total)
	newtotal += 1
	item = {
		"key": "total",
		"value": newtotal
	};
	newMetadata.push(item);
// add with new account key
	item = {
		"key": "accountId_" + newtotal,
		"value": accountId
	};
	newMetadata.push(item);

// Transform Object To Key/Value Array Objects
	for (var key  in existingMetadata) {
		var value = existingMetadata[key];
		if (key !== "total")
			newMetadata.push({
				"key": key,
				"value": value
			});
	}

	account = {
		"accountId": accountId,
		"metadata": newMetadata
	}

// Update Platform Account With New Meta
	accountRsp = postRequest("AccountAddMeta", account).id;


});
//
//# sourceURL=stripe_account_meta_ctrl.js