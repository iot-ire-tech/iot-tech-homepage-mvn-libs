var uxAssetSummaryWidgetObj = {
    "businessHours": [],
    "timebasedUsage": [],
    "capacity": -1,
    "tnc": false
}

function UxCapacityWidgetListing() {
    this.counter = 0;
    this.frame = true;
    this.small = false;
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


var uxAssetCapacityWidget = function () {
    this.counter = 0;

    this.init = function (data) {
        this.html = "<br>";
        this.html += '<span class="w3-tag w3-yellow">Inventory Management Notice</span>'
        this.html += "<br>";
        this.html += '<span>Note the following capacity levels have been set for this item</span>'
        this.html += "<br>";
        this.html += "<label>Current Levels: " + data.levels.units + "</label>";
        this.html += "<br>";
        this.html += "<label>Min Threshold: " + data.levels.units_lower + "</label>";
        this.html += "<br>";
        this.html += "<label>Max Threshold: " + data.levels.units_upper + "</label>";
        this.html += "<br>";
        this.html += "<label>Max Level: " + data.levels.units_total + "</label>";
        this.html += "<br>";
        this.html += "<label>Buffer: " + data.levels.bufferoverflow + "</label>";
        return this.html;
    };
}
//# sourceURL=api_capacity_widget_listing.js