/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("click", "#save", function () {
	modelContext.fk = fk;

	modelContext.pk.id = getRand();
	srvContext.setPayload(modelContext)
	srvContext.uxUpdateNameTag()

	if (srvContext.isValid("props")) {
		modelContextRsp = srvContext.create();
		srvContext.modPkDbId();
		alert("INF: New Record Created")
		document.location.reload();
	} else
		alert("ERR: Props are not good");

});

$(document).on("click", "#update", function () {

	srvContext.setPayload(modelContext)
	srvContext.uxUpdateNameTag()

	if (srvContext.isValid("props")) {
		alert("INF: Existing Record Updated")
		srvContext.mod(modelContext.pk.dbId);
	} else
		alert("ERR: Props are not good")


});

$(document).on("click", "#delete", function () {

	srvContext.delByOId(modelContext.pk.dbId);
	alert("INF: Record Deleted")
	document.location.reload();

});


//# sourceURL=common_ctrl.js