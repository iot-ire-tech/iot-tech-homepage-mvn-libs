/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var payload = '{ "id": 1, "ts": "2018-03-25T09:09:06.722Z", "name": "IoT Tech", "email": "tonygennis@gmail.com", "staffCount": 1, "businessSite": "http://www.360-iot.com.", "businessLocation": "Ireland.", "branding": true, "offering": "pro" }'

//https://api.mlab.com/api/1/databases?apiKey=2E81PUmPFI84t7UIc_5YdldAp1ruUPKye
//https://api.mlab.com/api/1/databases/iottech/collections/oll?apiKey=myAPIKey
var db = "iottech"
var collectionTab = "mynewcollection"
var docRow = payload
var key = "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"
var url = "https://api.mlab.com/api/1/databases/" + db + "/collections/" + collectionTab + "?apiKey=" + key
// Query All
//console.clear()
$.ajax({
	url: url,
	type: "GET",
	contentType: "application/json"
}).done(function (msg) {
	//console.log(msg);
});

// New Entry
$.ajax({
	url: url,
	type: "post",
	data: payload,
	contentType: "application/json; charset=utf-8"
}).done(function (msg) {
	//console.log(msg);
});

//return
//	urlRest = "http://localhost:27017/test"
//url = urlRest + "/iottech";
//tmpObj = nw.setUrl(url).setMessage("Getting Box league ID").getMe().getResult();
//if (tmpObj.length != 1) {
//	alert("ERR: More than one box league found, contact help desk");
//}
//tmpObj.forEach(function x(event) {
//	tmp = event.id;
//});