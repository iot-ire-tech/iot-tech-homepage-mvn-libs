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
	console.log("INF: Max Quanity(" + modelEntityRsp.quanity.max + ")");
	var html = "";
	for (var i = 1; i <= modelEntityRsp.quanity.max; i++) {
		html = "<canvas class=\"barcode\"> </canvas>"
		html = "<hr>Counter: " + i + "<br><canvas class=\"barcode\"> </canvas>"
		$("#barCodes").append(html)
	}

	$(".barcode").JsBarcode(data, modelContext.options);
//	JsBarcode("#barcode", "123456789012", options);
//

//	html2canvas(document.body).then(function (canvas) {
//		document.body.appendChild(canvas);
//	});
	// barCodeHardCopy($("pdfBarCodes").get(0))
	getPDF(modelEntityRsp.quanity.max)

});


$(document).on("change", "#notes", function () {
	modelContext.options.notes = $(this).val()
});




//# sourceURL=module_digiBarCode_onchange.js