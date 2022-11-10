/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function isCapacityAvailable(accountId, productId) {

	capacityPlanningServiceGet(accountId, productId)

}
function purchaseRoutineInventory() {
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

function analysisCapacityLevels(capacityRsp, msg = "") {
	var stockLevelsRsp = {
		"msg": "",
		"available": true
	}
	var units = capacityRsp.levels.units;
	var units_total = capacityRsp.levels.units_total;

	var units_lower = capacityRsp.levels.units_lower;
	var units_upper = capacityRsp.levels.units_upper;
	var bufferoverflow = capacityRsp.levels.bufferoverflow;
	var unitRatio = parseFloat(units / units_total).toFixed(2) * 1;

	try {
		if (unitRatio > units_upper) {
			stockLevelsRsp.msg = "High " + msg + "<div style=\"color: ransparent; text-shadow: 0 0 0 #21BA45;\">&#9989;</div>"

//			return "<span style=\"background-color: green;\">High ticket availability &#9989;<br><br>Starting price <br></span>"
		} else if (unitRatio >= units_lower && unitRatio <= units_upper) {
			stockLevelsRsp.msg = "Moderate " + msg + "<div style=\"color: ransparent; text-shadow: 0 0 0 #21BA45;\">&#10071;</div>"

		} else if (unitRatio > 0 && unitRatio < units_lower) {
			stockLevelsRsp.msg = "Limited " + msg + "<div style=\"color: ransparent; text-shadow: 0 0 0 #21BA45;\">&#10060;</div>"

		} else if (unitRatio >= (-1 * bufferoverflow) && unitRatio <= 0) {
			stockLevelsRsp.msg = "Very Limited " + msg + "<div style=\"color: ransparent; text-shadow: 0 0 0 #21BA45;\">&#10060;</div>"

		} else if (unitRatio <= (-1 * bufferoverflow)) {
			stockLevelsRsp.msg = "Sorry, this item is present not available.<br>Contact the owner to request an increase in supply..<div style=\"color: ransparent; text-shadow: 0 0 0 #21BA45;\">&#10062;</div>"
			stockLevelsRsp.available = false;
//			return "<span style=\"background-color: red;\"><b>Sorry all tickets sold out. Contact organiser to increase capacity<b><br></span>"
		}

	} catch (e) {
		alert("ERR: Inventory management, incurred unexpected entry (" + e + ")")
	}

	return stockLevelsRsp;
}

function getCapacityLevels(accountId, productId) {

	var payload = {"accountId": accountId, "productId": productId}
	var rsp = getDbRequestQuery("capacitymgt", payload);


	return rsp;
}


//# sourceURL=api_capacity_utils.js