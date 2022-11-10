/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * This is the interfact to Booking/Payment Engine
 */
var shoppingObj = {}
shoppingItem = {
	"id": 0,
	"patronId": 0,
	"clientId": 0,
	"ts": getTs(),
	"comment": "purchaserId",
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

var ShoppingItem = function () {
	this.id = 0
	this.patronId = 0
	this.clientId = 0
	this.ts = getTs()
	this.quanity = 1
	this.status = ""
	this.type = ""
	this.traigeId = {
		"resourceId": 0,
		"eventId": 0,
		"subEventId": 0
	}
	this.note = ""
}
var shoppingItems = new Array(shoppingItem)

class Shop extends crudIt {

	constructor(ctrl, httpMsg) {
		super(ctrl, httpMsg)
		this.shoppingItems = [];
	}

	search(id) {
		try {
			this.shoppingItems.find(function (item) {
				if (item.id === id) {
					this.shoppingItem = item;
					this.itemFound = true
					throw "OOO"
				}
			})
		} catch (e) {
			return this.itemFound;
		}

		return this.itemFound;
	}

	deleteAll() {
		this.shoppingItems.some(function (item) {
			this.del(item.id)
		})
		return this;
	}
	deleteItem(id) {
		this.del(id);
		return this;
	}
	create() {
		var that = this;
		this.shoppingItems.some(function (item) {
			that.payload = item
			that.send(that.payload)
		})
		return this;
	}

	addItem(shoppingItem) {
		this.shoppingItems.push(shoppingItem);
		return this;
	}
	getItems(clientId, patronId) {
		this.clientId = clientId;
		this.patronId = patronId;
//		this.shoppingItems = this.getByClientIdAndPatronId(clientId, patronId).getResponse();
		//	url = urlRest + this.endpoint + "?clientId=" + clientId + "&patronId=" + patronId;
		this.response = super.setPayload("{\"clientId\":" + clientId + ",\"patronId\":" + patronId + "}").query()
		return this;
	}

	getResponse() {
		return this.response
	}
// Private Method
	send(payload) {
		super.setPayload(payload).post()
	}

}

// Notice the absence of NEW - Live
//var shoppingObj = new Shop();
//shoppingObj = Object.assign(JsonDb(outboxShoppingItemsEndpoint))
