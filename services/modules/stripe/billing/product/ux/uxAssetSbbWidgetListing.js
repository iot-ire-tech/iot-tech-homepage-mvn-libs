
var uxAssetSummaryWidgetObj = {
	"businessHours": [],
	"timebasedUsage": [],
	"capacity": -1,
	"tnc": false
}

var uxAssetSbbWidget = function () {
	this.counter = 0;
	this.uxAssetSummaryWidget = {};

	this.init = function (uxAssetSummaryWidgetObj) {
		this.counter = 0;
		this.uxAssetSummaryWidget = uxAssetSummaryWidgetObj;
		this.html = "<fieldset  >";
		this.html += "<legend>Subscription Summary</legend><br>";
		this.html += "<label>The following commerical rates have been applied to this asset.</label>";
		this.html += "<br>";
		this.html += "<br>";
		this.html += "<table border=1 class=w3-table-all>";
		this.html += "<caption>Timebased Billing Information</caption>"
		this.html += "<tr><th>Time[mins]</th><th>Cost</th><th>Currency</th><th>Comment</th><th>Purchase</th></tr>";
		this.uxAssetSummaryWidget.timebasedUsage.forEach(function (item) {
			this.html += "<tr><td>" + item.mins + "</td><td>" + item.cost + "</td><td>" + item.currency + "</td><td>" + item.annotate + "</td>";
			this.html += "<td>";
			this.html += "<input class=\"tbb w3-input w3-hover-grey\" value=" + item.cost + " name=tbb type=radio required />";
			this.html += "</td>";
			this.html += "</tr>";
			this.counter++;
		}.bind(this));
		this.html += "</table>";
		this.html += "<span id=uxAssetSbbWidgetMsg></span>"
		this.html += "<br>";
		this.html += "<button id=btnPurchase class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green w3-right\" >Add</button>";
		this.html += "</fieldset>";
		return this.html;
	};
}
//# sourceURL=stripe_uxAssetSummaryWidget