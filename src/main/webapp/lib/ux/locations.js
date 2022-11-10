/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var counterLocation = 0;
$(document).on("click", '#btnAddLocation', function () {

	html = "<div id=containerLocation_" + counterLocation + ">";
	html += "<br>";
	html += "<label>Name</label><input id=nameLocation_" + counterLocation + " class=\"w3-input w3-hover-grey\" value=\"\">";
	html += "<br>";
	html += "<button id=btnDelLocation_" + counterLocation + " class=\"deleteLocation w3-btn w3-round-xxlarge w3-padding-large w3-teal w3-right\"  >-</button>";
	html += "<br>";
	html += "<div>";
	$("#locationsContainer").after(html);

	inputIdsLocationArr.push({"nameLocationId": "nameLocation_" + counterLocation});
	counterLocation++;

});
$(document).on("click", '.deleteLocation', function () {
	var thisId = $(this).attr("id");

	thisId = thisId.split("_")[1];
	inputIdsLocationArr.splice(thisId, 1);
	$("#containerLocation_" + thisId).empty();

});
var isExistingLocation = false;
$(document).on("change", '#locationList', function () {
	id = 0;
	id = parseInt($(this).val());
	if (id > 0) {
		isExistingLocation = true;
		$("#btnAddLocation").attr("disabled", "true");
	}

});

