/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// updateAnalytics(bs, "Admin logged into system", 0, getTodaysDate());

function updateAnalytics(bs, reason, resourceId, fulldate) {

// Email Business, of potential business loass!!
	// update m{{{issed business resource, for analysics..
	var analyticsPayload = {
		"ts": getTs(),
		"todaysDate": fulldate,
//		"dayOfWeek": dow,
//		"hourOfDay": hr,
		"resource": reason,
		"resourcePoolId": parseInt(resourceId)
	};

//	url = urlRest + "/analyticsResource";
//	nw.setUrl(url).setMethod("post").setPayload(analyticsPayload).setMessage("Posting resource analytics").sendMe();

	new crudIt(bs.resourceAnalyticsCtrl, "Analytics Resource").setPayload(analyticsPayload).post()

}

// bs, "Admin logged into system", 	0, 		getTodaysDate());
function updateAnalyticsX(bs, reason, resourceId, fulldate, clientId, eventId, subEventId) {

// Email Business, of potential business loass!!
	// update m{{{issed business resource, for analysics..
	var analyticsPayload = {
		"ts": getTs(),
		"todaysDate": fulldate,
		"resource": reason,
		"resourcePoolId": parseInt(resourceId),
		"clientId": parseInt(clientId),
		"eventId": parseInt(eventId),
		"subEventId": parseInt(subEventId)
	};
	new crudIt(bs.resourceAnalyticsCtrl, "Analytics").setPayload(analyticsPayload).post()
//	analyticsObj.setMessage("Posting resource analytics");
//	analyticsObj.setPayload(analyticsPayload)
//	analyticsObj.post()

}


class Analytics extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

	isValid(type) {
		switch (type) {
			case "props":
				if (this.payload.pk.id < 0)
					return false;
				break;

		}
		return true;
	}

	queryBuilder(key) {
		this.queryMap = new Map();
		switch (key) {
			case "Q. List All?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List By Type(basic)?":
				this.query = {"clientId": this.payload.clientId};
				this.queryMap.set(key, this.query);
				break;

		}
		return this.queryMap.get(key);
	}

	uxUpdateNameTag() {
		// Ok so our model context includes members we want to list
		this.payload.ux.items = []; // Reset List For Mod Purposes

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
//# sourceURL=analytics_service.js