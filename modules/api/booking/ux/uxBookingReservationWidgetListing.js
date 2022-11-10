function UxBookingReservationWidgetListing() {
    this.counter = 0;
    this.frame = true;
    this.small = false;
    this.uxAssetSummaryWidget = {};
    this.html = "";

    this.init = function (businessHours) {
        this.counter = 0;
        this.businessHours = businessHours;
        this.html = ""

        return this.html;
    };
}

function UxBookingReservationWidgetNextBookingListing() {
    this.counter = 0;
    this.frame = true;
    this.small = false;
    this.html = "";
    this.caption = "";

    this.init = function (businessHours) {

        if (this.frame)
            this.html += "<fieldset  >";

        if (this.small)
            this.html += "<table  border=1 class='w3-table-all w3-small'>";
        else
            this.html += "<table  border=1 class=w3-table-all>";

        this.html += "<caption>" + this.caption +"</caption>";
        this.html += "<tr><th>Start Time</th><th>End Time</th><th>Comment</th></tr>";
        if (businessHours.length > 0)
            businessHours.forEach(function (item) {
                this.html += "<tr><td>" + item.startDateTime + "</td><td>" + item.endDateTime + "</td><td>Free Slot</td></tr>";
            }.bind(this));
        else
            this.html += "<tr><td colspan=4 style=\"text-align:center\">No time supplied! Contact front desk</td></tr>";

        this.html += "</table >";
        if (this.frame)
            this.html += "</fieldset>";

        return this.html;
    };
}

//# sourceURL=api_booking_reservations_ux_listing