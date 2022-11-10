

class CardRegistration extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

	isValid(type) {
// card
		switch (type) {
			case "props":
				return true;
				break;
			case "short":
				if (this.cardObj.name === "" || this.cardObj.name === undefined)
					return false;
				if (this.cardObj.number === "" || this.cardObj.name === undefined)
					return false;
				if (this.cardObj.csv === "" || this.cardObj.name === undefined)
					return false;
				if (this.cardObj.expYear === "" || this.cardObj.name === undefined)
					return false;
				if (this.cardObj.expMonth === "" || this.cardObj.name === undefined)
					return false;
				if (this.cardObj.email === "" || this.cardObj.name === undefined)
					return false;
				break;
			default:

				break;
		}
		return true;
	}

	uxFormClear() {
//		$("#vidName").val();
	}

	uxFormUpdate(responseload) {
		$("#email").val(responseload.email).trigger("change");
		$("#fname").val(responseload.fname).trigger("change");
		$("#lname").val(responseload.lname).trigger("change");
	}

	display(msg) {

		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";
		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Id</th>";
		this.html += "<th>Type</th>";
		this.html += "<th>FkId</th>";
		this.html += "<th>===</th>";
		this.html += "<th>Reg Date</th>";
		this.html += "<th>Card Holder</th>";
		this.html += "<th>Email</th>";
		this.html += "<th>Expiry Date</th>";
		this.html += "<th>VendorId</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {

			that.html += "<tr>";
			that.html += "<td>" + item.pk.id + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>" + item.fk.id + "</td>";
			that.html += "<td>||</td>";
			that.html += "<td>" + new Date(item.timings.ts.$date).toGMTString() + "</td>";
			that.html += "<td>" + item.email + "</td>";
			that.html += "<td>" + item.name + "</td>";
			that.html += "<td>" + item.expYear + "/" + item.expMonth + "</td>";
			that.html += "<td>" + item.customerId + "</td>";
			that.html += "</tr>";
		});
		this.html += "</table>";
		this.html += "<br>";
		return this.html;
	}

	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = "[" + this.payload.pk.type + "] " + "Owner: " +
			this.payload.fk.id + " Card Detail: Expiry" +
			this.payload.expYear + ", " +
			this.payload.expMonth
		return this;
	}
	queryBuilder(key) {
		this.queryMap = new Map();
		switch (key) {
			case "Q. List all?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By id?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By dbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By fKId?":
				this.query = {"fk.id": this.payload.fk.id};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By fkDbId?":
				this.query = {"fk.dbId": this.payload.fk.dbId};
				this.queryMap.set(key, this.query);
				break;
// Types
			case "Q. List by type(member)?":
				this.query = {"pk.type": "member"};
				this.queryMap.set(key, this.query);
				break;
		}
		return this.queryMap.get(key);
	}

// App Server Call
	register() {
		url = location.origin + contextPath + "/CustomerId";
		this.response = new httpHandler("SigningUp Customer Server Call", responseStrucObj)
			.setUrl(url)
			.setAsync(false).setTimeout(300000).setMessage("HTTP Transaction")		// set payload, then post
			.setPayload(this.payload)
			.post();
		this.customerId = this.response.getResponse().customerId;
		return this;
	}

// Update Registration, not patron
	registerPatron(cardRegistrationObj, srvPatron) {

		if (this.setCard(cardRegistrationObj).isValid("short")) {

			this.customerId = this.setPayload(cardRegistrationObj).register().getCustomerId();
			if (this.customerId === undefined) {
				alert("ERR: CC registration Failed Customer ID generation (" + this.customerId + ")");
				return false;
			} else
				alert("INF: A new CC registration (" + this.customerId + ") has been enabled for your business");
		}
	}

	xregisterPatron(cardRegistrationObj, srvPatron) {
// Get Patron  DB ID , and update patron!!
		srvPatron.setPayload({"pk": {"id": patronId}}).queryByType("Q. Who am I?");
		if (srvPatron.answer()) {
			this.patronObj = srvPatron.getResponse()[0];
			this.dbId = this.patronObj._id.$oid
			delete this.patronObj._id;
			this.patronObj.customerId = this.customerId;
			srvPatron.setPayload(this.patronObj).mod(this.dbId);
			return true;
		} else
			return false;
	}

	queryBuilderX(key) {
		this.queryMap = new Map();
// Credit Card Questions
		this.query = {
			"clientId": this.clientId,
			"customerId": "-1"
		};
		this.queryMap.set("Q. Has No Credit Card?", this.query);
		return this.queryMap.get(key);
	}

}
class CardPayment extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

	isValid(type) {
		switch (type) {
			case "props":
				return true;
				break;
		}
		return true;
	}

	uxFormClear() {
//		$("#vidName").val();
	}

	uxFormUpdate(responseload) {
		$("#email").val(responseload.email).trigger("change");
		$("#fname").val(responseload.fname).trigger("change");
		$("#lname").val(responseload.lname).trigger("change");
	}

	display(msg) {

		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";
		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Id</th>";
		this.html += "<th>Type</th>";
		this.html += "<th>===</th>";
		this.html += "<th>Transaction Date</th>";
		this.html += "<th>VendorId</th>";
		this.html += "<th>Email</th>";
		this.html += "<th>Amount</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {

			that.html += "<tr>";
			that.html += "<td>" + item.pk.id + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>||</td>";
			that.html += "<td>" + new Date(item.timings.ts.$date).toGMTString() + "</td>";
			that.html += "<td>" + item.customerId + "</td>";
			that.html += "<td>" + item.email + "</td>";
			that.html += "<td>" + item.amount + "</td>";
			that.html += "</tr>";
		});
		this.html += "</table>";
		this.html += "<br>";
		return this.html;
	}

	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = "[" + this.payload.pk.type + "] " +
			"Credit Amount: " +
			this.payload.amount + ", " +
			"VendorId: " +
			this.payload.customerId
		return this;
	}
	queryBuilder(key) {
		this.queryMap = new Map();
		switch (key) {
			case "Q. List all?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By id?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;
// Types
			case "Q. List by type(member)?":
				this.query = {"pk.type": "member"};
				this.queryMap.set(key, this.query);
				break;
		}
		return this.queryMap.get(key);
	}

	makePayment() {
//console.log("INF : Card payment amount (%s) [cent]", Math.round(parseFloat(amount) * 100))

//		this.paymentsData = {
//			"customerId": this.getCustomerId(),
////			"amount": Math.round(parseInt(amount).toFixed(2) * 100),
//			"amount": Math.round(parseFloat(amount) * 100),
//			"email": this.getEmail()
//		};
//		return false;
		url = location.origin + contextPath + "/PaymentByCustomerId";
		this.response = new httpHandler("Card Payment Server Call", responseStrucObj)
			.setUrl(url)
			.setAsync(false).setTimeout(300000).setMessage("HTTP Transaction")		// set payload, then post
			.setPayload(this.payload)
			.post();

		if (this.response.isSuccessful === true)
			return true;
		else
			return false;
	}

}

class CardRefund extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

	isValid(type) {
		switch (type) {
			case "props":
				return true;
				break;
		}
		return true;
	}

	uxFormClear() {
//		$("#vidName").val();
	}

	uxFormUpdate(responseload) {
		$("#email").val(responseload.email).trigger("change");
		$("#fname").val(responseload.fname).trigger("change");
		$("#lname").val(responseload.lname).trigger("change");
	}

	display(msg) {

		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";
		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Id</th>";
		this.html += "<th>Type</th>";
		this.html += "<th>===</th>";
		this.html += "<th>Split Name</th>";
		this.html += "<th>Entry Date</th>";
		this.html += "<th>===</th>";
		this.html += "<th>% Client</th>";
		this.html += "<th>% Patron</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {

			that.html += "<tr>";
			that.html += "<td>" + item.pk.id + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>||</td>";
			that.html += "<td>" + item.split.name + "</td>";
			that.html += "<td>" + new Date(item.timings.ts.$date).toGMTString() + "</td>";
			that.html += "<td>||</td>";
			that.html += "<td>" + item.split.client + "</td>";
			that.html += "<td>" + item.split.patron + "</td>";
			that.html += "</tr>";
		});
		this.html += "</table>";
		this.html += "<br>";
		return this.html;
	}

	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = "[" + this.payload.pk.type + "] " +
			"Refund Amount: " +
			this.payload.amount + ", " +
			"VendorId: " +
			this.payload.customerId
		return this;
	}
	queryBuilder(key) {
		this.queryMap = new Map();
		switch (key) {
			case "Q. List all?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By id?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;
// Types
			case "Q. List by type(member)?":
				this.query = {"pk.type": "member"};
				this.queryMap.set(key, this.query);
				break;
		}
		return this.queryMap.get(key);
	}

	makeRefund() {
//		return false;
		url = location.origin + contextPath + "/PaymentByCustomerId";
		this.response = new httpHandler("Card Payment Server Call", responseStrucObj)
			.setUrl(url)
			.setAsync(false).setTimeout(300000).setMessage("HTTP Transaction")		// set payload, then post
			.setPayload(this.paymentsData)
			.post();
		if (this.response.isSuccessful === true)
			return true;
		else
			return false;
	}

}

//# sourceURL=finance_payments_card_srv.js
