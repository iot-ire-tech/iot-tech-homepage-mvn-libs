/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * This is the interfact to Booking/Payment Engine
 */
var shoppingObj = {}
//
var shoppingItem = {
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
var shoppingItems = new Array(shoppingItem)

var ShopTest = function (shoppingItems) {
	this.shoppingItems = [];
	this.shoppingItem = [];
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

	this.delete = function (items) {
		this.shoppingItems.some(function (item) {
			this.del(item.id)
		})
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
	this.removeItem = function (id) {
		return this;
	}

	return this;
}

// Notice the absence of NEW - Live
shoppingItems.push(shoppingItem)
shoppingItems.push(shoppingItem)
var shoppingObj = Shop(shoppingItems);
shoppingObj = Object.assign(JsonDb(outboxShoppingItemsEndpoint))

/*
 * Test : Creat new Shopping Item
 */
shoppingObj.setMessage("Creating a booking")
shoppingObj.create();