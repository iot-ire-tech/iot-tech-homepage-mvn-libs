/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function consoleIt(avar, tag) {
	var atag = tag;

	if (atag === undefined)
		console.log("INF: (" + avar + ")");
	else
		console.log(tag + ": (" + avar + ")");
}

var logEntry = {
	"clientId": 0,
	"logs": [{
			"type": "payments",
			"ts": getTs(),
			"severity": "",
			"priority": "",
			"entry": ""
		}]
};

class Logger extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
		return this;
	}
	// Suggested Payment Split
	setClientId(clientId) {
		this.clientId = clientId;
		return this;
	}
	getClientId(clientId) {
		return this.clientId;
	}
	alert() {
//		alert(this.msg)
		return this;
	}
	setCat(cat) {
		this.cat = cat;
		return this;
	}
	getCat() {
		return this.cat;
	}
	setSev(cat) {
		this.cat = cat;
		return this;
	}
	getSev() {
		return this.cat;
	}
	setPri(cat) {
		this.cat = cat;
		return this;
	}
	getPri() {
		return this.cat;
	}
	setMsg(msg) {
		this.msg = msg;
		return this;
	}
	getMsg() {
		return this.msg;
	}
	setPayload() {
		super.setPayload({
			"clientId": this.setClientId(),
			"logs": [{
					"type": this.getCat(),
					"ts": getTs(),
					"severity": this.getSev(),
					"priority": this.getPri(),
					"entry": this.getMsg()
				}]
		});
		return this;
	}
	create() {
		//	return super.post();
	}

	del() {
		return super.del();
	}
	mod(id) {
		return super.putById(id);
	}
	add() {
	}
	query() {
		return super.query();
	}

}