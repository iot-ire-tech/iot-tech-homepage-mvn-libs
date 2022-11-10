/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * This is the interfact to Booking/Payment Engine
 */
var fbObj = {}
//
var fbItem = {
	"ts": getTs(),
	"comment": "purchaserId",
	"patronId": 0,
	"comment": "Can buy more that one",
	"quanity": 1,
	"status": "[selected, booked, reserved, purchased]",
	"type": "[resource, event, subEvent]",
	"comment": "From this triage, you can get all the details you need....",
	"traigeId": {
		"resourceId": 0,
		"eventId": 0,
		"subEventId": 0
	},
	"note": ""
}
var fbItems = new Array(fbItem)



var FaceBook = function () {
	this.dataRef;
	this.sharebutton;
	this.likebutton;

	this.search = function (id) {
	}

	this.delete = function (items) {
	}

	this.create = function (item) {
		switch (item) {
			case "likeButton":
				this.likebutton = "<div "
				this.likebutton += "class=fb-like "
				this.likebutton += "data-href=" + this.dataRef + " "
				this.likebutton += "data-layout=standard "
				this.likebutton += "data-action=like "
				this.likebutton += "data-show-faces=true"
				this.likebutton += ">"
				this.likebutton += "</div>"
				break;

			case "shareButton":
				// <div class="fb-share-button" data-href="https://www.your-domain.com/your-page.html" data-layout="button_count"> </div>
				this.sharebutton = "<div "
				this.sharebutton += "class=fb-share-button "
				this.sharebutton += "data-href=" + this.dataRef + " "
				this.sharebutton += "data-layout=button_count "
				this.sharebutton += ">"
				this.sharebutton += "</div>"
				break;

			default:
		}
		return this;
	}
	this.setDataRef = function (url) {
		this.dataRef = url;
		return this;
	}
	this.removeItem = function (id) {
		return this;
	}

	return this;
}

// //
// https://developers.google.com/web/tools/chrome-devtools///console///console-write
// http://localhost:8084/iot-base/lib/dev/facebook/testitModel.html
//console.clear()
//console.trace();

var fbObj = new FaceBook();

// customize button
fbObj.setDataRef("https://www.yahoo.com")

// Lets Create them
var likebutton = fbObj.setDataRef("https://www.google.com").create("likeButton").likebutton;
//console.groupCollapsed('Start Of Obj Dump');
//console.table(fbObj, [""]);
//console.groupEnd();

var sharebutton = fbObj.setDataRef("https://www.yahoo.com").create("shareButton").sharebutton;
//console.table(fbObj, ["sharebutton"]);

// Lets Test Them
//console.assert(100 === 10, {msg: "Failed", likebutton})
//console.assert(100 === 10, {msg: "Failed", sharebutton})


////console.table(fbObj, [{sharebutton: sharebutton}]);
//console.table(fbObj);