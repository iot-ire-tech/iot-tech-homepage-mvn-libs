/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var q = ""
var responseLoad = [];
// Init Test
// http://localhost:8084/iot-base/services/userManagement/tests/testLifeCycleSingleUser.html?clientId=673859&patronId=787833

/*
 * UX Priming
 */


var srvEntity = new EntityX(bs.entityCtrl, "Life Cycle Entity");
var qAllEntitiesAsset = srvEntity.queryByType("Q. List all items type(resource)?");
var uxAllEntitiesAssets = {
	"data": qAllEntitiesAsset, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var uxAllEntitiesAssetFk = {
	"data": qAllEntitiesAsset, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};


var uxAllEntitiesAssetFkGeo = {
	"data": qAllEntitiesAsset, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};

var qAllEntitiesEvent = srvEntity.queryByType("Q. List all items type(event)?");
var uxAllEntitiesEvents = {
	"data": qAllEntitiesEvent, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var uxAllEntitiesEventsFk = {
	"data": qAllEntitiesEvent, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};
var uxAllEntitiesEventsFkGeo = {
	"data": qAllEntitiesEvent, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};


var qAllEntitiesActivities = srvEntity.queryByType("Q. List all items type(subEvent)?");
var uxAllEntitiesActivities = {
	"data": qAllEntitiesActivities, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var uxAllEntitiesActivitiesFk = {
	"data": qAllEntitiesActivities, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};
var uxAllEntitiesActivitiesFkGeo = {
	"data": qAllEntitiesActivities, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};



/////////////////////////////////
// FK - Entities
/////////////////////////////////
var srvEntityGeo = new EntityGeo(bs.entityGeoCtrl, "Life Cycle EntityGeo");
var qAllEntitiesGeoAll = srvEntityGeo.queryByType("Q. List all items?");
var uxAllEntitiesGeo = {
	"data": qAllEntitiesGeoAll, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var uxAllEntitiesGeoFk = {
	"data": qAllEntitiesGeoAll, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};
var qAllEntitiesGeoExt = srvEntityGeo.queryByType("Q. List all items type(external)?");
var uxAllEntitiesGeoExt = {
	"data": qAllEntitiesGeoExt, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var qAllEntitiesGeoCampus = srvEntityGeo.queryByType("Q. List all items type(campus)?");
var uxAllEntitiesGeoCampus = {
	"data": qAllEntitiesGeoCampus, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var qAllEntitiesGeoGps = srvEntityGeo.queryByType("Q. List all items type(gps)?");
var uxAllEntitiesGeoGps = {
	"data": qAllEntitiesGeoGps, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};



var srvEntitiesMembers = new EntityMembers(bs.entityMembersCtrl, "Entity Members");
var qAllEntitiesMembersAll = srvEntitiesMembers.queryByType("Q. List All Items?");
var uxAllEntitiesMembers = {
	"data": qAllEntitiesMembersAll, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var qAllEntitiesMembersAssets = srvEntitiesMembers.queryByType("Q. By FkType(resource)?");
var uxAllEntitiesMembersAssets = {
	"data": qAllEntitiesMembersAssets, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var uxAllEntitiesMembersAssetsFk = {
	"data": qAllEntitiesMembersAssets, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};


var srvEntitiesDays = new EntityAvailability(bs.resourceAvailabilityDowCtrl, "Entity Availability Dow");
var qAllEntitiesDowAll = srvEntitiesDays.queryByType("Q. List All Items?");
var uxAllEntitiesDowAll = {
	"data": qAllEntitiesDowAll, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var srvEntitiesCosts = new EntityCosts(bs.costCenterCtrl, "Entity Costs");
var qAllEntitiesCostsAll = srvEntitiesCosts.queryByType("Q. List All Items?");
var uxAllEntitiesCostsAll = {
	"data": qAllEntitiesCostsAll, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};





// Associate Services
var srv = new Patron(bs.patronCtrl, "Life Cycle Patron Tests");
var qAllPatrons = srv.setPayload({"pk": ""}).queryByType("Q. List all?");
var uxAllPatrons = {
	"data": qAllPatrons,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "patronIds",
	"provider": "semantic"
};

var uxAllPatronsMultiple = {
	"data": qAllPatrons,
	"title": "Please Select",
	"id": getRand(),
//	"class": "ui fluid multiple search selection dropdown " + "patronIdsMultiple",
	"class": "ui fluid dropdown " + "patronIdsMultiple",
	"provider": "semantic",
	"multiple": "multiple=''"
//	"multiple": ""
};



function updateHdr() {
	patrons = new crudIt(bs.patronCtrl, "Patrons List").setPayload("{}").query();
	resources = new crudIt(bs.entityCtrl, "Resources List").setPayload({"pk.type": "resource"}).query();
	events = new crudIt(bs.entityCtrl, "Event List").setPayload({"pk.type": "event"}).query();
	subEvents = new crudIt(bs.entityCtrl, "SubEvent List").setPayload({"pk.type": "subEvent"}).query();
	$("#statsHook").html(uxStats(resources.length, events.length, subEvents.length, patrons.length));
	location.href = "#top";

}

// Ux : Init Function
$(document).ready(function () {
	var url;
	var opt;


	$("#portalPreview")
		.prop("src", location.origin + "/" + contextPath + "services/modules/portal/release/portal.jsp?clientId=" + clientId + "&patronId=" + patronId + "#backOntop")
	updateHdr()


// Default Options
	tabCat = "Assets";
//	srvContext = srvContentVisualAssets;
//	fk.type = "resource";

	var intervalId = setTimeout(function () {
		$(".entityList").html(dropDownUpBuilder(uxAllEntitiesAssets));
		$('.ui.dropdown').dropdown();


		$("#ownerListTarget").html(dropDownUpBuilder(uxAllPatrons));
		$('.ui.dropdown').dropdown();

// This is loaded only after rich content is triggered
//		$("#divSocialCat *").prop("disabled", true);
//		$("#divMgtCat *").prop("disabled", true);
//		$(".view").prop("disabled", false);

//		$("#mgtGeoX *").prop("disabled", true);


		clearTimeout(intervalId);
	}, 1000);

// Default Context
	srvContext = srvEntity;
	modelContext = modelEntity;
	modelContext.pk.id = getRand();
	modelContext.pk.type = "resource";
	fk.type = "resource";

});

$(document).on("click", ".tablink", function () {
	opt = $(this).text()
	tabCat = opt;


	switch (opt) {
		case "Assets":
			$("#AssetsNew, #AssetsMod").empty();
			$("#EventsNew, #EventsMod").empty();
			$("#ActivitiesNew, #ActivitiesMod").empty();
			srvContext = srvEntity;
			modelContext = modelEntity;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "resource";
			fk.type = "org";
			break;
		case "Events":
			$("#AssetsNew, #AssetsMod").empty();
			$("#EventsNew, #EventsMod").empty();
			$("#ActivitiesNew, #ActivitiesMod").empty();
			srvContext = srvEntity;
			modelContext = modelEntity;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "event";
			fk.type = "resource";
			break;
		case "Activities":
			// Reset Forms
			// Empty Forms, Assets, Events.

			srvContext = srvEntity;
			$("#AssetsNew, #AssetsMod").empty();
			$("#EventsNew, #EventsMod").empty();
			$("#ActivitiesNew, #ActivitiesMod").empty();
			modelContext = modelEntity;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "subEvent";
			fk.type = "event";
			break;
		case "Geo":
			srvContext = srvEntityGeo;
			modelContext = modelEntityGeo;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "geo";
			fk.type = "";
			break;

		case "Participants":
			srvContext = srvEntitiesMembers;
			modelContext = modelEntityMembers;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "patron";
			fk.type = "";
			break;
		case "Business Hours":
			srvContext = srvEntitiesDays;
			modelContext = modelEntityAvailabilityDow;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "dow";
			fk.type = "";
			break;

		case "Business Costs":
			srvContext = srvEntitiesCosts;
			modelContext = modelEntityCost;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "cost";
			fk.type = "";
			break;
	}
});


$(document).on("click", ".mgtAssets", function () {

	opt = $(this).val()
	switch (opt) {
		case "new":
			url = location.origin + contextPath + "/services/business/ux/AssetsNew.html";
			$.get(url, function (response) {
				$("#targetManagementAssets").html(response);
			});

			break;

		case "mod":
			url = location.origin + contextPath + "/services/business/ux/AssetsMod.html";
			$.get(url, function (response) {
				$("#targetManagementAssets").html(response);
			});
// PK Items
			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssets));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;
	}
});


$(document).on("click", ".mgtEvents", function () {

	opt = $(this).val()
	switch (opt) {
		case "new":
			url = location.origin + contextPath + "/services/business/ux/EventsNew.html";
			$.get(url, function (response) {
				$("#targetManagementEvents").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssetFk));
				$('.ui.dropdown').dropdown();

				calendarDateTimeRange(modelContext.timings.startDate, modelContext.timings.expiryDate)
			}, 1000);
			break;

		case "mod":
			url = location.origin + contextPath + "/services/business/ux/EventsMod.html";
			$.get(url, function (response) {
				$("#targetManagementEvents").html(response);
			});
// PK Items
			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesEvents));
				$('.ui.dropdown').dropdown();
				calendarDateTimeRange(modelContext.timings.startDate, modelContext.timings.expiryDate)
				clearTimeout(intervalId);
			}, 1000);
			break;
	}
});

$(document).on("click", ".mgtActivities", function () {

	opt = $(this).val()
	switch (opt) {
		case "new":
			url = location.origin + contextPath + "/services/business/ux/ActivitiesNew.html";
			$.get(url, function (response) {
				$("#targetManagementActivities").html(response);
			});
			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesEventsFk));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);

			break;

		case "mod":
			url = location.origin + contextPath + "/services/business/ux/ActivitiesMod.html";
			$.get(url, function (response) {
				$("#targetManagementActivities").html(response);
			});
// PK Items
			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesActivities));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;
	}
});






/*
 *
 *
 * This is Used in all associated entities relationships, Geo, MEmber, Costs, etc
 *
 *
 */

$(document).on("click", ".entityCat", function () {

	var opt = $(this).val()

	srvContext.uxFormClear()

	switch (opt) {
		case "resource":
			fk.type = "resource";
			$(".existingListFk").html(dropDownUpBuilder(uxAllEntitiesAssetFk));
			break;
		case "event":
			fk.type = "event";
			$(".existingListFk").html(dropDownUpBuilder(uxAllEntitiesEventsFk));
			break;
		case "subEvent":
			fk.type = "subEvent";
			$(".existingListFk").html(dropDownUpBuilder(uxAllEntitiesActivitiesFk));
			break;
	}
});

// existingList - Query By FK dbID
var uxMembersByPkRsp = srvEntitiesMembers.setPayload({"fk": {"dbId": fk.dbId}}).queryByType("Q. By FkDbId?");
var uxMembersPk = {
	"data": uxMembersByPkRsp,
	"title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown Pk",
	"provider": "semantic"
};
// patronsList - Query By FK dbID
var uxMembersByFkRsp = srvEntitiesMembers.setPayload({"fk": {"dbId": fk.dbId}}).queryByType("Q. By FkDbId?");
var uxMembersByFk = {
	"data": uxMembersByFkRsp,
	"title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown patronIdsMultiple",
	"provider": "semantic",
	"multiple": "multiple=''"
};

$(document).on("click", ".mgtMembers", function () {

	opt = $(this).val()
	switch (opt) {
		case "new":
			url = location.origin + contextPath + "/services/business/ux/AssociatedMembersNew.html";
			$.get(url, function (response) {
				$("#targetManagementAssociatedMembers").html(response);
			});
			var intervalId = setTimeout(function () {
				$(".patronsList").html(dropDownUpBuilder(uxAllPatrons));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;
		case "mod":
			url = location.origin + contextPath + "/services/business/ux/AssociatedMembersMod.html";
			$.get(url, function (response) {
				$("#targetManagementAssociatedMembers").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".existingList").html(dropDownUpBuilder(uxMembersPk));

// Update Name - For display purposes
				if (srvContext.answer()) {
					var uxMembersByFkRspCp = uxMembersByFkRsp;
					uxMembersByFkRspCp[0].ux.items.forEach(function (item) {
						// Update Name!!
						item.name = getRand()
					})
					uxMembersByFkRsp = uxMembersByFkRspCp;
				}

// **** SubBuilder Members List
//				$(".patronsList").html(dropDownUpSubBuilder(uxAllPatronsMultiple));
				$(".patronsList").html(dropDownUpBuilder(uxAllPatronsMultiple));
				$('.ui.dropdown').dropdown();

			}, 1000);
			break;
	}
});




$(document).on("click", ".mgtDow", function () {

	opt = $(this).val()
	switch (opt) {
		case "new":
			url = location.origin + contextPath + "/services/business/ux/AvailabilityDowNew.html";
			$.get(url, function (response) {
				$("#targetManagementDow").html(response);
			});
			var intervalId = setTimeout(function () {
				calendarStartEndTime(modelContext.openingTime, modelContext.closingTime)
				clearTimeout(intervalId);
			}, 1000);
			break;
		case "mod":
			url = location.origin + contextPath + "/services/business/ux/AvailabilityDowMod.html";
			$.get(url, function (response) {
				$("#targetManagementDow").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
//				calendarStartEndTime(modelContext.openingTime, modelContext.closingTime)
				$("#rangestartTime").calendar({
					type: "time",
					ampm: false,
					firstDayOfWeek: 1,
					inline: false,
					endCalendar: $("#rangeendTime"),

					onChange: function (date, text) {
						modelContext.openingTime.hr = date.getHours();
						modelContext.openingTime.min = date.getMinutes();
					}
				});

				$("#rangeendTime").calendar({
					type: "time",
					ampm: false,
					firstDayOfWeek: 1,
					inline: false,

					onChange: function (date, text) {
						modelContext.closingTime.hr = date.getHours();
						modelContext.closingTime.min = date.getMinutes();
					}
				});
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesDowAll));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;
	}
});


$(document).on("click", ".mgtCosts", function () {

	opt = $(this).val()
	switch (opt) {
		case "new":
			url = location.origin + contextPath + "/services/business/ux/costsNew.html";
			$.get(url, function (response) {
				$("#targetManagementCosts").html(response);
			});

			break;
		case "mod":
			url = location.origin + contextPath + "/services/business/ux/costsMod.html";
			$.get(url, function (response) {
				$("#targetManagementCosts").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesCostsAll));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;
	}
});
$(document).on("click", ".mgtRevenueCat", function () {

	opt = $(this).val()
	switch (opt) {

		case "true":
			$("#revenueOn").fadeIn(2000).show()
			$("#revenueOff").fadeIn(2000).hide()


			break;
			// Monitized
		case "false":

			$("#revenueOff").fadeIn(2000, function () {
//				$("#valRevenueOff").change()
				$("#valRevenueOff").val("0.00").trigger("click")
			}).show()
			$("#revenueOn").fadeIn(2000).hide()

			// Trigger Change Event Of Zero
//			$.fn.changeVal = function (v) {
//				return this.val(v).trigger("change");
//			}

			break;
	}
});


// Context
var mgtGeo = ""
$(document).on("click", ".mgtGeo", function () {
	opt = $(this).val()

	switch (opt) {
		case "new":
			url = location.origin + contextPath + "/services/business/ux/GeoNew.html";
			$.get(url, function (response) {
				$("#targetManagementGeo").html(response);
			});
			mgtGeo = "new"

//			geoChoice()
			break;
		case "mod":
			url = location.origin + contextPath + "/services/business/ux/GeoMod.html";
			$.get(url, function (response) {
				$("#targetManagementGeo").html(response);
			});
			mgtGeo = "mod"

//			geoChoice()

			break;
	}
});


$(document).on("click", ".mgtGeoType", function () {
	var opt = $(this).val()
	$("#hdr").show();

// Refresh Form
//	if (mgtGeo === "new")
//		url = location.origin + contextPath + "/services/business/ux/GeoNew.html";
//	else
//		url = location.origin + contextPath + "/services/business/ux/GeoMod.html";
//
//	$.get(url, function (response) {
//		$("#targetManagementGeo").html(response);
//	});

//
	switch (opt) {
		case "external":
			modelContext.pk.type = "external";
// Remove inwanted data
			$("#campus").hide();
			$("#gps").hide();
			$("#external").fadeIn(1000, function () { });
			srvEntityGeo.uxFormClear(opt);

			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesGeoExt));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);

			break;
		case "campus":
			modelContext.pk.type = "campus";
			$("#external").hide();
			$("#gps").hide();
			$("#campus").fadeIn(1000, function () { });
			srvEntityGeo.uxFormClear(opt);

			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesGeoCampus));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);

			break;
		case "gps":

			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesGeoGps));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);

			$(document).on("change", "#gpsLong", function () {
				modelContext.geo.gps.long = $(this).val();
			});
			$(document).on("change", "#gpsLat", function () {
				modelContext.geo.gps.lat = $(this).val();
			});
			$(document).on("change", "#gpsHgt", function () {
				modelContext.geo.gps.hgt = $(this).val();
			});
			$(document).on("click", "#refresh", function () {
				var apiKey = "AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig";
				var url = "https://www.google.com/maps/embed/v1/streetview?location=53.3375%2C-6.2194&key=AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig"

				url = "https://www.google.com/maps/embed/v1/view"
				url += "?key=AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig"
				url += "&center="
				url += modelContext.geo.gps.lat
				url += ","
				url += modelContext.geo.gps.long
				url += "&zoom="
				url += modelContext.geo.gps.hgt
				url += "&maptype=satellite"
				$("iframe").attr("src", url);
			});

			modelContext.pk.type = "gps";
			$("#external").hide();
			$("#campus").hide();
			$("#gps").fadeIn(1000, function () { });
			srvEntityGeo.uxFormClear(opt);

			if ("geolocation" in navigator) {
				/* geolocation is available */
				navigator.geolocation.getCurrentPosition(function (position) {
//					alert(" Your current location is registered as LAT: " + position.coords.latitude + " LONG: " + position.coords.longitude);
					$("#gpsLong").val(parseFloat(position.coords.longitude).toFixed(4)).trigger("change");
					$("#gpsLat").val(parseFloat(position.coords.latitude).toFixed(4)).trigger("change");
					$("#gpsHgt").val("18").trigger("change");
					$("#refresh").trigger("click");

				});
			} else {
				/* geolocation IS NOT available */
				alert("INF: Your browser doesnt support location, try different browser, Explore, Firefox, Chrome")
			}

			break;
	}

});


$(document).on("click", ".mgtBrowser", function () {

	opt = $(this).val()
	switch (opt) {
		case "resources":
			srvEntity.queryByType("Q. List all items type(resource)?");
			$("#targetManagementBrowser").html(srvEntity.display("Business Asset Listing"));
			break;
		case "events":
			srvEntity.queryByType("Q. List all items type(event)?");
			$("#targetManagementBrowser").html(srvEntity.display("Business Event Listing"));
			break;
		case "subEvents":
			srvEntity.queryByType("Q. List all items type(subEvent)?");
			$("#targetManagementBrowser").html(srvEntity.display("Business Activity Listing"));
			break;
		case "members":
			srvEntitiesMembers.queryByType("Q. All Items?");
			$("#targetManagementBrowser").html(srvEntitiesMembers.display("Associated Members Listing"));
			break;
		case "geos":
			srvEntityGeo.queryByType("Q. List all items?");
			$("#targetManagementBrowser").html(srvEntityGeo.display("Associated Geographical Locations Listing"));
			break;
		case "dow":
			srvEntitiesDays.queryByType("Q. All Items?");
			$("#targetManagementBrowser").html(srvEntitiesDays.display("Associated Business Hours Listing"));
			break;
		case "costs":
			srvEntitiesCosts.queryByType("Q. All Items?");
			$("#targetManagementBrowser").html(srvEntitiesCosts.display("Associated Business Costs Listing"));
			break;
	}
});


//# sourceURL=entity_init.js