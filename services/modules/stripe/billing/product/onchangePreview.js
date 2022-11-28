/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//style="overflow: auto; max-height: 200px;height: 200px"


preview : {
	$(document).on("click ", '#continueEditing', function () {
		if (dialogAsset)
			$("#dialogPreviewAsset").dialog("close");
		if (dialogStore)
			$("#dialogPreviewStore").dialog("close");
		if (dialogActivity)
			$("#dialogPreviewActivities").dialog("close");
		if (dialogEvent)
			$("#dialogPreviewEvents").dialog("close");
	});

	var dialogAsset = false
	$(document).on("click ", '#previewAsset', function () {
		uxPreviewWidget.model = {
			...modelContext
		}
		uxPreviewWidget.model.entityType = "asset";
		$("#dialogPreviewAssetHook").html(uxPreviewWidget.init(0))
		$("#dialogPreviewAsset").dialog(dialogueProps);
		dialogAsset = true
	});
	var dialogStore = false
	$(document).on("click ", '#previewStore', function () {
		uxPreviewWidget.model = {
			...modelContext
		}
		uxPreviewWidget.model.entityType = "store";
		$("#dialogPreviewStoreHook").html(uxPreviewWidget.init(0))
		$("#dialogPreviewStore").dialog(dialogueProps);
		dialogStore = true
	});
	var dialogActivity = false
	$(document).on("click ", '#previewActivity', function () {
		uxPreviewWidget.model = {
			...modelContext
		}
		uxPreviewWidget.model.entityType = "activity";
		$("#dialogPreviewActivityHook").html(uxPreviewWidget.init(0))
		$("#dialogPreviewActivity").dialog(dialogueProps);
		dialogActivity = true
	});
	var dialogEvent = false
	$(document).on("click ", '#previewEvents', function () {
		uxPreviewWidget.model = {
			...modelContext
		}
		uxPreviewWidget.model.entityType = "event";
		$("#dialogPreviewEventsHook").html(uxPreviewWidget.init(0))
		$("#dialogPreviewEvents").dialog(dialogueProps);
		dialogEvent = true
	});

}




//# sourceURL=stripe_product_change_preview.js