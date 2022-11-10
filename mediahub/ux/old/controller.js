/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("click", ".save", function () {

	srvMediaHub.setPayload(modelMediaHub)
	srvMediaHub.uxUpdateNameTag(modelMediaHub)

	if (srvMediaHub.isValid("props")) {
		modelMediaHubRsp = srvMediaHub.create()
		srvMediaHub.modPkDbId()
	} else
		alert("ERR: Props are not good")

});

$(document).on("click", ".mod", function () {

	var dbId = $(".entityId").val().split("_")[0];


	srvMediaHub.uxUpdateNameTag(modelMediaHub)
	srvMediaHub.setPayload(modelMediaHub)

	if (srvMediaHub.isValid("props"))
		srvMediaHub.mod(dbId);
	else
		alert("ERR: Props are not good")



});


$(document).on("click", ".delete", function () {

	var dbId = $(".entityId").val().split("_")[0];
	srvMediaHub.delByOId(dbId);

});


$(document).on("click", ".list", function () {

	$("#list").html(srvMediaHub.uxBuildList()).fadeOut(30000, function () {
		alert("INF: Request hard copy from support time.")
	});

});
