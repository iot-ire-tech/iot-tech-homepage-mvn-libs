
var bookingAlert = {
	"activiated": false,
	"sms": false,
	"email": false,
	"dates": {
		"start": "",
		"end": ""
	}
}

// Get Customer for this account.
$(document).on("click", '#ui-id-3', function () {

})
// Read Ux
$(document).on("click", '#mgtMethodSmsAlert', function () {
	if (this.checked) {
		bookingAlert.email = true;
	} else {
		bookingAlert.email = false;
	}
})
$(document).on("click", '#mgtMethodEmailsAlert', function () {
	if (this.checked) {
		bookingAlert.sms = true;
	} else {
		bookingAlert.sms = false;
	}
})

$(document).on("change", '#reservationDateStart', function () {
	bookingAlert.dates.start = new Date($(this).val()).toLocaleDateString()
})
$(document).on("change", '#reservationDateEnd', function () {
	bookingAlert.dates.end = new Date($(this).val()).toLocaleDateString()
})


$(document).on("click", '#addSlotAlert', function () {
	bookingAlert.activiated = true;

	existingBookings = getDbRequest("bookings");
	try {
		existingBookings.forEach(function (booking) {
			booking.bookings.forEach(function (bookingItem) {
				if (bookingItem.id === dbBookingItemId) {
					bookingItem.alerts = bookingAlert;
					throw booking;
				}
			}.bind(this));
		}.bind(this));

	} catch (booking) {
		// Add to bookings...
		payloadRsp = putDbRequest("bookings", booking, dbBookingId);
	}
	payloadRsp._id.length > 10 ? $(".alertBookingMsg").html("<b>New Booking Alert Created: &#9989<b>") : $(".alertBookingMsg").html("<b>Booking Alert Error: X<b>")

	$(this).attr("disabled", true)
})


//# sourceURL=stripe_business_change_activity_alerts.js