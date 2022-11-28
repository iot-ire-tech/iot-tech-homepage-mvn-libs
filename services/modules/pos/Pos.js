/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Pos extends Common {
	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

// Test Layer
	isValid(type) {
		switch (type) {
			case "props":
				if (this.payload.name.length === 0)
					return false;
				break;
			default:
				return false;
				break;
		}
		return true;
	}

	queryBuilder(key) {
		this.queryMap = new Map();

		switch (key) {
			case "Q. Get Config?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By Id?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;


		}
		return this.queryMap.get(key);
	}

}

class PosReciept extends Common {
	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

	isValid(type) {
// card
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
	queryBuilder(key) {
		this.queryMap = new Map();

		switch (key) {
			case "Q. Get Config?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By Id?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By DbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;

			case "Q. By Patron Id (refund=false)?":
				this.query = {"receipt.payee.id": this.payload.id, "refunded": false};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By Patron Id (refund=true)?":
				this.query = {"receipt.payee.id": this.payload.id, "refunded": true};
				this.queryMap.set(key, this.query);
				break;


		}
		return this.queryMap.get(key);
	}

	display(msg) {
		var html = "";
		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";

		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Select Item</th>";
		this.html += "<th>Charge Id</th>";
		this.html += "<th>Refund Status</th>";
		this.html += "<th>Refund Date</th>";
		this.html += "<th>Purchase Date</th>";
		this.html += "<th>Purchase Item</th>";
		this.html += "<th>Cost</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""


		this.response.forEach(function (item) {
			html = "<div class=\"ui toggle checkbox\">"
			html += "<input class='returnItem' type=\"radio\" name=\"returns\" "
			html += "value=" + item.receipt.chargeId + " "
			html += "amount=" + item.receipt.cost + " "
			html += "posReceiptDbId=" + item.pk.dbId + " "
			html += "> <label></label>"
			html += "</div>"

			that.html += "<tr>";
			that.html += "<td>" + html + "</td>";
			that.html += "<td>" + item.receipt.chargeId + "</td>";
			that.html += "<td>" + item.refunded + "</td>";
			if (item.timings.refundDate !== null)
				that.html += "<td>" + new Date(item.timings.refundDate.$date).toLocaleDateString() + "</td>";
			else
				that.html += "<td>N/A</td>";
// Will Add Multiple items here....
			that.html += "<td>" + new Date(item.timings.purchaseDate.$date).toLocaleDateString() + "</td>";
			that.html += "<td>" + item.receipt.item + "</td>";
			that.html += "<td>" + item.receipt.cost + "</td>";
			that.html += "</tr>";
		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}

}

//# sourceURL=module_pos_class.js

