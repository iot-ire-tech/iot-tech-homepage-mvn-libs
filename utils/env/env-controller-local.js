// Origin : Local Developer Workspace

// JS Functions First Class Citizens
// https://www.codebyamir.com/blog/suppressing-console-log-messages-in-production
console.log = function () {};


deployment = "local"
channel = "/iot-base"
// I removed context path, in prep for root deployment
channel = ""

// The channel init the context path
// Applicatoin INIT

environment(deployment, channel);
var basePathApp = new urlBuilder(protoServ, hostServ, portServ);
var urlApp = basePathApp.init().getBase();
var responseStrucObj = {
	"load": "",
	"message": "",
	"loadLen": "",
	"message": "",
	"status": "",
	"code": ""
}
var url;
var btnColor = "w3-blue";
var httphdlr = new httpHandler("Generic", responseStrucObj);
var iotDbEndpoint = "allocateDbs";
let iotDbCtrt = new dbHandler("https", "api.mlab.com", "", "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q", "iottech", httphdlr, iotDbEndpoint)
iotDbCtrt.init();
var iotClientRatesCtrl = new dbHandler("https", "api.mlab.com", "", "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q", "iottech", httphdlr, "clientRates");
iotClientRatesCtrl.init();
var iotClientUsageCtrl = new dbHandler("https", "api.mlab.com", "", "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q", "iottech", httphdlr, "clientUsage");
iotClientUsageCtrl.init();
var iotClientEnablementsCtrl = new dbHandler("https", "api.mlab.com", "", "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q", "iottech", httphdlr, "clientEntitlements");
iotClientEnablementsCtrl.init();
var iotSiteCfgCtrl = new dbHandler("https", "api.mlab.com", "", "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q", "iottech", httphdlr, "siteConfiguration");
iotSiteCfgCtrl.init();
// Site
var parsedUrl = new URL(window.location.href);
var clientId = parseInt(parsedUrl.searchParams.get("clientId"));
try {
	var patronId = parseInt(parsedUrl.searchParams.get("patronId"));
} catch (e) {

}


var triageId = -1;
// DB
var dbId
var patronObj;
var patron;
var srvPatron;
//if (document.URL.includes("index.jsp") === true || document.URL.includes("account.jsp") === true || document.URL.includes("signup.jsp") === true) {
//// No Client ID here!!!
//} else {
//	var iotDbObj = new clientDbUtil(iotDbCtrt, "Retrieving Client DB From Master")
//	var db = iotDbObj.getAllDbs().setClientId(clientId).getMyDb().db;
//	if (db === undefined)
//		alert("ERR: Invalid Client Id , check your client key is correct");
//	else {
//		var bs = new bootStrapDbItem(db.proto, db.host, db.port, db.users[0].key, db.name, httphdlr).init();
//		var patrons = new crudIt(bs.patronCtrl, "Patrons List").setPayload("{}").query();
//		var resources = new crudIt(bs.entityCtrl, "Resources List").setPayload({"pk.type": "resource"}).query();
//		var events = new crudIt(bs.entityCtrl, "Event List").setPayload({"pk.type": "event"}).query();
//		var subEvents = new crudIt(bs.entityCtrl, "SubEvent List").setPayload({"pk.type": "subEvent"}).query();
//
//		srvPatron = new Patron(bs.patronCtrl, "INIT: Patron Details");
//		var srvPatronAccount = new PatronAccount(bs.patronAccountCtrl, "INT: Patron Security Account!");
//		var srvPatronCredit = new PatronCredit(bs.patronCreditCtrl, "INT: Patron Credit");
//// Cheif Financial Officer
////		patronCfo = srvPatron.setPayload({"pk": {"dbId": ""}}).getAttributesCfo();
//	}
//}

//# sourceURL=env.js