/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// capacityAlertPlanning_mon  01:00_60__13:00_780__(sfsdf)
//




// Create / Update Service
//function isAvailable(accountId, productId, reservationDateraw) {
function capacityAlertPlanningService(productId) {
	// Data Validte?

	// Decidoe on action....
	var rsp = capacityAlertPlanningServiceGet(accountId, productId)

	if (rsp.length === 0) {
		rsp = capacityAlertPlanningServiceCreate(accountId, productId, modelCapacityPlanningAlertMgt)
	} else {
		rsp = capacityAlertPlanningServiceUpdate(rsp[0])
	}
	return rsp;
}
function capacityAlertPlanningServiceCreate(accountId, productId, payload) {
	payload.accountId = accountId
	payload.productId = productId

	// ASYNC Send
	rsp = postDbRequest("capacityalertmgt", payload)

	return rsp;
}
function capacityAlertPlanningServiceGet(accountId, productId) {

	var query = {
		"accountId": accountId,
		"productId": productId
	}
	var rsp = getDbRequestQuery("capacityalertmgt", query)
	return rsp;
}


function capacityAlertPlanningServiceList(accountId, productId) {

	var query = {
		"accountId": accountId
	}
	var rsp = getDbRequestQuery("capacityalertmgt", query)
	return rsp;
}

function capacityAlertPlanningServiceUpdate(rsp) {
// DB ID !!!!
	return
	rsp[0].item.runningTotal += 1
	rsp = postDbRequest("capacityalertmgt", rsp, rsp._id)

	return rsp;
}

function capacityAlertPlanningServiceDelete() {

}

//# sourceURL=api_capacity_alerting_service.js