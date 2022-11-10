


var uxFollowMeWidgetListing = function () {
	this.counter = 0;
	this.frame = true;
	this.small = false;
	this.uxAssetSummaryWidget = {};
	this.html = "";

	this.init = function (businessHours) {
		this.counter = 0;
		this.businessHours = businessHours;
		this.html = ""

		if (this.frame)
			this.html += "<fieldset  >";
		if (this.frame)
			this.html += "<legend>Availability Time Table</legend>";


		if (this.small)
			this.html += "<table  border=1 class='w3-table-all w3-small'>";
		else
			this.html += "<table  border=1 class=w3-table-all>";

		this.html += "<tr><th>Day Of Week</th><th>Opening Time</th><th>Closing Time</th><th>Comment</th></tr>";
		if (businessHours.length > 0)
			this.businessHours.forEach(function (item) {
				this.html += "<tr><td>" + item.dow + "</td><td>" + item.startTime + "</td><td>" + item.endTime + "</td><td>" + item.comment + "</td></tr>";
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