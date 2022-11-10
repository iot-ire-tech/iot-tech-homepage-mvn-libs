
var bookingSeating = {
	"activiated": false,
	"seating": "level_1",
	"annotate": "sdfsdf",
	// Costing
	"currency": "EUR",
	"cost": 0.01
}

// Read Ux
var addEventSeat = false;
$(document).on("change", '.selectEventSeats', function () {
	addEventSeat = true;
	getData: {
		bookingSeating.cost = parseFloat($('option:selected', this).attr("seatingcostid"))

	}


});
var addSeating = false
$(document).on("click", '.addSeating', function () {
	bookingSeating.activiated = true;
	addSeating = true;
	if (addSeating) {
		addSeating = false;
		existingBookings = getDbRequest("bookings");
		try {
			existingBookings.forEach(function (booking) {
				booking.bookings.forEach(function (bookingItem) {
					if (bookingItem.id === dbBookingItemId) {
						bookingItem.seating = bookingSeating;
						throw booking;
					}
				}.bind(this));
			}.bind(this));
		} catch (booking) {
// Add to bookings...
			payloadRsp = putDbRequest("bookings", booking, dbBookingId);
			if (payloadRsp._id.length > 10) {
				$(".seatingBookingMsg").html("<b>New booking/seating was created: &#9989<b><br>Next, why not add an alert of upandcoming events, or a handy reminder, etc, to your booking!")
				$(".tabs").tabs({disabled: [0], enable: [1, 2, 3]});
			} else
				$(".seatingBookingMsg").html("<b>New booking/seating error: &#10060<b>")
		}
		$(this).attr("disabled", true)
	} else {
		alert("INF: You must add a date to be notified on!")
	}

})


//# sourceURL=stripe_business_change_event_seating.js