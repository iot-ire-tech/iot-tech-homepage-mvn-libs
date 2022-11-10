/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

widgets:{

	var vbbFeeRt = 0.0
	var vbbQuanity = 0
	$(document).on("click ", ".vbb", function () {
		offeringCost = parseFloat(parseFloat($(this).val()).toFixed(2));
		vbbQuanity = parseInt($(this).attr("quanity"))

// Update cap..
		$("#units_total").val(vbbQuanity).trigger('change')
		$("#units_total").val(vbbQuanity).change()
		$("#units_total").trigger("change")
		$("#units_total").change()

		$("#units_total").val(vbbQuanity).trigger('blur')
		$("#units_total").val(vbbQuanity).blur()
		$("#units_total").trigger("blur")
		$("#units_total").blur()

		$("#units_total").attr("disabled", true)
		unitsTotal = true;
		modelContext.unitsTotal = vbbQuanity;
		modelContext.units = vbbQuanity;
	});
	var addPurchase = false;
	$(document).on("click ", "#btnPurchase", purchaseRoutine);
// Events and Activities do this...



	var dialogueProps = {
		modal: true,
		autoOpen: true,
		draggable: true,
		resizable: false,
		width: "auto",
//	height: "200px",
		position: {my: "top", at: "top", of: window},
		closeOnEscape: true
	}




/////////////////////////////
// Revenue Management : Volume
/////////////////////////////
	$(document).on("click ", '#mgtVbb', function () {
		$("#volumebasedManagementHook").html(uxRevenueVolumeBaseOfferingDialog.init(0))
		$("#dialogVbb").dialog(dialogueProps);
	});
	$(document).on("click ", '.addVolumeBasedBilling', function () {
		$("#volumebasedManagementHook").after(uxRevenueVolumeBaseOfferingDialog.add(this));
	});
	$(document).on("click ", '.delVolumeBasedBilling', function () {
		$("#volumebasedManagementHook").after(uxRevenueVolumeBaseOfferingDialog.del(this));
	});







}
//# sourceURL=stripe_product_change.js