
var bookingReminder = {
	"activiated": false,
	"sms": false,
	"email": false,
	"datetime": ""
}

// Get Customer for this account.
$(document).on("click", '#ui-id-14', function () {
	var x = new Date().toISOString().substring(0, "yyyy-MM-ddThh:mm".toString().length);
	x.replace(":..", ":00");
	$('.reminderDate').val(x);
	$('.reminderDate').attr("min", x);

})
// Read Ux
$(document).on("click", '#mgtMethodSmsReminder', function () {
	if (this.checked) {
		bookingReminder.email = true;
	} else {
		bookingReminder.email = false;
	}
})
$(document).on("click", '#mgtMethodEmailReminder', function () {
	if (this.checked) {
		bookingReminder.sms = true;
	} else {
		bookingReminder.sms = false;
	}
})

var addReminder = false
$(document).on("change", '.reminderDate', function () {
	addReminder = true
	bookingReminder.datetime = new Date($(this).val()).toLocaleDateString()
})


$(document).on("click", '#addReminder', function () {
	bookingReminder.activiated = true;

	if (addReminder) {
		addReminder = false;
		existingBookings = getDbRequest("bookings");
		try {
			existingBookings.forEach(function (booking) {
				booking.bookings.forEach(function (bookingItem) {
					if (bookingItem.id === dbBookingItemId) {
						bookingItem.reminders = bookingReminder;
						throw booking;
					}
				}.bind(this));
			}.bind(this));

		} catch (booking) {
			// Add to bookings...
			payloadRsp = putDbRequest("bookings", booking, dbBookingId);
			payloadRsp._id.length > 10 ? $(".reminderBookingMsg").html("<b>New Booking Reminder Created: &#9989<b>") : $(".reminderBookingMsg").html("<b>Booking Reminder Error: X<b>")
		}
		$(this).attr("disabled", true)
	} else {
		alert("INF: You must add a date to be notified on!")
	}

})


//# sourceURL=stripe_business_change_activity_reminder.js