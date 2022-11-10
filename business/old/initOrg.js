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
var qAllEntitiesResource = srvEntity.setPayload({"pk": ""}).queryByType("Q. List all items type(resource)?");
var uxAllEntitiesResource = {
	"data": qAllEntitiesResource,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};
var uxAllEntitiesResourceFk = {
	"data": qAllEntitiesResource,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
};
var uxAllEntitiesResourceFkGeo = {
	"data": qAllEntitiesResource,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_FkGeo",
	"provider": "semantic"
};

var qAllEntitiesEvent = srvEntity.setPayload({"pk": ""}).queryByType("Q. List all items type(event)?");
var uxAllEntitiesEvent = {
	"data": qAllEntitiesEvent,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};
var uxAllEntitiesEventFk = {
	"data": qAllEntitiesEvent,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
};
var uxAllEntitiesEventFkGeo = {
	"data": qAllEntitiesEvent,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_FkGeo",
	"provider": "semantic"
};


var qAllEntitiesSubEvents = srvEntity.setPayload({"pk": ""}).queryByType("Q. List all items type(subEvent)?");
var uxAllEntitiesSubEvent = {
	"data": qAllEntitiesSubEvents,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};
var uxAllEntitiesSubEventFk = {
	"data": qAllEntitiesSubEvents,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
};
var uxAllEntitiesSubEventFkGeo = {
	"data": qAllEntitiesSubEvents,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_FkGeo",
	"provider": "semantic"
};



var srvEntityGeo = new EntityGeo(bs.entityGeoCtrl, "Life Cycle EntityGeo");
var qAllEntitiesGeoAll = srvEntityGeo.setPayload({"pk": ""}).queryByType("Q. List all items?");
var uxAllEntitiesGeo = {
	"data": qAllEntitiesGeoAll,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_PkGeo",
	"provider": "semantic"
};
var uxAllEntitiesGeoFk = {
	"data": qAllEntitiesGeoAll,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
};
var qAllEntitiesGeoExt = srvEntityGeo.setPayload({"pk": ""}).queryByType("Q. List all items type(external)?");
var uxAllEntitiesGeoExt = {
	"data": qAllEntitiesGeoExt,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};
var uxAllEntitiesGeoExtFk = {
	"data": qAllEntitiesGeoExt,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
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





// Ux : Init Function
$(document).ready(function () {
	var url;

	stats = loadEntities(bs)
	$("#statsHook").html(uxStats(stats.resources.length, stats.events.length, stats.subEvents.length, stats.patrons.length));

//	$("input[name='groupResource_Choice']").val(["newResource"]).trigger("change")
//	$("input[name='groupResource_Choice']").trigger("click")
	$("input[name='groupResource_Choice']").on("change", function () {

		var opt = $(this).val()
		switch (opt) {
			case "newResource":
				modelEntity.timings.startDate.$date = new Date().toISOString();
				modelEntity.timings.expiryDate.$date = modelEntity.timings.startDate.$date; // $date wont except "NA" string!!!
				modelEntity.pk.type = "resource";
				url = location.origin + contextPath + "/services/business/entity/ux/resourceNew.html";
				$.get(url, function (response) {
					$("#targetResourceManagement").html(response);
				});

				var intervalId = setTimeout(function () {
					$("#ownerListTarget").html(dropDownUpBuilder(uxAllPatrons));
					$('.ui.dropdown').dropdown();
					clearTimeout(intervalId);
				}, 1000);
				break;

			case "modResource":
				modelEntity.pk.type = "resource";
				url = location.origin + contextPath + "/services/business/entity/ux/resourceMod.html";
				$.get(url, function (response) {
					$("#targetResourceManagement").html(response);
				});
				var intervalId = setTimeout(function () {
					$(".existingList").html(dropDownUpBuilder(uxAllEntitiesResource));
					// Include so it can be re-selected - issue when user deleted
					$("#ownerListTarget").html(dropDownUpBuilder(uxAllPatrons));
					$('.ui.dropdown').dropdown();
					clearTimeout(intervalId);
				}, 1000);
				break;

			case "viewResource":
				modelEntity.pk.type = "resource";
				url = location.origin + contextPath + "/services/business/entity/ux/resourceViewAll.html";
				$.get(url, function (response) {
					$("#targetResourceManagement").html(response);
				});
				break;
			default:

				break;
		}
// Model

// Ux
	});

	$("input[name='groupEvent_Choice']").on("change", function () {

		var opt = $(this).val()
		switch (opt) {
			case "newEvent":
				modelEntity.pk.type = "event";
				url = location.origin + contextPath + "/services/business/entity/ux/eventNew.html";
				$.get(url, function (response) {
					$("#targetEventManagement").html(response);
				});

				var intervalId = setTimeout(function () {
					$(".existingList").html(dropDownUpBuilder(uxAllEntitiesResourceFk));
					$("#ownerListTarget").html(dropDownUpBuilder(uxAllPatrons));
					$('.ui.dropdown').dropdown();
					calendarStartEnd()
					clearTimeout(intervalId);
				}, 1000);
				break;

			case "modEvent":
				modelEntity.pk.type = "event";
				url = location.origin + contextPath + "/services/business/entity/ux/eventMod.html";
				$.get(url, function (response) {
					$("#targetEventManagement").html(response);
				});
				var intervalId = setTimeout(function () {
					$(".existingList").html(dropDownUpBuilder(uxAllEntitiesEvent));
					// Include so it can be re-selected - issue when user deleted
					$("#ownerListTarget").html(dropDownUpBuilder(uxAllPatrons));
					$('.ui.dropdown').dropdown();

					calendarStartEnd()



					clearTimeout(intervalId);
				}, 1000);
				break;

			case "viewEvent":
				modelEntity.pk.type = "event";
				url = location.origin + contextPath + "/services/business/entity/ux/eventViewAll.html";
				$.get(url, function (response) {
					$("#targetEventManagement").html(response);
				});
				break;
			default:

				break;
		}
	});

	$("input[name='groupSubEvent_Choice']").on("change", function () {

		var opt = $(this).val()
		switch (opt) {
			case "newSubEvent":
				modelEntity.pk.type = "subEvent";
				url = location.origin + contextPath + "/services/business/entity/ux/subEventNew.html";
				$.get(url, function (response) {
					$("#targetSubEventManagement").html(response);
				});

				var intervalId = setTimeout(function () {
					$(".existingList").html(dropDownUpBuilder(uxAllEntitiesEventFk));
					$("#ownerListTarget").html(dropDownUpBuilder(uxAllPatronsMultiple));
					$('.ui.dropdown').dropdown();
					clearTimeout(intervalId);
				}, 1000);
				break;

			case "modSubEvent":
				modelEntity.pk.type = "subEvent";
				url = location.origin + contextPath + "/services/business/entity/ux/subEventMod.html";
				$.get(url, function (response) {
					$("#targetSubEventManagement").html(response);
				});
				var intervalId = setTimeout(function () {
					$(".existingList").html(dropDownUpBuilder(uxAllEntitiesSubEvent));
					$("#ownerListTarget").html(dropDownUpBuilder(uxAllPatronsMultiple)); // Include so it can be re-selected - issue when user deleted
					$('.ui.dropdown').dropdown();
					clearTimeout(intervalId);
				}, 1000);
				break;

			case "viewSubEvent":
				modelEntity.pk.type = "subEvent";
				url = location.origin + contextPath + "/services/business/entity/ux/subEventViewAll.html";
				$.get(url, function (response) {
					$("#targetSubEventManagement").html(response);
				});
				break;
			default:

				break;
		}
	});

	$("input[name='groupEntityGeos_Choice']").on("change", function () {

		var opt = $(this).val()
		switch (opt) {
			case "newGeo":
				url = location.origin + contextPath + "/services/business/entity/ux/geoNew.html";
				$.get(url, function (response) {
					$("#targetGeoManagement").html(response);
				});

				var intervalId = setTimeout(function () {
					// Resource PK Listing - Entity
					locationsUx()
					clearTimeout(intervalId);
				}, 1000);
				break;

			case "modGeo":
				url = location.origin + contextPath + "/services/business/entity/ux/geoMod.html";
				$.get(url, function (response) {
					$("#targetGeoManagement").html(response);
				});
				var intervalId = setTimeout(function () {
					$(".existingList").html(dropDownUpBuilder(uxAllEntitiesGeo));
					locationsUx()
					clearTimeout(intervalId);
				}, 1000);

				break;

			case "viewGeo":
				url = location.origin + contextPath + "/services/business/entity/ux/geoViewAll.html";
				$.get(url, function (response) {
					$("#targetGeoManagement").html(response);
				});
				break;
			default:

				break;
		}
	});

});

function locationsUx() {

	$("input[name='entity_Choice']").on("change", function () {
		var opt = $(this).val()

		$("#geo_Choice").show();

		switch (opt) {
			case "resource":
//				$("input[name='entity_Choice']").val([opt]).attr('checked', 'checked');
				modelEntityGeo.fk.type = opt;
				$(".existingListEntities").html(dropDownUpBuilder(uxAllEntitiesResourceFkGeo));
				break;
			case "event":
				modelEntityGeo.fk.type = opt;
				$(".existingListEntities").html(dropDownUpBuilder(uxAllEntitiesEventFkGeo));
				break;
			case "subEvent":
				modelEntityGeo.fk.type = opt;
				$(".existingListEntities").html(dropDownUpBuilder(uxAllEntitiesSubEventFkGeo));
				break;
		}
	});



	$("input[name='geo_Choice']").on("change", function () {

		var opt = $(this).val()
		switch (opt) {
			case "external":
				modelEntityGeo.pk.type = "external";

				$("#campus").hide();
				$("#gps").hide();
				$("#external").show();
				break;
			case "campus":
				modelEntityGeo.pk.type = "campus";
				$("#external").hide();
				$("#gps").hide();
//				$("#campus").fadeIn(1000, function () { });
				$("#campus").show();
				break;
			case "gps":
				modelEntityGeo.pk.type = "gps";
				$("#external").hide();
				$("#campus").hide();
//				$("#gps").fadeIn(1000, function () { });
				$("#gps").show();
				break;
		}

	});

}
function calendarStartEnd() {

	$("#rangestart").calendar({
		ampm: false,
		firstDayOfWeek: 1,
		inline: false,

		onChange: function (date, text) {

			day = date.getDate();
			dow = date.getDay();
			month = date.getMonth();
			year = date.getFullYear();
			age = calculate_age(date);
			modelEntity.timings.startDate.$date = new Date(date).toISOString();
		}
	});

	$("#rangeend").calendar({
		ampm: false,
		firstDayOfWeek: 1,
		inline: false,

		onChange: function (date, text) {

			day = date.getDate();
			dow = date.getDay();
			month = date.getMonth();
			year = date.getFullYear();
			age = calculate_age(date);
			modelEntity.timings.expiryDate.$date = new Date(date).toISOString();
		}
	});
}



$(document).on("change", "#intro", function () {
	modelEntity.socialize.intro = $(this).val();
});
$(document).on("change", "#name", function () {
	modelEntity.socialize.name = $(this).val();
});
$(document).on("change", "#scope", function () {
	modelEntity.socialize.scope = $(this).val();
	if (modelEntity.socialize.scope !== "private")
		modelEntity.socialize.share = true;
});
$(document).on("change", "#accessibility", function () {
	modelEntity.socialize.accessibility = $(this).val();
});
$(document).on("change", "#tags", function () {
	//modelEntity.socialize.tag.push($(this).val());
	modelEntity.socialize.tag = $(this).val();
});
$(document).on("change", "#quanity", function () {
	modelEntity.socialize.quanity = parseInt($(this).val());
});
$(document).on("change", ".patronIds, .patronIdsMultiple", function () {
	val = $(this).dropdown("get value");
	modelEntity.socialize.owner = val; // need full reference
});
$(document).on("change", "#disclaimer", function () {
	modelEntity.socialize.legal.disclaimer = $(this).val();
});
$(document).on("change", "#notes", function () {
	modelEntity.socialize.notes = $(this).val();
});
$(document).on("change", "#visible", function () {
	modelEntity.ux.visible = $(this).val();
});
$(document).on("change", "#has", function () {
	if (modelEntity.pk.type === "resource")
		modelEntity.has.event = JSON.parse($(this).val());
	else if (modelEntity.pk.type === "event")
		modelEntity.has.subEvent = JSON.parse($(this).val());
});




// Geo - External
$(document).on("change", "#geoTagName", function () {
	modelEntityGeo.name = $(this).val();
});
$(document).on("change", "#number", function () {
	modelEntityGeo.geo.external.number = $(this).val();
});
$(document).on("change", "#street", function () {
	modelEntityGeo.geo.external.street = $(this).val();
});
$(document).on("change", "#town", function () {
	modelEntityGeo.geo.external.town = $(this).val();
});
$(document).on("change", "#zip", function () {
	modelEntityGeo.geo.external.zip = $(this).val();
});
$(document).on("change", "#city", function () {
	modelEntityGeo.geo.external.city = $(this).val();
});
$(document).on("change", "#country", function () {
	modelEntityGeo.geo.external.country = $(this).val();
});
// Geo - Campus
$(document).on("change", "#building", function () {
	modelEntityGeo.geo.campus.building = $(this).val();
});
$(document).on("change", "#department", function () {
	modelEntityGeo.geo.campus.department = $(this).val();
});
$(document).on("change", "#zone", function () {
	modelEntityGeo.geo.campus.zone = $(this).val();
});
$(document).on("change", "#floor", function () {
	modelEntityGeo.geo.campus.floor = $(this).val();
});
$(document).on("change", "#campus_number", function () {
	modelEntityGeo.geo.campus.number = $(this).val();
});
// Geo - GPS
$(document).on("change", "#gpsLong", function () {
	modelEntityGeo.geo.gps.long = $(this).val();
});
$(document).on("change", "#gpsLat", function () {
	modelEntityGeo.geo.gps.lat = $(this).val();
});
$(document).on("change", "#gpsHgt", function () {
	modelEntityGeo.geo.gps.hgt = $(this).val();
});





// Used By Resource, Event, SubEvent for modification
$(document).on("change", ".entityId_Pk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
// Existing IDs

	modelEntity.pk.id = id;
	modelEntity.pk.dbId = dbId;
// Update Form
	modelEntityRsp = srvEntity.setPayload(modelEntity).queryByType("Q. By DbId?")[0];
	if (srvEntity.answer()) {
		srvEntity.uxFormUpdate(modelEntityRsp)
	} else
		alert("ERR: Couldnt retrieve seleted, dbID (" + dbId + ") contact support ASAP")
});

$(document).on("change", ".entityId_PkGeo", function () {

	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
// Existing IDs

	modelEntityGeo.pk.id = id;
	modelEntityGeo.pk.dbId = dbId;
// Update Form
	modelEntityGeoRsp = srvEntityGeo.setPayload(modelEntityGeo).queryByType("Q. By DbId?")[0];
	if (srvEntityGeo.answer()) {
		srvEntityGeo.uxFormUpdate(modelEntityGeoRsp)
	} else
		alert("ERR: Couldnt retrieve seleted, dbID (" + dbId + ") contact support ASAP")
});
// Used By Event, SubEvent, Geo for FK link
$(document).on("change", ".entityId_Fk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
	modelEntity.fk.id = id;
	modelEntity.fk.dbId = dbId;
});
$(document).on("change", ".entityId_FkGeo", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
	modelEntityGeo.fk.id = id;
	modelEntityGeo.fk.dbId = dbId;
});







$(document).on("click", "#save", function () {

	modelEntity.pk.id = getRand();
	srvEntity.setPayload(modelEntity);
	srvEntity.uxUpdateNameTag();
	if (srvEntity.isValid("props")) {
		modelEntityRsp = srvEntity.create();
		srvEntity.modPkDbId();
	} else
		alert("ERR: Props are not good");
});
$(document).on("click", "#saveGeo", function () {
	modelEntityGeo.pk.id = getRand();
	srvEntityGeo.setPayload(modelEntityGeo);
	srvEntityGeo.uxUpdateNameTag();


	if (srvEntityGeo.isValid("props")) {
		modelEntityGeoRsp = srvEntityGeo.create();
		srvEntityGeo.modPkDbId();
	} else
		alert("ERR: Props are not good");
});

$(document).on("click", "#update", function () {
	srvEntity.setPayload(modelEntity)
	srvEntity.uxUpdateNameTag()

	if (srvEntity.isValid("props"))
		srvEntity.mod(modelEntity.pk.dbId);
	else
		alert("ERR: Props are not good")

});
$(document).on("click", "#updateGeo", function () {
	srvEntityGeo.setPayload(modelEntityGeo)
	srvEntityGeo.uxUpdateNameTag()

	if (srvEntityGeo.isValid("props"))
		srvEntityGeo.mod(modelEntityGeo.pk.dbId);
	else
		alert("ERR: Props are not good")

});
$(document).on("click", "#delete", function () {
	srvEntity.delByOId(modelEntity.pk.dbId);
});
$(document).on("click", "#deleteGeo", function () {
	srvEntityGeo.delByOId(modelEntityGeo.pk.dbId);
});

$(document).on("click", "#list", function () {
	srvEntity.setPayload({});
	$("#lists").html(srvEntity.uxBuildList()).fadeOut(30000, function () {
		alert("INF: Request hard copy from support time.")
	});
});
$(document).on("click", "#listGeo", function () {
	srvEntityGeo.setPayload({});
	$("#listGeos").html(srvEntityGeo.uxBuildList()).fadeOut(30000, function () {
		alert("INF: Request hard copy from support time.")
	});
});

