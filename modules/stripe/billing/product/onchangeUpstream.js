/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//style="overflow: auto; max-height: 200px;height: 200px"


upstreamness:{

	$(document).on("dblclick ", ".selectProductIdAsset", function () {
		var that = $("option:selected");
		alert("accountId: " + that.attr("accountid") + ",productId: " + that.attr("productid"))
	});


	$(document).on("click", ".selectProductIdAsset", function () {
// reset possibley already selected post/package
		modelContext.pnpVendorSelection = []
		pnpSelectionMap.clear()
		nsEntitiesService.modelCreate.productId = $('option:selected', this).attr("productId");
	});

	var addProductIdStore = false;
	$(document).on("click", ".selectProductIdStore", function () {

		addProductIdStore = true;
		addProductIdActivity = false;
		addProductIdEvent = false;
		var that = $("option:selected", this);
		nsEntitiesService.modelCreate.links.assetId = $('option:selected', this).attr("productId");

		var rsp = getCapacityLevels($('option:selected', this).attr("accountId"), $('option:selected', this).attr("productId"))[0]
		// 1. List Them
		$(".uxAssetCapacityWidget").html(uxAssetCapacityWidget.init(rsp))
		// 2. Update max capacity widget
		uxCapacityWidget.units_total_max = rsp.levels.units_total
	});
	var addProductIdActivity = false;
	$(document).on("click", ".selectProductIdActivities", function () {
		addProductIdStore = false;
		addProductIdActivity = true;
		addProductIdEvent = false;

		nsEntitiesService.modelCreate.links.assetId = $('option:selected', this).attr("productId");
	});
	var addProductIdEvent = false;
	$(document).on("click", ".selectProductIdEvents", function () {
		addProductIdStore = false;
		addProductIdActivity = false;
		addProductIdEvent = true;
		nsEntitiesService.modelCreate.links.assetId = $('option:selected', this).attr("productId");
	});
	$(document).on("click", ".selectProductIdVideoHub", function () {
		addProductIdStore = false;
		addProductIdActivity = false;
		addProductIdEvent = true;
		nsEntitiesService.modelCreate.links.assetId = $('option:selected', this).attr("productId");
	});

	$(document).on("click", ".selectProductIdWebinar", function () {
		addProductIdStore = false;
		addProductIdActivity = false;
		addProductIdEvent = true;
		var that = $("option:selected", this);
		nsEntitiesService.modelCreate.links.assetId = $('option:selected', this).attr("productId");
	});

	$(document).on("click", ".selectProductIdSubscriptions", function () {
		addProductIdStore = false;
		addProductIdActivity = false;
		addProductIdEvent = true;
		var that = $("option:selected", this);
		nsEntitiesService.modelCreate.links.assetId = $('option:selected', this).attr("productId");
	});

}




//# sourceURL=stripe_product_change_upstream.js