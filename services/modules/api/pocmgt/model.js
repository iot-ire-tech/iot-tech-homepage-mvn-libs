/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Model

// Validation
var addPocName = false
var addPocEmail = false
var addPocPhone = false

var modelPocItem = {
	"customerId": "",
	"fullName": "",
	"email": "",
	"phone": ""
}
var modelPoc = {
	"accountId": "",
	"productId": "",
	"items": []
}

var modelPocQuery = {
	"accountId": "",
	"productId": ""
}

//# sourceURL=api_poc_model.js