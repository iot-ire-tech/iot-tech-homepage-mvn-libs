/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



class Common extends crudIt {

	constructor(ctrl, msg) {
		super(ctrl, msg);
	}
	setPayload(val) {
		this.payload = val;
		return this;
	}

	isExists() {
// No Duplicate Attempts
//		return true;
		return false;
	}

	getResponse() {
		return this.response;

	}
	answer() {
		if (this.response.length > 0)
			return true;
		else
			return false;

	}
	create() {
		super.setPayload(this.payload);
		this.response = super.post();
		return this.response;
	}
	mod(id) {
		super.setPayload(this.payload);
		this.response = super.putById(id);
		return this.response;
	}
	modPkDbId() {
		// Update Record pk, and fk, and ux.pk With ID info!!
		this.response.pk.dbId = this.response._id.$oid;
		this.response.ux.pk = this.response.pk;
		super.setPayload(this.response);
		this.mod(this.response.pk.dbId);
	}
	queryAll() {
		super.setPayload("{}");
		this.response = super.query();
		return this.response;
	}

	queryByType(type) {
		super.setPayload(this.queryBuilder(type));
		this.response = super.query();
		return this.response;
	}

	displayEmpty(msg) {
		this.html = "<br>";
		this.html = "<div class=\"w3-panel w3-leftbar w3-gray\"> </div>"
		this.html += "<caption>";
		this.html = "<h3 class=\"ui header\">" + msg + "</h3>"
		this.html += "</caption>";
		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th >Challenger</th>";
		this.html += "<th>Type</th>";
		this.html += "<th>Score</th>";
		this.html += "<th>||</th>";
		this.html += "<th>Wins</th>";
		this.html += "<th>Loses</th>";
		this.html += "<th>Draws</th>";
		this.html += "<th>Status</th>";
		this.html += "</tr>";
		this.html += "</tr>";
		this.html += "</table>";

		return this.html;
	}

}

//# sourceURL=Common.js
