/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("change", "input[name='groupDiscountEntity']", function () {

	switch ($(this).val()) {
		case "fixed":
			$("#discountContainerPercentageEntity").hide();
			$("#discountContainerFixedEntity").show(1000);
			break;

		case "precentage":
			$("#discountContainerFixedEntity").hide();
			$("#discountContainerPercentageEntity").show(1000);
			break;

		default:

			break;
	}
	;
});

$(document).on("change", "input[name='groupPenalityEntity']", function () {

	switch ($(this).val()) {
		case "fixed":
			$("#penalityContainerPercentageEntity").hide();
			$("#penalityContainerFixedEntity").show(1000);
			break;

		case "precentage":
			$("#penalityContainerFixedEntity").hide();
			$("#penalityContainerPercentageEntity").show(1000);
			break;

		default:

			break;
	}
	;
});