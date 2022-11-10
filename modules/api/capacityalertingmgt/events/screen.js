/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/////////////////////////////
// Capacity Alerting Planning Management
/////////////////////////////


initUx:{

	var addCapacityPlanningAlerting = false;
	$(document).on("click ", '.mgtCapacityAlertingStore, .mgtCapacityAlertingActivity', function () {
		addCapacityPlanningAlerting = true;

		var html = UxCapacityAlertingWidget.init()
		$("#capacityPlanAlertingHook").html(html)
		$("#dialogCapacityPlanAlerting").dialog(dialogueProps);
	});

}
uxModification: {

	var days = 1
//	$(document).on("click ", '.btnAddWeek', function () {
//
//		$(this).attr("disabled", true)
//		$("#capacityPlanHook").after(UxCapacityAlertingWidget.addWeek(this));
//		days = 8
//	});
//
//	dataImpact: {
//		$(document).on("click ", '.add, .btnAddDay', function () {
//			if (days <= 7) {
//				days++
//				$("#capacityPlanHook").after(UxCapacityAlertingWidget.add(this));
//			} else {
//				$(this).attr("disabled", true)
//			}
//		});
//		$(document).on("click ", '.del', function () {
//			days--
//			$("#capacityPlanHook").after(UxCapacityAlertingWidget.del(this));
//		});
//	}
}

exitUx: {
	$(document).on("click ", '.btnSaveCapacityAlertingPlan', function () {
		$("#dialogCapacityPlanAlerting").dialog("close");
		$('.mgtCapacityAlertingStore, .mgtCapacityAlertingActivity').attr("disabled",true)
	});
	$(document).on("click ", '.btnExitCapacityAlertingPlan', function () {
		$("#dialogCapacityPlanAlerting").dialog("close");
		$('.mgtCapacityAlertingStore, .mgtCapacityAlertingActivity').attr("disabled",true)
	});

}

dataIn:{
	inventoryAlert : {
		var addPurchaseInventory = false;
		$(document).on("click ", ".btnPurchaseInventory", purchaseRoutineInventory);

		$(document).on("change ", ".alert_inventory", function () {
			if (this.checked) {
				modelCapacityPlanningAlertMgt.item.active = true;
			} else {
				modelCapacityPlanningAlertMgt.item.active = false;
			}
		});

		$(document).on("change ", ".email_inventory", function () {
			modelCapacityPlanningAlertMgt.item.email = validateField(this)
		});
		$(document).on("change ", ".sms_inventory", function () {
			modelCapacityPlanningAlertMgt.item.sms = validateField(this)
		});

		$(document).on("change ", ".l1alerting", function () {
			if (this.checked) {
				modelCapacityPlanningAlertMgt.item.level1 = true
			} else {
				modelCapacityPlanningAlertMgt.item.level1 = false
			}
		});

		$(document).on("change ", ".l2alerting", function () {
			if (this.checked) {
				modelCapacityPlanningAlertMgt.item.level2 = true
			} else {
				modelCapacityPlanningAlertMgt.item.level2 = false
			}
		});

		$(document).on("change ", ".l3alerting", function () {
			if (this.checked) {
				modelCapacityPlanningAlertMgt.item.level3 = true
			} else {
				modelCapacityPlanningAlertMgt.item.level3 = false
			}
		});

		$(document).on("change ", ".alertReminderCap", function () {
			modelCapacityPlanningAlertMgt.item.alertReminderCap = parseInt($(this).val())
		});
		$(document).on("change ", ".alertSchedule", function () {
			// Spring Scheduler
			modelCapacityPlanningAlertMgt.alertSchedule = $(this).val()
		});


	}

}

dataSave:{

}

dataDelete:{

}


//# sourceURL=api_capacity_alerting_events.js