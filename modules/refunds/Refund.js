/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Refund extends Common {
	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

// Test Layer
	isValid(type) {
		switch (type) {
			case "props":
				if (this.payload.fk.length === 0)
					return false;
				break;
			default:
				return false;
				break;
		}
		return true;
	}

	update() {
		srvEntity.setPayload(modelEntityRsp)
		srvEntity.uxUpdateNameTag()
		if (srvEntity.isValid("props")) {
			srvEntity.mod(modelEntityRsp.pk.dbId);
//						alert("INF: Item (" + modelEntityRsp.socialize.name + ")");
		} else
			alert("ERR: Item (" + modelEntityRsp.socialize.name + "), contact support asap");
	}

	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = ""
		return this;
	}
	queryBuilder(key) {
		this.queryMap = new Map();
		switch (key) {
			case "Q. List All?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List All By(cash)?":
				this.query = {"pk.type": "cash"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List All By(card)?":
				this.query = {"pk.type": "card"};
				this.queryMap.set(key, this.query);
				break;

			case "Q. By Id?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;


		}
		return this.queryMap.get(key);
	}

	display(msg) {
		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";

		if (this.response[0].pk.type === "card") {
			this.html += "<table class='w3-table-all'>";
			this.html += "<tr>";
			this.html += "<th>Id</th>";
			this.html += "<th>Amount</th>";
			this.html += "<th>Reason</th>";
			this.html += "<th>Date</th>";
			this.html += "</tr>";
			var that = this;
			var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""

			this.response.forEach(function (item) {
				that.html += "<tr>";
				that.html += "<td>" + item.refund.id + "</td>";
				that.html += "<td>" + item.refund.amount + "</td>";
				that.html += "<td>" + item.refund.reason + "</td>";
				that.html += "<td>" + new Date(item.refundDate.$date) + "</td>";
				that.html += "</tr>";
			});
		} else {
			this.html += "<table class='w3-table-all'>";
			this.html += "<tr>";
			this.html += "<th>Amount</th>";
			this.html += "<th>Reason</th>";
			this.html += "<th>Date</th>";
			this.html += "</tr>";
			var that = this;
			var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""

			this.response.forEach(function (item) {
				that.html += "<tr>";
				that.html += "<td>" + item.refund.amount + "</td>";
				that.html += "<td>" + item.refund.reason + "</td>";
				that.html += "<td>" + new Date(item.refundDate.$date) + "</td>";
				that.html += "</tr>";
			});
		}
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}
}
//# sourceURL=module_refunds_class.js




