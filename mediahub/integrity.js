/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//
//
//
// entityId_Fk :  Link to Entites, an PAtrons...
//
//
//
$(document).on("change", ".entityId_Fk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

// fk type is applied at TAB Context Level
	fk.id = id;
	fk.dbId = dbId;
	triageId = id;


	workFlowMonitor(workflowProgression.wfChkFk = true);
});


/*
 *
 * Modification Relationships
 *
 */
// entityId_Pk
// Link to self(type=visual), for modification purposes.
$(document).on("change", ".entityId_Pk", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

// We have the following
// 1. FK Reference - lets update it
// 2. Form Data
	modelContent.pk.dbId = dbId;
	modelContent.pk.id = id;


// "Q. By DbId?
	modelContentRsp = srvContext.setPayload(modelContent).queryByType("Q. By DbId?")[0];
	modelContent = modelContentRsp;
	if (srvContext.answer()) {
		workFlowMonitor(workflowProgression.wfChkPk = true);
		srvContext.uxFormUpdate(modelContentRsp)
	} else
		alert("ERR: Couldnt retrieve seleted, contact support ASAP")
});

//# sourceURL=mediahub_integ.js