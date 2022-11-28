/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var uxAssetSummaryWidgetObj = {
	"businessHours": [],
	"timebasedUsage": [],
	"capacity": -1,
	"tnc": false
}

var uxAssetPostNPackageListingShop = function () {
	this.counter = 0;
	this.uxAssetPostNPackageListing = {};

	this.init = function (uxAssetPostNPackageListingObj, productId) {
		this.counter = 0;
		this.uxAssetPostNPackageListing = uxAssetPostNPackageListingObj;
		if (this.uxAssetPostNPackageListing.shippable) {
			this.html = "<p>Select option which is right for you</p>";
			this.html += "<div class='w3-container'>";
			this.html += "<table border=1 class='w3-table-all w3-tiny'>";
			this.html += "<tr><th>Grade</th><th>Cost</th><th>Select</th></tr>";
			this.uxAssetPostNPackageListing.items.forEach(function (item) {
				this.html += "<tr>";
				if (item.cost === 0)
					this.html += "<td>" + item.annotate + "</td>";
				else {
					if (item.grade === "standard")
						this.html += "<td><i class=\"fa fa-truck\"></i>&nbsp;" + item.grade + "/" + item.annotate + "</td>";
					else if (item.grade === "expresss")
						this.html += "<td><i class=\"fa fa-plane\"></i>&nbsp;" + item.grade + "/" + item.annotate + "</td>";
					else if (item.grade === "inhouse")
						this.html += "<td><i class=\"fa fa-home\"></i>&nbsp;" + item.grade + "/" + item.annotate + "</td>";
					else if (item.grade === "sameday")
						this.html += "<td><i class=\"fa fa-bolt\"></i>&nbsp;" + item.grade + "/" + item.annotate + "</td>";
				}
				this.html += "<td>" + item.cost.toFixed(2) + " EUR</td>";
				// this.html += "<td>" + item.cost.toFixed(2) + " " + item.currency + "</td>";
				this.html += "<td>";
				// action_" + this.counter + "
//				this.html += "<input class=\"pnpOption w3-input w3-hover-grey\"  value=" + item.cost.toFixed(2) + " productIdRef=" + productId + " name=\"pnp_" + productId + "\" type=radio title=\"If you change your mind about PnP for this product, simple double click on it, or contact support\"/>";

				this.html += "<input ";
				this.html += "class=\"pnpOption w3-input w3-hover-grey\" ";
				this.html += "value=" + item.cost.toFixed(2) + " ";
				this.html += "grade=" + item.grade + " ";
				this.html += "cost=" + item.cost.toFixed(2) + " ";
				this.html += "annotate=" + item.annotate + " ";

				this.html += "productId=" + productId + " ";
				this.html += "name=\"pnp_" + productId + "\" ";

				this.html += "type=radio ";
				this.html += "title=\"If you change your mind about PnP for this product, simple double click on it, or contact support\" ";
				this.html += "/>";

				this.html += "</td>";
				this.html += "</tr>";
				this.counter++;
			}.bind(this));
			this.html += "</table>";
			this.html += "</div>";
			return this.html;
		} else {
			this.html = "<br>";
			this.html += "No Delivery Service Available<div style=\"text-shadow: 0 0 0 #21BA45;\">&#10062;</div>";
			this.html += "<br>";
			return this.html;
		}
	};
}

var uxAssetPostNPackageListing = function () {
	this.counter = 0;
	this.uxAssetPostNPackageListing = {};

	this.init = function (uxAssetPostNPackageListingObj) {
		this.counter = 0;
		this.uxAssetPostNPackageListing = uxAssetPostNPackageListingObj;
		if (uxAssetPostNPackageListing.length > 0) {
			this.html = "<p>The supplier is offering a post and package delivery service with this item. This is optional. If you opt-in, a charge will be applied to your account at post and delivery time.</p>";
			this.html += "<div class='w3-container'>";
			this.html += "<fieldset>";
			this.html += "<legend>Postal Delivery Charge Summary</legend><br>";
			this.html += "<label>The following prices have been applied to this asset. Please choose accordingly</label>";
			this.html += "<br>";
			this.html += "<br>";
			this.html += "<table border=1 class=w3-table-all>";
			this.html += "<caption>Post N Packaging Price List</caption>"
			this.html += "<tr><th>Delivery Grade</th><th>Cost</th><th>Currency</th><th>Comment</th><th>Interested?</th></tr>";
			this.uxAssetPostNPackageListing.forEach(function (item) {
				this.html += "<tr>";
				this.html += "<td>" + item.grade + "</td>";
//			this.html += "<td>" + convertNumberToDecimalPlaces(item.cost, 2) + "</td>";
				this.html += "<td>" + item.cost.toFixed(2) + "</td>";
				this.html += "<td>" + item.currency + "</td>";
				this.html += "<td>" + item.annotate + "</td>";
				this.html += "<td>";
				this.html += "<input class=\"pnpOption w3-input w3-hover-grey\" value=" + item.cost.toFixed(2) + "  grade=" + item.grade + "  currency=" + item.currency + "  annotate='" + item.annotate + "' name=pNp type=checkbox required />";
				this.html += "</td>";
				this.html += "</tr>";
				this.counter++;
			}.bind(this));
			this.html += "</table>";
			this.html += "<span id=uxAssetPnPWidgetMsg></span>"
			this.html += "<br>";
			this.html += "<button id=btnOptInPnp class=\" w3-btn w3-round-xxlarge w3-padding-large w3-green w3-right\" >Opt In</button>";
			this.html += "<button id=btnOptOutPnp class=\" w3-btn w3-round-xxlarge w3-padding-large w3-yellow w3-left\" >Opt Out</button>";
			this.html += "</fieldset>";
			this.html += "</div>";
			return this.html;
		} else {
			this.html = "<br>";
			this.html += "<fieldset>";
			this.html += "<legend>Postal Delivery Charge Summary</legend><br>";
			this.html += "<p>The supplier is not offering a post and package delivery service with this item.</p>";
			this.html += "<p>If you feel one is needed reach out to them.</p>";
			this.html += "<br>";
			this.html += "<br>";
			this.html += "</fieldset>";

			return this.html;
		}
	};
}


//# sourceURL=api_pnp_widget.js