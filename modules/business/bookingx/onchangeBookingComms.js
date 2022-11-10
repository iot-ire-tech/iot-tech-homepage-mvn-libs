
//$(".tabs").tabs({
//	activate: function (event, ui) {
//
//		window.console.debug(ui.newTab[0].innerText);
//		alert("INF: xx" + ui.newTab[0].innerText);
//	}
//});

// Get Customer for this account.
$(document).on("click", '#noticiationsTab', function () {

	payload = {
		"accountId": accountId,
		"limit": 100
	}
	payloadRsp = postRequest("CustomerListing", payload);
	html = "<br>"
	html += "<select size=5 multiple=multiple class=\"w3-select selectPatron\" style=\"width:40%\" required> "
	html += "<option disabled selected>Please Select </option>"
	payloadRsp.forEach(function (item) {
		if (item.name !== undefined)
			html += "<option value=" + item.email + "|" + item.phone + ">" + item.name + "</option>"
		else if (item.shipping !== undefined)
			html += "<option value=" + item.email + "|" + item.phone + ">" + item.shipping.name + "</option>"
		else
			html += "<option value=" + item.email + "|" + item.phone + ">Name Not found (" + item.email + ") </option>"
	});
	html += "</select>"
	html += "<br>"
	html += "<button class='w3-button w3-right w3-light-gray' id=addRecipients>Add Select Recipients</button>"
	html += "<br>"

	$(".commsListTarget").html(html);
})
// Read Ux
var bookingDl = []
$(document).on("change", '.selectPatron', function () {
	bookingDl = $(this).val()
})

var addRecipients = false
$(document).on("click", '#addRecipients', function () {
	addRecipients = true
	patronComms.comms = []
	bookingDl.forEach(function (recipient) {
		patronComms.comms.push({
			"email": email = recipient.split("|")[0],
			"phone": phone = recipient.split("|")[1]
		})
	})

})
$(document).on("click", '#patronCommsEmail', function () {
	if (this.checked) {
		patronComms.email = true;
	} else {
		patronComms.email = false;
	}
})
$(document).on("click", '#patronCommsSms', function () {
	if (this.checked) {
		patronComms.sms = true;
	} else {
		patronComms.sms = false;
	}
})

$(document).on("change", '#commsMsg', function () {
	patronComms.msg = $(this).val()
})

$(document).on("click", '#addPatronComms', function () {
	patronComms.activiated = true;
	if (addRecipients) {
		addRecipients = false

		existingBookings = getDbRequest("bookings");
		try {
			existingBookings.forEach(function (booking) {
				booking.bookings.forEach(function (bookingItem) {
					if (bookingItem.id === dbBookingItemId) {
						bookingItem.comms = patronComms;
						throw booking;
					}
				}.bind(this));
			}.bind(this));
		} catch (booking) {
// Add to bookings...
			payloadRsp = putDbRequest("bookings", booking, dbBookingId);
		}

		payloadRsp._id.length > 10 ? $(".notificationsBookingMsg").html("<b>New Booking Notification Created: &#9989<b>") : $(".notificationsBookingMsg").html("<b>Booking Notification Error: X<b>")
		$(this).attr("disabled", true)
	} else {
		alert("INF: You must add recipients before you can notify members")
	}
})


//# sourceURL=stripe_booking_comms.js