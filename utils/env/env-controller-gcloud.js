// Origin : Local Developer Workspace

deployment = "gcloud"
// The channel init the context path
channel = ""
//var contextPath = "/green"

environment(deployment, channel, false);
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
//		var patrons = new crudIt(bs.patronCtrl, "Patrons List").setPayload("{\"clientId\":" + clientId + "}").query();
//		var resources = new crudIt(bs.resourceCtrl, "Resources List").setPayload("{\"clientId\":" + clientId + "}").query();
//		var events = new crudIt(bs.eventCtrl, "Event List").setPayload("{\"clientId\":" + clientId + "}").query();
//		var subEvents = new crudIt(bs.subEventCtrl, "SubEvent List").setPayload("{\"clientId\":" + clientId + "}").query();
//
//
//		srvPatron = new Patron(bs.patronCtrl, "INIT: Patron Details");
//		var srvPatronAccount = new PatronAccount(bs.patronAccountCtrl, "INT: Patron Security Account!");
//		var srvPatronCredit = new PatronCredit(bs.patronCreditCtrl, "INT: Patron Credit");
//
//
//// Cheif Financial Officer
////		patronCfo = srvPatron.setPayload({"pk": {"dbId": ""}}).getAttributesCfo();
//	}
//}

//# sourceURL=env.js