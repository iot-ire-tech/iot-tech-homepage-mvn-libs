/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//
var modelConnectBankTokenAddRsp = {
	"id": "" // Token Id, etc
}
var modelConnectBankTokenAdd = {
	"accountId": "acct_1FG0S6L4EJM4TcRu",
	"customerId": "cus_FlvjSAstpd1IiB",
	"accountHolderName": "Anthon Ennis",
	"accountHolderType": "individual", // company
	//
	// https://stripe.com/docs/connect/testing#account-numbers
	"country": "US",
	"currency": "usd",
// US- Works
	"routingNumber": "110000000",
//	"routingNumber": "null", // BIC
	"accountNumber": "000123456789"
};


//# sourceURL=stripe_bank_model.js