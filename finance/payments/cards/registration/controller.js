/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("click", ".registerCardWithVender", function () {
	srvContext.setPayload(modelContext)
	srvContext.register();

	if (srvContext.customerId.length > 1) {
		alert("INF: New Card Registered: (" + srvContext.customerId + ")")
		// Modify Record!! - Update with Customer ID
		modelContext.customerId = srvContext.customerId

	} else {
		alert("ERR: Couldnt Register Card Details : " + srvContext.customerId + "), check card details again.")
	}

});

//# sourceURL=card_reg_ctrl.js