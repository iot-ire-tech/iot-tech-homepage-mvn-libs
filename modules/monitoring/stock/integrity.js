/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Used By Asset, Event, Activities for modification

$(document).on("change", ".entity", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	fk.id = id;
	fk.dbId = dbId;
	fkEntity = new Array({"id": id, "dbId": dbId, "type": "entity"})
});


$(document).on("change", ".rule", function () {
	val = $(this).dropdown("get value");
	dbId = val.split("_")[0];
	id = parseInt(val.split("_")[1]);

	fk.id = id;
	fk.dbId = dbId;
	fkRule = new Array({"id": id, "dbId": dbId, "type": "rule"})
});


//# sourceURL=module_stockcontrol_integrity.js




