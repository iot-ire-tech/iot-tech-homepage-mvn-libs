/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var bookingActivities = new uxBookingWindow();
//bookingActivities.init().open()


var uxBookingWindow = function () {
	this.html = "";
	this.htmlModal = "";

	this.metadata = "";
	this.accountId = "";
	this.upstreamAccountId = "";
	this.upstreamProductId = "";
	this.productId = "";
	this.type = "";


	this.init = function ( {type, eventWidget} = {}) {
		this.type = type;
		this.eventWidget = eventWidget;
		return this;
	};

	this.open = function () {
		this.htmlModalX = "<div id=mod_" + this.productId + " class=w3-modal>"
		this.htmlModalX += "<div class=w3-modal-content>"
		this.htmlModalX += "<div class=w3-container>"
		this.htmlModalX += "<span onclick=\"document.getElementById('mod_" + this.productId + "').style.display = 'none'\" class=\"w3-button w3-display-topright\">Return To Main Page</span>"
		this.htmlModalX += "<span class=\"w3-button w3-display-topmiddle\">Booking Module</span>"
		this.htmlModalX += "<span class=\"w3-button w3-display-bottommiddle\">IOT Tech Services</span>"
		this.htmlModalX += "<br>"
		this.htmlModalX += "<br>"

		this.htmlModalX += this.bookingTab()

		this.htmlModalX += "<br>"
		this.htmlModalX += "<br>"
		this.htmlModalX += "</div>"
		this.htmlModalX += "</div>"
		this.htmlModalX += "</div>"
//		$("#shop_" + this.id).after(this.htmlModal);
		return this.htmlModalX;
	}
	this.bookingTab = function () {

		this.htmlModal = "<div class=tabs>"
		this.htmlModal += "<ul>"
		if (this.type === "event") {
			this.htmlModal += "<li><a href=#tabs-0>Event Booking</a></li>"
			this.htmlModal += "<li><a href=#tabs-3>Alerts</a></li>"
			this.htmlModal += "<li><a href=#tabs-4>Reminders</a></li>"
			this.htmlModal += "<li><a href=#tabs-5><span id=noticiationsTab>Notifications</span></a></li>"
		} else {
			this.htmlModal += "<li><a href=#tabs-1>Make Reservation</a></li>"
			this.htmlModal += "<li><a href=#tabs-2>Block Booking</a></li>"
			this.htmlModal += "<li><a href=#tabs-3>Alerts</a></li>"
			this.htmlModal += "<li><a href=#tabs-4>Reminders</a></li>"
			this.htmlModal += "<li><a href=#tabs-5><span id=noticiationsTab>Notifications</span></a></li>"
		}
		this.htmlModal += "</ul>"



////////////////////////
// Event Booking
////////////////////////
		if (this.type === "event") {
			this.htmlModal += "<div id=tabs-0>"
			this.htmlModal += "<br>"
			this.htmlModal += "<div class=\"ui pointing below label\">1. Select the date below you like to reserve, then click on 'Make Reservation'.</div>"
			this.htmlModal += "<br>"
			this.htmlModal += getProductFixturesWidget(this.accountId, this.productId, this.upstreamAccountId, this.upstreamProductId);
//		this.htmlModal += "<span class=eventDatesHook></span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<button class=\"ui button w3-right addEventDate\" >Reserve Now!</button>"
			this.htmlModal += "<br>"
			this.htmlModal += "<div class=\"ui pointing below label\">2. Next, select a seating choice, then click on 'Add Seating' </div>"
			this.htmlModal += "<br>"
			this.htmlModal += getEventSeatingWidget(this.accountId, this.productId, this.upstreamAccountId, this.upstreamProductId);
			this.htmlModal += "<br>"
			this.htmlModal += "<button disabled class=\"ui button w3-right addSeating\" >Add Seating</button>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "</div>"
		}

////////////////////////
// Single Bookings
////////////////////////
		if (this.type === "activity") {
			this.htmlModal += "<div id=tabs-1>"
			this.htmlModal += "<span id=msgBookingTab></span>"
			this.htmlModal += "<div class=\"ui pointing below label\">1. Select a starting date and time, you would like to commence this activity on?</div>"
			this.htmlModal += "<br>"
// Business Hours - 15 minute intervals..
			this.htmlModal += "<input type=datetime-local step=900 id=reservationDate productId=" + this.productId + " accountId=" + this.accountId + "></input>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span class=msgAvailability></span>"
			this.htmlModal += "<br>"
// Revenue Stream...smaller hours max capactity...
			this.htmlModal += "<div class=\"ui pointing below label\">2. How much time do you wish to engage in this activity?</div>"
			this.htmlModal += "<br>"
			this.htmlModal += "<select class=\"w3-select w3-hover-grey timeNmoney\"  productId=" + this.productId + " accountId=" + this.accountId + " style=\"width:60%\" required> "
			this.htmlModal += "<option disabled selected>Please Select Duration/Cost</option>"
			// There can only be one!
			try {
				nsRevenueService.accountId = this.accountId
				nsRevenueService.productId = this.productId
				var revenueBuckets = nsRevenueService.get()
			} catch (errMgs) {
				revenueBuckets.items = []
			}
			revenueBuckets.obj.items.forEach(function (item) {
				this.htmlModal += "<option duration=" + item.tbb.unitTime + " cost=" + item.transaction + ">" + item.tbb.unitTime + "[" + item.tbb.inc + "] costs " + item.transaction + " " + item.currency + " (" + item.annotate + ")</option>"
			}.bind(this));

			this.htmlModal += "</select>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"

			this.htmlModal += "<button disabled id=" + this.productId + " upstreamProductId=" + this.upstreamProductId + " upstreamAccountId=" + this.upstreamAccountId + " accountId = " + accountId + " class = \"ui button w3-right reserveBooking \">Reserve Now!</button>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span class=singleBookingMsg></span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<div class=progressbarReserverBooking></div>"
			this.htmlModal += "<div class=\"spinnerReserverBooking\"></div>"
			this.htmlModal += "<br>"
//		this.htmlModal += "<p>While your here, why not consider additional options like, repeat booking, alerts/reminders...</p>"
			this.htmlModal += "<br>"
			this.htmlModal += "</div>"
		}


		if (this.type === "activity") {
			this.htmlModal += "<div id=tabs-2>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<frameset>"
			this.htmlModal += "<legend></legend>"
			this.htmlModal += "<div class=\"ui pointing below label\">Repeat this booking for the following number of weeks</div>"
			this.htmlModal += "<br>"
//		this.htmlModal += "<input class=selectRepeatWeek type=\"week\" min='' max='' step=1>"
			this.htmlModal += "<select size=5 class=\"w3-select selectRepeatWeek\" style=\"width:60%\"> "
			this.htmlModal += "<option value= selected disabled>Please Select</option>"
			this.htmlModal += "<option value=1>One</option>"
			this.htmlModal += "<option value=2>Two</option>"
			this.htmlModal += "<option value=3>Three</option>"
			this.htmlModal += "<option value=4>Four</option>"
			this.htmlModal += "</select>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span class=msgRepeatWeekMsgHook></span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "</frameset>"


			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<button class=\"ui button w3-right reserveRepeatBooking \" > Add </button>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span class=repeatBookingMsg></span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "</div>"
		}




		if (this.type === "activity" || this.type === "event") {
			this.htmlModal += "<div id=tabs-3>"
			this.htmlModal += "<label>Be one of the first to get notified of any free slots for selected period below!</label>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<div class=\"ui pointing below label\">Start Date</div>"
			this.htmlModal += "<br>"
			this.htmlModal += "<input type=datetime-local step=900 id=reservationDateStart productId=" + this.productId + " accountId=" + this.accountId + "></input>"
			this.htmlModal += "<br>"
			this.htmlModal += "<div class=\"ui pointing below label\">End Date</div>"
			this.htmlModal += "<br>"
			this.htmlModal += "<input type=datetime-local step=900 id=reservationDateEnd productId=" + this.productId + " accountId=" + this.accountId + "></input>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<label>Choose Alert Method</label>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<label for=mgtMethodSms>SMS</label>"
			this.htmlModal += "<input type=checkbox id=mgtMethodSmsAlert >"
			this.htmlModal += "<br>"
			this.htmlModal += "<label for=mgtMethodEmail>Email</label>"
			this.htmlModal += "<input type=checkbox  id=mgtMethodEmailsAlert>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span>Please not that Reminders/Alerts etc, only apply to your regular booing, not future bookings!</span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<button class=\"ui button w3-right \" id=addSlotAlert >Add</button>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span class=alertBookingMsg></span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "</div>"
		}


		if (this.type === "activity" || this.type === "event") {
			this.htmlModal += "<div id=tabs-4>"
			this.htmlModal += "<p>Send me a gentle reminder prior to the start of my booking</p>"
			this.htmlModal += "<br>"
			this.htmlModal += "<div class=\"ui pointing below label\"> Replace this date, with a date on which to send yourself a reminder</div>"
			this.htmlModal += "<br>"
			this.htmlModal += "<input type=datetime-local step=900 class=reminderDate productId=" + this.productId + " accountId=" + this.accountId + "></input>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<label>Alert Method</label>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<label for=mgtMethodSmsReminder>SMS</label>"
			this.htmlModal += "<input type=checkbox id=mgtMethodSmsReminder value=sms name=reminderCat>"
			this.htmlModal += "<br>"
			this.htmlModal += "<label for=mgtMethodEmailReminder>Email</label>"
			this.htmlModal += "<input type=checkbox  id=mgtMethodEmailReminder value=email  name=reminderCat>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span>Please not that Reminders/Alerts etc, only apply to your regular booing, not future bookings!</span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<button class=\"ui button w3-right \" id=addReminder>Add</button>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span class=reminderBookingMsg></span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "</div>"
		}


		if (this.type === "activity" || this.type === "event") {
			this.htmlModal += "<div id=tabs-5>"
			this.htmlModal += "<br>"
			this.htmlModal += "<div class=\"ui pointing below label\">Select patrons you would like to inform about this booking</div>"
			this.htmlModal += "<span class=\"commsListTarget\"></span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<label>Message To Reciptient(s)</label>"
			this.htmlModal += "<textarea cols=5 row=10 id=commsMsg placeholder='Hi guys, just want to inform you all of the game this weekend!'></textarea>"

			this.htmlModal += "<br>"
			this.htmlModal += "<frameset>"
			this.htmlModal += "<legend>Choose Alert Method</legend>"
			this.htmlModal += "<br>"
			this.htmlModal += "<label>SMS</label>"
			this.htmlModal += "<input type=checkbox id=patronCommsSms value=sms/>"
			this.htmlModal += "<br>"
			this.htmlModal += "<label>Email</label>"
			this.htmlModal += "<input type=checkbox id=patronCommsEmail value=email/>"
			this.htmlModal += "</frameset>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span>Please not that Reminders/Alerts etc, only apply to your regular booing, not future bookings!</span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<button class=\"ui button w3-right \" id=addPatronComms>Add</button>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span class=notificationsBookingMsg></span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "</div>"
		}



		this.htmlModal += "<br>"
		this.htmlModal += "<br>"
		this.htmlModal += "</div>"

		return this.htmlModal;

	}
}

function uxExistingBookings(existingBookings) {
	var st = 0, et = 0;
	html = "";
	html += "<div class=\"w3-container w3-light-grey\">";
	html += "<br>";
	html += "<br>";
	html += "<span>The following slots have already been taken, or its booked to capacity!</span>";
	html += "<br>";
	html += "<br>";
	html += "</div>";
	html += "<div class=\"w3-container w3-center\">";
	html += "<table class=\"w3-table w3-bordered\">";
	html += "<tr><th>Start Date [dd/mm/yyyy hh:mm]</th><th>End Date [dd/mm/yyyy hh:mm]</th></tr>";
	existingBookings.forEach(function (booking) {
		booking.bookings.pop()
		booking.bookings.forEach(function (item, index) {
			// Convert back to MiliSeconds
			st = booking.startTimeMins * 60 * 1000;
			dst = new Date(st)
			st = dst.getDate() + "/" + (dst.getMonth() + 1) + "/" + dst.getFullYear() + " " + dst.getHours() + ":" + (dst.getMinutes() < 10 ? '0' : '') + dst.getMinutes()
			// Convert back to MiliSeconds
			et = item.endTimeMins * 60 * 1000;
			det = new Date(et)
			et = det.getDate() + "/" + (det.getMonth() + 1) + "/" + det.getFullYear() + " " + det.getHours() + ":" + (det.getMinutes() < 10 ? '0' : '') + det.getMinutes()

			html += "<tr><td>" + st + "</td><td>" + et + "</td></tr>";
		})
	})
	html += "</table>";
	html += "</div>";
	html += "<br>";
	html += "<br>";
	html += "<div class=\"w3-container w3-light-grey\">";
	html += "<span>IOT-Tech as your service</span>";
	html += "</div>";
//	$("#existingBookingsHook").html(html).delay(10000).fadeOut("slow")
	$("#existingBookingsHook").html(html)
	$("#existingBookings").dialog();
}
//# sourceURL=stripe_booking_widget2.js