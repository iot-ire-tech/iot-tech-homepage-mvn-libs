/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Used By Asset, Event, Activities for modification

$(document).on("change", ".patronIds", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	fk.id = id;
	fk.dbId = dbId;

// Get Reciepts
	modelPoSRsp = srvPosReciept.setPayload({"id": id}).queryByType("Q. By Patron Id (refund=false)?");

	$(".refundCandidates").html(srvPosReciept.display("Possible Refund Candidates"));
});



//# sourceURL=module_refunds_integrity.js




