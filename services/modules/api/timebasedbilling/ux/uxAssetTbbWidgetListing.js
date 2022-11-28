
var uxAssetSummaryWidgetObj = {
	"businessHours": [],
	"timebasedUsage": [],
	"capacity": -1,
	"tnc": false
}

var uxAssetTbbWidget = function () {
	this.counter = 0;
	this.uxAssetSummaryWidget = {};

	this.init = function (uxAssetSummaryWidgetObj) {
		this.counter = 0;
		this.uxAssetSummaryWidget = uxAssetSummaryWidgetObj;
		this.html = "<fieldset  >";
		this.html += "<legend>Perminute Purchase Summary</legend><br>";
		this.html += "<label>The following prices have been applied to this asset. Please choose accordingly</label>";
		this.html += "<br>";
		this.html += "<table border=1 class=w3-table-all>";
		this.html += "<caption>Timebased Price List</caption>"
		this.html += "<tr><th>Lease Time</th><th>Cost</th><th>Currency</th><th>Best Price</th><th>Comment</th><th>Purchase Options</th></tr>";
		this.uxAssetSummaryWidget.timebasedUsage.forEach(function (item) {
			this.html += "<tr>";
			this.html += "<td>" + item.time + " [" + item.inc + "]</td>";
			this.html += "<td>" + item.cost + "</td>";
			this.html += "<td>" + item.currency + "</td>";
			this.html += "<td>" + item.bestprice + "</td>";
			this.html += "<td>" + item.annotate + "</td>";
			this.html += "<td>";
			this.html += "<input class=\"tbb w3-input w3-hover-grey\" value=" + item.cost + " name=tbb type=radio required />";
			this.html += "</td>";
			this.html += "</tr>";
			this.counter++;
		}.bind(this));
		this.html += "</table>";
		this.html += "<span id=uxAssetTbbWidgetMsg></span>"
		this.html += "<br>";
		this.html += "<button id=btnPurchase class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green w3-right\" >Buy</button>";
		this.html += "</fieldset>";
		return this.html;
	};
}
//# sourceURL=api_ttb_widget_listing.js