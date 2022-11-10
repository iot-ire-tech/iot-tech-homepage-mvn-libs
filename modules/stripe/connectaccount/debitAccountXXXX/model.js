/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var toc = false;
var tries = 0

var modelConnectBankSourceAddRsp = {
};
// this CLINET model matchs the SERVER model
var modelUx = {
	...new Bank({"accountNumber": "", "country": "", "accountHolderType": "sepa_debit", "accountHolderName": ""}),
	"transaction": {"currency": "eur", "amount": 0},
	// For Mailer and General
	"person": new Person()
};

var modelConnectExternalAccountsRsp = {}
var modelConnectExternalAccounts = {
	"signupDate": {"$date": new Date().toISOString()},
	"terms": false,
	"accountId": "",
	"location": "IE",
	"currency": "eur",
	"accountHolderName": "",
	"productDescription": "",
	"accountNumber": "",
	"accountHolderType": "company"
};

//# sourceURL=connectAccount_addSepaAccount_model.js