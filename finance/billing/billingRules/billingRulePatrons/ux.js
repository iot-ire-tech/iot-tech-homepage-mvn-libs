/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("change", "input[name='groupDiscount']", function () {

	switch ($(this).val()) {
		case "fixed":
			$("#discountContainerPercentage").hide();
			$("#discountContainerFixed").show(1000);
			break;

		case "precentage":
			$("#discountContainerFixed").hide();
			$("#discountContainerPercentage").show(1000);
			break;

		default:

			break;
	}
	;
});

$(document).on("change", "input[name='groupPenality']", function () {

	switch ($(this).val()) {
		case "fixed":
			$("#penalityContainerPercentage").hide();
			$("#penalityContainerFixed").show(1000);
			break;

		case "precentage":
			$("#penalityContainerFixed").hide();
			$("#penalityContainerPercentage").show(1000);
			break;

		default:

			break;
	}
	;
});