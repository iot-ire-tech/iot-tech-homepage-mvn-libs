/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//const decPlaces2 = parseFloat($(this).val()).toFixed(2) * 1

$(document).on("change", "#quantity", function () {
	modelContext.quanity.max = $(this).val() * 1
});



//Bar Code Generator
$(document).on("change", ".barcodes", function () {
	modelContext.options.format = $(this).dropdown("get value");
});
$(document).on("click", "#btnBarCodeGen", function () {

	modelEntityRsp = srvEntity.setPayload({"pk": {"id": fk.id}}).queryByType("Q. List By Id?")[0];
	modelContext.options.text = "IOT Digitizier: (" + modelEntityRsp.socialize.name + ")"
	var data = "BC-" + getRand() + "-CB";
	data = "123456789012";
	$("#barcode").JsBarcode(data, modelContext.options);
//	JsBarcode("#barcode", "123456789012", options);
//

});



// QR Code Gen
$(document).on("change", "#type", function () {
	modelContext.type = $(this).val() * 1
});
$(document).on("change", ".correctionLevel", function () {
	modelContext.correctionLevel = $(this).dropdown("get value");
});

$(document).on("change click", "#assets", function () {
	if (this.checked) {
		modelContext.options.assets = true;
	} else {
		modelContext.options.assets = false;
	}
});

$(document).on("change click", "#events", function () {
	if (this.checked) {
		modelContext.options.events = true;
	} else {
		modelContext.options.events = false;
	}
});
$(document).on("change click", "#activities", function () {
	if (this.checked) {
		modelContext.options.activities = true;
	} else {
		modelContext.options.activities = false;
	}
});
$(document).on("change click", "#bookings", function () {
	if (this.checked) {
		modelContext.options.bookings = true;
	} else {
		modelContext.options.bookings = false;
	}
});

$(document).on("change click", "#legal", function () {
	if (this.checked) {
		modelContext.options.legal = true;
	} else {
		modelContext.options.legal = false;
	}
});

$(document).on("change click", "#notesQR", function () {
	if (this.checked) {
		modelContext.options.notes = true;
	} else {
		modelContext.options.notes = false;
	}
});

$(document).on("change", "#notes", function () {
	modelContext.socialize.quanity.notes = $(this).val()
});


$(document).on("click", "#btnQRGen", function () {

	var typeNumber = modelContext.type;
	var errorCorrectionLevel = modelContext.correctionLevel;
	var qr = qrcode(typeNumber, errorCorrectionLevel);
	qr.addData(modelContext.options);
	qr.make();
	document.getElementById('placeHolder').innerHTML = qr.createImgTag();
});


//# sourceURL=module_digi_onchange.js