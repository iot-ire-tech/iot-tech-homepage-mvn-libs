/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function getCapacityAlerting(accountId, productId) {

	var payload = {"accountId": accountId, "productId": productId}
	var rsp = getDbRequestQuery("capacityalertmgt", payload);

	return rps;
}

//# sourceURL=api_capacity_alerting_utils.js