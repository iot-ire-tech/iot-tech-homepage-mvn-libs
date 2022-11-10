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
var srvPatron = new Patron(bs.patronCtrl, "Life Cycle Patron Tests");
var qAllPatrons = srvPatron.queryByType("Q. List all?");
var uxAllPatrons = {
	"data": qAllPatrons,
	"title": "Please Select",
	"id": getRand(),
	"class": "ui fluid search dropdown " + "patronIds",
	"provider": "semantic"
};

var srvPosTopUp = new TopUp(bs.posTopUpCtrl, "INIT: Pos TopUps");


$(document).ready(function () {
// Read Only
	modelContext = modelEntityReceipt;
//	srvContext = srvPosReciept;


	url = location.origin + contextPath + "/services/modules/topups/ux/newTopUpCard.html";
	$.get(url, function (response) {
		$("#targetTopups").html(response);

		var intervalId = setTimeout(function () {
			clearTimeout(intervalId);
			$("#listPatrons").html(dropDownUpBuilder(uxAllPatrons));
			$('.ui.dropdown').dropdown();
		}, 1000);
	});

});

$(document).on("click", ".tablink", function () {

	opt = $(this).text()
	switch (opt) {
		case "Top-Ups":

			url = location.origin + contextPath + "/services/modules/topups/ux/newTopUpCard.html";
			$.get(url, function (response) {
				$("#targetTopups").html(response);

				var intervalId = setTimeout(function () {
					clearTimeout(intervalId);
					$("#listPatrons").html(dropDownUpBuilder(uxAllPatrons));
					$('.ui.dropdown').dropdown();
				}, 1000);
			});
			break;

		case "Online Browser":
			break;


	}

});

$(document).on("click", ".mgtRefunds", function () {

	opt = $(this).val()
	switch (opt) {
		case "Top-Ups":
			url = location.origin + contextPath + "/services/modules/refunds/ux/newTopUpCard.html";
			$.get(url, function (response) {
				$("#targetRefunds").html(response);

				var intervalId = setTimeout(function () {
					clearTimeout(intervalId);
					$("#listPatrons").html(dropDownUpBuilder(uxAllPatrons));
					$('.ui.dropdown').dropdown();
				}, 1000);
			});
			break;
		default:

			break;
	}
});

$(document).on("click", ".mgtBrowser", function () {
	opt = $(this).val()

	switch (opt) {
		case "cards":
			srvEntityBarCode.queryByType("Q. List All?");
			$("#targetBrowser").html(srvEntityBarCode.display("Asset Bar Code Listing"));
			break;

	}
});


//# sourceURL=module_topups.js