/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//const decPlaces2 = parseFloat($(this).val()).toFixed(2) * 1

$(document).on("change", "#name", function () {
	modelContext.name = $(this).val()
});
$(document).on("change", "#socialName", function () {
	modelContext.socialize.name = $(this).val()
});
$(document).on("click change", "#upperEntity", function () {
	modelContext.rule.high = parseFloat($(this).val()).toFixed(2) * 1
});
$(document).on("click change", "#lowerEntity", function () {
	modelContext.rule.low = parseFloat($(this).val()).toFixed(2) * 1
});
$(document).on("click change", "#upperExpiry", function () {
	modelContext.rule.expiry = parseFloat($(this).val()).toFixed(2) * 1
});

$(document).on("change click", "#activate", function () {
	if (this.checked) {
		modelContext.rule.ac = true;
	} else {
		modelContext.action.sms = false;
	}
});

$(document).on("change", "#quantity", function () {
	modelContext.socialize.quanity.max = $(this).val() * 1
});

$(document).on("change click", "#sms", function () {
	if (this.checked) {
		modelContext.action.sms = true;
	} else {
		modelContext.action.sms = false;
	}
});
$(document).on("change click", "#email", function () {
	if (this.checked) {
		modelContext.action.sms = true;
	} else {
		modelContext.action.sms = false;
	}
});
$(document).on("change", "#notes", function () {
	modelContext.action.notes = $(this).val()
});
//# sourceURL=module_monitoring_onchange.js