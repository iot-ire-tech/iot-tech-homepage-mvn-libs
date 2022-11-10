/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var q = ""
var responseLoad = [];
// Init Test
// UX - http://localhost:8084/iot-base/services/finance/billing/tests/testBilling.html?clientId=673859
// SRV

/*
 * UX
 */

var srvCostCenter = new CostCenter(bs.costCenterCtrl, "Cost Center Activity");
// Could Use Facker here...

createCosts()
throw new Error("errorMessage");
// Test Case : Update Record with DbId, for UX, info lifecycle manipulation
var rsp = srvCostCenter.setPayload(modelEntityCostTest).create();





// Test Case : Modify PK
srvCostCenter.modPkDbId();


// Test Case : Relationship Management + UX Builder By Mod Op
// Data Model Is now out of sync - Need to Reload
modelEntityCostTest = srvCostCenter.setPayload("{\"pk.dbId\": \"" + rsp._id.$oid + "\"}").query()[0];
// Update model as part of test
modelEntityCostTest.fk.type = "event";
modelEntityCostTest.fk.dbId = "90908098234lkjlkjlkjlkjlk908098098098";
modelEntityCostTest.fk.id = getRand();
modelEntityCostTest.ux.tag = "Test Cost";
srvCostCenter.setPayload(modelEntityCostTest);
srvCostCenter.uxUpdateNameTag();

// Updated Model!!!
if (srvCostCenter.isValid("props"))
	// Rsp is preserved, as I factored out mod into updateDbId
	srvCostCenter.mod(modelEntityCostTest._id.$oid);
else
	alert("ERR: Props are not good")

// Delete
srvCostCenter.delByOId(rsp._id.$oid);
throw new Error("errorMessage");




// Ux Building
$(document).ready(function () {
	rsp = srvCostCenter.queryByType("Q. List all costs have I provisioned?");
	var modelDropdown = {
		"data": rsp,
		"id": getRand(),
		"class": "ui fluid search dropdown",
		"provider": "semantic"
	};
	$("#existingCostList").html(dropDownUpBuilder(modelDropdown));
//	new uxSelect(rsp)
//	$("#existingCostList")
});


function createCosts() {
	var srvCostCenter = new CostCenter(bs.costCenterCtrl, "Cost Center Activity");

	["resource", "event", "subEvent"].forEach(function (item) {
		var rt = modelEntityCostTest;
		rt.fk.type = item
		rt.cost.amount = getRandInt(1, 100)
		rt.timings.duration.value = getRandInt(1, 60)
		rt.ux.tag = "A Tag" + getRandInt(1, 60)
		srvCostCenter.setPayload(rt);
		srvCostCenter.uxUpdateNameTag(); // Make is UX Pleasing
		var rsp = srvCostCenter.setPayload(rt).create();
		// Only after create!!
		srvCostCenter.modPkDbId(); // Make it LifeCycle Ready
	});

}