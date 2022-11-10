/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var q = ""
var responseLoad = [];
// Init Test
// UX - http://localhost:8084/iot-base/services/finance/billing/tests/testBilling.html?clientId=673859
// SRV
var brPatrons = new BillingRulePatron(bs.billingRulePatronsCtrl, "INIT: Patron Billing Rules");
var brAssets = new BillingRulePatron(bs.billingRuleAsetsCtrl, "INIT: Asset Billing Rules");
// Patron
var queryMap = new Map();
q = "{\"clientId\":" + clientId + ", \"email\":\"tonygennis@gmail.com\"}";
var patronObj = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()[0]
q = "{\"clientId\":" + clientId + ", \"name\":\"Squash Court\"}";
var resourceObj = new crudIt(bs.resourceCtrl, "Query Resource").setPayload(q).query()[0]
q = "{\"clientId\":" + clientId + ", \"name\":\"League - 2019\"}";
var eventObj = new crudIt(bs.eventCtrl, "Query Event").setPayload(q).query()[0]
q = "{\"clientId\":" + clientId + ", \"name\":\"Box A\"}";
var subEventObj = new crudIt(bs.subEventCtrl, "Query SubEvent").setPayload(q).query()[0]

var minSpend = 1.00;
var clientId = 673859;
var patronId = patronObj.id;
//	var refTimeMs = new Date().now();
var protoType = new Date();
var dt = protoType.getDate();
var mt = protoType.getMonth();
var yyyy = protoType.getFullYear();
var publishDate = new Date(yyyy, mt, dt).toISOString();
var expiryDate = new Date(yyyy, mt + 1, dt + 1).toISOString(); // One Month + 1 Day
var expiryDateOneYear = new Date(protoType.getFullYear()).toISOString(); // One Month + 1 Day
var moneyObj = {
	"amount": 0.00,
	"currency": "EUR"
};
var charagesOb = {
	"service": moneyObj, // This is my fee
	"vat": moneyObj
};
var discountObj = {
	"precent": {"enabled": false, "amount": 100},
	"cash": {"enabled": false, "amount": moneyObj}
}

var billObj = {
	"status": "unpaid",
	"amount": moneyObj,
	"charges": charagesOb,
	"discount": discountObj,
	"total": moneyObj
};


/*
 * UX
 */

$(document).ready(function () {
	url = location.origin + contextPath + "/services/finance/billing/ux/proportionalBilling.html";
//	new PageLoad(url, "proportionalBillingTarget", "n/a").put()
	new PageLoad(url, "proportionalBillingTarget", "n/a").setPayload("<label>Member</label>").post()

//	//console.clear()
});




/*
 * Let the test driven development begin!!!
 */

if (false) {
// #############################################################
// Common To All Rules
// #############################################################
	billingRulesObj.clientId = clientId;
	billingRulesObj.timings.publishDate.$date = publishDate;
	billingRulesObj.timings.expiryDate.$date = expiryDate;



// #############################################################
// Test Case#1 : Create Billing Rule Types - Patrons
// #############################################################
	billingRulesObj.name = "vip-discount_v" + getRand();
	billingRulesObj.discount = discountAmount.getAmount() + getRandInt(1, 10);
	billingRulesObj.credit = topupAmount.getAmount() + getRandInt(1, 10);
	billingRulesObj.penality = penalityAmount.getAmount() + getRandInt(1, 10);

	billingRulesPatronObj.billingRules = billingRulesObj;
	billingRulesPatronObj.type = "user";
	billingRulesPatronObj.filter.patronId = patronObj.id;
	brPatrons.setPayload(billingRulesPatronObj).create();


// #############################################################
// Test Case#1 : Create Billing Rule Types - Assets
// #############################################################
	var assets = new Map();
	assets.set("resource", resourceObj);
	assets.set("event", eventObj);
	assets.set("subEvent", subEventObj);
	for (var [key, value] of assets) {
		//console.log(key + ' goes ' + value);
		billingRulesObj.name = "keep-active-week-" + value.name + "_" + getRand();
		billingRulesObj.discount = discountAmount.getAmount() + getRandInt(1, 10);
		billingRulesObj.credit = topupAmount.getAmount() + getRandInt(1, 10);
		billingRulesObj.penality = penalityAmount.getAmount() + getRandInt(1, 10);

		billingRulesAssetObj.billingRules = billingRulesObj;
		billingRulesAssetObj.type = key;
		billingRulesAssetObj.filter.targetId = value.id;
		billingRulesAssetObj.filter.category = "sport";
		billingRulesAssetObj.filter.dob = "";
		brAssets.setPayload(billingRulesAssetObj).create();
	}
}
// #############################################################
// Test Case#1.Q : Query Patron Rules
// #############################################################
// Works : Patron Billing Rules that have not expired.
queryBuilder();

/*
 * WorkFlow - Revenue Stream !!!
 */

//	Lets seach all billing rules, and see what needs to be done to the bill
// Inputs
// 1. Patron
// 2. Billing Rules
// 3. Entity
// Bill Ready For payments
var billRegular = new BillEngine().toString();
var billObj;
if (billingProcessObj.status === "enabled") {

	if (responseLoad.length === 0) {
// No Billing Rules To Consider
		billRegular.setDue(dueAmount);
		billRegular.setService(serviceAmount);
		billRegular.setDiscount(discountAmount);
		billRegular.setCredit(creditAmount);
		billRegular.setPenality(penalityAmount);
		billRegular.setVat(vatAmount);
		billObj = billRegular.compute();
	} else {
// Billing Rules To Consider - Bring it On
		responseLoad = brPatrons.setPayload(queryMap.get("All Billing Rules that have not expired")).query();
		responseLoad.forEach(function (billingRule) {
			// Iteration #1 - User Impact

			switch (billingRule.type) {
				case "user":
					// ? Is is current Patrong
					if (patronId === billingRule.filter.patronId) {
						billPatron = new BillEngine().toString();
						billPatron.setDiscount(billingRule.discount);
						billPatron.setCredit(billingRule.credit);
						billPatron.setPenality(billingRule.penality);
						billPatron.setVat(vatAmount);
						billObj = billPatron.compute(); // Bill Running Total
						billPatron.toString();
						// Update Others
						billTarget.setDue(billPatron.getDue());
						throw  "INF: Patron Rule Applied";
					}
					break;
			}
			// Patron Rule

			// Activity Rule

		});
		// Billing Rules To Consider - Bring it On
		responseLoad = brAssets.setPayload(queryMap.get("All Billing Rules that have not expired")).query();
		responseLoad.forEach(function (billingRule) {
			// Iteration #2 - Activity Impact

			switch (billingRule.type) {
				case "activity":
					if (targetId === billingRule.filter.targetId) {
						billTarget = new BillEngine().toString();
						billTarget.setDiscount(billingRule.discount);
						billTarget.setVat(vatAmount);
						billObj = billTarget.compute(); // RT
						billTarget.toString();
						// Update Others
						billPatron.setDue(billTarget.getDue());
						throw  "INF: Asset Rule Applied";
					}
					break;
			}
		});
	}
}
// Log Bill In Ledger

// Next Up Payments DepartMent
if (billObj.total >= minSpend && true === false) {
// If credit is running low warn patron

// I Bill Client / Transaction or End Of Day
// I split Client Bill between Client and Patron.
	throw  "INF: Asset Rule Applied";
	var serviceAmendment = {"type": "percentage", "percent": 5.00, "amount": serviceAmount};
	var serviceCost = new Amendment(serviceAmendment).compute();

// Make Payment


// Factor in PB aka Split Billing
	var mem = {
		"type": "member",
		"client": 95,
		"patron": 5
	}
	var guest = {
		"type": "member",
		"client": 0,
		"patron": 100
	}
	[mem, guest].forEach(function (pbObj) {
		var bpClientAmendment = {"type": "percentage", "percent": 95.00, "amount": serviceCost};
		var bpPatronAmendment = {"type": "percentage", "percent": 5.00, "amount": serviceCost};
		var bpClientCost = new Amendment(bpClientAmendment).compute();
		var bpPatronCost = new Amendment(bpPatronAmendment).compute();

		if (bpClientCost > minSpend)
			console.log("INF: Billed Client for %s", bpClientCost)
		else
			console.log("wRN: Min Spend Not Met, Adding Client Portion To Daily Bill for %s", bpClientCost)
		if (bpPatronCost > minSpend)
			console.log("INF: Billed Patron for %s", bpPatronCost)
		else
			console.log("wRN: Min Spend Not Met, Adding Patron Portion To Daily Bill for %s", bpPatronCost)
	});

// Update Patron Credit With New Spend
//	patronCtrl.decCredit(); // Update Patron with reduced
	billObj.status = "paid";

	// Log Payment In Ledger
}

// HouseKeeping


// Add To Total Daily Due by client ..









function queryBuilder() {

	var query = {
		"billingRules.clientId": clientId,
		"billingRules.timings.expiryDate": {
			"$gte": {"$date": new Date().toISOString()}
		},
		"type": "user",
		"filter.patronId": patronId
	};
	queryMap.set("Specific Patron Billing Rules that have not expired", query);
	var query = {
		"billingRules.clientId": clientId,
		"billingRules.timings.expiryDate": {
			"$gte": {"$date": new Date().toISOString()}
		},
		"type": "activity"
	};
	queryMap.set("All Asset Billing Rules that have not expired", query);
	query = {
		"billingRules.clientId": clientId,
		"billingRules.timings.expiryDate": {
			"$gte": {"$date": new Date().toISOString()}
		},
		"type": "user"
	};
	queryMap.set("All User Billing Rules that have not expired", query);
	query = {
		"billingRules.clientId": clientId,
		"billingRules.timings.expiryDate": {
			"$gte": {"$date": new Date().toISOString()}
		}
	};
	queryMap.set("All Billing Rules that have not expired", query);
}