/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var q = ""
var responseMsg;
try {
	//console.clear()
// Init Test
// UX - http://localhost:8084/iot-base/services/messaging/tests/testMessaging.html?clientId=673859
// SRV
	msg = new Message(bs.messageCtrl, "INIT");
// clientId=673859
// Patron
	q = "{\"clientId\":" + clientId + ", \"email\":\"tonygennis@gmail.com\"}";
	var patronObj = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()[0]
	q = "{\"clientId\":" + clientId + ", \"name\":\"Squash Court\"}";
	var resourceObj = new crudIt(bs.resourceCtrl, "Query Resource").setPayload(q).query()[0]
	q = "{\"clientId\":" + clientId + ", \"name\":\"League - 2019\"}";
	var eventObj = new crudIt(bs.eventCtrl, "Query Event").setPayload(q).query()[0]
	q = "{\"clientId\":" + clientId + ", \"name\":\"Box A\"}";
	var subEventObj = new crudIt(bs.subEventCtrl, "Query SubEvent").setPayload(q).query()[0]



// Test Data - xxxx
//	q = "{\"clientId\":" + clientId + ", \"classification.gender\":\"male\"}";
//	var patronObjMales = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()

// Test Case#1 : Query Types
	responseMsg = msg.queryTypes("public")[0]
	//console.assert(responseMsg.message.type === "public", "ERR: Message Type not public!!! : %s", responseMsg.message.type);

	responseMsg = msg.setTargetId(patronObj.id).queryTypes("user")[0]
	//console.assert(responseMsg.message.type === "user", "ERR: Message Type not user!!! : %s", responseMsg.message.type);

	responseMsg = msg.setTargetId(resourceObj.id).queryTypes("resource")[0]
	//console.assert(responseMsg.message.type === "resource", "ERR: Message Type not resource!!! : %s", responseMsg.message.type);

	responseMsg = msg.setTargetId(eventObj.id).queryTypes("event")[0]
	//console.assert(responseMsg.message.type === "event", "ERR: Message Type not event!!! : %s", responseMsg.message.type);

	responseMsg = msg.setTargetId(subEventObj.id).queryTypes("subEvent")[0]
	//console.assert(responseMsg.message.type === "subEvent", "ERR: Message Type not subEvent!!! : %s", responseMsg.message.type);

	var s = new Set();
	s.add("hello").add("goodbye").add("hello");
	s.size === 2;
	s.has("hello") === true;

	function timeout(duration = 0) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, duration);
		})
	}

	var p = timeout(1000).then(() => {
		return timeout(2000);
	}).then(() => {
		throw new Error("hmm");
	}).catch(err => {
		return Promise.all([timeout(100), timeout(200)]);
	})


	var idMsgTarget;
	var msgBoxObj;
	var msghdlr;

	$(document).ready(function () {
		msg.setMessage(responseMsg)
		if (msg.isToday()) {
// Msg Box Widget : Messaging
			idMsgTarget = "#modelPeriodicals";
			msgBoxObj = {
				"divId": "periodicalsMsgBox",
				"btnOkId": getRand(),
				"color": "w3-blue",
				"header": "this is a hdr",
				"footer": "this is a tdr",
				"message": msgContent(responseMsg)
			};
			msghdlr = new Modal(msgBoxObj).init();
			$(idMsgTarget).after(msghdlr.getModel());

			$(idMsgTarget + "Btn").on("click", function () {
				msghdlr.open();
			});
		}


// Msg Box Widget : Resource Availability
		var msghdlrRa = loadMessageBoxResourceAvail(resourceObj);
		$("#modelResourceAvailability" + "Btn").on("click", function () {
			msghdlrRa.open();
//			sleep(3000)
			msghdlrRa.close();
		});

		return
// Msg Box Widget : Resource Availability
		msgBoxObj = {
			"divId": "modelResourceAvailability",
			"btnOkId": getRand(),
			"color": "w3-blue",
			"header": "this is a hdr",
			"footer": "this is a tdr",
			"message": getContentResourceAvailability(resourceObj.availabilitiy)
		};
		msghdlrRa = new Modal(msgBoxObj).init();
		$("#modelResourceAvailabilityTarget").after(msghdlrRa.getModel());
		$("#modelResourceAvailability" + "Btn").on("click", function () {
			msghdlrRa.open();
//			sleep(3000)
			msghdlrRa.close();
		});
		loadMessageBoxResourceAvail(resourceObj);


	});
// Possible Work Flowsss



} catch (exception) {
//	//console.error("INF: Msg : %s", exception.message)
//	//console.error("INF: stack : %s", exception.stack)

}

function msgContent(amessage) {
	var html = "";
	html = "<br>"
	html += "<b>Date/Time: </b>" + getTodaysDate() + "<br>"
	html += "<b>Importance: </b>" + amessage.message.importance + "<br>"
	html += "<b>Audiance: </b>" + amessage.message.type + "<br>"
	html += "<hr>"
	html += "<b>Headline: </b>" + amessage.message.headline + "<br>"
	html += "<hr>"
	html += "<b>Message Detail: </b>"
	html += amessage.message.content;
	html += "<br>"
	return html;
}

function loadMessageBoxResourceAvailTest(payloadObj) {
	var msghdlr;
	var msgBoxObj = {
//		"divId": "modelResourceAvailability" + resourceObj.id,
		"divId": "modelResourceAvailability",
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": getContentResourceAvailability(payloadObj.availabilitiy)
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelResourceAvailabilityTarget").after(msghdlr.getModel());
	return msghdlr;

}

function loadMessageBoxEnquiriesTest(patronObj, resourceId) {

	var msghdlr;
	var msgBoxObj = {
		"divId": "modelResourceEnquiries" + resourceId,
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": loadOwnerCard({"patronObj": patronObj, "title": ""})
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelResourceEnquiriesTarget").after(msghdlr.getModel());
	return msghdlr;

}