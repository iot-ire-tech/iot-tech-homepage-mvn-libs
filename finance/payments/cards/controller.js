/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).on("click", "#save", function () {
	// Fk.id, fk.dbId, and fk.type already set
	modelContext.fk = fk;
	modelContext.pk.id = getRand();
	srvContext.setPayload(modelContext)
	srvContext.uxUpdateNameTag()

	if (srvContext.isValid("props")) {
		modelContextRsp = srvContext.create();
		srvContext.modPkDbId();
		updateHdr()
		alert("INF: New Record Created")
	} else
		alert("ERR: Props are not good");

	location.reload()
});

$(document).on("click", "#update", function () {

	srvContext.setPayload(modelContext)
	srvContext.uxUpdateNameTag()

	if (srvContext.isValid("props")) {
		updateHdr()
		alert("INF: Existing Record Updated")
		srvContext.mod(modelContext.pk.dbId);
	} else
		alert("ERR: Props are not good")


});



$(document).on("click", "#delete", function () {
	try {
		if (modelContext.pk.dbId.length <= 0)
			throw "DbId Error"
		srvContext.delByOId(modelContext.pk.dbId);

		updateHdr()
		alert("INF: Record Deleted")
		document.location.reload();

	} catch (e) {
		switch (e) {
			case "DbId Error":
				alert("INF: Did you select a record to modify, if so, and error persists, contact support asap")
				break;
			case "xxx":
				alert("INF: Record not deleted, contact support asap")
				break;

			default:

				break;
		}
	}

});



//# sourceURL=finance_cards_controller.js





