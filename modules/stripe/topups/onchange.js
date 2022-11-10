/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//const decPlaces2 = parseFloat($(this).val()).toFixed(2) * 1

$(document).on("change", ".returnItem", function () {
	chargeId = $(this).val()
	amount = parseInt($(this).attr("amount")) * 100
	posReceiptDbId = $(this).attr("posReceiptDbId")
});

$(document).on("change", "#notes", function () {
	reason = $(this).val()
	//reason = duplicate, fraudulent, or requested_by_customer
	reason = "requested_by_customer";
});


//# sourceURL=module_topup_onchange.js