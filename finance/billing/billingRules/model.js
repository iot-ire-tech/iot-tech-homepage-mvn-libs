/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Data Model Base Layer

// Controller Layer - Billing Workflows, to be determined during test phase.
// Players
// Billing
// Payments


// Is basically a filter what will be applied to the type
// Patron / Group
// Entity
// Activity


class Amendment {
	constructor(amendment) {
		this.type = amendment.type;
		this.amount = amendment.amount;
		this.percent = amendment.percent;
		return this;
	}
	compute() {
		if (this.type === "cash") {
			return this.amount.toFixed(2);
		} else if (this.type === "percentage") {
			return ((this.amount * this.percent) / 100).toFixed(2);
		} else {

		}
		return this;
	}
}


// Extends BillingRules

var modelBillingRules = {

//	"name": "20 Top - Anto, VIP-discount", // Tag
	"name": "", // Tag
	"timings": {
		"expiryDate": {"$date": ""}, // Default Expiry 1 Year - Dead money
		"publishDate": {"$date": ""} // Default Date.Now
	},
	//
	"credit": {"value": 0.00, "type": ""}, // If selected card is requested.
	"discount": {"value": 0.00, "type": ""}, // Discount can be +/-
	"penality": {"value": 0.00, "type": ""}// Discount can be +/-
};
// Extends BillingRules
var modelBillingRulesPatron = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": "user" // If group then dont use patronId
	},
	"fk": {
		"id": -1, // Team MemberShip
		"dbId": "single!",
		"type": ""
	},
	"timings": {
		"ts": {
			"$date": new Date().toISOString()
		}
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"tag": ""
	},
	"modelBillingRules": modelBillingRules, // Core To Transaction
	"filter": {
		"patronId": -1 // This is a patron specific Rulle
	}
};
// Appllies to One or More Patrons.
//	"name": "Father Day Rates",
var modelBillingRulesPatronCat = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1, // Team MemberShip
		"dbId": "single!",
		"type": "group" // If group then dont use patronId
	},
	"timings": {
		"ts": {
			"$date": new Date().toISOString()
		}
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"tag": ""
	},
	"modelBillingRules": modelBillingRules, // Core To Transaction
	"filter": {
		"dob": {"$date": ""}, // Happy birth discount
		"age": -1,
		"gender": "",
		"occupation": "",
		"familystatus": "[Father, Mother, Uncle, Aunt]",
		"maritalStatus": "[Single, Devorced]"
	}
};
// Extends BillingRules
var modelBillingRulesEntity = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1, // Team MemberShip
		"dbId": "single!",
		"type": "[resource, event, subevent]" // If group then dont use patronId
	},
	"timings": {
		"ts": {
			"$date": new Date().toISOString()
		}
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"tag": ""
	},
	"modelBillingRules": modelBillingRules,
	"filter": {
		"dob": {"$date": ""}, // Celebrator discoutn
		"targetId": -1, // This is a patron specific Rulle
		"category": "[Sports, Health, Education]"
	}
};
// UX Model (JQUERYLayer)to Extend Above


// Default Biling Each Time a patron is created!!!

// Float, or Wallet coming into the system.
var modelBillingProcess = {
	"status": "enabled"
};
class Money {
	constructor(currency, amount, tag) {
		this.currency = currency
		this.amount = amount
		this.tag = tag
		return this;
	}
	getAmount() {
		return this.amount;
	}
}
// Annotated Money
var amountDue = new Money("EUR", 1000.00, "Squash Event").getAmount();
var dueAmount = new Money("EUR", 50.00, "Top Up").getAmount();
var topupAmount = new Money("EUR", 30.00, "Squash Court").getAmount();
var penalityAmount = new Money("EUR", 0.00, "Squash Court").getAmount();
var discountAmount = new Money("EUR", 6.00, "Squash Court").getAmount();
var creditAmount = new Money("EUR", 5.00, "Top Up").getAmount();
var vatAmount = new Money("EUR", 1.00, "Top Up").getAmount();
var serviceAmount = new Money("EUR", 0.30, "Transaction - Service Charge").getAmount();
// Amendumns Amounts
var discount = {"type": "cash", "percent": 0.00, "amount": discountAmount};
var penality = {"type": "percentage", "percent": 1.00, "amount": amountDue};
var service = {"type": "percentage", "percent": 5.00, "amount": amountDue};
var vatClient = {"type": "percentage", "percent": 15.00, "amount": amountDue};
var vatUser = {"type": "percentage", "percent": 0.00, "amount": amountDue};
var discountAmountX = new Amendment(discount).compute();
var penalityAmountX = new Amendment(penality).compute();
var serviceAmountX = new Amendment(service).compute();
var vatAmountX = new Amendment(service).compute();
// if proportinal modelBilling, then service charge is reduced by that amount!!!
var proportionalBillingSplitObj = {
	"client": vatAmountX,
	"patron": vatAmountX
};
// Discount/Penality Of A Flat Rate or Percentage



var charagesObj = {
	"service": vatAmountX, // This is my fee
	"vat": vatAmountX // Vat is Zero if patron.
};
// Represents A Transaction.
var billObj = {
	"status": "unpaid",
	"due": amountDue,
	"service": serviceAmount,
	"vat": vatAmount,
	"discount": discountAmount,
	"penality": penalityAmount,
	"total": amountDue
};
var bills = [];
// Each time a bill is
var modelBillingHistory = {

};
var activityCostObj = {
	"name": "Squash",
	"charges": penalityAmount
}
;

