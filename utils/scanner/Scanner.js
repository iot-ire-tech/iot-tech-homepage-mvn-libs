/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var bcFormat = ""
var bcFormateString = ""
var bcDocName = ""

function scanner(id) {



	BarcodeReader.licenseKey = 't0127lQMAAD3iT72GLKm7hLM52Eo91w6XTWTBSwjGD//65F2La71+8xjV6dPpoDpu9RTnQqAmn2nFFSzr01Rq3Z2gU3dRTOAmVpbecrhgdsHsgtkFswvmEMwhmEMwh2AOwUzBTMFMwUzBnN+aP5GbhYZ5Y8iaeKt/U3vlMKs3JW+1gA==';
	let scanner = new BarcodeReader.Scanner({
		htmlElement: document.getElementById('div-video-container'),
		onFrameRead: results => {
			if (results.length > 0) {
				console.log(results);
				result = results[0]
				bcFormat = result.LocalizationResult.BarcodeFormat
				bcFormateString = result.LocalizationResult.BarcodeFormatString
				bcDocName = result.LocalizationResult.DocumentName
			}

		},
		onNewCodeRead: (code, result) => {
//			alert(code);
			$("#scanResultCode").html("<br>" + code + "<br>")
			$("#scanResultCode").html(code)

			if (bcFormateString.toString().toLocaleLowerCase().includes("qr"))
				$("#qrCodeResults").trigger("change")
			else
				$("#barCodeResults").trigger("change")
		}
	});
	scanner.open();
}


//# sourceURL=utils_scanner.js