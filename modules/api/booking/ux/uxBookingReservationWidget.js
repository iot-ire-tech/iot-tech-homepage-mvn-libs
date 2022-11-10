function UxBookingReservationTab() {
    this.html = ""
    var btnClassAdd = "w3-button w3-round w3-blue w3-right"

    this.init = function () {
        bookingOptions : {
            this.html = "<div class=\"tabBookingOptions\">"
            this.html += "<ul>"
            this.html += "<li><a href=\"#tabBookingOptions-1\">Notifications </a></li>"
            this.html += "<li><a href=\"#tabBookingOptions-2\">Reminders </a></li>"
            this.html += "<li><a href=\"#tabBookingOptions-3\">Social </a> </li>"
            this.html += "</ul>"

            tab1 : {
                this.html += "<div id=\"tabBookingOptions-1\">"
                this.html += "<br>"
                this.html += "<p>Do you wish to notify someone of this booking, if so select person(s) here?</p>"

                this.html += "<span class=notifyCustomerOfNewBookingListHook></span>"
                this.html += "<br>"
                this.html += "<br>"
                this.html += "<span>Select the way you would like to notify these persons by? </span> "


                this.html += "<br>"
                this.html += "<input  class=\"notificationSms \" type=checkbox name=notifications />SMS"
                this.html += "<br>"
                this.html += "<input  class=\"notificationEmail \" type=checkbox name=notifications checked/>Email"
                this.html += "<br>"
                this.html += "<span class='w3-tag w3-yellow w3-right btnAddNotificationMsg'></span>"
                this.html += "<br>"
                this.html += "<button  class=\"btnAddNotification " + btnClassAdd + "\" >Add </button>"
                this.html += "<br>"
                this.html += "</div>"
            }
            tab2 : {
                this.html += "<div id=\"tabBookingOptions-2\">"
                this.html += "<br>"
                this.html += "<span>Do you want to be reminded of this booking, closer to its starting date?</span>"
                this.html += "<br>"
                this.html += "<span>If so, select a date/time to be reminded on</span>"
                this.html += "<br>"
                this.html += "<br>"
                this.html += "<input  class=\"reminderDate \" type=datetime-local />"
                this.html += "<br>"
                this.html += "<br>"
                this.html += "<input  class=\"reminderSms \" type=checkbox name=reminders />SMS"
                this.html += "<br>"
                this.html += "<input  class=\"reminderEmail \" type=checkbox name=reminders checked/>Email"
                this.html += "<br>"
                this.html += "<span class='w3-tag w3-yellow w3-right btnAddReminderMsg'></span>"
                this.html += "<br>"
                this.html += "<button  class=\"btnAddReminder " + btnClassAdd + "\" >Add</button>"
                this.html += "<br>"
                this.html += "</div>"
            }

            tab3 : {
                this.html += "<div id=\"tabBookingOptions-3\">"
                this.html += "<br>"
                this.html += "<span>Do you want to receive any news around this item. If so, select below options</span>"
                this.html += "<br>"
                this.html += "<br>"
                this.html += "<input  class=\"socialAlerts \" type=checkbox name=social  title=\"Eg. Courts are closed today due to maintainance\"/>Alerts"
                this.html += "<br>"
                this.html += "<input  class=\"socialNews \" type=checkbox name=social checked/>News updates"
                this.html += "<br>"
                this.html += "<span class='w3-tag w3-yellow w3-right btnAddSocialMsg'></span>"
                this.html += "<br>"
                this.html += "<button  class=\"btnAddSocial " + btnClassAdd + "\" >Add</button>"
                this.html += "<br>"
                this.html += "</div>"
            }

            this.html += "</div>"
        }
        return this.html;
    }
}

function UxBookingReservationModelTab() {
    this.html = ""
    this.numberofbookings = 0
    this.htmlBookings = []

    this.init = function () {
        bookingOptions : {
            this.html = "<div class=\"tabBookings\">"
            this.html += "<ul>"
            for (var i = 0; i < this.numberofbookings; i++) {
                if (i === 0)
                    this.html += "<li><a href=\"#tabBooking-\"+i>Booking Home</a></li>"
                else
                    this.html += "<li><a href=\"#tabBooking-\"+i>Multi-Booking# +i </a></li>"
            }
            this.html += "</ul>"

            tabGen : {
                for (var i = 0; i < this.numberofbookings; i++) {
                    this.html += "<div id=\"tabBoking-\"+i>"
                    this.html += this.numberofbookings[i]
                    this.html += "</div>"
                }
            }

            this.html += "</div>"
        }
        return this.html;
    }
}

function UxBookingReservationWidget() {
    this.tabsHtml = "";
    this.accountId = "";
    this.productId = "";
    this.offering = "";
    var btnClass = "w3-btn w3-round-xxlarge w3-padding-large w3-blue"

    this.init = function () {


        this.html = "<div class=\"w3-container\"  >";


        // Revenue Stream...smaller hours max capactity...
        if (this.offering === "activity")
            ttb : {
                this.html += "<div class=\"w3-container\"  >";

                nsRevenueService.get()
                this.html += "<a class=\"ui blue tag label\">Rate/Duration:</a>&nbsp;Select a suitable price and duration for this booking<br><br>"
                this.html += "<select class=\"w3-select w3-hover-grey timeNmoney\" size=" + (nsRevenueService.obj.items.length + 1) + " offering=" + this.offering + " productId=" + this.productId + " accountId=" + this.accountId + " required> "
                this.html += "<option disabled selected>Please Select</option>"
                nsRevenueService.obj.items.forEach(function (item) {
                    this.html += "<option inc=" + item.tbb.inc + " duration=" + item.tbb.unitTime + " cost=" + item.transaction + " title=\"" + item.annotate + "\">"
                    this.html += item.tbb.unitTime + " [" + item.tbb.inc + "] costs " + roundNumber(item.transaction) + " EUR"
                    this.html += "</option>"
                }.bind(this));

                this.html += "</select>"
                this.html += "</div>";
                this.html += "<br>";

                // 15 minute intervals.. smaller interval more revuence potential!!! like tradingo  on stock exachamge
                bookingTime : {
                    this.html += "<div class=\"w3-container\"  >";
                    var bookingStep = 900
                    this.html += "<a class=\"ui blue tag label\">Date/Time:</a>&nbsp;Next, select a start date and time for this booking.<br><br>"
                    this.html += "</div>";
                    this.html += "<div class=\"w3-center\"  >";
                    this.html += "<input  class=\"btnBizHourDate \" type=text  productId=" + this.productId + " accountId=" + this.accountId + "></input>"
                    this.html += "</div>";
                    this.html += "<br>"
                }


            }
        if (this.offering === "event")
            ttb : {
                this.html += "<div class=\"w3-container\"  >";
                // Get Costs
                // cost is only important for checkout
                // nsSeatingService.accountId = this.accountId
                // nsSeatingService.productId = this.productId
                nsSeatingService.get()

                // Get Duration
                // Dates Ranges
                // duration is key for booking schedule
                // nsFixturesService.accountId = this.accountId
                // nsFixturesService.productId = this.productId
                nsFixturesService.get()
                nsFixturesService.obj.items


                // for each event date, we will have following seating available.
                this.html += "<a class=\"ui blue tag label\">Event Dates</a>&nbsp;Select a seating option and date for this booking<br><br>"
                var eventSize = nsFixturesService.dataSizeItems + nsSeatingService.dataSizeItems
                this.html += "<select style='max-height: 33%; ' class=\"w3-select timeNmoney\" size=" + (eventSize + 7) + " offering=" + this.offering + " productId=" + this.productId + " accountId=" + this.accountId + " required> "
                // this.html += "<option disabled selected>Please Event Date</option>"

                nsFixturesService.getSortedDateList().sortedDateList.forEach(function (fixture) {
                    var startdatetimeiso = moment(fixture.startDateTime).toISOString()
                    var startDateTimeObj = moment(fixture.startDateTime).format("YYYY/MM/DD HH:mm")
                    var endDateTimeObj = moment(fixture.endDateTime).format("YYYY/MM/DD HH:mm")
                    duration:{
                        var start = moment(fixture.startDateTime);
                        var end = moment(fixture.endDateTime);
                        var duration = end.diff(start, 'minutes')
                    }

                    var label = "Event Start Date: " + startDateTimeObj + "...........End Date: " + endDateTimeObj + "\" title=" + fixture.annotate + ""
                    this.html += "<optgroup style='font-size: 14px ; font-weight:bold ;color: black ' label=\"" + label + "\">"

                    seatingOptions:{
                        nsSeatingService.getSortedPriceList().sortedPriceList.forEach(function (seatItem) {
                            var cost = seatItem.cost;
                            var annotate = seatItem.annotate;
                            var grade = seatItem.grade;
                            var currency = seatItem.currency;
                            var inc = seatItem.inc;
                            this.html += "<option style='font-size: 14px ;color: black; font-style:italic; ' inc=min startdatetime=" + startdatetimeiso + "  duration=" + duration + " cost=" + cost + " title=\"" + annotate + "\">"
                            if (grade.includes("Standing"))
                                this.html += nsSeatingService.seatingLevels.get(grade) + " Area / Costs : " + roundNumber(cost) + " " + currency
                            else
                                this.html += nsSeatingService.seatingLevels.get(grade) + " Row Seats / Cost : " + roundNumber(cost) + " " + currency
                            this.html += "</option>"
                        }.bind(this))
                    }

                    this.html += "</optgroup>"

                }.bind(this));


                this.html += "</select>"
                this.html += "</div>";
                this.html += "<br>";
            }
        this.html += "<div class=\"w3-center\"  >";
        this.html += "<span class=msgNotification></span>"
        this.html += "<span class=msgAvailability></span>"
        this.html += "<span class=nextAvailableBookings></span>"
        this.html += "</div>";

// Tabs Here
        this.html += "<a class=\"ui blue tag label\">Booking Options:</a>&nbsp;<br><br>"
        this.html += this.tabsHtml;

        this.html += "<br>"
        this.html += "<div class='w3-row w3-center'>";

        this.html += "<div class=w3-half>";
        this.html += "<button class=\"" + btnClass + "  btnExitReservation\" >Close</button>";
        this.html += "</div>";

        this.html += "<div class=w3-half>";
        this.html += "<span class='w3-tag w3-yellow addBookingMsg'></span>'"
        this.html += "<button disabled assetId=" + this.assetId + " productId=" + this.productId + " accountId=" + this.accountId + " class=\"" + btnClass + " addBooking \">Add Booking</button>"
        this.html += "</div>";


        this.html += "</div>"
        return this.html;
    }


}
;
//# sourceURL=api_booking_reservation_widget.js