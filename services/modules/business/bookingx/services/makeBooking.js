var addDuration = false;


// Create a booking....
// if a booking is very attractive, it will have lots of bookings, thousands!!! but metadata only goes to 50 entries!!
// pull back existing bookings
// examing if free
// book
function addBooking(payload, newBooking) {
// One less available
	payload.unitsRemaining -= 1
	payload.bookings.push(newBooking)
	payloadRsp = postRequest("ProductUpdateMeta", payload);
}



function updateAnalytics() {
	bookingFound = false
	// Full Up, offer next available court?
//	if (tryHarder === true) {
//// Repeat with next search increment
//		bookMe(existingBookings, epoch_desiredStartTimeMins += 30)
//	} else {
//// update customer, try later time
//	}
// Update analytics of oppertunity
}



function getBookingUnitsRemaining(existingBookings, productId) {
	var bookingsRemaining = -1;

	try {
		existingBookings.forEach(function (booking) {
			// How many bookings exist
			if (booking.productId === productId) {
				bookingsRemaining = booking.unitsRemaining
				throw bookingsRemaining;

			}
		}.bind(this));
	} catch (bookingsRemaining) {
		return bookingsRemaining;
	}
	return null;
}

//# sourceURL=stripe_business_booking_engine.js