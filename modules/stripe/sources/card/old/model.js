/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelCard = {
	"logic": modelCardLogic,
	"name": "Anto Who Ennis",
	"country": "IE",
	"currency": "eur",
	"number": "4000056655665556", // US- Visa Debit
	"month": 12,
	"day": 12,
	"year": 2020,
	"cvc": "121",
	"address": {}
}
var modelCardLogic = {
	"customerCharge": false
}


var modelCardRsp = {}
var modelCardRsp200 = {
	"id": "tok_1FL7UkL4EJM4TcRufAiLo1tH",
	"object": "token",
	"card": {
		"id": "card_1FL7UkL4EJM4TcRuPfQsrpW9",
		"object": "card",
		"address_city": null,
		"address_country": null,
		"address_line1": null,
		"address_line1_check": null,
		"address_line2": null,
		"address_state": null,
		"address_zip": null,
		"address_zip_check": null,
		"brand": "Visa",
		"country": "US",
		"currency": "eur",
		"cvc_check": null,
		"dynamic_last4": null,
		"exp_month": 12,
		"exp_year": 2020,
		"fingerprint": "27jkrlbaq65TtlZk",
		"funding": "debit",
		"last4": "5556",
		"metadata": {
		},
		"name": null,
		"tokenization_method": null
	},
	"client_ip": "188.141.112.43",
	"created": 1569068122,
	"livemode": false,
	"type": "card",
	"used": false
}
//# sourceURL=stripe_card_model.js