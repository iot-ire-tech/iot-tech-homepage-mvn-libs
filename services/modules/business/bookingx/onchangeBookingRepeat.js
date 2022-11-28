

var addRepeatDates = false;
$(document).on("change ", '.selectRepeatWeek', function () {
	addRepeatDates = true;
	epoch_desiredStartTimeMinsWeekDates = []
	var dw = new Date(reservationDateraw)

	if ($(this).val() === "4") {
//		dw.setDate(dw.getDate() + (1 * 7));
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
	} else if ($(this).val() === "3") {
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
	} else if ($(this).val() === "2") {
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
	} else if ($(this).val() === "1") {
		epoch_desiredStartTimeMinsWeekDates.push(new Date(dw.setDate(dw.getDate() + (1 * 7))));
	}

})
$(document).on("click", '.reserveRepeatBooking', function () {

	if (addRepeatDates) {
		addRepeatDates = false;

		msg = "An additional booking is reserved now, you can make another " + (repeatBookingMax - repeatBookingCounter) + " bookings if you like"

		mbcounter = 0;
		epoch_desiredStartTimeMinsWeekDates.forEach(function (futurebookingDate) {
			mbcounter++;
			epoch_desiredStartTimeMinsWeek = (new Date(futurebookingDate).getTime() / 1000) / 60;
			window.console.info("INF: Checking following date for availability (" + futurebookingDate + ")");

			// Update The Existing Bookings
			existingBookings = getDbRequest("bookings");
			if (enterReservation("multi", accountId, upstreamProductId, unitsTotal, existingBookings, epoch_desiredStartTimeMinsWeek, duration)) {
				// &#10060
				$(".msgRepeatWeekMsgHook").after("<b>New Future Booking Reserved</b>: " + futurebookingDate.toLocaleString() + " &#9989<br>")
			} else {
				$(".msgRepeatWeekMsgHook").after("<br>" + "Unfortunately this booking date: " + futurebookingDate + " is taken or booked to capacity!" + "<br>")
			}
		})

//	$(".repeatBookingMsg").html("<b>New Booking created: &#9989<b>")
		$(this).attr("disabled", true)
	} else {
		alert("INF: You must select the number of block bookings you would like to make!")
	}

})


//# sourceURL=stripe_business_change_activity_repeat.js