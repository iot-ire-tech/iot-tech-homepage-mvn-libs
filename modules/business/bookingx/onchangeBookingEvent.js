

$(document).on("click", '#ui-id-1', function () {

// Information Oppertunity?
//alert("Event News")

})
// Read Ux
var addEventDate = false;
$(document).on("click", '.selectEventDates', function () {
	addEventDate = true;
	storeEventDates:
		try {
			var eventDates = []
			$(this).val().forEach(function (date) {
				eventDates.push(date)
			})
		} catch (e) {

	}

//used by reservation system to make booking on upstream resource.
	productId = $(this).attr("productId")
	accountId = $(this).attr("accountId")
	upstreamProductId = $(this).attr("upstreamProductId")
	upstreamAccountId = $(this).attr("upstreamAccountId")
	// Booking Capacity Not Static Capacity as set in META
//	unitsTotal = getCapacity(upstreamAccountId, upstreamProductId)
	var inventoryRsp = getCapacityLevels(upstreamAccountId, productId)
	unitsTotal = inventoryRsp.units_total;

	from = $('option:selected', this).attr("from")
	to = $('option:selected', this).attr("to")
	dbId = $('option:selected', this).attr("dbId")
//	reservationDateraw = $("option [from='" + from + "'], [to='" + to + "']").attr("from")
	reservationDateraw = from

	reservationDate = new Date(reservationDateraw).toLocaleString()
	epoch_desiredStartTimeMins = (new Date(reservationDate).getTime() / 1000) / 60;
	fromMins = ((new Date(from).getTime() / 1000) / 60);
	toMins = ((new Date(to).getTime() / 1000) / 60);
	duration = toMins - fromMins;

});

// Make Reservaration Button
$(document).on("click", '.addEventDate', function () {
	if (addEventDate === true) {
		makeBooking : {
			// Bookings Listing
			existingBookings = getDbRequest("bookings");
			if (enterReservation("single", accountId, upstreamProductId, unitsTotal, existingBookings, epoch_desiredStartTimeMins, duration)) {
				$(".fixturesBookingMsg").html("<b>New event booking was created: &#9989<b>")

				$(this).attr("disabled", true)

				// Booking is made, enable the purchase CHECKBOX on main page
				$("input[idproduct=" + productId + "]").attr("disabled", false)
				// Disable this button
				$(".addSeating").attr("disabled", false)

//				addEventDate = false;

			} else {
				$(".fixturesBookingMsg").html("<b>Unfortunately, the event capacity has been reached, contact the event organizer to have the capacity increased.<b>")
				$(".addSeating").attr("disabled", true)
			}

		}
	} else {
		$(".fixturesBookingMsg").html("<b>Please complete step 1. first<b>")
	}


});
//# sourceURL=stripe_business_change_event_booking.js