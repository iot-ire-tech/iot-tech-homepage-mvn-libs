/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 *
 * UX - Entity Selection
 *
 */

$(document).on("change", "input[name='groupEntities']", function () {

	modelMediaHub.fk.type = $(this).val();

	switch (modelMediaHub.fk.type) {
		case "resource":
			$("#entityList").html(dropDownUpBuilder(uxResourceDropDown));
			break;
		case "event":
			$("#entityList").html(dropDownUpBuilder(uxEventDropDown));
			break;
		case "subEvent":
			$("#entityList").html(dropDownUpBuilder(uxSubEventsDropDown));
			break;
		default:

			break;
	}
});

$(document).on("change", ".entityId", function () {
	modelMediaHub.fk.id = parseInt($(this).val( ).split("_")[1])
});


/*
 *
 * UX - Medial
 *
 */
$(document).on("change", "#tag", function () {
	modelMediaHub.name = $(this).val( )
});


$(document).on("change", "input[name=iconName]", function () {
	modelMediaHub.media.icon.name = uploadUx(
		"frmIcon",
		clientId, patronId,
		modelMediaHub.fk.type,
		"image",
		"#iconImg"
		, bs).filename
	modelMediaHub.media.icon.tag = modelMediaHub.fk.type
});


$(document).on("change", "input[name=picName]", function () {
	modelMediaHub.media.pic.name = uploadUx(
		"frmPic",
		clientId, patronId,
		modelMediaHub.fk.type,
		"image",
		"#picImg"// UX Id to be updated by timer!
		, bs).filename
	modelMediaHub.media.pic.tag = modelMediaHub.fk.type
});

$(document).on("change", "input[name=vidName]", function () {
	modelMediaHub.media.vid.name = uploadUx(
		"frmVid",
		clientId, patronId,
		modelMediaHub.fk.type,
		"video",
		"#vid"// UX Id to be updated by timer!
		, bs).filename
	modelMediaHub.media.vid.tag = modelMediaHub.fk.type
});



$(document).on("change", "#utube", function () {
	if (modelMediaHub.fk.type !== "" && modelMediaHub.fk.id > 0) {
		modelMediaHub.media.youtube.name = $(this).val()
		$("#utubeTarget").attr("src", $(this).val());
	} else
		alert("INF: Must select Business Catagory and 'Line of Business' first.")
});

$(document).on("change", "#facebook", function () {
	if (modelMediaHub.fk.type !== "" && modelMediaHub.fk.id > 0) {
		modelMediaHub.media.facebook.name = $(this).val()
		$("#facebookTarget").attr("src", $(this).val());
	} else
		alert("INF: Must select Business Catagory and 'Line of Business' first.")
});


$(document).on("change", "#tag", function () {
	if (modelMediaHub.fk.type !== "" && modelMediaHub.fk.id > 0) {
		modelMediaHub.ux.tag = $(this).val()
	} else
		alert("INF: Must select Business Catagory and 'Line of Business' first.")
});
