/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on('click', '#save', function () {

	url = location.origin + contextPath + "/" + "AddBankToken";
	response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
		.setPayload(modelContext).post().getResponse();

});
//# sourceURL=stripe_bank_ctrl.js