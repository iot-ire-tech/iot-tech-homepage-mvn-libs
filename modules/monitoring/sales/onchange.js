/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Trigger photo take
$(document).on("change", "#name", function () {
	modelContext.name = $(this).val()
});
$(document).on("click", "#upperEntity", function () {
	modelContext.rule.high = new Number(($(this).val())).toFixed(2)
});
$(document).on("click", "#lowerEntity", function () {
	modelContext.rule.low = $(this).val()
});
$(document).on("click", "#upperExpiry", function () {
	modelContext.rule.expiry = $(this).val()
});

$(document).on("change", "#sms", function () {
	if (this.checked) {
		modelContext.action.sms = true;
	} else {
		modelContext.action.sms = false;
	}
});
$(document).on("change", "#email", function () {
	if (this.checked) {
		modelContext.action.sms = true;
	} else {
		modelContext.action.sms = false;
	}
});

$(document).on("click", "#notes", function () {
	modelContext.notes = $(this).val()
});

//# sourceURL=module_monitoring_onchange.js