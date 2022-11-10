/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global modelContent */

$(document).on("click", "#save", function () {
	// Fk.id, fk.dbId, and fk.type already set
	modelContent.fk = fk;

	modelContent.pk.id = getRand();
	srvContext.setPayload(modelContent)
	srvContext.uxUpdateNameTag()

	if (srvContext.isValid("props")) {
		modelContentRsp = srvContext.create();
		srvContext.modPkDbId();
		alert("INF: New Record Created");
		location.reload()
	} else
		alert("ERR: Props are not good");

});



$(document).on("click", "#update", function () {

	srvContext.setPayload(modelContent)
	srvContext.uxUpdateNameTag(modelContent)

	if (srvContext.isValid("props")) {
		alert("INF: New Record Created");
		srvContext.mod(modelContent.pk.dbId);
		alert("INF: Existing Record Modified");
		location.reload()
	} else {
		alert("ERR: Props are not good")
	}

});




$(document).on("click", "#delete", function () {


// Delete Server Data
	if (modelContent.visual !== undefined) {
		var dbRecordDelete = false;
		var files = [];
		files.push(modelContent.visual.icon)
		files.push(modelContent.visual.pic)
		files.push(modelContent.visual.vid)
		files.forEach(function (item) {
			//console.log("INF: File to delete (" + item.name + ")")
			//console.log("INF: File to delete (" + item.tag + ")")
			$.ajax({
				// Request method.
				method: 'POST',
				// Request URL.
				url: location.origin + contextPath + "/Files",
				// Request params.
				data: {
					src: item.name,
					id: item.tag
				}
			})
				.done(function (data) {
					//console.log('File was deleted');
					dbRecordDelete = true;
					alert("INF: Existing Record Deleted (" + data.src + ")");
				})
				.fail(function (err) {
					//console.log('File delete problem: ' + JSON.stringify(err));
					dbRecordDelete = false;
				})
		});
		srvContext.delByOId(modelContent.pk.dbId)
//			alert("ERR: Problem deleting files, contact support ASAP");
	} else {
		srvContext.delByOId(modelContent.pk.dbId)
		alert("INF: Existing Record Deleted");
		location.reload()
	}
});

//
//$(document).on("click", "#list", function () {
//
//
//// Could refine this more, by using the FK inside the visual/socail cats.
//	var q;
//	srvContext.setPayload({});
//	if (srvContext.msg.includes("Media Hub Visual"))
//		q = "Q. By PkType (visual)?";
//	else if (srvContext.msg.includes("Media Hub Social"))
//		q = "Q. By PkType (social)?";
//
//	$("#lists").html(srvContext.uxBuildList(q)).fadeOut(30000, function () {
//		alert("INF: Request hard copy from support time.")
////		$("#lists").remove();
//	});
//
////	location.reload()
//
//});

//# sourceURL=mediahub_ctrl.js