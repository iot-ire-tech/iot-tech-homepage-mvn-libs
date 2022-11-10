/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function defaultTabLoad() {


	url = location.origin + contextPath + "/services/modules/digi/ux/newDigiEntity.html";
	$.get(url, function (response) {
		$("#targetQuickEntry").html(response);
	});



	url = location.origin + contextPath + "/services/modules/digi/ux/scanner.html";
	$.get(url, function (response) {
//				$("#scanner").html(response);
	});

	var intervalId = setTimeout(function () {
		clearTimeout(intervalId);
		$(".existingList").html(dropDownUpBuilder(uxAllEntitiesAssets));
		$('.ui.dropdown').dropdown();
		scanner()
	}, 1000);

}

/**
 * Adds an Image to the PDF.
 *
 * @name addImage
 * @public
 * @function
 * @param {string|HTMLImageElement|HTMLCanvasElement|Uint8Array} imageData imageData as base64 encoded DataUrl or Image-HTMLElement or Canvas-HTMLElement
 * @param {string} format format of file if filetype-recognition fails or in case of a Canvas-Element needs to be specified (default for Canvas is JPEG), e.g. 'JPEG', 'PNG', 'WEBP'
 * @param {number} x x Coordinate (in units declared at inception of PDF document) against left edge of the page
 * @param {number} y y Coordinate (in units declared at inception of PDF document) against upper edge of the page
 * @param {number} width width of the image (in units declared at inception of PDF document)
 * @param {number} height height of the Image (in units declared at inception of PDF document)
 * @param {string} alias alias of the image (if used multiple times)
 * @param {string} compression compression of the generated JPEG, can have the values 'NONE', 'FAST', 'MEDIUM' and 'SLOW'
 * @param {number} rotation rotation of the image in degrees (0-359)
 *
 * @returns jsPDF
 */

function getPDF(count) {
// https://www.freakyjolly.com/jspdf-multipage-example-generate-multipage-pdf-using-single-canvas-of-html-document-using-jspdf/
// http://html2canvas.hertzen.com/getting-started
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
// https://parall.ax/products/jspdf
// https://f5510163-a922-410a-91b8-911c9936d70c.ws-eu0.gitpod.io/#/workspace/jsPDF


	var HTML_Width = $(".barcode").width();
	var HTML_Height = $(".barcode").height();

	var top_left_margin = 15;

	html2canvas($(".barcode")[0], {allowTaint: true}).then(function (canvas) {
		canvas.getContext('2d');
		console.log(canvas.height + "  " + canvas.width);

		var imgData = canvas.toDataURL("image/jpeg", 1.0);
		// format: [HTML_Width, HTML_Height]
		var options = {orientation: 'p', unit: 'mm', format: 'a4'};
		var pdf = new jsPDF(options);
		for (var i = 1; i <= count; i++) {
//			'credit-card': [153, 243]
			pdf.addPage();
//			pdf.addImage(imgData, 'JPG', 0, 0, HTML_Height / 4, HTML_Width / 4, "mybarcode");
			pdf.addImage(imgData, 'JPG', 0, 0, HTML_Width, HTML_Height, "mybarcode");
		}

		pdf.save("HTML-Document.pdf");
	});
}
;

function barCodeHardCopy(html) {

	var pdf = new jsPDF('p', 'pt', 'letter');
	pdf.canvas.height = 72 * 11;
	pdf.canvas.width = 72 * 8.5;

	pdf.fromHTML(html);

	pdf.save('.pdf');
	doc.autoPrint()
	doc.save("hardcopy.pdf");
//	printTrigger('iFramePdf')
}
//# sourceURL=module_barCode_methods.js