/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelConnectBankSourceAddRsp = {
};
// this CLINET model matchs the SERVER model
var modelConnectBankSourceAdd = {
//	"accountId": "acct_1FG0S6L4EJM4TcRu",
	"accountId": "",
//	"customerId": "cus_FlvjSAstpd1IiB",
	"customerId": "cus_EReFItwkFzwQJW", // Cusomter On Platfomr
	"sourceId": "",
	// Owner
	"person": {
		"fullName": "AntoWho",
		"email": "tonyennis@yahoo.com"
	},
	// Payment Source
	// https://stripe.com/docs/sources/sepa-debit#testing
	"iban": "IE29AIBK93115212345678",
	"transaction": {
		"type": "sepa_debit",
		"currency": "eur",
		"amount": 101 // Cent
	}
};

//# sourceURL=stripe_bank_sepa_payments_model.js