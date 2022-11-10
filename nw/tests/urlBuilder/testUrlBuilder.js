/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var db = "iottech"
var collectionTab = "mynewcollection"
var responseLoad;
var payload = '{ "id": 712173, "clientId": 392436, "branding": { "ts": "02/11/2018, 14:38", "targetAudience": true, "social": true, "vidWelecome": false, "publishDate": true }, "bookings": { "created": 0 } }'
var key = "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"

var url = "https://api.mlab.com/api/1/databases/" + db + "/collections/" + collectionTab + "?apiKey=" + key
var urlQuery = "https://api.mlab.com/api/1/databases/" + db + "/collections/" + collectionTab + "&apiKey=" + key
// https://api.mlab.com/api/1/databases/iottech/collections/mynewcollection?q={"id": 1, "staffCount": 2}&apiKey=wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q
// NOTWORS: https://api.mlab.com/api/1/databases/iottech/collections/mynewcollection&apiKey=wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q&q={"id": 1, "staffCount": 2}
// WORKS :  https://api.mlab.com/api/1/databases/iottech/collections/mynewcollection?q={%22id%22:%201,%20%22staffCount%22:%202}&apiKey=wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q
// add query

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
	var proto = "https";
	var host = "api.mlab.com";
	var port = "";

	var db = "iottech"
	var collection = "mynewcollection"
	var key = "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"


	let analyticsUrl = new urlMongoBuilder(proto, host, port, key, db, collection)
	//console.table(analyticsUrl)

// Update Mongo Component
	collection = "mynewcollection?q={\"id\": 1,\"staffCount\": 2}"
	collection = "mynewcollection?q={\"clientId\": 999}"
	collection = "mynewcollection?q={\"x\": 2}"
	collection = "mynewcollection"
	getClientById = analyticsUrl.init().setMethod("QGET")
	getClientById.setCollection(collection).setQuery("{\"x\": 2}").build()

//	https://api.mlab.com/api/1/databases/iottech/collections/mynewcollection&apiKey=wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q&q=%7B%22clientId%22:%20999%7D'
//	https://api.mlab.com/api/1/databases/my-db/  collections/my-coll        ?apiKey=myAPIKey&q={"_id":1234}
//
// Query URL (if async true, then now responseload?
	var http = new httpHandler("Analytics", response)
	//console.table(http)
	http.setUrl(getClientById.get()).setAsync(false).setTimeout(300000).get();
	responseLoad = http.getResponse()
	//console.table(responseLoad)
	//console.table(http)


	throw new Error("INF: Get Test");






// Based On Id : PUT - FAILEd
	payload = '{"x":2}'
	//console.groupCollapsed("Based On Id : PUT")
	collection = "mynewcollection"
	analyticsUrl.init().setCollection(collection).setMethod("PUT").setId("5c3b5e7e5d0e65353e68c8e1").build()
	//console.table(analyticsUrl)
	http.setAsync(false).setTimeout(300000).setUrl(analyticsUrl.get()).setPayload(payload).setMessage("Put Me").put()
	//console.table(http)
	//console.groupEnd()
	throw new Error("INF: Put Test");

// Multiple Docs Insert
// Based On Id : Query PUT
	payload = '{"x":1}'
	//console.groupCollapsed("Based On Query Id : PUT")
	collection = "mynewcollection"
	analyticsUrl.init().setCollection(collection).setMethod("QPUT").setQuery("{\"clientId\": 999}'").build()
	//console.table(analyticsUrl)
	http.setAsync(false).setTimeout(300000).setUrl(analyticsUrl.get()).setPayload(payload).setMessage("Query Put Me").put()
	//console.table(http)
	//console.groupEnd()
//	throw new Error("INF: Put Test (Multiple Docs Update)");


// Based On Id : DELETE
// https://api.mlab.com/api/1/databases/iottech/collections/5c3b5e7e5d0e65353e68c8e1		?apiKey=wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q
// https://api.mlab.com/api/1/databases/my-db/	collections/my-coll/4e7315a65e4ce91f885b7dde	?apiKey=myAPIKey
	//console.groupCollapsed("Based On Id : DELETE")
	collection = "mynewcollection"
	analyticsUrl.setCollection(collection)
	analyticsUrl.init().setMethod("DELETE").setId("5c3b5e7e5d0e65353e68c8e1").build()
	//console.table(analyticsUrl)
	http.setAsync(true).setTimeout(300000).setUrl(analyticsUrl.get()).setMessage("DELETE Me").delete()
	//console.table(http)
	//console.groupEnd()

	throw new Error("INF: DELETE Test");


// Update URL
	//console.groupCollapsed("POST")
//   WORKS   https://api.mlab.com/api/1/databases/iottech/collections/mynewcollection?apiKey=wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q
	payload = '{ "clientId": 999, "bookings": { "created": 0 } }'
	collection = "mynewcollection"
	analyticsUrl.setCollection(collection).setMethod("POST").build()
	analyticsUrl.init().setMethod("POST").build()
	//console.table(analyticsUrl)
	http.setAsync(false).setTimeout(300000).setUrl(analyticsUrl.get()).setPayload(payload).setMessage("Post Me").post()
	//console.table(http)
	//console.groupEnd()







//	throw new Error("INF: Delete Test");



//	throw new Error("errorMessage");

// For Delete Set Asynce to true

} catch (exception) {
//	//console.error("INF: Msg : %s", exception.message)
//	//console.error("INF: stack : %s", exception.stack)

}

