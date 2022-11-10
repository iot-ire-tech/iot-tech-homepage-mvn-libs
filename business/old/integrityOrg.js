/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Used By Asset, Event, Activities for modification
$(document).on("change", ".entityId_Pk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
// Existing IDs

	modelEntity.pk.id = id;
	modelEntity.pk.dbId = dbId;
// Update Form
	modelEntityRsp = srvEntity.setPayload(modelEntity).queryByType("Q. By DbId?")[0];
	if (srvEntity.answer()) {
		srvEntity.uxFormUpdate(modelEntityRsp)
	} else
		alert("ERR: Couldnt retrieve seleted, dbID (" + dbId + ") contact support ASAP")
});

$(document).on("change", ".entityId_PkGeo", function () {

	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
// Existing IDs

	modelEntityGeo.pk.id = id;
	modelEntityGeo.pk.dbId = dbId;
// Update Form
	modelEntityGeoRsp = srvEntityGeo.setPayload(modelEntityGeo).queryByType("Q. By DbId?")[0];
	if (srvEntityGeo.answer()) {
		srvEntityGeo.uxFormUpdate(modelEntityGeoRsp)
	} else
		alert("ERR: Couldnt retrieve seleted, dbID (" + dbId + ") contact support ASAP")
});
// Used By Event, Activities, Geo for FK link
$(document).on("change", ".entityId_Fk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
	modelEntity.fk.id = id;
	modelEntity.fk.dbId = dbId;
});
$(document).on("change", ".entityId_FkGeo", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);
	modelEntityGeo.fk.id = id;
	modelEntityGeo.fk.dbId = dbId;
});







