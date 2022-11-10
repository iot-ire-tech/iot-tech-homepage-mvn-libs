/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var productId = ""
var upstreamProductId = ""
var payloadRsp = ""
var payload = ""


var workflow = {
	"available": false,
	"capacity": false
}
var repeatBookingCounter = 0;
var repeatBookingMax = 3;

var reservationDate = ""
var reservationDateWeek = ""
var hod = ""
var mod = ""
var moh = ""
var dow = ""
var epoch_desiredStartTimeMins = ""
var epoch_desiredStartTimeMins = ""
var epoch_desiredStartTimeMinsWeek = ""
var epoch_desiredStartTimeMinsWeekDates = []
var duration = ""

var dbBookingId = ""

var bookingsObj = {
	"startTimeMins": 26274301,
	"unitsRemaining": 1,
	"bookings": []
}
var firstBooking = true;
var reservedBooking = {}


var modelBooking = {
	"accountId": "",
	"productId": "",
	// Booking
	"unitsRemaining": -1,
	"startTimeMins": -1,
	"nextBookingId": -1,
	"bookings": [{
			"id": -1,
			"paid": false,
			"endTimeMins": -1,
			"alerts": "",
			"comms": "",
			"reminders": ""
		}]

}
var bookingItem = {
	"id": getRand(),
	"paid": false,
	"endTimeMins": "",
	"alerts": "",
	"reminders": "",
	"comms": "",
	"seating": ""

}

var patronComms = {
	"activiated": false,
	"sms": false,
	"email": false,
	"msg": "",
	"comms": [{
			"email": "",
			"phone": ""
		}]
}

var modelUx = {
	"cost": 0.00,
	... new ProductAll({"active": true, "type": "good", "limit": "0"})
}
//# sourceURL=stripe_booking_model.js