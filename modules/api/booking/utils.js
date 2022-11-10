/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function analytics_availability(reservationDateraw) {

	var newEntry = {
		"customerId": "",
		"source": "joinup",
		"purpose": "purchase",
		"ts": []
	}
	newEntry.source = "booking.availability"

	var existingAnalytics = {}
	var modelAnalytics = {
		"accountId": "",
		"usage": [],
		"entries": [
			{
				"source": "",
				"purpose": "",
				"location": {
					"lng": "",
					"lat": ""
				}
			}
		]
	};
	existingAnalytics = modelAnalytics;

	var messageRsp = getDbRequestXByY("analytics", "accountId", accountId);
	if (messageRsp.length >= 1) {
		existingAnalytics = messageRsp[0]
		existingAnalytics.usage.push(getTs())
		existingAnalytics.entries.push(
			{
				"source": "booking",
				"purpose": "availability",
				"availability": reservationDateraw
			}
		)
		putDbRequest("analytics", existingAnalytics, existingAnalytics._id);
	} else {
// First Time
		modelAnalytics.accountId = accountId;
		modelAnalytics.usage.push(getTs())
		// New entry
		modelAnalytics.entries.push({
			"source": "booking",
			"purpose": "availability",
			"availability": reservationDateraw

		})

		postDbRequest("analytics", modelAnalytics);
	}


}

function getBookingUtilization(existingBookings, productId) {
	var totalBookingCap = null;
	var utilization = null;
	var maxCapAvailable = 1;

	try {
		existingBookings.forEach(function (booking) {
			// How many bookings exist
			if (booking.productId === productId) {

				totalBookingCap = booking.unitsRemaining + booking.bookings.length;
				utilization = booking.unitsRemaining / totalBookingCap;

				throw utilization;
			}
		}.bind(this));
	} catch (utilization) {
		return utilization;
	}
	return maxCapAvailable;
}
//# sourceURL=api_booking_utils.js