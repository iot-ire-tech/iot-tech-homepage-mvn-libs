/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var srvEntity = new EntityX(bs.entityCtrl, "Life Cycle Entity");
var qAllEntitiesAsset = srvEntity.queryByType("Q. List all items type(resource)?");
var uxAllEntitiesAssets = {
	"data": qAllEntitiesAsset, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "entity", "provider": "semantic"
};
var qAllEntitiesEvent = srvEntity.queryByType("Q. List all items type(event)?");
var uxAllEntitiesEvents = {
	"data": qAllEntitiesEvent, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var qAllEntitiesActivities = srvEntity.queryByType("Q. List all items type(subEvent)?");
var uxAllEntitiesActivities = {
	"data": qAllEntitiesActivities, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var srvEntitiesCosts = new EntityCosts(bs.costCenterCtrl, "Entity Costs");
var qAllEntitiesCostsAll = srvEntitiesCosts.queryByType("Q. List All Items?");
var uxAllEntitiesCostsAll = {
	"data": qAllEntitiesCostsAll, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var srvPatron = new Patron(bs.patronCtrl, "Life Cycle Patron Tests");
var qAllPatrons = srvPatron.queryByType("Q. List all?");
var uxAllPatrons = {
	"data": qAllPatrons,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "patronIds",
	"provider": "semantic"
};

var srvPosReciept = new PosReciept(bs.posRecieptCtrl, "INIT: Pos Receipt");
var srvPosRefund = new Refund(bs.posRefundCtrl, "INIT: Pos Refund");


$(document).ready(function () {
// Read Only
	modelContext = modelEntityReceipt;
	srvContext = srvPosReciept;


	url = location.origin + contextPath + "/services/modules/refunds/ux/newRefundCard.html";
	$.get(url, function (response) {
		$("#targetCard").html(response);

		var intervalId = setTimeout(function () {
			clearTimeout(intervalId);
			$(".listPatrons").html(dropDownUpBuilder(uxAllPatrons));
			$('.ui.dropdown').dropdown();
		}, 1000);
	});

});

$(document).on("click", ".tablink", function () {

	opt = $(this).text()
	switch (opt) {
		// Read Only Service
		case "E-Payments":
			modelContext = modelEntityReceipt;
			srvContext = srvPosReciept;

			url = location.origin + contextPath + "/services/modules/refunds/ux/newRefundCard.html";
			$.get(url, function (response) {
				$("#targetCard").html(response);

				var intervalId = setTimeout(function () {
					clearTimeout(intervalId);
					$(".listPatrons").html(dropDownUpBuilder(uxAllPatrons));
					$('.ui.dropdown').dropdown();
				}, 1000);
			});
			break;

		case "Cash":
			modelContext = modelEntityReceipt;
			srvContext = srvPosReciept;

			url = location.origin + contextPath + "/services/modules/refunds/ux/newRefundCash.html";
			$.get(url, function (response) {
				$("#targetCash").html(response);

				var intervalId = setTimeout(function () {
					clearTimeout(intervalId);
					$(".listPatrons").html(dropDownUpBuilder(uxAllPatrons));
					$('.ui.dropdown').dropdown();
				}, 1000);
			});
			break;

		case "Online Browser":
			break;


	}

});


$(document).on("click", ".mgtBrowser", function () {
	opt = $(this).val()

	switch (opt) {
		case "cards":
			srvPosRefund.queryByType("Q. List All By(card)?");
			$("#targetBrowser").html(srvPosRefund.display("Card Refund Listing"));
			break;

		case "cash":
			srvPosRefund.queryByType("Q. List All By(cash)?");
			$("#targetBrowser").html(srvPosRefund.display("Cash Refund Listing"));
			break;
	}
});


//# sourceURL=module_refunds.js