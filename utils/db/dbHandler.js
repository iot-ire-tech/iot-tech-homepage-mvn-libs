/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class dbHandler {

	constructor(proto, host, port, key, db, httpObj, collection) {
		this.proto = proto;
		this.host = host;
		this.port = port;
		this.key = key;
		this.db = db;
		this.httpObj = httpObj;
		this.collection = collection;
		return this;
	}

	setDb(db) {
		this.db = db;
		return this;
	}
	setCollection(collection) {
		this.collection = collection;
		return this;
	}

	init() {
		this.postUrl = new urlMongoBuilder(this.proto, this.host, this.port, this.key, this.db).init().setCollection(this.collection).setMethod("POST").build().get()		// ready out of the box!!!
		this.delUrl = new urlMongoBuilder(this.proto, this.host, this.port, this.key, this.db).init().setCollection(this.collection).setMethod("DELETE")			// set ID, then build

		this.putUrl = new urlMongoBuilder(this.proto, this.host, this.port, this.key, this.db).init().setCollection(this.collection).setMethod("PUT")				// set ID, then build
		this.getUrl = new urlMongoBuilder(this.proto, this.host, this.port, this.key, this.db).init().setCollection(this.collection).setMethod("GET")				// set ID, then build

		this.getsUrl = new urlMongoBuilder(this.proto, this.host, this.port, this.key, this.db).init().setCollection(this.collection).setMethod("QGET")				// set query, then build
		this.getssUrl = new urlMongoBuilder(this.proto, this.host, this.port, this.key, this.db).init().setCollection(this.collection).setMethod("GETALL")				// set query, then build
		this.delsUrl = new urlMongoBuilder(this.proto, this.host, this.port, this.key, this.db).init().setCollection(this.collection).setMethod("QDELETE")		// set query, then build
		this.putsUrl = new urlMongoBuilder(this.proto, this.host, this.port, this.key, this.db).init().setCollection(this.collection).setMethod("QPUT")			// set  query, then build

		//console.log("INF: post URL : %s ", this.postUrl)
		//console.log("INF: del URL : %s ", this.delUrl.setId("12321").build().get())
		//console.log("INF: put URL : %s ", this.putUrl.setId("12321").build().build().get())
		//console.log("INF: get URL : %s ", this.getUrl.setId("12321").build().build().get())

// Data Layer
		//this.getEntity = this.httpObj.setAsync(false).setTimeout(300000).setMessage("Get Me").get().getResponse()[0]
		this.http = this.httpObj.setAsync(false).setTimeout(300000).setMessage("HTTP Transaction")		// set payload, then post
//		this.postHttp = this.httpObj.setAsync(false).setTimeout(300000).setMessage("Post Me")		// set payload, then post
//
//		this.putHttp = this.httpObj.setAsync(false).setTimeout(300000).setMessage("Put Me")			// set payload, then Mod
//		this.delHttp = this.httpObj.setAsync(false).setTimeout(300000).setMessage("Del Me")		// set payload, then Del
//
//		this.getsHttp = this.httpObj.setAsync(false).setTimeout(300000).setMessage("Get(s) Me")	// set Url, and Get
//		this.putsHttp = this.httpObj.setAsync(false).setTimeout(300000).setMessage("Puts Me")		// set payload, then Mod
//		this.delsHttp = this.httpObj.setAsync(false).setTimeout(300000).setMessage("QDel Me")		// set payload, then QDel

	}
}

