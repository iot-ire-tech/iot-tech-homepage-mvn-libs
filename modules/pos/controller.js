/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click", "#checkout", function () {
	if (paymentMethod === "ePayment") {
		modelContext.pk.type = paymentMethod
		if (chargeCustomer(modelPatron).paymentMade === true) {
//			modelContext.$date = new Date().toISOString();
			modelContext.receipt = modelPoS.tillReceipt;

// There are many things yuo could have bought!!!
// Goal Reduce quanity
// Query First, deduct
			if (modelContext.fk instanceof Array)
				modelContext.fk.forEach(function (fkItem) {
					modelEntityRsp = srvEntity.setPayload({"pk": {"id": parseInt(fkItem.id)}}).queryByType("Q. List By Id?")[0];
					modelEntityRsp.quanity.rt -= 1;
// Update
					srvEntity.setPayload(modelEntityRsp)
					srvEntity.uxUpdateNameTag()
					if (srvEntity.isValid("props")) {
						srvEntity.mod(modelEntityRsp.pk.dbId);
//						alert("INF: Item (" + modelEntityRsp.socialize.name + ")");
					} else
						alert("ERR: Item (" + modelEntityRsp.socialize.name + "), contact support asap");

				})
		}
		posReciept()
	} else if (paymentMethod === "cash") {
		modelContext.pk.type = paymentMethod
		posReciept()
	}

// if hard copy requested generate
	if (modelPoS.tillReceipt.hardCopy === true) {
		posHardCopy()
	}

// emppty cart after printing..
	modelContext.fk = [];

	resetUx()
	resetTransaction()

});

function posHardCopy() {
	var doc = new jsPDF()
	var x = 10;
	var y = 10;

	doc.setTextColor(150); // Gray
	doc.setFontSize(22);
	doc.text("IoT Sales", x, y)
	doc.setFontSize(16);


	doc.line(x, y += 10, x + 100, y); // horizontal line
	doc.text("Date: " + new Date().toGMTString(), x, y += 10)

	for (var i = 0; i < modelContext.fk.length; i++) {
		if (modelContext.fk[i].id === itemId) {
			// From dbID get Cost, Get Name
			doc.text("ItemID: " + modelContext.fk[i].id, x, y += 10)
		}
	}

	doc.text("", x, y += 10)
	doc.line(x, y += 10, x + 100, y); // horizontal line
	doc.text("Total: " + total, x, y += 10)
	doc.text("", x, y += 10)
	doc.autoPrint()
	doc.save("hardcopy.pdf");
//	printTrigger('iFramePdf')
}

function posReciept() {

	modelContext.pk.id = getRand();
	srvPosReciept.setPayload(modelContext)

	if (srvContext.isValid("props")) {
		modelContextRsp = srvContext.create();
		srvContext.modPkDbId();
	} else
		console.log("ERR: payment receipt issue");

}




//# sourceURL=module_shop_controller.js