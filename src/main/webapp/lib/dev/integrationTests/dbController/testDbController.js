/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

try {
	//console.clear()
	var response = {
		"load": "",
		"message": "",
		"loadLen": "",
		"message": "",
		"status": "",
		"code": ""
	}

	// Initiaze Data Set
	var url;
	var response;
	var proto = "https";
	var host = "api.mlab.com";
	var port = "";

	var db = "iottech"
	var collection = "mynewcollection"
	var key = "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"



	var httphdlr = new httpHandler("Generic", response)
	let clientCtrl = new dbHandler(proto, host, port, key, db, httphdlr, "clients")

// Init Endpoints and HTTP Props
	clientCtrl.init()

// POST
	url = clientCtrl.postUrl;
	response = clientCtrl.http.setUrl(url).setPayload("{\"x\":999999}").post().getResponse();
	id = response._id.$oid;




// MOD By Mongo Id
	url = clientCtrl.putUrl.setId(id).build().get();
	response = clientCtrl.http.setUrl(url).setPayload("{\"xxxxx\":9989789789}").put().getResponse();
	//console.table(response)

// MOD By Mongo Query
	url = clientCtrl.putsUrl.setQuery("{\"xxxxx\":9989789789}").build().get();
	response = clientCtrl.http.setUrl(url).setPayload("{\"a\":1}").put().getResponse();
	//console.table(response)






// GET By Mongo Id
	url = clientCtrl.getUrl.setId(id).build().get();
	response = clientCtrl.http.setUrl(url).get().getResponse();
	//console.table(response)

// GET By Mongo Query
	url = clientCtrl.getsUrl.setQuery("{\"xxxxx\":9989789789}").build().get();
	response = clientCtrl.http.setUrl(url).get().getResponse();
	//console.table(response)

// DEL By Mongo Query Use Puts instead!!!
	url = clientCtrl.delsUrl.setQuery("{\"xxxxx\":9989789789}").build().get();
	response = clientCtrl.http.setUrl(url).del().getResponse();
	//console.table(response)

// DEL By Mongo Id
	url = clientCtrl.delUrl.setId(id).build().get();
	response = clientCtrl.http.setUrl(url).del().getResponse();
	//console.table(response)




	throw new Error();


} catch (exception) {
//	//console.error("INF: Msg : %s", exception.message)
//	//console.error("INF: stack : %s", exception.stack)

}

