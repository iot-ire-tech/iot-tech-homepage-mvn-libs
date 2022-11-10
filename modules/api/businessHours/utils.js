/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function bizHoursServiceIsOpen(accountId, productId, reservationDateraw, duration) {
	var isOpenResults = {
		"dow": false,
		"openTime": false,
		"closingTime": false,
		"timings": {
			"reservationDate": "",
			"startTimeMinsEpoch": 0,
			"startTimeMins": 0,
			"endTimeMins": 0,
			"endTimeMinsEpoch": 0
		}
	}

	data:{
		var reservationDate = new Date(reservationDateraw).toLocaleString()

		var dowInt = parseInt(new Date(reservationDate).getDay());
		var dow = days [dowInt];
		var hod = parseInt(new Date(reservationDate).getHours());
		var mod = parseInt(new Date(reservationDate).getMinutes());

		var startTimeMins = mod + (hod * 60)
		var endTimeMins = startTimeMins + duration

		var startTimeMinsEpoch = (new Date(reservationDate).getTime() / 1000) / 60;
		var endTimeMinsEpoch = startTimeMinsEpoch + endTimeMins;

		// Query is business is open on that day....
//	fixturesLookup(reservationDateraw, productId)
	}

	results :{

		isOpenResults.timings.reservationDate = reservationDate
		isOpenResults.timings.startTimeMinsEpoch = startTimeMinsEpoch
		isOpenResults.timings.endTimeMinsEpoch = endTimeMinsEpoch
		isOpenResults.timings.startTimeMins = startTimeMins
		isOpenResults.timings.endTimeMins = endTimeMins

		var rsp = bizHoursServiceGet(accountId, productId)[0]
		rsp.items.forEach(function (item) {
			if (item.dow === dow) {
				isOpenResults.dow = true
				if (startTimeMins >= item.startTimeMins)
					isOpenResults.openTime = true

				if (endTimeMins > item.startTimeMins && endTimeMins <= item.endTimeMins)
					isOpenResults.closingTime = true
			}

		}.bind(this));


		if (isOpenResults.dow === false) {
			$(".msgAvailability").html("<br>Sorry this booking item service is not available on this day<br>")
			analytics_availability(btnBizHourDateraw)

			$(".reserveBooking[productId=" + productId + "]").attr("disabled", true)
		} else {
// DOW is good
			if (isOpenResults.openTime === false && isOpenResults.closingTime === false) {
				$(".msgAvailability").html("<br>Sorry for this booking is not available, as its outside opening and closing hours<br>")
				analytics_availability(btnBizHourDateraw)

				$(".reserveBooking[productId=" + productId + "]").attr("disabled", true)
			} else if (isOpenResults.openTime === true && isOpenResults.closingTime === false) {
				addReservationDate = false;
				$(".msgAvailability").html("<br>Sorry for this booking is not available, as its outside opening hours<br>")
				analytics_availability(btnBizHourDateraw)

				$(".reserveBooking[productId=" + productId + "]").attr("disabled", true)

				// Start and End Time is Good!
			} else if (isOpenResults.openTime === true && isOpenResults.closingTime === true) {
				addReservationDate = true;
//						$(".msgAvailability").html("<br>Great, this service is available at this time (" + desiredDate + ")<br>")
				var msg = "<br>Great, this service is available at this time<br>"
				msg += "Next, you can add items to your booking, such as notifications, and more, or simply reserve the booking"
				$(".msgAvailability").html(msg)
			}
		}
		return isOpenResults;
	}
}


//# sourceURL=api_bizHours_utils.js