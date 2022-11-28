/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function getVolumebasedRevenueList(accountId, productId) {
	var productsGetTimebasedRevenueObj = {
		"mins": "",
		"cost": "",
		"currency": ""
	}

	payload = {
		"accountId": accountId,
		"productId": productId
	}
	productsGetTimebasedRevenueObj = postRequest("productsGetVolumebasedRevenueList", payload);
	return productsGetTimebasedRevenueObj;
}





//# sourceURL=stripe_business_billingNrating.js