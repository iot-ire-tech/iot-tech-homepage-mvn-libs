/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var address = {
	"fk": {
		"type": "address",
		"id": -1
	},
	"id": -1,
	"clientId": -1,
	"patronId": -1,
	"street": "",
	"number": "",
	"town": "",
	"city": "",
	"country": "",
//		Service UX
	"name": ""
};

class AddressX extends crudIt {
	constructor(ctrl, msg) {
		super(ctrl, msg);

	}

	// Search / Input Service


	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = "[" + this.payload.pk.type + "] " + this.payload.number + ", " + this.payload.street + ", " + this.payload.town + ", " + this.payload.city;
		return this;
	}
	setPayload(payload) {
		this.payload = payload;
		return this;
	}
	isValid(type) {
		switch (type) {
			case "props":
				if (this.payload.number.length === 0)
					return false;
				if (this.payload.street.length === 0)
					return false;



				if (this.payload.pk.dbId === "Please Select")
					return false;
				break;
			default:
				return false;
				break;
		}
		return true;
	}

	uxFormUpdate(responseload) {
		$("#typeLocation_Mod").val(responseload.pk.type);
		$("#number_Mod").val(responseload.number);
		$("#street_Mod").val(responseload.street);
		$("#town_Mod").val(responseload.town);
		$("#city_Mod").val(responseload.city);
		$("#zip_Mod").val(responseload.zip);
		$("#country_Mod").val(responseload.country);
	}

	create() {
		super.setPayload(this.payload);
		this.response = super.post();
		return this.response;
	}

	modPkDbId() {
		this.response.pk.dbId = this.response._id.$oid;
		this.response.ux.pk = this.response.pk;
		super.setPayload(this.response);
		this.mod(this.response.pk.dbId);
	}

	mod(id) {
		super.setPayload(this.payload);
		this.response = super.putById(id);
		return this.response;
	}

	query() {
		super.setPayload(this.payload);
		this.response = super.query();
		return this.response;
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

	answer() {
		if (this.response.length > 0)
			return true;
		else
			return false;
	}

	uxFormClear() {
//		$("#vidName").val();
	}
	uxBuildList() {
		this.queryAll()
		if (this.answer()) {
			this.html = "<br>";
			this.html += "<table class='w3-table-all'>";
			this.html += "<tr>";
			this.html += "<th>Type</th>";
			this.html += "<th>Number</th>";
			this.html += "<th>Street</th>";
			this.html += "<th>Town</th>";
			this.html += "<th>City</th>";
			this.html += "<th>Country</th>";
			this.html += "<th>Map Ref</th>";
			this.html += "</tr>";
			var that = this;
			var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
			this.queryAll().forEach(function (item) {
				var q = item.number + " " + item.street + ", " + item.town
				var iframe = "<iframe width=600 height=250 frameborder=0 style=\"border:0\" ";
				iframe += "src=\"https://www.google.com/maps/embed/v1/place";
				iframe += "?key=AIzaSyA1a6GKndaIjxa08Tw5DpQWeCXkvA_JbOk";
				iframe += "&q=" + q;
				iframe += "\" ";
				iframe += "allowfullscreen > </iframe>";

				that.html += "<tr>";
				that.html += "<td>" + item.pk.type + "</td>";
				that.html += "<td>" + item.number + "</td>";
				that.html += "<td>" + item.street + "</td>";
				that.html += "<td>" + item.town + "</td>";
				that.html += "<td>" + item.city + "</td>";
				that.html += "<td>" + item.country + "</td>";
				that.html += "<td>" + iframe + "</td>";
				that.html += "</tr>";
			});
			this.html += "</table>";
			this.html += "<br>";
			return this.html;

		} else {
			alert("INF: No users provisioned in the system, contact support asap")
		}
		return "";
	}
	queryBuilder(key) {
		this.queryMap = new Map();
// Basic Questions
// Who am i
		this.query = {
			"id": this.patronId
		};
		this.queryMap.set("Q. Who am I?", this.query);
		this.query = {
			"pk.dbId": this.payload.pk.dbId
		};
		this.queryMap.set("Q. Location By DbId?", this.query);




		return this.queryMap.get(key);
	}
}

