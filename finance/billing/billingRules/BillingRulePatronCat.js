/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

 # Leading Motivatoins for concept
 new money in what to do
 money out what to do

 #roles / duties
 Admin - key owner
 Accountant - accounts payable / recieveable.
 accountsRecievable
 accountsPaid

 clientPct
 patronPct
 freq

 # amounts
 billing key!!
 */


function updateSummaryBoxPatronCat() {
	var html = "";
	html += "<div class=\"w3-container w3-border-gray\">"
	srvBrPatronsCat.queryByType("All Patron Billing Rules that have not expired").forEach(function (billingRule) {
		html += "<span> " +
			" Name: " + billingRule.billingRules.name +
			", Patron Id: " + billingRule.billingRules.patronId +
			", Credit: " + billingRule.billingRules.credit + " EUR" +
			", Discount: " + billingRule.billingRules.discount + " EUR" +
			", Penality: " + billingRule.billingRules.penality + " EUR" +
			"</span>";
		html += "<br>";
	});
	html += "</div>";
	$("#summaryTargetPatronCat").html(html);
}




class BillingRulePatronCat extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

	isValid(type) {
		switch (type) {
			case "props":
				if (this.payload.pk.dbId === "Please Select")
					return false;
				break;
			case "100%":
				if ((this.payload.client + this.payload.patron) === 100) {
					return true;
				}
				break;
			default:
				return false;
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
		this.html += "<th>Rule Name</th>";
		this.html += "<th>Expiry Date</th>";
		this.html += "<th>Publish Date</th>";
		this.html += "<th>Credit</th>";
		this.html += "<th>Discount</th>";
		this.html += "<th>Penality</th>";
		this.html += "<th>===</th>";
		this.html += "<th>DoB</th>";
		this.html += "<th>Age</th>";
		this.html += "<th>Gender</th>";
		this.html += "<th>Occupation</th>";
		this.html += "<th>Family Status</th>";
		this.html += "<th>Marital Status</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {

			that.html += "<tr>";
			that.html += "<td>" + item.pk.id + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>||</td>";
			that.html += "<td>" + item.modelBillingRules.name + "</td>";
			that.html += "<td>" + new Date(item.modelBillingRules.timings.expiryDate.$date).toGMTString() + "</td>";
			that.html += "<td>" + new Date(item.modelBillingRules.timings.publishDate.$date).toGMTString() + "</td>";
			that.html += "<td>" + item.modelBillingRules.credit.value + " [" + item.modelBillingRules.credit.type + "]</td>";
			that.html += "<td>" + item.modelBillingRules.discount.value + " [" + item.modelBillingRules.discount.type + "]</td>";
			that.html += "<td>" + item.modelBillingRules.penality.value + " [" + item.modelBillingRules.penality.type + "]</td>";
			that.html += "<td>||</td>";
			that.html += "<td>" + item.filter.age + "</td>";
			that.html += "<td>" + item.filter.gender + "</td>";
			that.html += "<td>" + item.filter.occupation + "</td>";
			that.html += "<td>" + item.filter.familystatus + "</td>";
			that.html += "<td>" + item.filter.maritalStatus + "</td>";
			that.html += "</tr>";

		});
		this.html += "</table>";
		this.html += "<br>";
		return this.html;

	}

//"filter": {
//		"dob": {"$date": ""}, // Happy birth discount
//		"age": -1,
//		"gender": "",
//		"occupation": "",
//		"familystatus": "[Father, Mother, Uncle, Aunt]",
//		"maritalStatus": "[Single, Devorced]"
//	}
	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = "[" + this.payload.pk.type + "] " +
			this.payload.filter.dob.$date +
			"," +
			this.payload.filter.age +
			"," +
			this.payload.filter.gender +
			"," +
			this.payload.filter.occupation +
			"," +
			this.payload.filter.familystatus +
			"," +
			this.payload.filter.maritalStatus

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

	queryBuilderOld(key) {

		this.queryMap = new Map();
// Basic Questions
		this.query = {
			"billingRules.timings.expiryDate": {
				"$gte": {"$date": new Date().toISOString()}
			}
		};
		this.queryMap.set("Q. PatronCat billing rules (non-expired)?", this.query);




		this.query = {
			"billingRules.timings.expiryDate": {
				"$gte": {"$date": new Date().toISOString()}
			},
			"filter.gender": this.getGender()

		};
		this.queryMap.set("Q. PatronCat billing rules (Gender)?", this.query);

		this.query = {
			"billingRules.timings.expiryDate": {
				"$gte": {"$date": new Date().toISOString()}
			},
			"filter.gender": this.getGender(),
			"filter.age": this.getAge(),
			"filter.occupation": this.getOccupation(),
			"filter.familystatus": this.getFamilyStatus(),
			"filter.maritalStatus": this.getMaritalStatus()
		};
		this.queryMap.set("Q. PatronCat billing rules (Full Match)?", this.query);

		return this.queryMap.get(key);
	}

}

//# sourceURL=finance_br_patronCat_srv.js