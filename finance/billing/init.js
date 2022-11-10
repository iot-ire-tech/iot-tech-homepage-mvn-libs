/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Init Test
// http://localhost:8084/iot-base/services/userManagement/tests/testLifeCycleSingleUser.html?clientId=673859&patronId=787833
// http://localhost:8084/iot-base/services/userManagement/ux/singleUser.html
// http://localhost:8084/iot-base/services/userManagement/ux/singleUserMod.html
// http://localhost:8084/iot-base/services/userManagement/ux/singleUserViewAll.html
// http://localhost:8084/iot-base/services/userManagement/ux/locationNew.html
// http://localhost:8084/iot-base/services/userManagement/ux/locationViewAll.html
// http://localhost:8084/iot-base/services/userManagement/ux/richContentNew.html
// http://localhost:8084/iot-base/services/userManagement/ux/socialMediaNew.html
// http://localhost:8084/iot-base/services/userManagement/ux/socialMediaMod.html
// SRV

/*
 * UX Priming
 */


var srvPatronCredit = new PatronCredit(bs.patronCreditCtrl, "INIT: Patron Credit");

var srvPaymentSplit = new ProportionalBilling(bs.paymentSplitCtrl, "INIT: Split Payments - Service Charge");
var srvBillingRulePatron = new BillingRulePatron(bs.billingRulePatronsCtrl, "INIT: Patron Billing Rules");
var srvBillingRulePatronsCat = new BillingRulePatronCat(bs.billingRulePatronCatCtrl, "INIT: Patron Cat. Billing Rules");
var srvBillingRuleEntities = new BillingRuleEntity(bs.billingRuleEntityCtrl, "INIT: Patron Entity Billing Rules");

var srvPatron = new Patron(bs.patronCtrl, "Life Cycle Patron Tests");
var qAllPatrons = srvPatron.queryByType("Q. List all?");
var uxAllPatrons = {
	"data": qAllPatrons, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var uxAllPatronsFk = {
	"data": qAllPatrons, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};

var srvEntity = new EntityX(bs.entityCtrl, "Life Cycle Entity");
var qAllEntitiesAsset = srvEntity.queryByType("Q. List all items type(resource)?");
var uxAllEntitiesAssets = {
	"data": qAllEntitiesAsset, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "PkEntity", "provider": "semantic"
};
var qAllEntitiesEvent = srvEntity.queryByType("Q. List all items type(event)?");
var uxAllEntitiesEvents = {
	"data": qAllEntitiesEvent, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "PkEntity", "provider": "semantic"
};
var qAllEntitiesActivities = srvEntity.queryByType("Q. List all items type(subEvent)?");
var uxAllEntitiesActivities = {
	"data": qAllEntitiesActivities, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "PkEntity", "provider": "semantic"
};


function updateHdr() {
	patrons = new crudIt(bs.patronCtrl, "Patrons List").setPayload("{}").query();
	resources = new crudIt(bs.entityCtrl, "Resources List").setPayload({"pk.type": "resource"}).query();
	events = new crudIt(bs.entityCtrl, "Event List").setPayload({"pk.type": "event"}).query();
	subEvents = new crudIt(bs.entityCtrl, "SubEvent List").setPayload({"pk.type": "subEvent"}).query();
	$("#statsHook").html(uxStats(resources.length, events.length, subEvents.length, patrons.length));
	location.href = "#top";

}
$(document).ready(function () {

	var url;
	$("input[name='xxxCat']").on("change", function () {

		var opt = $(this).val()
		switch (opt) {
			case "newAccount":
				url = location.origin + contextPath + "/services/userManagement/ux/accountsNew.html";
				$.get(url, function (response) {
					$("#targetAccountManagement").html(response);
				});
				var intervalId = setTimeout(function () {
					clearTimeout(intervalId);
					$(".existingList").html(dropDownUpBuilder(uxAllEntitiesFk));
					$('.ui.dropdown').dropdown();

					$("#expiry").calendar({
						ampm: false,
						firstDayOfWeek: 1,
						inline: false,
						onChange: function (date, text) {
							modelContext.account[0].expiry.$date = new Date(date).toISOString();
						}
					});
				}, 1000);
				break;
			case "modAccount":
				url = location.origin + contextPath + "/services/userManagement/ux/accountsMod.html";
				$.get(url, function (response) {
					$("#targetAccountManagement").html(response);
				});
				var intervalId = setTimeout(function () {
					clearTimeout(intervalId);
					$(".existingList").html(dropDownUpBuilder(uxAllAccounts));
					$('.ui.dropdown').dropdown();

					$("#expiry").calendar({
						ampm: false,
						firstDayOfWeek: 1,
						inline: false,
						onChange: function (date, text) {
							modelContext.account[0].expiry.$date = new Date(date).toISOString();
						}
					});

				}, 1000);
				break;
		}
// Model

// Ux
	});

// Default Context
	srvContext = srvPaymentSplit;
	modelContext = modelPaymentSplit;
	modelContext.pk.id = getRand();
	modelContext.pk.type = "split";
	fk.type = "n/a";
	url = location.origin + contextPath + "/services/finance/billing/billingProportional/ux/proportionalBilling.html";
	$.get(url, function (response) {
		$("#proportionalBillingTarget").html(response);
	});

});


$(document).on("click", ".tablink", function () {
	opt = $(this).text()

	switch (opt) {
		case "Proportional Billing":
			srvContext = srvPaymentSplit;
			modelContext = modelPaymentSplit;
			modelContext.pk.type = "split";
			fk.type = "";
			url = location.origin + contextPath + "/services/finance/billing/billingProportional/ux/proportionalBilling.html";
			$.get(url, function (response) {
				$("#proportionalBillingTarget").html(response);
			});
			break;
		case "Single Adjustments":
			srvContext = srvBillingRulePatron;
			modelContext = modelBillingRulesPatron;
			modelContext.pk.type = "singleAdjustment";
			fk.type = "";

			url = location.origin + contextPath + "/services/finance/billing/billingRules/ux/billingRulePatrons.html";
			$.get(url, function (response) {
				$("#billingRulePatronTarget").html(response);
			});

//			$("#patronTarget").html(new uxSelect(patrons, "patronsList", "Please Select").setSize(5).init().getHtml());
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$("#patronTarget").html(dropDownUpBuilder(uxAllPatrons));
				$('.ui.dropdown').dropdown();
			}, 1000);
			$("#discountContainerFixed").hide();
			$("#discountContainerPercentage").hide();

//			updateSummaryBoxEntity();
			break;

		case "Group Adjustments":
			url = location.origin + contextPath + "/services/ux/lists/occupation.html";
			srvContext = srvBillingRulePatronsCat;
			modelContext = modelBillingRulesPatronCat;
			modelContext.pk.type = "groupAdjustment";
			fk.type = "";

			url = location.origin + contextPath + "/services/finance/billing/billingRules/ux/billingRulePatronsCat.html";
			$.get(url, function (response) {
				$("#patronCatTarget").html(response);
			});

//			var intervalId = setTimeout(function () {
//				clearTimeout(intervalId);
//				$("#patronTarget").html(dropDownUpBuilder(uxAllPatrons));
//				$('.ui.dropdown').dropdown();
//			}, 1000);
//			$("#discountContainerFixed").hide();
//			$("#discountContainerPercentage").hide();

			break;

		case "Asset Adjustments":
			srvContext = srvBillingRuleEntities;
			modelContext = modelBillingRulesEntity;
			fk.type = "";

			url = location.origin + contextPath + "/services/finance/billing/billingRules/ux/billingRuleAssets.html";
			$.get(url, function (response) {
				$("#assetTarget").html(response);
			});
			break;




	}
});




$(document).on("change", "input[name=assetGroup]", function () {

	opt = $(this).val()
	modelContext.pk.type = opt;
	switch (opt) {
		case "resources":
			modelContext.pk.type = "resource";
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$("#entityListTarget").html(dropDownUpBuilder(uxAllEntitiesAssets));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;
		case "events":
			modelContext.pk.type = "event";
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$("#entityListTarget").html(dropDownUpBuilder(uxAllEntitiesEvents));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;
		case "subEvents":
			modelContext.pk.type = "subEvent";
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$("#entityListTarget").html(dropDownUpBuilder(uxAllEntitiesActivities));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;
		default:
			break;
	}

});



$(document).on("click", ".mgtBrowser", function () {

	opt = $(this).val()
	switch (opt) {
		case "rulesEntityAssets":
			srvBillingRuleEntities.queryByType("Q. By type(resource)?");
			$("#targetManagementBrowser").html(srvBillingRuleEntities.display("Patron Member Listing"));
			break;
		case "rulesEntityEvents":
			srvBillingRuleEntities.queryByType("Q. By type(event)?");
			$("#targetManagementBrowser").html(srvBillingRuleEntities.display("Patron Member Listing"));
			break;
		case "rulesEntitySubEvents":
			srvBillingRuleEntities.queryByType("Q. By type(subEvent)?");
			$("#targetManagementBrowser").html(srvBillingRuleEntities.display("Patron Member Listing"));
			break;
		case "rulesGroupAssignments":
			srvBillingRulePatronsCat.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvBillingRulePatronsCat.display("Patron Member Listing"));
			break;
		case "rulesSingleAssignments":
			srvBillingRulePatron.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvBillingRulePatron.display("Patron Member Listing"));
			break;
		case "paymentSplit":
			srvPaymentSplit.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvPaymentSplit.display("Patron Member Listing"));
			break;

	}
});

//# sourceURL=finance_init.js