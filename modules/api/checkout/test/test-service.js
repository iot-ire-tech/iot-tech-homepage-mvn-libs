/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var productId = parsedUrl.searchParams.get("productId");
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");

var mydb = "pnpmgt"
var contextPath = ""
var rsp = ""
var payload = {
    "accountId": accountId,
    "productId": productId
}

describe('Generate Barcode', function () {

    it('Retrive product', function () {

        var barCode;
        var canvas = document.getElementById('canvas');
        var codedInfo = "this is coded info..."

        JsBarcode(canvas, codedInfo, {
            format: "code128",
            lineColor: "#0aa",
            width: 4,
            height: 40,
            displayValue: true
        });

        var base64ImgStr = canvas.toDataURL('image/jpeg', 1.0);
        chai.expect(base64ImgStr, /[a-zA-Z0-9]+/, 'New MM Item Created')


        generateImage:{

            barCode = {
                "productId": productId,
                "imgExt": "jpeg",
                "uploadDir": "barcodes",
                "imgString": base64ImgStr
            }
            var rsp = postRequest("UploadFilesBase64", barCode)
            chai.expect(rsp.uploadDir, /[a-zA-Z0-9]+/, 'New MM Item Created')
            chai.expect(rsp.imgExt, /[a-zA-Z0-9]+/, 'New MM Item Created')
            chai.expect(rsp.imgString, /[a-zA-Z0-9]+/, 'New MM Item Created')
        }


    });


});

//# sourceURL=api_checkout_test.js