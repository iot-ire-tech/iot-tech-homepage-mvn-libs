/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// US Cards
//testDataCards.set("VisaCard_US", new Card({"number": "4242424242424242", "currency": "usd", "year": 2021, "month": 12, "day": 22}))
//testDataCards.set("VisaCardDebit_US", new Card({"number": "4000056655665556", "currency": "usd", "year": 2021, "month": 12, "day": 22}))

/*
 testDataCards.set("VisaCardDebit_US2", new Card({ "number": "4462030000000000", "currency": "usd", "year": 2021, "month": 12, "day": 22}))
 testDataCards.set("VisaCardDebit_US3", new Card({ "number": "4917610000000000003", "currency": "usd", "year": 2021, "month": 12, "day": 22}))
 testDataCards.set("VisaCardDebit_US4", new Card({ "number": "4462000000000003", "currency": "usd", "year": 2021, "month": 12, "day": 22}))
 testDataCards.set("VisaCardDebit_US5", new Card({ "number": "4917480000000008", "currency": "usd", "year": 2021, "month": 12, "day": 22}))
 testDataCards.set("VisaCardDebit_US5", new Card({ "number": "4170036473936391", "currency": "usd", "year": 2021, "month": 12, "day": 22}))
 */

// testDataCards.set("MasterCard_US", new Card({"number": "5555555555554444", "currency": "usd", "year": 2021, "month": 12, "day": 22}))
// testDataCards.set("MasterCardDebit_US", new Card({"number": "5200828282828210", "currency": "usd", "year": 2021, "month": 12, "day": 22}))
// testDataCards.set("MasterCardDebit_US2", new Card({"number": "5573470000000001", "currency": "usd", "year": 2021, "month": 12, "day": 22}))

var modelUx = {
	...new Card({"number": "4242424242424242", "currency": "usd", "year": 2021, "month": 12, "day": 22}),
	// For Mailer and General
	"person": new Person()
};
//# sourceURL=onboarding_payment_source_card_model.js