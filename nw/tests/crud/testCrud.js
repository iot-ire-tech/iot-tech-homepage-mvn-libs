/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


try {
	//console.clear()
	var response = {}
	var payload = {
		"id": 0,
		"name": "test"
	}

	response = new crudIt(bs.resourceAnalyticsCtrl, "Post It").setPayload(payload).post();
	response = new crudIt(bs.resourceAnalyticsCtrl, "Post It").setPayload(payload).post();
	var id = response._id.$oid;

// Delete By Query
// "/dev/collections/resourceAnalytics?apiKey=wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q&q={\"_id.$oid\":5c4608475d0e651a021e2ca2}"
//	response = new crudIt(bs.resourceAnalyticsCtrl, "QDelete It").setPayload("{\"_id.$oid\":" + id + "}").delByQuery();

// Delete By Query - Fail
	new crudIt(bs.resourceAnalyticsCtrl, "QDelete It").setPayload("{\"id\":1}").delByQuery();
	throw new Error("INF: DELETE Test");


// Delete By Query Via Put - Fail
	new crudIt(bs.resourceAnalyticsCtrl, "QDelete Buy QPut").setPayload("{\"id\":1}").putByQuery();


// Delete All Docs in a collection -Pass
	new crudIt(bs.resourceAnalyticsCtrl, "QDelete Buy QPut").setPayload("[]").putByQuery();

// Delete By Oid - Pass
	response = new crudIt(bs.resourceAnalyticsCtrl, "Delete It").delByOId(id);





// Mod By Id
// delete OID first
	delete patron._id;
	var responseUpdateCustomerId = new crudIt(bs.resourceAnalyticsCtrl, "Updating Patron with CustomerId").setPayload(patron).putById(dbId)

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


} catch (exception) {
//	//console.error("INF: Msg : %s", exception.message)
//	//console.error("INF: stack : %s", exception.stack)

}

