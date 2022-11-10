/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var q = "";
var responseLoad = [];
// Init Test
// UX - http://localhost:8084/iot-base/services/finance/payment/tests/testPayment.html?clientId=673859
// SRV
var spCharges = new PaymentSplit(bs.paymentSplitCtrl, "INIT: Split Payments - Service Charge");
var logger = new Logger(bs.loggingCtrl, "INIT: Log Split Payments");
// Patron
q = "{\"clientId\":" + clientId + ", \"email\":\"tonygennis@gmail.com\"}";
var patronObj = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()[0]
q = "{\"clientId\":" + clientId + ", \"name\":\"Squash Court\"}";
var resourceObj = new crudIt(bs.resourceCtrl, "Query Resource").setPayload(q).query()[0]
q = "{\"clientId\":" + clientId + ", \"name\":\"League - 2019\"}";
var eventObj = new crudIt(bs.eventCtrl, "Query Event").setPayload(q).query()[0]
q = "{\"clientId\":" + clientId + ", \"name\":\"Box A\"}";
var subEventObj = new crudIt(bs.subEventCtrl, "Query SubEvent").setPayload(q).query()[0]


$(document).ready(function () {
	url = location.origin + contextPath + "/services/finance/billing/ux/proportionalBilling.html";
	new PageLoad(url, "proportionalBillingTarget", "n/a").put()
//	//console.clear()

	$(".client").on("click", function () {
		alert("INF: Client % : %s ", $(this).val());
	});
	$(".patron").on("click", function () {
		alert("INF: Patron % : %s ", $(this).val());
	});
	$(".save").on("click", function () {
		alert("save");
	});
	$(".cancel").on("click", function () {
		alert("cancel");
	});
});
/*
 * Let the test driven development begin!!!
 */

if (false) {
// #############################################################
// Common To All Rules
// #############################################################


// #############################################################
// Test Case#1 : Service Charge Splitting Ratios (Default)
// #############################################################
//
	// Some-one needs to pay the service charge still
//	var paymentSplitsMap = new Set();
//	paymentSplitsMap.add(new Object({"clientId": clientId, "type": "guest", "client": 100, "patron": 0}));
//	paymentSplitsMap.add(new Object({"clientId": clientId, "type": "member", "client": 100, "patron": 0}));
//	paymentSplitsMap.forEach(function (paymentSplit) {
//		spCharges.setPayload(paymentSplit).create();
//	});
//

	paymentSplits.push(new Object({"clientId": clientId, "type": "staff", "client": 100, "patron": 0}));
	paymentSplits.push(new Object({"clientId": clientId, "type": "guest", "client": 0, "patron": 100}));
	paymentSplits.push(new Object({"clientId": clientId, "type": "member", "client": 75, "patron": 25}));
	paymentSplits.forEach(function (paymentSplit) {
		spCharges.setPayload(paymentSplit).create();
	});
}
// #############################################################
// Test Case#1.Q : Query Types
// #############################################################
//   queryBuilder();
/*
 * WorkFlow - Revenue Stream !!!
 */
// #############################################################
// Test Case: WorkFlow / Main / Integration.
// 0. Do default payment splits exist - clientId = 0
// 0. Do any custom payments splits exists  - clientId > 0
// 1. Do splits exist for incoming patron type
// 	Ans: Yes
// 		Use split in service charge
// 	OR
// 	Ans: Now
// 		Log Error
// #############################################################

responseLoad = spCharges.queryByType(patronObj.type);

if (responseLoad.length === 0) {
	logger.setCat("payments").setClientId(clientId).setPri("H").setSev("H").alert()
		.setMsg("No split found for patron (" + patronObj.id + ")").create();
} else {
	// Start Splitting On Service Charge Bill
	//console.assert(responseLoad[0].type === "guest", "ERR: Unknow type found: %s", responseLoad[0].type)
	//console.assert(responseLoad[0].client === 0, "ERR: Unknow client % found: %s", responseLoad[0].client)

}




function doSplitCosts(splits, patronObj) {
	var bpClientAmendment;
	var bpPatronAmendment;
	var bpClientCost;
	var bpPatronCost;
	bpClientAmendment = {"type": "percentage", "percent": split.client, "amount": serviceCost};
	bpPatronAmendment = {"type": "percentage", "percent": split.patron, "amount": serviceCost};
	bpClientCost = new Amendment(bpClientAmendment).compute();
	bpPatronCost = new Amendment(bpPatronAmendment).compute();

	if (bpClientCost > minSpend)
		console.log("INF: Billed Client for %s", bpClientCost)
	else
		console.log("wRN: Min Spend Not Met, Adding Client Portion To Daily Bill for %s", bpClientCost)
	if (bpPatronCost > minSpend)
		console.log("INF: Billed Patron for %s", bpPatronCost)
	else
		console.log("wRN: Min Spend Not Met, Adding Patron Portion To Daily Bill for %s", bpPatronCost)
}




throw "xxx"
if (!(rsp = doSplitPayment(serviceCost, responseLoad.splits, patronObj.id))) {
	logger.setCat("payments").setClientId(clientId).setPri("H").setSev("H")
		.setMsg("No split found for patron (" + patronObj.id + ")").create();
} else {
	// Proceed With Payment
}

function doSplitPaymentExist(splits, patronObj) {
	var splitFound = false;
	var split;

	try {
		var that = this;
		splits.forEach(function (split) {
			if (patronObj.type === split.type) {
				splitFound = true;
				throw "INF: Split Found"
			}
		});

	} catch (e) {
		return {"splitFound": splitFound, "split": split};
	}
	return {"splitFound": splitFound, "split": {}};
}

// Update Patron Credit With New Spend
//	patronCtrl.decCredit(); // Update Patron with reduced

// Log Payment In Ledger
// HouseKeeping
// Add To Total Daily Due by client ..




