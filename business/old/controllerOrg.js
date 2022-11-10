/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).on("click", "#save", function () {

	modelEntity.pk.id = getRand();
	srvEntity.setPayload(modelEntity);
	srvEntity.uxUpdateNameTag();

	if (srvEntity.isValid("props")) {
		modelEntityRsp = srvEntity.create();
		srvEntity.modPkDbId();
	} else
		alert("ERR: Props are not good");
});


$(document).on("click", "#saveGeo", function () {
	modelEntityGeo.pk.id = getRand();
	srvEntityGeo.setPayload(modelEntityGeo);
	srvEntityGeo.uxUpdateNameTag();


	if (srvEntityGeo.isValid("props")) {
		modelEntityGeoRsp = srvEntityGeo.create();
		srvEntityGeo.modPkDbId();
	} else
		alert("ERR: Props are not good");
});

$(document).on("click", "#update", function () {

	srvEntity.setPayload(modelEntity)
	srvEntity.uxUpdateNameTag()

	if (srvEntity.isValid("props"))
		srvEntity.mod(modelEntity.pk.dbId);
	else
		alert("ERR: Props are not good")

});
$(document).on("click", "#updateGeo", function () {
	srvEntityGeo.setPayload(modelEntityGeo)
	srvEntityGeo.uxUpdateNameTag()

	if (srvEntityGeo.isValid("props"))
		srvEntityGeo.mod(modelEntityGeo.pk.dbId);
	else
		alert("ERR: Props are not good")

});



$(document).on("click", "#delete", function () {
	srvEntity.delByOId(modelEntity.pk.dbId);
});
$(document).on("click", "#deleteGeo", function () {
	srvEntityGeo.delByOId(modelEntityGeo.pk.dbId);
});




$(document).on("click", "#list", function () {
	srvEntity.setPayload({});
	$("#lists").html(srvEntity.uxBuildList()).fadeOut(30000, function () {
		alert("INF: Request hard copy from support time.")
	});
});
$(document).on("click", "#listGeo", function () {
	srvEntityGeo.setPayload({});
	$("#listGeos").html(srvEntityGeo.uxBuildList()).fadeOut(30000, function () {
		alert("INF: Request hard copy from support time.")
	});
});





