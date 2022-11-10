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

var BookingEngine = function (booking) {
	this.booking = booking;

	this.createBooking = function () {
		this.payload = this.booking
		this.post()
		return this;
	}
	this.setBooking = function (booking) {
		this.booking = booking;
		return this;
	}
	return this;
}

// Notice the absence of NEW
var booking = BookingEngine(booking);
bookingObj = Object.assign({}, JsonDb(inboxBookingsEndpoint))
bookingObj.setMessage("Creating a booking")
bookingObj.createBooking();
