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


/*
 * Used for modification
 */
var qAllContent = {};
var uxAllContent = {
	"data": qAllContent,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "Pk",
	"provider": "semantic"
};
// Contexts
var srvBrandingWelcome = new BrandingWelcome("branding", "Brandings Welcome");
var srvBrandingGeneric = new Branding("branding", "Brandings Generic");
var srvBrandingGender = new Branding("branding", "Brandings Gender");
var srvBrandingAge = new Branding("branding", "Brandings Age");


var qAllWelcomeMedia = srvBrandingWelcome.queryByType("Q. List all?");
var uxAllWelcomeMedia = {
	"data": qAllWelcomeMedia,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "Pk",
	"provider": "semantic"
};
var qAllBrandingGeneric = srvBrandingGeneric.queryByType("Q. List by type(generic)?");
var uxAllBrandingGeneric = {
	"data": qAllBrandingGeneric,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "Pk",
	"provider": "semantic"
};
var qAllBrandingGender = srvBrandingGender.queryByType("Q. List by type(gender)?");
var uxAllBrandingGender = {
	"data": qAllBrandingGender,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "Pk",
	"provider": "semantic"
};
var qAllBrandingAge = srvBrandingAge.queryByType("Q. List by type(age)?");
var uxAllBrandingAge = {
	"data": qAllBrandingAge,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "Pk",
	"provider": "semantic"
};



var pkCatReady = false;
function workFlowMonitor() {
// Create Ready
	if (workflowProgression.chkFk === true) {
		if (workflowProgression.fkItem === true) {
			if (workflowProgression.tagEntered === true) {
				$(".content *").prop("disabled", false);
				pkCatReady = true;
			}
		}
	}


}


// Ux : Init Function
$(document).ready(function () {

	modelContext = modelBrandingWelcomeMsg;
	modelContext.pk.id = getRand();
	modelContext.pk.type = "welcome";
	modelContext.target = "welcome";
	srvContext = srvBrandingWelcome;

// This is loaded only after rich content is triggered

//	$(".content *").prop("disabled", true);
//	$(".view").prop("disabled", false);



});
// If you have these inside dom ready they will not be readily available to browser!!!

$(document).on("click", ".tablink", function () {

	opt = $(this).text()
	switch (opt) {
		case "Welcome Media":

			modelContext = modelBrandingWelcomeMsg;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "welcome";
			modelContext.target = "welcome";
			srvContext = srvBrandingWelcome;

			break;
		case "Generic":
			modelContext = modelBrandingTargeted;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "generic";
			modelContext.target = "generic";
			srvContext = srvBrandingGeneric;
			break;
		case "Gender Based":
			modelContext = modelBrandingTargeted;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "gender";
			modelContext.target = "gender";
			srvContext = srvBrandingGender;
			break;
		case "Age Based":
			modelContext = modelBrandingTargeted;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "age";
			modelContext.target = "age";
			srvContext = srvBrandingAge;
			break;
		case "TypeFace":
			break;
	}


});



$(document).on("click", "#welecomeNew, #welecomeMod, #welecomeView", function () {


	opt = $(this).val()
	switch (opt) {
		case "new":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/branding/ux/welcomeNew.html";
			$.get(url, function (response) {
				$("#targetWelcomeMedia").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
			}, 1000);
			break;
		case "mod":
			url = location.origin + contextPath + "/services/branding/ux/welcomeMod.html";
			$.get(url, function (response) {
				$("#targetWelcomeMedia").html(response);
			});

			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".existingList").html(dropDownUpBuilder(uxAllWelcomeMedia));
				$('.ui.dropdown').dropdown();
			}, 1000);

			break;
		default:

			break;
	}
// Model

// Ux
});


$(document).on("click", "#genericNew, #genericMod, #genericView", function () {

	opt = $(this).val()
	switch (opt) {
		case "new":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/branding/ux/genericNew.html";
			$.get(url, function (response) {
				$("#targetGenericBranding").html(response);
			});
			break;
		case "mod":
			url = location.origin + contextPath + "/services/branding/ux/genericMod.html";
			$.get(url, function (response) {
				$("#targetGenericBranding").html(response);
			});

			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".existingList").html(dropDownUpBuilder(uxAllBrandingGeneric));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;
		default:

			break;
	}
// Model

// Ux
});

$(document).on("click", "#targetedGenderNew, #targetedGenderMod, #targetedGenderView", function () {

	opt = $(this).val()
	switch (opt) {
		case "new":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/branding/ux/targetedGenderNew.html";
			$.get(url, function (response) {
				$("#targetTargetedGenderBranding").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
			}, 1000);
			break;
		case "mod":
			url = location.origin + contextPath + "/services/branding/ux/targetedGenderMod.html";
			$.get(url, function (response) {
				$("#targetTargetedGenderBranding").html(response);
			});

			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".existingList").html(dropDownUpBuilder(uxAllBrandingGender));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;
		default:

			break;
	}
// Model

// Ux
});


$(document).on("click", "#targetedAgeNew, #targetedAgeMod, #targetedAgeView", function () {



	opt = $(this).val()
	switch (opt) {
		case "new":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/branding/ux/targetedAgeNew.html";
			$.get(url, function (response) {
				$("#targetTargetedAgeBranding").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
			}, 1000);
			break;
		case "mod":
			url = location.origin + contextPath + "/services/branding/ux/targetedAgeMod.html";
			$.get(url, function (response) {
				$("#targetTargetedAgeBranding").html(response);
			});

			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllBrandingAge));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;
		default:

			break;
	}
// Model

// Ux
});


$(document).on("click", ".mgtBrowser", function () {

	opt = $(this).val()
	switch (opt) {

		case "welcome":
			srvBrandingWelcome.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvBrandingWelcome.display("Welcome Listing"));
			break;

		case "generic":
			srvBrandingGeneric.queryByType("Q. List by type(generic)?");
			$("#targetManagementBrowser").html(srvBrandingGeneric.display("Generic Branding Listing"));
			break;

		case "gender":
			srvBrandingGender.queryByType("Q. List by type(gender)?");
			$("#targetManagementBrowser").html(srvBrandingGender.display("Gender Branding Listing"));
			break;

		case "age":
			srvBrandingAge.queryByType("Q. List by type(age)?");
			$("#targetManagementBrowser").html(srvBrandingAge.display("Age Branding Listing"));
			break;
	}

});


//# sourceURL=services_module_branding_init.js