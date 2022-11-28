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
var uxAllEntitiesAssetsGen = {
	"data": qAllEntitiesAsset, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "entityGen", "provider": "semantic"
};

var srvEntityBarCode = new DigitizerBarCode(bs.entityBarCodeCtrl, "Detail Entity BarCodes");


$(document).ready(function () {
// Load Homepage
	modelContext = modelEntity;
	modelContext.pk.id = getRand();
	modelContext.pk.type = "asset";
	srvContext = srvEntity;

});

$(document).on("click", ".tablink", function () {

	$("#targetQRInt").empty()
	$("#targetBarCodeInt").empty()
	$("#targetBarCodeGen").empty()
	$("#targetQRCodeGen").empty()

	opt = $(this).text()
	switch (opt) {
		case "Bar Code Integration":
//			defaultTabLoad()
			modelContext = modelEntity;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "asset";
			srvContext = srvEntity;
			break;

		case "Bar Code Generator":
			// Service Context
			modelContext = modelDigiBarCode;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "asset";
			srvContext = srvEntityBarCode;
			break;

		case "Online Browser":
			break;


	}

});

$(document).on("click", ".entityMonitoringMgt", function () {

	opt = $(this).val()
	switch (opt) {
		case "newBarCodeInt":
			url = location.origin + contextPath + "/services/modules/digiBarCode/ux/newBarCodeEntityInt.html";
			$.get(url, function (response) {
				$("#targetBarCodeInt").html(response);

				var intervalId = setTimeout(function () {
					clearTimeout(intervalId);
					$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssets));
					$('.ui.dropdown').dropdown();
					scanner()
					$(document).on("change", "#barCodeResults", function () {
						modelContext.digitigal.barCode.code = $("#scanResultCode").text()
					});
					$(document).on("change", "#digiNotesBarCode", function () {
						modelContext.digitigal.barCode.notes = $(this).val()
					});
					$(document).on("change", "#tagNameBarCode", function () {
						modelContext.digitigal.barCode.tag = $(this).val()
					});
				}, 2000);
			});
			break;

		case "newBarCodeGen":
			url = location.origin + contextPath + "/services/modules/digiBarCode/ux/newBarCodeGen.html";
			$.get(url, function (response) {
				$("#targetBarCodeGen").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssetsGen));
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
		case "barCodes":
			srvEntityBarCode.queryByType("Q. List All?");
			$("#targetBrowser").html(srvEntityBarCode.display("Asset Bar Code Listing"));
			break;

		case "barCodesHardCopy":
			// Read Bar Info
			srvEntityBarCode.queryByType("Q. List All?");
			// Read Bar Info, from FK ID, get Entity
			modelEntityRsp = srvEntity.setPayload({"pk": {"id": fk.id}}).queryByType("Q. List By Id?")[0];

// From Quanity Loop around
			modelContext.options.text = "IOT Digitizier: (" + modelEntityRsp.socialize.name + ")"
			var data = "BC-" + getRand() + "-CB";
			$("#targetBrowser").JsBarcode(data, modelContext.options);
			break;
	}
});


//# sourceURL=module_digiBarCode_init.js