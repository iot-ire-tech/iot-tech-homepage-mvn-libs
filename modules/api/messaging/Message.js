/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Service Teasing!!!
 * -------------------------
 * TouchPoints
 * -------------------------
 * Where does it start
 * + publish time
 * Where does it end
 * + expiry time
 * -------------------------
 * Players
 * -------------------------
 * + people
 * + entities - resource, event, subevent
 *
 * -------------------------
 * Aim
 * -------------------------
 * Service is create messages
 * Determine start / end dates
 *
 *
 */


// var msg = new Message(bs.messageCtrl, "NW: Message");
/*
 * @param {type} msghdlr
 * @param {type} amessage
 * @returns {undefined}
 */



class Message extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
		this.brandings = [];
		this.clientId = 0;
		this.targetId = 0;
	}
// Logic Statements
	isClientBranding(clientId) {
	}

// Search / Input Service / Types
	setTargetId(targetId) {
		this.targetId = targetId;
		return this;
	}
	setClientId(clientId) {
		this.clientId = clientId;
		return this;
	}


	queryBuilder(key) {
		this.queryMap = new Map();
		switch (key) {

			case "Q. List all?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List by type(public)?":
				this.query = {"message.type": "public"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List by type(user)?":
				this.query = {"message.type": "user"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List by type(resource)?":
				this.query = {"message.type": "resource"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List by type(event)?":
				this.query = {"message.type": "event"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List by type(subEvent)?":
				this.query = {"message.type": "subEvent"};
				this.queryMap.set(key, this.query);
				break;

			case "public":
				this.query = "{\"routing.targetId\": 0,\"message.type\":\"public\", \"routing.clientId\":" + this.clientId +
					", \"timings.publishDate\":\"" + ts.getYYYMMDD() + "\"}"
				this.queryMap.set(key, this.query);
				break;
			case "user":
				this.query = "{\"routing.targetId\":" + this.targetId +
					",\"message.type\":\"user\", \"timings.publishDate\":\"" + ts.getYYYMMDD() + "\"}"
				this.queryMap.set(key, this.query);
				break;
			case "resource":
				this.query = "{\"routing.targetId\":" + this.targetId +
					",\"message.type\":\"resource\", \"timings.publishDate\":\"" + ts.getYYYMMDD() + "\"}"
				this.queryMap.set(key, this.query);
				break;
			case "event":
				this.query = "{\"routing.targetId\":" + this.targetId +
					",\"message.type\":\"event\", \"timings.publishDate\":\"" + ts.getYYYMMDD() + "\"}"
				this.queryMap.set(key, this.query);
				break;
			case "subEvent":
				this.query = "{\"routing.targetId\":" + this.targetId +
					",\"message.type\":\"subEvent\", \"timings.publishDate\":\"" + ts.getYYYMMDD() + "\"}"
				this.queryMap.set(key, this.query);
				break;
			default:

				break;
		}
		return this.queryMap.get(key);
	}

	isToday() {

		this.msg.timings.publishDate = this.msg.timings.publishDate.replace(new RegExp("-", 'g'), " ");
		var yyyy = parseInt(this.msg.timings.publishDate.split(" ")[0]);
		var mm = parseInt(this.msg.timings.publishDate.split(" ")[1] - 1);
		var dd = parseInt(this.msg.timings.publishDate.split(" ")[2]);
		//console.log("Year: " + yyyy);
		//console.log("Month: " + mm);
		//console.log("Day Of Month: " + dd);
		this.tmpTime = new Date();
		//console.log("Hour: " + this.tmpTime.getHours());
		//console.log("Min: " + this.tmpTime.getMinutes());
		//console.log("Sec: " + this.tmpTime.getSeconds());
		//console.log("Mill: " + this.tmpTime.getMilliseconds());
		this.tmpDate = new Date(yyyy, mm, dd, this.tmpTime.getHours(), this.tmpTime.getMinutes(), this.tmpTime.getSeconds(), this.tmpTime.getMilliseconds());
		//console.log("From Date Object");
		//console.log("Year: " + this.tmpDate.getFullYear());
		//console.log("Month: " + this.tmpDate.getMonth());
		//console.log("Day Of Month: " + this.tmpDate.getDate());
		this.dateutil = new dateUtil(this.tmpDate, this.tmpTime);
		//console.log("INF: Is Today (" + this.dateutil.init().isToday() + ")")
		if (this.dateutil.init().isToday() === true) {
			return true;
		} else {
			return true;
		}
	}

// Aim here is to return a.....
// Alogorithm - How - Loop involved too....
	algorithmSearch() {
	}
	algorithmFiltering() {
	}
}

//# sourceURL=srv_Message.js