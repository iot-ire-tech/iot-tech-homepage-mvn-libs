/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Init Test
// http://localhost:8084/iot-base/services/mediahub/tests/testLifeCycleSingleUser.html?clientId=673859&patronId=787833
// http://localhost:8084/iot-base/services/mediahub/ux/singleUser.html
// SRV

/*
 * UX Priming
 */

var srvEntity = new EntityX(bs.entityCtrl, "Life Cycle Entity");
var srvPatron = new Patron(bs.patronCtrl, "Life Cycle Patron");

var qAllEntities = srvEntity.queryByType("Q. List all?");
var uxAllEntities = {
	"data": qAllEntities,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
};
var qAllEntitiesResources = srvEntity.queryByType("Q. List all items type(resource)?");
var uxAllEntitiesResource = {
	"data": qAllEntitiesResources,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
};
var qAllEntitiesEvents = srvEntity.queryByType("Q. List all items type(event)?");
var uxAllEntitiesEvent = {
	"data": qAllEntitiesEvents,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
};
var qAllEntitiesSubEvents = srvEntity.queryByType("Q. List all items type(subEvent)?");
var uxAllEntitiesSubEvent = {
	"data": qAllEntitiesSubEvents,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
};
var qAllEntitiesPatrons = srvPatron.queryByType("Q. List all?");
var uxAllEntitiesPatron = {
	"data": qAllEntitiesPatrons,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Fk",
	"provider": "semantic"
};


// Contexts
var srvContentVisualResources = new MediaHub(bs.mediaHubVisualCtrl, "Media Hub Visual - Resources!");
var srvContentVisualEvents = new MediaHub(bs.mediaHubVisualCtrl, "Media Hub Visual - Events!");
var srvContentVisualSubEvents = new MediaHub(bs.mediaHubVisualCtrl, "Media Hub Visual - SubEvents!");
var srvContentVisualPatrons = new MediaHub(bs.mediaHubVisualCtrl, "Media Hub Visual - Patrons!");

var srvContentSocialResources = new SocialHub(bs.mediaHubSocialCtrl, "Media Hub Social - Resources!");
var srvContentSocialEvents = new SocialHub(bs.mediaHubSocialCtrl, "Media Hub Social - Events!");
var srvContentSocialSubEvents = new SocialHub(bs.mediaHubSocialCtrl, "Media Hub Social - SubEvents!");
var srvContentSocialPatrons = new SocialHub(bs.mediaHubSocialCtrl, "Media Hub Social - Patrons!");

var qAllEntitiesVisualResources = srvContentVisualResources.queryByType("Q. By FkType (resource)?");
var uxAllEntitiesVisualResources = {
	"data": qAllEntitiesVisualResources,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};
var qAllEntitiesSocialResources = srvContentSocialResources.queryByType("Q. By FkType (resource)?");
var uxAllEntitiesSocialResources = {
	"data": qAllEntitiesSocialResources,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};

var qAllEntitiesVisualEvents = srvContentVisualEvents.queryByType("Q. By FkType (event)?");
var uxAllEntitiesVisualEvents = {
	"data": qAllEntitiesVisualEvents,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};
var qAllEntitiesSocialEvents = srvContentSocialEvents.queryByType("Q. By FkType (event)?");
var uxAllEntitiesSocialEvents = {
	"data": qAllEntitiesSocialEvents,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};

var qAllEntitiesVisualSubEvents = srvContentVisualSubEvents.queryByType("Q. By FkType (subEvent)?");
var uxAllEntitiesVisualSubEvents = {
	"data": qAllEntitiesVisualSubEvents,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};
var qAllEntitiesSocialSubEvents = srvContentSocialSubEvents.queryByType("Q. By FkType (subEvent)?");
var uxAllEntitiesSocialSubEvents = {
	"data": qAllEntitiesSocialSubEvents,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};

var qAllEntitiesVisualPatrons = srvContentVisualPatrons.queryByType("Q. By FkType (patron)?");
var uxAllEntitiesVisualPatrons = {
	"data": qAllEntitiesVisualPatrons,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};
var qAllEntitiesSocialPatrons = srvContentSocialPatrons.queryByType("Q. By FkType (patron)?");
var uxAllEntitiesSocialPatrons = {
	"data": qAllEntitiesSocialPatrons,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "entityId_Pk",
	"provider": "semantic"
};





function workFlowMonitor() {
// Create Ready
	if (workflowProgression.wfChkFk === true) {
		$("#divSocialCat *").prop("disabled", false);
		if (workflowProgression.wfChkC1 === true) {
			$("#divMgtCat *").prop("disabled", false);
			if (workflowProgression.wfChkC2 === true) {
				$("#divMgtCat *").prop("disabled", false);
				workflowProgression.wfCreateReady = true;
			}
		}
	}

// Mod Ready
	if (workflowProgression.wfChkPk === true) {
		workflowProgression.wfModReady = true;
	}

}

$(document).on("click", ".tablinkXXX", function () {
	opt = $(this).text()
	tabCat = opt;


	switch (opt) {
		case "Assets":
//			$("#AssetsNew, #AssetsMod").empty();
//			$("#EventsNew, #EventsMod").empty();
//			$("#ActivitiesNew, #ActivitiesMod").empty();
			srvContext = srvContentVisualResources;
			modelContext = modelContentVisual;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "visualAsset";
			fk.type = "resource";
			break;

		case "Events":
			srvContext = srvContentVisualEvents;
			modelContext = modelContentVisual;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "visualAsset";
			fk.type = "resource";
			break;

		case "Activities":
			srvContext = srvContentVisualSubEvents;
			modelContext = modelContentVisual;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "visualAsset";
			fk.type = "resource";
			break;

		case "Users":
			srvContext = srvContentVisualPatrons;
			modelContext = modelContentVisual;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "visualAsset";
			fk.type = "resource";
			break;

	}
});

// Ux : Init Function
$(document).ready(function () {
	var url;
	var opt;

// Default Options
	tabCat = "Resources";
	srvContext = srvContentVisualResources;
	modelContext = modelContentVisual;
	modelContext.pk.id = getRand();
	modelContext.pk.type = "unknown";
	fk.type = "resource";




	var intervalId = setTimeout(function () {
		clearTimeout(intervalId);
		$(".entityList").html(dropDownUpBuilder(uxAllEntitiesResource));
		$('.ui.dropdown').dropdown();

// This is loaded only after rich content is triggered
		$("#divSocialCat *").prop("disabled", true);
		$("#divMgtCat *").prop("disabled", true);
		$(".view").prop("disabled", false);

	}, 1000);



});

// Level One Context - Asset, Event, etc!!
$(document).on("click", ".tablink", function () {

	opt = $(this).text()
	tabCat = opt;

// Fresh Sheet - Data Lost
	$("#targetMediaManagment" + tabCat).empty();
	$("input[name=contentCat]").val([""]);
	$("input[name=mgtCat]").val([""]);

	switch (opt) {
		case "Assets":
			tabCat = "Resources";
			$("#targetMediaManagment" + tabCat).empty();
			fk.type = "resource";
			var intervalId = setTimeout(function () {
				$(".entityList").html(dropDownUpBuilder(uxAllEntitiesResource));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;
		case "Events":
			fk.type = "event";
			var intervalId = setTimeout(function () {
				$(".entityList").html(dropDownUpBuilder(uxAllEntitiesEvent));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;
		case "Activities":
			tabCat = "SubEvents";
			fk.type = "subEvent";
			var intervalId = setTimeout(function () {
				$(".entityList").html(dropDownUpBuilder(uxAllEntitiesSubEvent));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;
		case "Patrons":
			fk.type = "patron";
			var intervalId = setTimeout(function () {
				$(".entityList").html(dropDownUpBuilder(uxAllEntitiesPatron));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;
	}
});
// Level Two Context - Social / Rich !!
$(document).on("click", ".content", function () {
	contentCat = $(this).val()
	workFlowMonitor(workflowProgression.wfChkC1 = true);

	if (tabCat === undefined) {
		alert("INF: Select a item to layer first!")
		$("#divSocialCat *").prop("disabled", false);
		return
	}

	switch (contentCat) {
		case "Visual":
			srvContext = eval("srvContentVisual" + tabCat);
			modelContent = modelContentVisual;
			modelContent.pk.id = getRand();
			modelContent.pk.type = "visual";
			break;
		case "Social":
			srvContext = eval("srvContentSocial" + tabCat);
			modelContent = modelContentSocial;
			modelContent.pk.id = getRand();
			modelContent.pk.type = "social";
			break;
	}
});

// Level Three Context Management Option for that context
$(document).on("click", ".mgt", function () {


	opt = $(this).val()
	switch (opt) {
		case "new":
			if (workflowProgression.wfChkFk === false) {
				alert("INF: Select a item to layer first!")
				return
			}
			if (contentCat === undefined) {
				alert("INF: Select a presentation layer first, Social or Rich.")
				$("#divSocialCat *").prop("disabled", false);
				return
			}

			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/mediahub/ux/" + contentCat + "New.html";
			$.get(url, function (response) {
				$("#targetMediaManagment" + tabCat).html(response);
			});

			break;
		case "mod":
			if (contentCat === undefined) {
				alert("INF: Select a presentation layer first, Social or Rich.")
				$("#divSocialCat *").prop("disabled", false);
				$(this).val([""])
				return
			}

			url = location.origin + contextPath + "/services/mediahub/ux/" + contentCat + "Mod.html";
			$.get(url, function (response) {
				$("#targetMediaManagment" + tabCat).html(response);
			});
			var intervalId = setTimeout(function () {
				// Load Existing Visual/Social Content
				existingList = eval("uxAllEntities" + contentCat + tabCat);
				//console.log("INF : Eval Existing (uxAllEntities" + contentCat + tabCat + ")")
				//console.table(existingList)
				$(".existingList").html(dropDownUpBuilder(existingList));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;
		default:

			break;
	}
});

$(document).on("click", ".mgtBrowser", function () {

	opt = $(this).val()
	switch (opt) {
		case "resourceVisual":
			srvContentVisualResources.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvContentVisualResources.display("Asset Visual Content Listing"));
			break;
		case "resourceSocial":
			srvContentSocialResources.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvContentSocialResources.display("Asset Social Content Listing"));
			break;

		case "eventVisual":
			srvContentVisualEvents.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvContentVisualEvents.display("Event Visual Content Listing"));
			break;
		case "eventSocial":
			srvContentSocialEvents.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvContentSocialEvents.display("Event Social Content Listing"));
			break;

		case "subEventVisual":
			srvContentVisualSubEvents.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvContentVisualSubEvents.display("Activities Visual Content Listing"));
			break;
		case "subEventSocial":
			srvContentSocialSubEvents.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvContentSocialSubEvents.display("Activities Social Content Listing"));
			break;

		case "patronVisual":
			srvContentVisualPatrons.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvContentVisualPatrons.display("Patrons Visual Content Listing"));
			break;
		case "patronSocial":
			srvContentSocialPatrons.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvContentSocialPatrons.display("Patrons Social Content Listing"));
			break;
	}
});

//# sourceURL=mediahub_init.js


