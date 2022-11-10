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
createTestData()
throw ""
var srv = new Asset(bs.entityCtrl, "Entity Time");
// Could Use Facker here...
EntityTest.id = getRand();
//EntityTest.alias = "Squash Court";
//EntityTest.type = "resource";
//EntityTest.alias = "Squash Ireland - Irish Open";
//EntityTest.type = "event";
EntityTest.alias = "Box A";
EntityTest.type = "subEvent";
// FK Ref
EntityTest.fk.type = "resourceGroup";
EntityTest.fk.id = getRand();
EntityTest.ux.tag = "Test" + getRand();
var rsp = srv.setPayload(EntityTest).create();
// Ux Building
if (srv.setPayload(EntityTest).uxBuild("list").isValid("props"))
	srv.mod(rsp._id.$oid);
else
	alert("ERR: Props are not good")

throw "x"

$(document).ready(function () {
	rsp = srv.queryByType("Q. List all items type(resource)?");
	var modelDropdown = {
		"data": rsp,
		"id": getRand(),
		"class": "ui fluid search dropdown",
		"provider": "semantic"
	};
	$("#resourceList").html(dropDownUpBuilder(modelDropdown));
});
function createTestData() {

	var srv = new Asset(bs.entityCtrl, "Entity Time");
	[
		{"type": "resource", "alias": "Squash Court"},
		{"type": "event", "alias": "Squash Ireland Opens"},
		{"type": "subEvent", "alias": "Box A"}
	].forEach(function (item) {
		var rt = EntityTest;
		rt.type = item.type
		rt.pk.id = getRand();
		rt.alias = item.alias;
		rt.ux.tag = "A Tag" + getRandInt(1, 60)



		srv.setPayload(rt);
		srv.uxUpdateNameTag("list"); // Make is UX Pleasing
		var rsp = srv.setPayload(rt).create();
		// Only after create!!
		srv.modPkDbId(); // Make it LifeCycle Ready
	});
}