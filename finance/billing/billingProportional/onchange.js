/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("change", "#psName", function () {
	modelContext.split.name = $(this).val();
});

$(document).on("change", "#client", function () {
	modelContext.split.client = parseInt($(this).val());
});
$(document).on("change", "#patron", function () {
	modelContext.split.patron = parseInt($(this).val());
});
$(document).on("change", "#type", function () {
	modelContext.pk.type = $(this).val();
});

//# sourceURL=finance_billing_propBilling_onchange.js