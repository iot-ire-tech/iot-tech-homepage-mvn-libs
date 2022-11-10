/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class TopUp extends Common {
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

		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Charge Id</th>";
		this.html += "<th>Refund Status</th>";
		this.html += "<th>Purchase Date</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""

		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + item.receipt.chargeId + "</td>";
			that.html += "<td>" + item.refund + "</td>";
			that.html += "<td>" + item.timings.purchaseDate + "</td>";
			that.html += "</tr>";
		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}
}

//# sourceURL=module_topup_class.js




