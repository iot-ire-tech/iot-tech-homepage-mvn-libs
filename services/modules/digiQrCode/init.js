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

var srvEntityBarCode = new Digitizer(bs.entityBarCodeCtrl, "Detail Entity BarCodes");
var srvEntityQRCode = new Digitizer(bs.entityQrCodeCtrl, "Detail Entity QRCodes");


$(document).ready(function () {
// Load Homepage

//	defaultTabLoad()

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

		case "QR Code Integration":
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

		case "QR Code Generator":
			// Service Context
			modelContext = modelDigiQRCode;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "asset";
			srvContext = srvEntityQRCode;
			break;

		case "Online Browser":
			break;


	}

});

$(document).on("click", ".entityMonitoringMgt", function () {

	opt = $(this).val()
	switch (opt) {
		case "newBarCodeInt":
			url = location.origin + contextPath + "/services/modules/digi/ux/newBarCodeEntityInt.html";
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
		case "newQRCodeInt":
			url = location.origin + contextPath + "/services/modules/digi/ux/newQRCodeEntityInt.html";
			$.get(url, function (response) {
				$("#targetQRInt").html(response);

				var intervalId = setTimeout(function () {
					clearTimeout(intervalId);
					$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssets));
					$('.ui.dropdown').dropdown();
					scanner()
					$(document).on("change", "#qrCodeResults", function () {
						modelContext.digitigal.qrCode.code = $("#scanResultCode").text()
					});
					$(document).on("change", "#digiNotesQr", function () {
						modelContext.digitigal.qrCode.notes = $(this).val()
					});
					$(document).on("change", "#tagNameQr", function () {
						modelContext.digitigal.qrCode.tag = $(this).val()
					});
				}, 2000);
			});
			break;



		case "newBarCodeGen":
			url = location.origin + contextPath + "/services/modules/digi/ux/newBarCodeGen.html";
			$.get(url, function (response) {
				$("#targetBarCodeGen").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssetsGen));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;

		case "newQRCodeGen":
			url = location.origin + contextPath + "/services/modules/digi/ux/newQRCodeGen.html";
			$.get(url, function (response) {
				$("#targetQRCodeGen").html(response);
			});
			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssetsGen));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;


		case "modStockRule":
			url = location.origin + contextPath + "/services/modules/stockcontrol/stock/ux/stockrulesMod.html";
			$.get(url, function (response) {
				$("#targetAssets").html(response);
			});
			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllWelcomeMedia));
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
		case "qrCodes":
			srvEntityQRCode.queryByType("Q. List All?");
			$("#targetBrowser").html(srvEntityQRCode.display("Asset QR Code Listing"));
			break;
		case "barCodes":
			srvEntityBarCode.queryByType("Q. List All?");
			$("#targetBrowser").html(srvEntityBarCode.display("Asset Bar Code Listing"));
			break;
	}
});


//# sourceURL=module_digi_init.js