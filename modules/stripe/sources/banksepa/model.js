/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelConnectBankSourceAddRsp = {
};
// this CLINET model matchs the SERVER model
var modelUx = {
	...new Bank({"accountNumber": "", "country": "", "accountHolderType": "sepa_debit", "accountHolderName": ""}),
	"transaction": {"currency": "eur", "amount": 0},
	// For Mailer and General
	"person": new Person()
};
//# sourceURL=onboarding_payment_source_sepa_model.js