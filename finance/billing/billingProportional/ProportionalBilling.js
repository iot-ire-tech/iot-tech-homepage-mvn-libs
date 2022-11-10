/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Setting up the payload to transfer to servlet
// Let Bill Customer First, before making the booking!!!
// 1. Retrieve Customer ID
// 2. Charge By Customer
// Proceed with bookings.


function billClient(totalCost, email) {
	var cc = true;
	//console.groupCollapsed("Func: billClient")

	//console.groupCollapsed("INIT: paymentsData")
	var paymentsData = {
		"customerId": customerId,
		"amount": Math.round(parseInt(totalCost).toFixed(2) * 100),
		"email": email
	};
	//console.table(paymentsData)
	//console.groupEnd()


	//console.groupCollapsed("NW: PaymentByCustomerId")
	url = location.origin + contextPath + "/PaymentByCustomerId";
//	nw.setUrl(url).setMethod("post").setPayload(paymentsData).setMessage("Posting Payment data for processing").sendMe();
//	var nw = new httpHandler("Customer PaymentByCustomerId", responseStrucObj)
//		.setUrl(url)
//		.setAsync(false).setTimeout(300000).setMessage("HTTP Transaction")		// set payload, then post
//		.setPayload(paymentsData)
//		.post()

//	tmp = nw.getResponse();
//	//console.log("INF: Payload getPayload : (" + nw.getPayload() + ")");
//	//console.log("INF: Payload getResponse : (" + tmp + ")");
//	//console.log("INF: Payload getStatus : (" + nw.getStatus() + ")");
//	if (nw.getStatus() === true)
	if (true)
		cc = true;
	else
		cc = false;
	//console.groupEnd()


	//console.groupEnd()
	return  cc;
}

function updateSummaryBox() {
	var html = "";
	spCharges.queryByType("all").forEach(function (paymentSplit) {
		html += "<span> Type: " + paymentSplit.type + " Client: " + paymentSplit.client + "% Patron: " + paymentSplit.patron + "% </span><br>";
	})
	html += "<span>";
	$("#summaryTarget").html(html);

}




class ProportionalBilling extends Common {

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

		// Classification
		$("#gender").val(responseload.classification.gender).trigger("change");
		$("#occupation").val(responseload.classification.occupation).trigger("change");
		try {
			$("#dob").val(new Date(responseload.timings.dob.$date)).trigger("change");
		} catch (exception) {

		}
		$("#mobile").val(responseload.mobile).trigger("change");
		$("#notes").val(responseload.notes).trigger("change");
		switch (responseload.pk.type) {
			case "member":
				$("#member").prop("checked", true).trigger("change");
				break;
			case "guest":
				$("#guest").prop("checked", true);
				break;
			case "admin":
				$("#admin").prop("checked", true);
				break;
			case "cfo":
				$("#cfo").prop("checked", true);
				break;
			default:

				break;
		}
		switch (responseload.classification.maritalStatus) {
			case "single":
				$("#single").prop("checked", true);
				break;
			case "divorced":
				$("#divorced").prop("checked", true);
				break;
			case "married":
				$("#married").prop("checked", true);
				break;
			case "widower":
				$("#widower").prop("checked", true);
				break;
			case "separated":
				$("#separated").prop("checked", true);
				break;
			default:

				break;
		}
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
		this.payload.ux.name = "[" + this.payload.pk.type + "] " + this.payload.split.client + ":" + this.payload.split.patron
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
}
//# sourceURL=finance_proportionalBilling_srv.js