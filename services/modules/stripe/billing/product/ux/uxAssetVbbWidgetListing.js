

var uxAssetVbbWidget = function () {
	this.counter = 0;
	this.usage = [];

	this.init = function (usage) {
		this.counter = 0;
		this.usage = usage;
		this.html = "<fieldset>";
		this.html += "<legend>Volume Based Charge Summary</legend><br>";
		this.html += "<label>The following prices have been applied to this asset. Please choose accordingly</label>";
		this.html += "<br>";
		this.html += "<br>";
		this.html += "<table border=1 class=w3-table-all>";
		this.html += "<caption>Volume Based Price List</caption>"
		this.html += "<tr><th>Quanity</th><th>Cost</th><th>Currency</th><th>Is Best Price?</th><th>Comment</th><th>Purchase Options</th></tr>";
		this.usage.forEach(function (item) {
			this.html += "<tr>";
			this.html += "<td>" + item.quanity + "</td>";
			this.html += "<td>" + item.cost.toFixed(2) + "</td>";
			this.html += "<td>" + item.currency + "</td>";
			this.html += "<td>";
			if (item.bestprice === "true") {
				this.html += "<div class=\"w3-tag w3-round w3-green\" style=\"padding:3px\">"
				this.html += "<div class=\"w3-tag w3-round w3-green w3-border w3-border-white\">"
				this.html += "Best Price!!!"
				this.html += "</div>"
				this.html += "</div>"
			} else {

			}
			this.html += "</td>";
			this.html += "<td>" + item.annotate + "</td>";
			this.html += "<td>";
			var t = item.cost * item.quanity
			this.html += "<input class=\"vbb w3-input w3-hover-grey\" value=" + t.toFixed(2) + " quanity=" + item.quanity + " name=vbb type=radio required />";
			this.html += "</td>";
			this.html += "</tr>";
			this.counter++;
		}.bind(this));
		this.html += "</table>";
		this.html += "<span id=uxAssetVbbWidgetMsg></span>"
		this.html += "<br>";
		this.html += "<button id=btnPurchase class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green w3-right\" >Buy</button>";
		this.html += "</fieldset>";
		return this.html;
	};
}
//# sourceURL=stripe_uxAssetWidget_VBB