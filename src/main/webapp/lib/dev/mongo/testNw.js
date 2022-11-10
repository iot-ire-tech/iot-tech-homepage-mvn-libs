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
//     https://api.mlab.com/api/1/databases/my-db/collections/my-coll?q={"active": true}&apiKey=myAPIKey
https://api.mlab.com/api/1/databases//api/1/databases/iottech/collections/mynewcollection?q={"id": 1, "staffCount": 2}&apiKey=wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q
// Query All

	//console.clear();
//collectionTab += "?q={\"foo\": \"bar\"}"
collectionTab += "?q={\"id\": 1, \"staffCount\": 2}"
var urlQuery = "https://api.mlab.com/api/1/databases/" + db + "/collections/" + collectionTab + "&apiKey=" + key

tmpObj = nw.setUrl(urlQuery).setMessage("Getting Box league ID").getMe().getResult();
//console.table(tmpObj)
////console.assert(tmpObj.length < 0, "ERR: Empty response, tab: %s", collectionTab)
// https://docs.mlab.com/data-api/


tmpObj.forEach(function x(item) {
	//console.log("INF: TS %s", item.ts);
});