/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function defaultTabLoad() {


	url = location.origin + contextPath + "/services/modules/digi/ux/newDigiEntity.html";
	$.get(url, function (response) {
		$("#targetQuickEntry").html(response);
	});



	url = location.origin + contextPath + "/services/modules/digi/ux/scanner.html";
	$.get(url, function (response) {
//				$("#scanner").html(response);
	});

	var intervalId = setTimeout(function () {
		clearTimeout(intervalId);
		$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssets));
		$('.ui.dropdown').dropdown();
		scanner()
	}, 1000);

}

//# sourceURL=module_scanner_methods.js