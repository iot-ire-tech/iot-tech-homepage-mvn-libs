

/*
 * Create new object named patron
 {
 "id": 10,
 "name": "Analytics",
 "idUx": "analytics",
 "description": "Todays business make decisions on discerning information - don't miss out",
 "status": "Init",
 "clientId": 679626
 }

 */

function ClientOfferings(clientId) {
// constructor start
	this.clientId = clientId;

	this.id;
	this.idUx;
	this.name;
	this.status;
	this.desc;

// constructor end
	var obj = {};
	var objs = [];
	var objsOut = [];

	this.init = function (sub) {

		this.id = sub.id;
		this.idUx = sub.idUx;
		this.name = sub.name;
		this.status = sub.status;
		this.desc = sub.desc;

		return this;
	}
// To List of objs
	this.remove = function () {

	}
	this.addNew = function (id, sub) {
		obj = {};
		objs.push(sub);
		return this;
	}
	/*
	 {
	 "id": 10,
	 "name": "Analytics",
	 "idUx": "analytics",
	 "description": "Todays business make decisions on discerning information - don't miss out",
	 "status": "Init",
	 "clientId": 679626
	 }
	 */
	this.get = function () {
		url = urlRest + "/" + "clientOfferings?clientId=" + this.clientId;
		objsOut = nw.setUrl(url).setMessage("Retrieving client offerings").getMe().getResult();
		if (objsOut.length < 1) {
			//console.log("ERR: Cannot retrieve client offerings");
			//alert(errMsg);
			return false;
		} else {
			return objsOut;
		}
	}

	this.put = function () {
		var payload = {}

		payload.id = this.id;
		payload.name = this.name;
		payload.idUx = this.idUx;
		payload.description = this.desc;
		payload.status = this.status;
		payload.clientId = parseInt(this.clientId);

		var save = prompt("If you wish to change to this new setting, click ok, else cancel!", payload.status);
		if (save === payload.status) {
			url = urlRest + "/" + "clientOfferings" + "/" + payload.id;
			if (nw.setUrl(url).setMethod("put").setPayload(payload).setMessage("Updating/Posting New Client Offering").sendMe().getStatus() === false) {
				//console.log("ERR: Cannot provision new client offering ");
				//console.log("INF: Payload Sent : (" + nw.getPayload() + ")");
				return true;
			} else {
				return false;
			}
		}

	}

	return this;

}




