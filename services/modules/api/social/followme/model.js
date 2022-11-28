/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Queries
// if customer usage, pull down charge
var modelFollowMe =
	{
		"accountId": "",
		"productId": "",
		"customerId": "",
		"ts": "",
		"item": []
	}

var modelFollowMeItem = {
	"productId": "",
	"customers": [],
	"runningTotal": 0
}

var modelFollowMeQuery = {
	"accountId": "",
	"productId": "",
	"customerId": "",
	// optional
	"ts": ""
}
//# sourceURL=api_social_followme_model.js