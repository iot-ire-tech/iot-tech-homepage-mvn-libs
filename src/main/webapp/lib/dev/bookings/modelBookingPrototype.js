/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * This is the interfact to Booking/Payment Engine
 */
var booking = {}
var booking = {
	"id": 0,
	"ts": getTs(),
	"type": "[resource, event, subEvent]",
	"assetId": "",
	"patronId": "",
	"cost": "",
	"duration": "",
	"note": "",
}
var bookings = new Array(booking)



JsonDb.prototype.createBooking = function (booking) {
	this.booking = booking;
	this.endpoint = bookingsEndpoint
	this.payload = booking
	this.message = "this is one"
	this.post()
	return this;
}

var newBooking = BookingEngine(booking);
newBooking = Object.assign({}, JsonDb(bookingsEndpoint, "this is one"))


