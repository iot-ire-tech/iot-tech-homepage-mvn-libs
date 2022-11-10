/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelUx = {
	...new Bank({"accountNumber": "DE89370400440532013000", "country": "DE", "accountHolderType": "sepa_debit", "accountHolderName": "Anto Who"}),
	"transaction": {"currency": "eur", "amount": 101},
	// For Mailer and General
	"person": new Person()
};
//# sourceURL=customer_bank_model.js