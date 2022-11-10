/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * This is the interfact to Booking/Payment Engine
 */
var shoppingObj = {}
shoppingItemX = {
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

var ShoppingItemX = function () {
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

var ShopX = function () {
	this.id;
	this.clientId;
	this.patronId;
	this.shoppingItems = [];
	this.shoppingItem;
	this.itemFound = false;

	this.search = function (id) {
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


	this.deleteAll = function () {
		this.shoppingItems.some(function (item) {
			this.del(item.id)
		})
		return this;
	}
	this.deleteItem = function () {
		this.del(this.shoppingItem.id)
		return this;
	}
	this.create = function () {
		this.shoppingItems.some(function (item) {
			this.payload = item
			this.post()
		})
		return this;
	}
	this.addItem = function (shoppingItem) {
		this.shoppingItems.push(shoppingItem);
		return this;
	}
	this.getItems = function (clientId, patronId) {
		this.clientId = clientId;
		this.patronId = patronId;
		this.shoppingItems = this.getByClientIdAndPatronId(clientId, patronId).getResponse();

		return this;
	}


	return this;
}

// Notice the absence of NEW - Live
//var shoppingObj = Shop();
//shoppingObj = Object.assign(JsonDb(outboxShoppingItemsEndpoint))
