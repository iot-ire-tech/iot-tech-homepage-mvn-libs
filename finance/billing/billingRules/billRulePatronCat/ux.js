/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("change", "input[name='groupDiscountCat']", function () {

	switch ($(this).val()) {
		case "fixed":
			$("#discountContainerPercentageCat").hide();
			$("#discountContainerFixedCat").show(1000);
			break;

		case "precentage":
			$("#discountContainerFixedCat").hide();
			$("#discountContainerPercentageCat").show(1000);
			break;

		default:

			break;
	}
	;
});

$(document).on("change", "input[name='groupPenalityCat']", function () {

	switch ($(this).val()) {
		case "fixed":
			$("#penalityContainerPercentageCat").hide();
			$("#penalityContainerFixedCat").show(1000);
			break;

		case "precentage":
			$("#penalityContainerFixedCat").hide();
			$("#penalityContainerPercentageCat").show(1000);
			break;

		default:

			break;
	}
	;
});