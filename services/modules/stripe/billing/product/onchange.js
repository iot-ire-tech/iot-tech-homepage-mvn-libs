/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//style="overflow: auto; max-height: 200px;height: 200px"




// provisioningCustomerList
$(document).on("click ", "#btnPurchaseBranding", purchaseRoutineBranding);
//function initTabEventHandler() {




$(document).on("click dblclick ", "#refreshAssetlist", function () {
	//refreshAssetList(accountId);
});
$(document).on("click ", "#buttonUxAssetSummaryWidget", function () {

	$(".uxAssetSummaryWidget").html(uxAssetSummaryWidget.init(uxAssetSummaryWidgetObj))
	$("#dialogUsageSummary").dialog(dialogueProps);
});


var addPurchase = false;
$(document).on("click ", "#btnPurchase", purchaseRoutine);
// Events and Activities do this...





//# sourceURL=stripe_product_change.js