/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//# sourceURL=stripe_person_controller.js

$(document).on('click', '#save', function () {

// Crate card token,
	url = location.origin + contextPath + "/" + "AddCardToken";
	response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
		.setPayload(modelContext).post().getResponse();
// Token Id
	//modelContext.source = response.id
	var token_id = response.id
	var customerUpdate = {
		"accountId": accountId,
		"customerId": customerId,
		"sourceId": token_id
	};

// Update Customer with payment method
	url = location.origin + contextPath + "/" + "CustomerUpdate";
	response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
		.setPayload(customerUpdate).post().getResponse();
// Update Customer with payment method



	modelContext.source = token_id


// add to charge source
	url = location.origin + contextPath + "/" + "AddCharge";
	response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
		.setPayload(modelContext).post().getResponse();



});
//# sourceURL=stripe_charge_card_ctrl.js