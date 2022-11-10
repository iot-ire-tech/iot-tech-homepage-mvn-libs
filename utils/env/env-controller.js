// Origin : Local Developer Workspace

var deployment;
var channel;
// Globals
var protoRest;
var hostRest;
var portRest;

var protoServ;
var hostServ;
var portServ;
var contextPath;

class urlBuilder {

	constructor(proto, host, port) {
		this.proto = proto;
		this.host = host;
		this.port = port;
	}

	init() {
		if (this.port === "")
			this.baseUrl = this.proto + ":" + "//" + this.host;
		else
			this.baseUrl = this.proto + ":" + "//" + this.host + ":" + this.port;
		return this;
	}
	getBase() {
		return this.baseUrl;
	}

	addParm(param) {
		this.param = param;
		return this;
	}
}

class urlMongoBuilder extends urlBuilder {

	constructor(proto, host, port, key, db, response) {
		super(proto, host, port)
		this.key = key;
		this.db = db;
//		this.collection =collection;
		this.response = response;
	}
//https://docs.mlab.com/data-api/#faq
	build() {
		this.baseUrl = super.getBase()
		//console.log("INF: Base URL: %s", this.baseUrl)

		if (this.method === "GET" || this.method === "PUT" || this.method === "DELETE")
			this.url = this.baseUrl + "/api/1/databases/" + this.db + "/collections/" + this.collection + "/" + this.id + "?apiKey=" + this.key
		else if (this.method === "POST")
			this.url = this.baseUrl + "/api/1/databases/" + this.db + "/collections/" + this.collection + "?apiKey=" + this.key
		else if (this.method === "GETALL")
			this.url = this.baseUrl + "/api/1/databases/" + this.db + "/collections/" + this.collection + "?apiKey=" + this.key

// Querys
		else if (this.method === "QGET" || this.method === "QPUT" || this.method === "QDELETE")
			this.url = this.baseUrl + "/api/1/databases/" + this.db + "/collections/" + this.collection + "?apiKey=" + this.key + "&q=" + this.query
		else
			throw new Error("Method Not Recognised");
		return this;
	}
	setMethod(method) {
		this.method = method;
		return this;
	}
	setId(id) {
		this.id = id;
		return this;
	}
	setQuery(query) {
		this.query = query;
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
	addParm(param) {
		this.param = param;
		return this;
	}
// Result
	get() {
		return this.url;
	}
	getThis() {
		return this;
	}
}

function environment(deployment, channel, ssl) {

// Local Context
	if (deployment === "local") {
		protoRest = "http";
		hostRest = "localhost";
		portRest = "3000";

		protoServ = "http";
		hostServ = "localhost";
		portServ = "8084";
		contextPath = channel;

	}
	if (deployment === "qa") {
		protoRest = "http";
		hostRest = "localhost";
		portRest = "3000";

		protoServ = "http";
		hostServ = "localhost";
		portServ = "8084";
		contextPath = channel;

	}

	if (deployment === "dev") {
		protoRest = "http";
		hostRest = "localhost";
		portRest = "3000";

		protoServ = "http";
		hostServ = "localhost";
		portServ = "8084";
		contextPath = channel;

	}

// Gcloud Context
	if (deployment === "gcloud" && ssl === true) {
// Traffice in from browser - if traffic in from app server, hard code is locally
		protoRest = "https";
		hostRest = "www.iot-social.com";
		portRest = "";

		protoServ = "https";
		hostServ = "www.iot-social.com";
		portServ = "";
		contextPath = channel;
	} else {
		protoRest = "http";
		hostRest = "www.iot-social.com";
		portRest = "";

		protoServ = "http";
		hostServ = "www.iot-social.com";
		portServ = "";
		contextPath = channel;
	}
}

