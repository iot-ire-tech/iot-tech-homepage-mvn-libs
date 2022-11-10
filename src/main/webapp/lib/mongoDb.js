/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * 	Default Resource Share with IOT
 */


var JsonDb = function (endpoint, message) {
	this.payload = {};
	this.endpoint = endpoint;
	this.message = message;
	this.response = {}
	this.responseLength = 0
	this.exists = false;


	this.setPayload = function (payload) {
		this.payload = payload;
	}

	this.put = function () {
		url = urlRest + this.endpoint + "/" + payload.id;
		if (nw.setUrl(url).setMethod("put").setPayload(this.payload).setMessage(this.message).sendMe().getStatus() === true) {
			//console.log("INF: " + this.message + " created")
		} else {
			//console.log("ERR: " + this.message + " not created")
		}
		//console.log("INF: Default Payload Sent : (" + nw.getPayload() + ")");

	}
	this.del = function (id) {
		url = urlRest + this.endpoint + "/" + id;
		if (nw.setUrl(url).setPayload(this.payload).setMessage(this.message).delMe().getStatus() === true) {
			//console.log("INF: " + this.message + " deleted")
		} else {
			//console.log("ERR: " + this.message + " not deleted")
		}
		//console.log("INF: Default Payload Sent : (" + nw.getPayload() + ")");

	}
	this.getAll = function () {
		url = urlRest + this.endpoint;
		if (nw.setUrl(url).setPayload(this.payload).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			//console.log("INF: " + this.message + " retrieved")
		} else {
			//console.log("ERR: " + this.message + " not retrieved")
		}
		return this;

	}

	this.getByClientID = function (id) {
		url = urlRest + this.endpoint + "?clientId=" + id;
		if (nw.setUrl(url).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			//console.log("INF: " + this.message + " retrieved")
		} else {
			//console.log("ERR: " + this.message + " not retrieved")
		}
		return this;

	}
	this.getByClientIdAndPatronId = function (clientId, patronId) {
		url = urlRest + this.endpoint + "?clientId=" + clientId + "&patronId=" + patronId;
		if (nw.setUrl(url).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			//console.log("INF: " + this.message + " retrieved")
		} else {
			//console.log("ERR: " + this.message + " not retrieved")
		}
		return this;

	}

	this.getParentChild = function (id) {
		url = urlRest + this.endpoint
		if (nw.setUrl(url).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			//console.log("INF: " + this.message + " retrieved")
		} else {
			//console.log("ERR: " + this.message + " not retrieved")
		}
		return this;

	}
	this.getRange = function (id) {
		url = urlRest + this.endpoint
		if (nw.setUrl(url).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			//console.log("INF: " + this.message + " retrieved")
		} else {
			//console.log("ERR: " + this.message + " not retrieved")
		}
		return this;

	}
// If Exists cant post but can put!!
	this.getById = function (id) {
		url = urlRest + this.endpoint + "?id=" + id;
		if (nw.setUrl(url).setPayload(this.payload).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			this.msg(true)
		} else {
			this.msg(false)
		}

		return this;
	}

	this.getByResourceId = function (id) {
		url = urlRest + this.endpoint + "?resourceId=" + id;
		if (nw.setUrl(url).setPayload(this.payload).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			this.msg(true)
		} else {
			this.msg(false)
		}

		return this;
	}

	this.getByEventId = function (id) {
		url = urlRest + this.endpoint + "?eventId=" + id;
		if (nw.setUrl(url).setPayload(this.payload).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			this.msg(true)
		} else {
			this.msg(false)
		}

		return this;
	}


	this.getBySubEventId = function (id) {
		url = urlRest + this.endpoint + "?subEventId=" + id;
		if (nw.setUrl(url).setPayload(this.payload).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			this.msg(true)
		} else {
			this.msg(false)
		}

		return this;
	}
	this.idExists = function (id) {
		url = urlRest + this.endpoint + "?id=" + id;
		if (nw.setUrl(url).setPayload(this.payload).setMessage(this.message).getMe().getStatus() === true) {
			this.response = nw.getResult();
			this.responseLength = nw.getResult().length

			if (this.responseLength === 1)
				this.exists = true;
			else
				this.exists = false;

			return  this.exists;

		} else {
			this.msg(false)
		}

	}

	this.post = function () {
		url = urlRest + this.endpoint;
		if (nw.setUrl(url).setMethod("post").setPayload(this.payload).setMessage(this.message).sendMe().getStatus() === true) {
			//this.messageIt(true)
		} else {
			this.msg(false)
		}

	}
	this.msg = function (result) {

		//console.log("INF: Query Response : (" + nw.getResult() + ")");
		//console.log("INF: Payload Sent : (" + nw.getPayload() + ")");
		if (result) {
			this.message = "INF: " + this.message + " created"
			$("#processingMessage").html("<p>" + this.message + "</p>");
			//console.log("INF: " + this.message + " created")
		} else {
			this.message = "INF: " + this.message + " not created"
			$("#processingMessage").html("<p>" + this.message + "</p>");
			//console.log("ERR: " + this.message + " not created")

		}
	}

	this.getResponse = function () {
		return this.response;
	}
	this.getResponseLength = function () {
		return this.responseLength;
	}
	this.setMessage = function (msg) {
		this.message = msg;
		return this;
	}
	this.setPayload = function (payload) {
		this.payload = payload;
		return this;
	}
	this.setEndpont = function (endpoint) {
		this.endpoint = endpoint;
		return this;
	}
	return this;
}
