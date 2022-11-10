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
	this.id = "";
	this.accountId = "";
	this.accountId = "";
	this.type = "";


	this.init = function ( {type, eventWidget} = {}) {
		this.type = type;
		this.eventWidget = eventWidget;
		return this;
	};

	this.open = function (accountId, product) {
		var modalId = product.id;
		this.htmlModalX = "<div id=mod_" + modalId + " class=w3-modal>"
		this.htmlModalX += "<div class=w3-modal-content>"
		this.htmlModalX += "<div class=w3-container>"
		this.htmlModalX += "<span onclick=\"document.getElementById('mod_" + modalId + "').style.display = 'none'\" class=\"w3-button w3-display-topright\">Return To Main Page</span>"
		this.htmlModalX += "<span class=\"w3-button w3-display-topmiddle\">Booking Module</span>"
		this.htmlModalX += "<span class=\"w3-button w3-display-bottommiddle\">IOT Tech Services</span>"
		this.htmlModalX += "<br>"
		this.htmlModalX += "<br>"

		this.htmlModalX += this.bookingTab(accountId, product)

		this.htmlModalX += "<br>"
		this.htmlModalX += "<br>"
		this.htmlModalX += "</div>"
		this.htmlModalX += "</div>"
		this.htmlModalX += "</div>"
//		$("#shop_" + this.id).after(this.htmlModal);
		return this.htmlModalX;
	}
	this.bookingTab = function (accountId, product) {

		this.htmlModal = "<div class=tabs>"
		this.htmlModal += "<ul>"
		if (this.type === "event") {
			this.htmlModal += "<li><a href=#tabs-0>Event Booking</a></li>"
			this.htmlModal += "<li><a href=#tabs-3>Alerts</a></li>"
			this.htmlModal += "<li><a href=#tabs-4>Reminders</a></li>"
			this.htmlModal += "<li><a href=#tabs-5><span id=noticiationsTab>Notifications</span></a></li>"
		} else {
			this.htmlModal += "<li><a href=#tabs-1>Activity Booking</a></li>"
			this.htmlModal += "<li><a href=#tabs-2>Repeat Booking</a></li>"
			this.htmlModal += "<li><a href=#tabs-3>Alerts</a></li>"
			this.htmlModal += "<li><a href=#tabs-4>Reminders</a></li>"
			this.htmlModal += "<li><a href=#tabs-5>Notifications</a></li>"
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
			this.htmlModal += getProductFixturesWidget(accountId, product.id, product.metadata.upstream_accountId, product.metadata.upstream_productId);
//		this.htmlModal += "<span class=eventDatesHook></span>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<button class=\"ui button w3-right addEventDate\" >Make Reservation</button>"
			this.htmlModal += "<br>"
			this.htmlModal += "<div class=\"ui pointing below label\">2. Next, select a seating choice, then click on 'Add Seating' </div>"
			this.htmlModal += "<br>"
			this.htmlModal += getEventSeatingWidget(accountId, product.id, product.metadata.upstream_accountId, product.metadata.upstream_productId);
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
			this.htmlModal += "<input type=datetime-local step=900 id=reservationDate productId=" + product.id + " accountId=" + accountId + "></input>"
			this.htmlModal += "<br>"
			this.htmlModal += "<span class=msgAvailability></span>"
			this.htmlModal += "<br>"
// Revenue Stream...smaller hours max capactity...
			this.htmlModal += "<div class=\"ui pointing below label\">2. How much time do you wish to engage in this activity?</div>"
			this.htmlModal += "<br>"
			var revenueBuckets = [];
			// billing_time_1980
			for (md in product.metadata) {
				if (md.toString().includes("billing_time")) {
					revenueBuckets.push(product.metadata[md])
				}
			}
//			revenueBuckets = new Array(
//				product.metadata.billing_min_15,
//				product.metadata.billing_min_30,
//				product.metadata.billing_min_45,
//				product.metadata.billing_min_60,
//				product.metadata.billing_min_90,
//				product.metadata.billing_min_120
//				)
			this.htmlModal += "<select class=\"w3-select  w3-hover-grey duration\" style=\"width:60%\" required> "
			this.htmlModal += "<option disabled selected>Please Select Duration/Cost</option>"
			revenueBuckets.forEach(function (item) {

				if (item !== undefined) {
					// 30 [mins] costs 0.07 [bpd]
					// "unitTime=1__costs=10__currency=EUR__annotate=(best price)__inc=hr__bestprice=true"
//				tmp = item.split(" ")[0]
					var time = item.split("__")[0].split("=")[1];
					var costX = item.split("__")[1].split("=")[1];
					var currency = item.split("__")[2].split("=")[1];
					var annotate = item.split("__")[3].split("=")[1];
					var inc = item.split("__")[4].split("=")[1];
					var bestprice = item.split("__")[5].split("=")[1];
					this.htmlModal += "<option value=" + costX + ">" + time + "[" + inc + "] costs " + costX + " " + currency + " (" + annotate + ")</option>"
				}
			}.bind(this));
			this.htmlModal += "</select>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"
			this.htmlModal += "<br>"

			this.htmlModal += "<button id=" + product.id + " upstreamProductId=" + product.metadata.upstream_productId + " upstreamAccountId=" + product.metadata.upstream_productId + " class = \"ui button w3-right reserveBooking \">Reserve Booking!</button>"
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
			this.htmlModal += "<input type=datetime-local step=900 id=reservationDateStart productId=" + product.id + " accountId=" + accountId + "></input>"
			this.htmlModal += "<br>"
			this.htmlModal += "<div class=\"ui pointing below label\">End Date</div>"
			this.htmlModal += "<br>"
			this.htmlModal += "<input type=datetime-local step=900 id=reservationDateEnd productId=" + product.id + " accountId=" + accountId + "></input>"
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
			this.htmlModal += "<input type=datetime-local step=900 class=reminderDate productId=" + product.id + " accountId=" + accountId + "></input>"
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
//# sourceURL=stripe_booking_widget.js