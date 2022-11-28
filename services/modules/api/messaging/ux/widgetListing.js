var uxWidgetMessageListing = function () {
    this.html = ""

    this.init = function () {

        this.html = "<br>";
        this.html += "<caption>";
        this.html += msg;
        this.html += "</caption>";
        this.html += "<table class='w3-table-all'>";
        this.html += "<tr>";
        this.html += "<th>Id</th>";
        this.html += "<th>Type</th>";
        this.html += "<th>===</th>";
        this.html += "<th>Entry</th>";
        this.html += "<th>Publish Date</th>";
        this.html += "<th>Expiry Date</th>";
        this.html += "<th>===</th>";
        this.html += "<th>Target Id</th>";
        this.html += "<th>Importance</th>";
        this.html += "<th>Scope</th>";
        this.html += "<th>Subject</th>";
        this.html += "<th>Content</th>";
        this.html += "</tr>";
        var that = this;
        var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
        this.response.forEach(function (item) {

            that.html += "<tr>";
            that.html += "<td>" + item.id + "</td>";
            that.html += "<td>" + item.message.type + "</td>";
            that.html += "<td>||</td>";
            that.html += "<td>" + item.timings.ts + "</td>";
            that.html += "<td>" + item.timings.publishDate + "</td>";
            that.html += "<td>" + item.timings.expiryDate + "</td>";
            that.html += "<td>||</td>";
            that.html += "<td>" + item.routing.triageId + "</td>";
            that.html += "<td>" + item.message.importance + "</td>";
            that.html += "<td>" + item.message.scope + "</td>";
            that.html += "<td>" + item.message.headline + "</td>";
            that.html += "<td>" + item.message.content + "</td>";

            that.html += "</tr>";

        });
        this.html += "</table>";
        this.html += "<br>";

        return this.html;
    };

}
//# sourceURL=api_message_ux_listing.js
