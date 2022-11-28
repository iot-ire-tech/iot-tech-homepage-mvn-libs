/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelChargeRsp = {}
var modelChargeRsp200 = {}

var modelCharge = {
	"logic": modelChargeLogic,
	"customerId": "cus_FlvjSAstpd1IiB",
	"transaction": {
		"currency": "eur",
		"amount": 101 // Cent
	},
	"description": "Customer Charge....",
	"receiptEmail": "tonyennis@yahoo.com",
	// A payment source to be charged.
	// This can be the ID of a card (i.e., credit or debit card), a bank account, a source, a token, or a connected account.
	// For certain sources—namely, cards, bank accounts, and attached sources—you must also pass the ID of the associated customer.
	"source": {
		"type": "card",
		"id": ""
	}
}

var modelChargeLogic = {

}
//# sourceURL=stripe_charge_model.js