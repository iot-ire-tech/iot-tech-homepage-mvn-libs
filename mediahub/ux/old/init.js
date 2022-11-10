/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





var logger = new Logger(bs.loggingCtrl, "INIT: Log Booking Activity");

var srvMediaHub = new MediaHub(bs.mediaHubCtrl, "Media Hub");

var qAll = srvMediaHub.setObj(modelMediaHub).queryByType("Q. List all?");

var uxAllEntities = {
	"data": qAll,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId",
	"provider": "semantic"
};

var srvEnity = new EntityX(bs.entityCtrl, "Entity Time");
var qAllResources = srvEnity.setPayload({"pk": {"dbId": ""}}).queryByType("Q. List all items type(resource)?");
var uxResourceDropDown = {
	"data": qAllResources,
	"title": "Please Select",
	"id": "",
	"class": "ui fluid search dropdown entityId",
	"provider": "semantic"
};
var qAllEvents = srvEnity.setPayload({"pk": {"dbId": ""}}).queryByType("Q. List all items type(event)?");
var uxEventDropDown = {
	"data": qAllEvents,
	"title": "Please Select",
	"id": "",
	"class": "ui fluid search dropdown entityId",
	"provider": "semantic"
};
var qAllSubEvents = srvEnity.setPayload({"pk": {"dbId": ""}}).queryByType("Q. List all items type(subEvent)?");
var uxSubEventsDropDown = {
	"data": qAllSubEvents,
	"title": "Please Select",
	"id": "",
	"class": "ui fluid search dropdown entityId",
	"provider": "semantic"
};



$(document).ready(function () {

// Generate a UX for it
	var url = location.origin + contextPath + "/services/mediahub/ux/widget.html";
	$.get(url, function (response) {
		$("#target").after(response);
	});


// Model
	modelMediaHub.pk.id = getRand();



// Ux
	var intervalId = setTimeout(function () {
		$('.ui.dropdown').dropdown();
		$("#existingList").html(dropDownUpBuilder(uxAllEntities));
		clearTimeout(intervalId);
	}, 1000);
});