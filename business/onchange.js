/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("change", "#tagLine", function () {
	modelContext.name = $(this).val()
});
// Members
$(document).on("change", ".patronIdsMultiple", function () {
	//console.log(" ? " + $(this).dropdown("get value"))
	modelContext.members = $(this).dropdown("get value")
});
$(document).on("change", ".patronIds", function () {
	val = $(this).dropdown("get value");
	modelContext.socialize.owner = val; // need full reference
});

// Costs
$(document).on("change", "#duration", function () {
	modelContext.timings.duration.value = parseInt($(this).val())
});
$(document).on("change", "#valRevenueOn", function () {
	modelContext.cost.amount = parseFloat($(this).val()).toFixed(2) * 1.00;
//	modelContext.cost.amount = ($(this).val()).toFixed(2) * 1;
	modelContext.cost.cent = parseFloat($(this).val()).toFixed(2) * 100;
	modelContext.monitized = true;
});
$(document).on("change click", "#valRevenueOff", function () {
	modelContext.cost.amount = parseFloat(0).toFixed(2) * 1.00;
//	modelContext.cost.amount = (0).toFixed(2) * 1;  Multipling by 1 converts to INT
	modelContext.cost.cent = parseFloat(0).toFixed(2) * 100;
	modelContext.monitized = false;
});
$(document).on("change", "#currency", function () {
	modelContext.cost.currency = $(this).val()
});
// Availability
$(document).on("change", "#dow", function () {
	modelContext.dow = parseInt($(this).val())
});
$(document).on("change", "#patronType", function () {
	modelContext.patronType = $(this).val()
});
$(document).on("change", "#reason", function () {
	modelContext.reason = $(this).val()
});
$(document).on("change", "#intro", function () {
	modelContext.socialize.intro = $(this).val();
});
$(document).on("change", "#name", function () {
	modelContext.socialize.name = $(this).val();
});
$(document).on("change", "#scope", function () {
	modelContext.socialize.scope = $(this).val();
	if (modelContext.socialize.scope !== "private")
		modelContext.socialize.share = true;
});
$(document).on("change", "#accessibility", function () {
	modelContext.socialize.accessibility = $(this).val();
});
$(document).on("change", "#tags", function () {
//modelContext.socialize.tag.push($(this).val());
	modelContext.socialize.tag = $(this).val();
});
$(document).on("change", "#quanity", function () {
	modelContext.quanity.max = parseInt($(this).val());
	modelContext.quanity.rt = parseInt($(this).val());
});

$(document).on("change", "#disclaimer", function () {
	modelContext.socialize.legal.disclaimer = $(this).val();
});
$(document).on("change", "#notes", function () {
	modelContext.socialize.notes = $(this).val();
});
$(document).on("change", "#visible", function () {
	modelContext.ux.visible = $(this).val();
});
$(document).on("change", "#has", function () {
	if (modelContext.pk.type === "resource")
		modelContext.has.event = JSON.parse($(this).val());
	else if (modelContext.pk.type === "event")
		modelContext.has.subEvent = JSON.parse($(this).val());
});
// Geo - External
$(document).on("change", "#number", function () {
	modelContext.geo.external.number = $(this).val();
});
$(document).on("change", "#street", function () {
	modelContext.geo.external.street = $(this).val();
});
$(document).on("change", "#town", function () {
	modelContext.geo.external.town = $(this).val();
});
$(document).on("change", "#zip", function () {
	modelContext.geo.external.zip = $(this).val();
});
$(document).on("change", "#city", function () {
	modelContext.geo.external.city = $(this).val();
});
$(document).on("change", "#country", function () {
	modelContext.geo.external.country = $(this).val();
});
// Geo - Campus
$(document).on("change", "#building", function () {
	modelContext.geo.campus.building = $(this).val();
});
$(document).on("change", "#department", function () {
	modelContext.geo.campus.department = $(this).val();
});
$(document).on("change", "#zone", function () {
	modelContext.geo.campus.zone = $(this).val();
});
$(document).on("change", "#floor", function () {
	modelContext.geo.campus.floor = $(this).val();
});
$(document).on("change", "#campus_number", function () {
	modelContext.geo.campus.number = $(this).val();
});
// Geo - GPS
//$(document).on("change", "#gpsLong", function () {
//	modelContext.geo.gps.long = $(this).val();
//});
//$(document).on("change", "#gpsLat", function () {
//	modelContext.geo.gps.lat = $(this).val();
//});
//$(document).on("change", "#gpsHgt", function () {
////https://developers.google.com/maps/documentation/embed/get-api-key
//// https:////console.cloud.google.com/google/maps-apis/overview?onboard=true&project=sportsco-217112&//consoleReturnUrl=https:%2F%2Fcloud.google.com%2Fmaps-platform%2F%3Fapis%3Dmaps%26project%3Dstellar-builder-747%26project%3Dsportsco-217112&//consoleUI=CLOUD
//	modelContext.geo.gps.hgt = $(this).val();
//});


//# sourceURL=entity_onchange.js




