/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var srvEntity = new EntityX(bs.entityCtrl, "Life Cycle Entity");
var qAllEntitiesAsset = srvEntity.queryByType("Q. List all items type(resource)?");
var uxAllEntitiesAssets = {
	"data": qAllEntitiesAsset, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var qAllEntitiesEvent = srvEntity.queryByType("Q. List all items type(event)?");
var uxAllEntitiesEvents = {
	"data": qAllEntitiesEvent, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};

// Associate Services
var srvStock = new StockRule(bs.stockControlCtrl, "INIT: Stock Control Detail");
var srvSales = new SalesRule(bs.salesControlCtrl, "INIT: Sales Control Detail");

$(document).ready(function () {

// Load Homepage
	$("#todaysDate").html(new Date().toLocaleDateString() + " / " + new Date().toLocaleTimeString());

// Load Registered Users
	var intervalId = setTimeout(function () {
		clearTimeout(intervalId);
	}, 1000);

//	loadCamera()
// Site Settings

	// read runtime config

	modelContext = modelStockRule;
	modelContext.pk.id = getRand();
	modelContext.pk.type = "asset";
	srvContext = srvStock;

});

$(document).on("click", ".tablink", function () {

	$("#targetStockRules").empty()
	$("#targetSalesRules").empty()

	opt = $(this).text()
	switch (opt) {
		case "Stock Policies":
			modelContext = modelStockRule;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "asset";
			srvContext = srvStock;
			break;
		case "Sales Policies":
			modelContext = modelSalesRule;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "asset";
			srvContext = srvSales;
			break;
		case "Assets":
			break;
	}

});

$(document).on("click", ".entityMonitoringMgt", function () {



	opt = $(this).val()
	switch (opt) {
		case "newStockRule":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/modules/monitoring/ux/stockrulesNew.html";
			$.get(url, function (response) {
				$("#targetStockRules").html(response);
			});
			break;
		case "newSalesRule":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/modules/monitoring/ux/salesrulesNew.html";
			$.get(url, function (response) {
				$("#targetSalesRules").html(response);
			});
			break;
		case "newAssetMonitor":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/modules/monitoring/ux/entityMonitoringNew.html";
			$.get(url, function (response) {
				$("#targetAssets").html(response);
			});
			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssets));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;


		case "modRule":
			url = location.origin + contextPath + "/services/modules/stockcontrol/ux/entityMonitoringMod.html";
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



function openCity(evt, cityName) {
	var i, x, tablinks;
	x = document.getElementsByClassName("city");
// Close
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	// Update Tab
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < x.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" w3-gray", "");
	}

	// Open
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " w3-gray";
}


//# sourceURL=module_monitoring_init.js