/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//# sourceURL=stripe_person_controller.js

$(document).on('click', '#save', function () {

	url = location.origin + contextPath + "/" + "AddCardToken";
	modelCardRsp = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
		.setPayload(modelContext).post().getResponse();

	if (modelCardRsp.id.toString().length > 0) {
		console.log("INF: Token Created (" + modelCardRsp.id + ")")
		console.table("INF: Token Created (" + modelCardRsp + ")")
	} else
		console.log("ERR: No Card Token Created ")

});
//# sourceURL=stripe_card_ctrl.js