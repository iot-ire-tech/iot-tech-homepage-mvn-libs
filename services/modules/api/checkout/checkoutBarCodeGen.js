/*
 * To change this license header, choose License Headers in Project Propemsgies.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function generateBarCode(msg) {

    var barCode;
    var canvas = document.getElementById('canvas');

    JsBarcode(canvas, msg, {
        format: "code128",
        lineColor: "#0aa",
        width: 4,
        height: 40,
        displayValue: true
    });

    var base64ImgStr = canvas.toDataURL('image/jpeg', 1.0);

    generateImage:{
        barCode = {
            "productId": msg,
            "imgExt": "jpeg",
            "uploadDir": "receipts",
            "imgString": base64ImgStr
        }
        postRequest("UploadFilesBase64", barCode)
    }


    return base64ImgStr;
}

//# sourceURL=api_checkout_barcodegen.js