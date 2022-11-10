// Origin : Local Developer Workspace

deployment = "gcloud"
channel = ""
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
var httphdlr = new httpHandler("Generic", responseStrucObj);
var iotDbEndpoint = "allocateDbs";
let iotDbCtrt = new dbHandler("https", "api.mlab.com", "", "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q", "iottech", httphdlr, iotDbEndpoint)
iotDbCtrt.init();


var parsedUrl = new URL(window.location.href);
var clientId = parseInt(parsedUrl.searchParams.get("clientId"));

//if (document.URL.includes("index.jsp") === true || document.URL.includes("account.jsp") === true) {
//// No Client ID here!!!
//} else {
//	var iotDbObj = new clientDbUtil(iotDbCtrt, "Retrieving Client DB From Master")
//	var db = iotDbObj.getAllDbs().setClientId(clientId).getMyDb().db;
//
//	if (db === undefined)
//		alert("ERR: Invalid Client Id , check your client key is correct");
//	else
//		var bs = new bootStrapDbItem(db.proto, db.host, db.port, db.users[0].key, db.name, httphdlr).init();
//}
