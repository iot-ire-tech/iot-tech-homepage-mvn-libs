/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function uxStats(resourcesCount, eventsCount, activitiesCount, staffCount) {

	html = "<div class=\"ui four statistics\">";
	html += "<div class=\"statistic\">";
	html += "<div class=\"text value\"> <i class=\"address book icon\"></i> Over " + resourcesCount + " </div>";
	html += "<div class=\"label\"> Business Assets </div>";
	html += "</div>";

	html += "<div class=\"statistic\">";
	html += "<div class=\"text value\"> <i class=\"calendar check outline icon\"></i> " + eventsCount + " </div>";
	html += "<div class=\"label\"> Events </div>";
	html += "</div>";

	html += "<div class=\"statistic\">";
	html += "<div class=\"text value\"> <i class=\"smile icon\"></i> " + activitiesCount + " </div>";
	html += "<div class=\"label\"> Activities </div>";
	html += "</div>";

	html += "<div class=\"statistic\">";
	html += "<div class=\"text value\"> <i class=\"smile icon\"></i> Over " + staffCount + " </div>";
	html += "<div class=\"label\"> Customers Onboarded!!</div>";
	html += "</div>";

	html += "</div>";
	html += "<br>";
	return html;

}
function uxSubWorkflowStats(resourcesCount, eventsCount, activitiesCount, staffCount) {


}

class EntityX extends Common {

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

	capCheck(runtimeAmount) {
		var maxCap = this.response[0].socialize.quanity.max;
		this.load = parseFloat(runtimeAmount / maxCap).toFixed(2)
		// This should be updated for the entity, and used in reporting, idleness, busizness

// +1 is for query pulling back one less!!!
//		this.numberBookings = this.qBookingsGteStartDateLteEndDate();
		if (runtimeAmount > 0) {

// Cap. Is Meet, cant make booking, update client, update analytics
			if (runtimeAmount === maxCap) {
				this.errMsg = "Booked to capacity";
				return false;
			} else if (runtimeAmount > maxCap) {
				this.errMsg = ""
				return false;
			} else if (runtimeAmount < maxCap) {
				this.errMsg = ""
// Check : Cap : Good
				return true;
			}
// Check : Cap : 100% Free
		} else if (runtimeAmount === 0) {
			return true;
		} else {
			throw "ERR: Query Returns []"
		}
	}

	queryBuilder(key)
	{
		this.queryMap = new Map();

// Best Have Switch Statment here and break!!!
// Empty means return all documents in collection.

		switch (key) {
			case "Q. List all?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List By Id?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List By PkId?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By DbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;


			case "Q. List child items?":
				this.query = {"fk.id": this.payload.fk.id};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List by FkId?":
				this.query = {"fk.id": this.payload.fk.id};
				this.queryMap.set(key, this.query);
				break;


			case "Q. List all items type(resource)?":
				this.query = {"pk.type": "resource"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List all items type(event)?":
				this.query = {"pk.type": "event"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List all items type(subEvent)?":
				this.query = {"pk.type": "subEvent"};
				this.queryMap.set(key, this.query);
				break;
// Activities
			case "Q. BoxLeague Boxs?":
				this.query = {"socialize.name": {"$regex": "^Box"}};
				this.queryMap.set(key, this.query);
				break;
			default:
				break;
		}

		return this.queryMap.get(key);
	}

	uxUpdateNameTag() {
		this.payload.ux.pk = this.payload.pk
		this.payload.ux.name = "[" + this.payload.pk.type + "] " + this.payload.socialize.name
		return this;
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
		this.html += "<th>Ux Tag</th>";
//			this.html += "<th>Start Time</th>";
//			this.html += "<th>End Time</th>";
		this.html += "<th>Name</th>";
		this.html += "<th>Quanity-Max</th>";
		this.html += "<th>Quanity-Runtime</th>";
		this.html += "<th>Owner</th>";
		this.html += "<th>Scope</th>";
		this.html += "<th>Accessibility</th>";
		this.html += "<th>Linked Event</th>";
		this.html += "<th>Linked Activity</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {

			that.html += "<tr>";
			that.html += "<td>" + item.pk.id + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>" + item.fk.id + "</td>";
			that.html += "<td>" + item.ux.name + "</td>";
//				that.html += "<td>" + item.timings.startTime.$date + "</td>";
//				that.html += "<td>" + item.timings.expiryTime.$date + "</td>";
			that.html += "<td>" + item.socialize.name + "</td>";
			that.html += "<td>" + item.socialize.quanity.max + "</td>";
			that.html += "<td>" + item.socialize.quanity.rt + "</td>";
			that.html += "<td>" + item.socialize.owner + "</td>";
			that.html += "<td>" + item.socialize.scope + "</td>";
			that.html += "<td>" + item.socialize.accessibility + "</td>";
			that.html += "<td>" + item.has.event + "</td>";
			that.html += "<td>" + item.has.subEvent + "</td>";
			that.html += "</tr>";

		});
		this.html += "</table>";
		this.html += "<br>";
		return this.html;

	}
	uxBuildList(type) {

		this.queryAll()
		if (this.answer()) {
			this.html = "<br>";
			this.html += "<table class='w3-table-all'>";
			this.html += "<tr>";
			this.html += "<th>Id</th>";
			this.html += "<th>Type</th>";
//			this.html += "<th>Start Time</th>";
//			this.html += "<th>End Time</th>";
			this.html += "<th>Name</th>";
			this.html += "<th>Quanity-Max</th>";
			this.html += "<th>Quanity-Runtime</th>";
			this.html += "<th>Owner</th>";
			this.html += "<th>Scope</th>";
			this.html += "<th>Accessibility</th>";
			this.html += "<th>Linked Event</th>";
			this.html += "<th>Linked Activity</th>";
			this.html += "</tr>";
			var that = this;
			var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
			this.queryAll().forEach(function (item) {

				that.html += "<tr>";
				that.html += "<td>" + item.pk.id + "</td>";
				that.html += "<td>" + item.pk.type + "</td>";
//				that.html += "<td>" + item.timings.startTime.$date + "</td>";
//				that.html += "<td>" + item.timings.expiryTime.$date + "</td>";
				that.html += "<td>" + item.socialize.name + "</td>";
				that.html += "<td>" + item.socialize.quanity.max + "</td>";
				that.html += "<td>" + item.socialize.quanity.rt + "</td>";
				that.html += "<td>" + item.socialize.owner + "</td>";
				that.html += "<td>" + item.socialize.scope + "</td>";
				that.html += "<td>" + item.socialize.accessibility + "</td>";
				that.html += "<td>" + item.has.event + "</td>";
				that.html += "<td>" + item.has.subEvent + "</td>";
				that.html += "</tr>";

			});
			this.html += "</table>";
			this.html += "<br>";
		}
		return this.html;

		return "";
	}
	uxFormUpdate(responseload) {
		// Resource Type
		$("#name").val(responseload.socialize.name).trigger("change");
		$("#disclaimer").val(responseload.socialize.legal.disclaimer).trigger("change");
		$("#quanity").val(responseload.socialize.quanity.max).trigger("change");
//		$(".ui.fluid.dropdown").dropdown("set selected", ['5c619aae1f6e4f18ee119d42_841113']).trigger("change");	// this did work...
		$(".patronIdsMultiple").dropdown("set selected", responseload.socialize.owner).trigger("change");
		$("#intro").val(responseload.socialize.intro).trigger("change");
		$("#scope").val(responseload.socialize.scope).trigger("change");
		$("#accessibility").val(responseload.socialize.accessibility).trigger("change");
		$("#tags").val(responseload.socialize.tag).trigger("change");
		$("#notes").val(responseload.socialize.notes).trigger("change");

		// Unique Event Flds
		$("#lblStartDate").text("Existing Start Date: " + new Date(responseload.timings.startDate.$date).toGMTString())
		$("#lblEndDate").text("Existing End Date: " + new Date(responseload.timings.expiryDate.$date).toGMTString())
//		$("#rangestartEvent").val(responseload.timings.startDate.$date).trigger("change");
//		$("#rangeendEvent").val(responseload.timings.expiryDate.$date).trigger("change");


// Common
		if (responseload.pk.type === "resource")
			$("#has").val(responseload.has.event).trigger("change");
		else if (responseload.pk.type === "event")
			$("#has").val(responseload.has.subEvent).trigger("change");

	}
	uxFormClear() {
		// Resource Type
		$("#name").val("");
		$("#disclaimer").val("")
		$("#quanity").val("");
		$(".patronIds").val("");
		$("#intro").val("");
		$("#scope").val("");
		$("#accessibility").val("");
		$("#tags").val("");
		$("#notes").val("");
		$("#has").val("");
		// Event Type
	}

}

class EntityGeo extends Common {

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
			case "Q. List all items?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List By Id?":
				this.query = {"pk.id": this.payload.fk.id};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List By FkId?":
				this.query = {"fk.id": this.payload.fk.id};
				this.queryMap.set(key, this.query);
				break;

			case "Q. By DbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List By FkDbId?":
				this.query = {"fk.dbId": this.payload.fk.dbId};
				this.queryMap.set(key, this.query);
				break;


			case "Q. List all items type(external)?":
				this.query = {"pk.type": "street"};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List all items type(street)?":
				this.query = {"pk.type": "street"};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List all items type(campus)?":
				this.query = {"pk.type": "campus"};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List all items type(gps)?":
				this.query = {"pk.type": "gps"};
				this.queryMap.set(key, this.query);
				break;

		}


		return this.queryMap.get(key);
	}

	uxUpdateNameTag() {
		this.payload.ux.pk = this.payload.pk
		this.payload.ux.name = "[" + this.payload.pk.type + "] " + this.payload.name;
//		if (this.payload.pk.type === "external") {
//			this.payload.ux.name = this.payload.geo.external.number + ", " +
//				this.payload.geo.external.street + ", " +
//				this.payload.geo.external.town + ", " +
//				this.payload.geo.external.city
//		} else if (this.payload.pk.type === "campus") {
//			this.payload.ux.name = this.payload.geo.campus.building + ", " +
//				this.payload.geo.campus.department + ", " +
//				this.payload.geo.campus.zone + ", " +
//				this.payload.geo.campus.number
//		} else if (this.payload.pk.type === "gps") {
//			this.payload.ux.name = this.payload.geo.gps.long + ", " +
//				this.payload.geo.gps.lat + ", " +
//				this.payload.geo.gps.hgt
//		} else
//			alert("INF: Type (" + this.payload.pk.type + ") not recognised as valid Geo, contact support ASAP")


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
		this.html += "<th>Ux Tag</th>";
		this.html += "<th>number</th>";
		this.html += "<th>street</th>";
		this.html += "<th>town</th>";
		this.html += "<th>city</th>";
		this.html += "<th>zip</th>";
		this.html += "<th>county</th>";
		this.html += "<th>===</th>";
		this.html += "<th>building</th>";
		this.html += "<th>department</th>";
		this.html += "<th>zone</th>";
		this.html += "<th>floor</th>";
		this.html += "<th>number</th>";
		this.html += "<th>===</th>";
		this.html += "<th>Longtitude</th>";
		this.html += "<th>Lattitude</th>";
		this.html += "<th>Elevation</th>";
		this.html += "</tr>";

		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + item.fk.id + "</td>";
			that.html += "<td>" + item.fk.type + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>" + item.ux.name + "</td>";
			that.html += "<td>" + item.geo.external.number + "</td>";
			that.html += "<td>" + item.geo.external.street + "</td>";
			that.html += "<td>" + item.geo.external.town + "</td>";
			that.html += "<td>" + item.geo.external.city + "</td>";
			that.html += "<td>" + item.geo.external.zip + "</td>";
			that.html += "<td>" + item.geo.external.country + "</td>";
			that.html += "<td>===</td>";
			that.html += "<td>" + item.geo.campus.building + "</td>";
			that.html += "<td>" + item.geo.campus.department + "</td>";
			that.html += "<td>" + item.geo.campus.zone + "</td>";
			that.html += "<td>" + item.geo.campus.floor + "</td>";
			that.html += "<td>" + item.geo.campus.number + "</td>";
			that.html += "<td>===</td>";
			that.html += "<td>" + item.geo.gps.long + "</td>";
			that.html += "<td>" + item.geo.gps.lat + "</td>";
			that.html += "<td>" + item.geo.gps.hgt + "</td>";
			that.html += "</tr>";
		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}
	uxFormUpdate(responseload) {
		// Resource Type
		$("#" + responseload.fk.type).val([responseload.fk.type]).trigger("change");
		// Geo
		$("#" + responseload.pk.type + "Ck").val([responseload.pk.type]).trigger("change");

		$("#number").val(responseload.geo.external.number).trigger("change");
		$("#street").val(responseload.geo.external.street).trigger("change");
		$("#town").val(responseload.geo.external.town).trigger("change");
		$("#zip").val(responseload.geo.external.zip).trigger("change");
		$("#city").val(responseload.geo.external.city).trigger("change");
		$("#country").val(responseload.geo.external.country).trigger("change");


		$("#building").val(responseload.geo.campus.building).trigger("change");
		$("#department").val(responseload.geo.campus.department).trigger("change");
		$("#zone").val(responseload.geo.campus.zone).trigger("change");
		$("#floor").val(responseload.geo.campus.floor).trigger("change");
		$("#campus_number").val(responseload.geo.campus.number).trigger("change");

		$("#gpsLong").val(responseload.geo.gps.long).trigger("change");
		$("#gpsLat").val(responseload.geo.gps.lat).trigger("change");
		$("#gpsHgt").val(responseload.geo.gps.hgt).trigger("change");


	}
	uxFormClear(section) {

		$("#tagLine").val("").trigger("change");
		$("#number").val("").trigger("change");
		$("#street").val("").trigger("change");
		$("#town").val("").trigger("change");
		$("#zip").val("").trigger("change");
		$("#city").val("").trigger("change");
		$("#country").val("").trigger("change");

		$("#building").val("").trigger("change");
		$("#department").val("").trigger("change");
		$("#zone").val("").trigger("change");
		$("#floor").val("").trigger("change");
		$("#campus_number").val("").trigger("change");

		$("#gpsLat").val("").trigger("change");
		$("#gpsLong").val("").trigger("change");
		$("#gpsHgt").val("").trigger("change");

// Unload iframe

	}

}

class EntityMembers extends Common {

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
			case "Q. All Items?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List All Items?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

				// Specific Members
			case "Q. By FkDbId?":
				this.query = {"fk.dbId": this.payload.fk.dbId};
				this.queryMap.set(key, this.query);
				break;

			case "Q. By FkDbId?":
				this.query = {"fk.dbId": this.payload.fk.dbId};
				this.queryMap.set(key, this.query);
				break;

			case "Q. By DbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;

				// Members belonging to a Resource
			case "Q. By FkType(resource)?":
				this.query = {"fk.type": "resource"};
				this.queryMap.set(key, this.query);
				break;
				// Members belonging to a Resource
			case "Q. By FkType(event)?":
				this.query = {"fk.type": "event"};
				this.queryMap.set(key, this.query);
				break;
				// Members belonging to a Resource
			case "Q. By FkType(subEvent)?":
				this.query = {"fk.type": "subEvent"};
				this.queryMap.set(key, this.query);
				break;
		}
		return this.queryMap.get(key);
	}

	uxUpdateNameTag() {
		// Ok so our model context includes members we want to list
		this.payload.ux.items = []; // Reset List For Mod Purposes
		this.payload.ux.name = "[" + this.payload.pk.type + "] " + this.payload.name;


		var that = this;
		this.payload.members.forEach(function (item) {
			var dbId = item.split("_")[0]
			var id = item.split("_")[1]
			// Query Patron For Name
			var name = "X";
			that.payload.ux.items.push(
				{
					"pk": {"id": id, "dbId": dbId},
					// Members Name!!
					"name": name
				}
			)
		});

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
		this.html += "<th>Ux Tag</th>";
		this.html += "<th>Members Id</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + item.fk.id + "</td>";
			that.html += "<td>" + item.fk.type + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>" + item.ux.name + "</td>";
			that.html += "<td>" + item.members + "</td>";
			that.html += "</tr>";

		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}
	uxFormUpdate(responseload) {
		// Resource Type
		// Initialise with Full List, then select
		$(".patronIdsMultiple").dropdown("set selected", responseload.members).trigger("change");
		$("#tagLine").val(responseload.name).trigger("change");
//		$("#" + responseload.fk.type).val([responseload.fk.type]).trigger("change");
//		$("#" + responseload.pk.type + "Ck").val([responseload.pk.type]).trigger("change");


	}
	uxFormClear() {
		$("#tagLine").val("").trigger("change");
		$(".patronIdsMultiple").dropdown('clear')
	}

}

class EntityAvailability extends Common {

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

	checkAvailability(day, hour) {
		this.availabilityDay = false;
		this.availabilityHour = false;
		// Cycle Availability Of this Resource
		try {
			// ERR: "Type Error -> this is undefined w.r.t : availabilitySlot"
			var that = this;
			// Start Of Loop and THIS Type Error
			this.response.forEach(function (availability) {
				// url = urlRest + resourceAvailEndpoint + "?id=" + id;

				// Check : Day/Hour
				//console.assert(availability.dow === day, "ERR: Resource Day %s != Desired Day %s ");
				if (availability.dow === day) {
					that.availabilityDay = true;

					//console.log("INF: Available Day Check PASSED")
					if (hour >= availability.openingTime.hr && hour <= availability.closingTime.hr) {
						//console.log("INF: Available Hour Check PASSED")
						that.availabilityHour = true;
						throw new Error("INF: Available Day/Hour Check Found");
					} else {
						//console.log("WRN: Available Hour Check FAILED")
						that.availabilityHour = false;
					}

				} else {
					that.availabilityDay = false;
					throw new Error("ERR: Available Day Check Failed");
				}
			});
			// End Of Loop and THIS Type Error



		} catch (exception) {
			switch (exception.message) {
				case "INF: Available Day/Hour Check Found":
					//console.log("INF: " + exception.message + " PASSED")
					this.availability = true
					break;

				case "ERR: Available Day Check Failed":
					//console.log("INF: " + exception.message + " FAILED")
					this.availability = false
					break;

				default:
					//console.log("INF: " + exception.message + " FAILED")

					break;
			}
		}


		return this.availability;
	}
	queryBuilder(key) {
		this.queryMap = new Map();
		switch (key) {
			case "Q. All Items?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List All Items?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

				// Specific Members
			case "Q. List By FkId?":
				this.query = {"fk.id": this.payload.fk.id};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List By DbId?":
				this.query = {"fk.dbId": this.payload.fk.dbId};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By DbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;

				// Members belonging to a Resource
			case "Q. List By FkType(resource)?":
				this.query = {"fk.type": "resource"};
				this.queryMap.set(key, this.query);
				break;
				// Members belonging to a Resource
			case "Q. List By FkType(event)?":
				this.query = {"fk.type": "event"};
				this.queryMap.set(key, this.query);
				break;
				// Members belonging to a Resource
			case "Q. List By FkType(subEvent)?":
				this.query = {"fk.type": "subEvent"};
				this.queryMap.set(key, this.query);
				break;
		}
		return this.queryMap.get(key);
	}

	uxUpdateNameTag() {
		// Ok so our model context includes members we want to list
		this.payload.ux.items = []; // Reset List For Mod Purposes
		this.payload.ux.name = "[" + this.payload.pk.type + "] " + this.payload.name;


		return this;
	}

	showBookingsAvailable(existingBookingsArr) {
		this.html = "<br>";
		this.html += "<br>";
		this.html += "<br>";
		this.html += "<caption>Unfortunately this item, is overbooked at this period. <br> Here are the rest of the bookings for this item <br> Spot a free slot, if so take it! </caption>";
		this.html += "<br>";
		this.html += "<table class=\"w3-table-all w3-small\">";
		this.html += "<tr><td>startDate</td><td>duration</td></tr>";
		existingBookingsArr.forEach(function (item) {
			this.html += "<tr><td>" + item.startDate + "</td><td>" + item.duration + "</td></tr>";
		});
		this.html += "</table>";
		return this.html;
	}
	updateAvailabilityWidget(availabilitySlots, issueDay, issueHour) {

		this.html = "<br>";
		this.html += "<caption>Unfortunately, " + availabilitySlots.name + " is not available during this time period, business hours are list below.</caption>";
		this.html += "<br>";
		this.html += "<table class=\"w3-table-all w3-small\">";
		this.html += "<tr><td>Day</td><td>Opening Time</td><td>Closing Time</td><td>Comments</td></tr>";
		var that = this
			;
		availabilitySlots.forEach(function (availabilityId) {
			that.slot = new crudIt(bs.resourceAvailabilityDowCtrl, "Resource Availability ID").setPayload("{\"id\": " + availabilityId + "}").query()[0]
			that.html += "<tr><td>" + days[that.slot.dow] + "</td><td>" + that.slot.openingTime + "</td><td>" + that.slot.closingTime + "</td><td>" + that.slot.tag + "</td></tr>";
		})
		this.html += "</table>";
		//$("#msgTarget_" + this.booking.id).html(this.html).fadeIn(function () {
		$("#msgTarget").html(this.html).fadeIn(function () {

		});
		//$("#msgTarget_" + this.booking.id).html(this.html).delay(30000).fadeOut(function () {
		$("#msgTarget").html(this.html).delay(30000).fadeOut(function () {
			$(this).empty();
		});
		return this.html;
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
		this.html += "<th>Ux Tag</th>";
		this.html += "<th>Day</th>";
		this.html += "<th>Start Time</th>";
		this.html += "<th>End Time</th>";
		this.html += "<th>Comment</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + item.fk.id + "</td>";
			that.html += "<td>" + item.fk.type + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>" + item.ux.name + "</td>";
			that.html += "<td>" + days[item.dow] + "</td>";
			that.html += "<td>" + item.openingTime.hr + ":" + item.openingTime.min + "</td>";
			that.html += "<td>" + item.closingTime.hr + ":" + item.openingTime.min + "</td>";
			that.html += "<td>" + item.reason + "</td>";
			that.html += "</tr>";

		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}
	displayModal(msg) {

		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";
		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Day</th>";
		this.html += "<th>Start Time</th>";
		this.html += "<th>End Time</th>";
		this.html += "<th>Comment</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + days[item.dow] + "</td>";
			that.html += "<td>" + item.openingTime.hr + ":" + item.openingTime.min + "</td>";
			that.html += "<td>" + item.closingTime.hr + ":" + item.openingTime.min + "</td>";
			that.html += "<td>" + item.reason + "</td>";
			that.html += "</tr>";

		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}

	uxFormUpdate(responseload) {
		$("#tagLine").val(responseload.name).trigger("change");
		$("select#patronType").val(responseload.patronType).trigger("change");
		$("select#dow").val(responseload.dow).trigger("change");
		$("#dowStartShadow").val(responseload.openingTime.hr + ":" + responseload.openingTime.min).trigger("change");
		$("#dowEndShadow").val(responseload.closingTime.hr + ":" + responseload.closingTime.min).trigger("change");
		$("#reason").val(responseload.reason).trigger("change");

	}
	uxFormClear() {
		$("#tagLine").val("").trigger("change");
		$("#dowStart").val("").trigger("change");
		$("#dowEnd").val("").trigger("change");
		$("#reason").val("").trigger("change");
		$("#patronType").val("").trigger("change");
		$("#dow").val("").trigger("change");


	}

}




class EntityCosts extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
	}
	isValid(type) {
		switch (type) {
			case "props":
				if (this.payload.pk.id < 0)
					return false;
				if (this.payload.cost.amount < 0)
					return false;
				if (this.payload.timings.duration.value < 0)
					return false;
				break;

		}
		return true;
	}

	queryBuilder(key) {
		this.queryMap = new Map();
//		this.queryMap.set("Q. What cost is associated with this Id?", this.query);
		switch (key) {
			case "Q. All Items?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List All Items?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

				// Specific Members
			case "Q. List By PkId?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By PkId?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List By FkId?":
				this.query = {"fk.id": this.payload.fk.id};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By FkId?":
				this.query = {"fk.id": this.payload.fk.id};
				this.queryMap.set(key, this.query);
				break;

			case "Q. By FkDbId?":
				this.query = {"fk.dbId": this.payload.fk.dbId};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By DbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;

				// Members belonging to a Resource
			case "Q. List By FkType(resource)?":
				this.query = {"fk.type": "resource"};
				this.queryMap.set(key, this.query);
				break;
				// Members belonging to a Resource
			case "Q. List By FkType(event)?":
				this.query = {"fk.type": "event"};
				this.queryMap.set(key, this.query);
				break;
				// Members belonging to a Resource
			case "Q. List By FkType(subEvent)?":
				this.query = {"fk.type": "subEvent"};
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
		this.html += "<th>Ux Tag</th>";
		this.html += "<th>Tag Line</th>";
		this.html += "<th>Duration</th>";
		this.html += "<th>Cost</th>";
		this.html += "<th>Currency</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + item.fk.id + "</td>";
			that.html += "<td>" + item.fk.type + "</td>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>" + item.ux.name + "</td>";
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
		$("select#duration").val(responseload.timings.duration.value);
		$("input:radio[name=revenueCat][value=" + responseload.monitized + "]").prop('checked', true);

		if (responseload.monitized) {
			$("#revenueOn").fadeIn(2000).show()
			$("#revenueOff").fadeIn(2000).hide()
			$("#valRevenueOn").val(responseload.cost.amount).trigger("change")
		} else {
			$("#revenueOff").fadeIn(2000, function () {
				$("#valRevenueOff").val("0.00").trigger("change")
			}).show()
			$("#revenueOn").fadeIn(2000).hide()
		}
		$("select#currency").val(responseload.cost.currency);

	}
	uxFormClear() {
		$("#tagLine").val("").trigger("change");
		$("#duration").val("").trigger("change");
		// https://www.mkyong.com/jquery/how-to-check-unchecked-a-checkbox-with-jquery/
		$('input:radio[name=revenueCat]').prop('checked', false);
		$("#valRevenueOn").val("").trigger("change");
		$("#valRevenueOff").val("").trigger("change");
		$("#currency").val("").trigger("change");
	}

}


function checkCap(maxCap, runtimeAmount) {
	var load = parseFloat(runtimeAmount / maxCap).toFixed(2)

// +1 is for query pulling back one less!!!
//		this.numberBookings = this.qBookingsGteStartDateLteEndDate();
	if (runtimeAmount > 0) {
// Cap. Is Meet, cant make booking, update client, update analytics
		if (runtimeAmount === maxCap) {
			return false;
		} else if (runtimeAmount > maxCap) {
			return false;
		} else if (runtimeAmount < maxCap) {
// Check : Cap : Good
			return true;
		}
// Check : Cap : 100% Free
	} else if (runtimeAmount === 0) {
		return true;
	} else {
		throw "ERR: Query Returns []"
	}

}

function msgResourceLimitMeet(activity, msg)
{
	this.html = "";
	this.html += "<b>";
	this.html += "<br>";
	this.html += "<br>";
	this.html += "<br>";
	this.html += "<span> Activity: " + activity + "</span><br>";
	this.html += "<span> Message: " + msg + "</span><br>";
	this.html += "<br>";
	this.html += "<br>";
	this.html += "<br>";
	this.html += "</b>";
	$("#msgTarget").html(this.html).fadeIn(function () {
	});
	$("#msgTarget").html(this.html).delay(30000).fadeOut(function () {
		$(this).empty();
	});
}



//# sourceURL=entities_service.js