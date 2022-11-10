// just in time var x = function () {
// hosted function uxBusinessHoursListing() {
//function uxBusinessHoursListing() {
var UxBizHourListing = function () {
	this.counter = 0;
	this.frame = true;
	this.small = false;
	this.caption = "";
	this.html = "";

	this.init = function (businessHours) {
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

		this.html += "<caption> <i class=\"fa fa-calendar\"></i>&nbsp;&nbsp;" + this.caption + "</caption>";
		this.html += "<tr><th>Day Of Week</th><th>Opening Time</th><th>Closing Time</th><th>Comment</th></tr>";
		if (businessHours.length > 0)
			this.businessHours.forEach(function (item) {
				this.html += "<tr><td>" + item.dow + "</td><td>" + item.startTime + "</td><td>" + item.endTime + "</td><td>" + item.annotate + "</td></tr>";
			}.bind(this));
		else
			this.html += "<tr><td colspan=4 style=\"text-align:center\">No time supplied! Contact front desk</td></tr>";

		this.html += "</table >";
		if (this.frame)
			this.html += "</fieldset>";


		return this.html;
	};
}
//# sourceURL=api_bizHours_uxlisting.js