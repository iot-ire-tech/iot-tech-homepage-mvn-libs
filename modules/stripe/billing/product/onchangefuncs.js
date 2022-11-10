/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function purchaseRoutine() {

	var that = this;
	$(this).attr("disabled", true)
	purchaseMe()

}



function purchaseRoutineBranding() {
	$(this).attr("disabled", true)

	var costPerUnit = 0.20
	var costPerText = 0.20
	var costPerEmail = 0.10

	modelContext.unitsTotal
	modelContext.emailInventory = $(this).val();
	modelContext.smsInventory = $(this).val();

	offeringCost = 0
	offeringCost = (modelContext.unitsTotal * costPerUnit)
	offeringCost += (costPerText + costPerEmail)
	description = "Inventory Management"
	purchaseMe()
}

function purchaseMe() {
	modelContext.cost = offeringCost;
	offeringCost = 0.0

//	$("#uxAssetTbbWidgetMsg").html("Good choice.....").delay(10000).fadeOut()

// As platform owner I will charge the account, on behalf of primary asset owner....
	chargeCustomer:{
		chargeAccountObj = {
			"name": "Business Asset: (" + modelContext.upstreamProductId + ")",
			"description": description,
			"accountId": accountId,
			"productId": modelContext.upstreamProductId,
			"customerId": customerId,
			"applicationFee": 5,
			"cost": modelContext.cost
		}
		chargeAccountRsp = {
			"chargeId": "",
			"sourceId": ""
		}

		if (chargeAccountObj.cost * 100 <= 50) {
			alert("INF: The charge amount must be greater than 0.50 &euro;")
			return;
		}

		if (chargeAccountObj.cost === 0) {
			$("#uxAssetTbbWidgetMsg , #uxAssetVbbWidgetMsg").html("IMF: This item is deemed free of charge &#9989<br>chargeId: (N/A)")
			$("#save").attr("disabled", false)
			addPurchase = true;
		} else {

			chargeAccountRsp = chargeAccount(chargeAccountObj, chargeAccountRsp)

			if (chargeAccountRsp.chargeId.length > 10) {
				$("#uxAssetTbbWidgetMsg , #uxAssetVbbWidgetMsg").html("<b>INF: Your payment has been accepted &#9989<br>chargeId: (" + chargeAccountRsp.chargeId + ")</b>")
				$("#save").attr("disabled", false)
				addPurchase = true;
				$(this).attr("disabled", true)
			} else {
				$("#uxAssetTbbWidgetMsg , #uxAssetVbbWidgetMsg").html("<b>INF: Your payment has been _not_ been accepted &#10060<br>chargeId: (" + chargeAccountRsp.chargeId + "), contact support asap</b>")
				$("#save").attr("disabled", true)
			}
		}
	}
	chargeAccountObj.addPurchase = addPurchase;
	return chargeAccountObj;
}

// Events and Activities do this...
function selectUpsteam() {
	uxAssetSummaryWidgetObj.businessHours = []
	// #selectProductId
	// Get Advertising......

	// Get Availability..
	var accountId = $('option:selected', this).attr("accountId");
	var productId = $('option:selected', this).attr("productId");

	uxAssetSummaryWidgetObj.businessHours = bizHoursServiceGet(modelContext.upstreamAccountId, modelContext.upstreamProductId)
// Update With Business hours
	$("#uxBusinessHoursListing").html(UxBizHourListing.init(uxAssetSummaryWidgetObj.businessHours))



	try {

// Not applicaable to seller mode

// Money
// 30 [mins] costs 0.6 EUR (good)
		uxAssetSummaryWidgetObj.timebasedUsage = ttbServiceGetList(modelContext.upstreamAccountId, modelContext.upstreamProductId)
		$("#uxAssetTbbWidget").html(uxAssetTbbWidget.init(uxAssetSummaryWidgetObj))
		$("#uxAssetSbbWidget").html(uxAssetSbbWidget.init(uxAssetSummaryWidgetObj))

// Volume Based
// 30 [mins] costs 0.6 EUR (good)
		uxAssetSummaryWidgetObj.timebasedUsage = getVolumebasedRevenueList(modelContext.upstreamAccountId, modelContext.upstreamProductId)
		$("#uxAssetVbbWidget").html(uxAssetVbbWidget.init(uxAssetSummaryWidgetObj.timebasedUsage))

	} catch (e) {

	}
// uxAssetSummaryWidget.tnc

// Post and Package(
	var getAssetPostNPackageCostObj = getAssetPostNPackageCost(modelContext.upstreamAccountId, modelContext.upstreamProductId)
	$("#uxAssetPostNPackageListing").html(uxAssetPostNPackageListing.init(JSON.parse(getAssetPostNPackageCostObj)))


}


//# sourceURL=stripe_product_changefuncs.js