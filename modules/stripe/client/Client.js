/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




class Client extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

	isValid(type) {
		switch (type) {

			case "props":
				if (this.payload.pk.id < 0)
					return false;
				break;
			case "terms":
				if (this.payload.terms === false || this.payload.terms === undefined) {
					//consoleIt("ERR: Form Validation - Failed to aggree with TOC")
					alert("You must check the terms of conditions before preceeding with account registration")
					return false;
				}
				break;

		}
		return true;
	}

	queryBuilder(key) {
		this.queryMap = new Map();
//		this.queryMap.set("Q. What cost is associated with this Id?", this.query);
		switch (key) {
			case "Q. List All?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. Who am I?":
				this.query = {"pk.id": this.payload.pk.id};
//				this.query = {"id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;

		}
		return this.queryMap.get(key);
	}

	uxUpdateNameTag() {
		// Ok so our model context includes members we want to list
		this.payload.ux.items = []; // Reset List For Mod Purposes
		this.payload.ux.name = +" "
			+ this.payload.cost.amount
			+ " "
			+ this.payload.cost.currency
			+ ", for "
			+ this.payload.timings.duration.value
			+ " ["
			+ this.payload.timings.duration.unit
			+ "]"
			+ " "
			+ "(" + this.payload.ux.tag + ")";


		return this;
	}

	display(msg) {


		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";
		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Id(FK)</th>";
		this.html += "<th>Type(FK)</th>";
		this.html += "<th>Type(PK)</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + item.fk.id + "</td>";
			that.html += "<td>" + item.fk.type + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>" + item.name + "</td>";
			that.html += "<td>" + item.timings.duration.value + "</td>";
			that.html += "<td>" + item.cost.amount + "</td>";
			that.html += "<td>" + item.cost.currency + "</td>";
			that.html += "</tr>";

		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}
	uxFormUpdate(responseload) {
//		$(".patronIdsMultiple").dropdown("set selected", responseload.members).trigger("change");
		$("#tagLine").val(responseload.name).trigger("change");
	}
	uxFormClear() {
//		$("#number").val().trigger("change");
	}

}
//# sourceURL=client_service.js