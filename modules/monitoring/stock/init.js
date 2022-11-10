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


// Associate Services
//const decPlaces2 = parseFloat($(this).val()).toFixed(2) * 1
var srvStockRule = new StockRule(bs.stockControlRuleCtrl, "INIT: Stock Control Rule Detail");
var qAllRules = srvStockRule.queryByType("Q. List All?");
var uxAllRules = {
	"data": qAllRules, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "rule", "provider": "semantic"
};
var srvStockMonitorItem = new StockMonitorItem(bs.stockControlCtrl, "INIT: Stock Monitor Item Detail");





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
	srvContext = srvStockRule;

});

$(document).on("click", ".tablink", function () {

	$("#targetStockRules").empty()

	opt = $(this).text()
	switch (opt) {
		case "Stock Policies":
			modelContext = modelStockRule;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "ruleStockAsset";
			srvContext = srvStockRule;
			break;

		case "Assets":
			modelContext = modelStockItem;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "asset";
			srvContext = srvStockMonitorItem;
			break;

		case "Quick Entry":
			modelContext = modelEntity;
			modelContext.pk.id = getRand();
			modelContext.pk.type = "asset";
			srvContext = srvEntity;

			url = location.origin + contextPath + "/services/modules/monitoring/stock/ux/quickEntry.html";
			$.get(url, function (response) {
				$("#targetQuickEntry").html(response);
			});

			var intervalId = setTimeout(function () {
				loadCamera()
				clearTimeout(intervalId);
			}, 1000);


			break;
		case "Online Browser":
//  We ws to show the asset, and its associated rule!!
			srvStockRule.queryByType("Q. List All?");
			$("#targetBrowser").html(srvStockRule.display("Asset Rules"));
			srvStockMonitorItem.queryByType("Q. List All?");
//			$("#targetBrowser").html(srvStockMonitorItem.display("Asset Rules"));
			break;


	}

});

$(document).on("click", ".entityMonitoringMgt", function () {

	opt = $(this).val()
	switch (opt) {
		case "newStockRule":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/modules/monitoring/stock/ux/stockrulesNew.html";
			$.get(url, function (response) {
				$("#targetStockRules").html(response);
			});


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

		case "newAssetMonitor":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/modules/monitoring/stock/ux/entityNew.html";
			$.get(url, function (response) {
				$("#targetAssets").html(response);
			});
			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssets));
				$(".existingRulesList").html(dropDownUpBuilder(uxAllRules));
				$('.ui.dropdown').dropdown();
				clearTimeout(intervalId);
			}, 1000);
			break;

		case "modAssetMonitor":
//			srvContext.uxFormClear();
			url = location.origin + contextPath + "/services/modules/monitoring/stock/ux/entityMod.html";
			$.get(url, function (response) {
				$("#targetAssets").html(response);
			});
			var intervalId = setTimeout(function () {
				$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssets));
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


//# sourceURL=module_monitoring_stock_init.js