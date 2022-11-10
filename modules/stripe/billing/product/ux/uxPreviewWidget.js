
var uxPreviewWidget = function () {
	this.counter = 0;
	this.html = "";
	this.model = {
		"entityType": "Asset"
	};
	this.init = function (counter) {
		this.counter = counter;
		this.counter++;
		if (this.counter === 1) {
			this.html = "<fieldset id=container_" + this.counter + ">";
			this.html += "<legend>" + this.model.entityType + " Preview</legend>";
			this.html += "<br>";
			this.html += "<span>Profile</span><br>";
			this.html += "<label>Alias:" + this.model.name + "</label>";
			this.html += "<br>";
			this.html += "<label>description:" + this.model.description + "</label>";

			if (this.model.entityType === "asset") {
				this.html += "<hr>";
				this.html += "<label>scope:" + this.model.scope + "</label><br>";
				this.html += "<br>";
				this.html += "<span>Asset Detail</span><br>";
				this.html += "<label>shippable:" + this.model.shippable + "</label><br>";
				this.html += "<label>pnpCosts:" + this.model.pnpCosts + "</label><br>";
			}


			this.html += "<hr>";
			this.html += "<span>Point Of Contact</span><br>";
			this.html += "<label>fullName:" + this.model.fullName + "</label><br>";
			this.html += "<label>emailPoc:" + this.model.emailPoc + "</label><br>";
			this.html += "<label>phonePoc:" + this.model.phonePoc + "</label><br>";

			// Resell mode....
			if (this.model.entityType === "event") {
				this.html += "<hr>";
				this.html += "<span>Inventory Management(Asset)</span><br>";
				this.html += "<label>unitsTotal:" + this.model.unitsTotal + "</label><br>";
				this.html += "<label>unitsLower:" + this.model.unitsLower + "</label><br>";
				this.html += "<label>unitsUpper:" + this.model.unitsUpper + "</label><br>";
				this.html += "<label>emailInventory:" + this.model.emailInventory + "</label><br>";
				this.html += "<label>smsInventory:" + this.model.smsInventory + "</label><br>";
				this.html += "<label>alertInventory:" + this.model.alertInventory + "</label><br>";
			}

			this.html += "<hr>";
			this.html += "<span>Revenue Management</span><br>";
			this.html += "<label>cost:" + this.model.cost + " EUR</label><br>";
			this.html += "<label>couponId:" + this.model.couponId + "% </label><br>";
			this.html += "<label>tnc:" + this.model.tnc + "</label><br>";

			this.html += "<hr>";
			this.html += "<span>Social Media </span><br>";
			if (this.model.entityType === "store") {
				if (this.model.imageEvent1.length > 0)
					this.html += "<label>image#1:" + this.model.imageStore1 + "</label><br>";
				else
					this.html += "<label>image#1:" + this.model.imageStore1 + "</label><br>";

				if (this.model.imageEvent2.length > 0)
					this.html += "<label>image#2:" + this.model.imageStore2 + "</label><br>";
				else
					this.html += "<label>image#2:" + this.model.imageStore2 + "</label><br>";

				if (this.model.imageEvent2.length > 0)
					this.html += "<label>image#3:" + this.model.imageStore3 + "</label><br>";
				else
					this.html += "<label>image#3:" + this.model.imageStore3 + "</label><br>";
			}

			if (this.model.entityType === "activity") {
				if (this.model.imageEvent1.length > 0)
					this.html += "<label>image#1:" + this.model.imageActivity1 + "</label><br>";
				else
					this.html += "<label>image#1:" + this.model.imageActivity1 + "</label><br>";

				if (this.model.imageEvent2.length > 0)
					this.html += "<label>image#2:" + this.model.imageActivity2 + "</label><br>";
				else
					this.html += "<label>image#2:" + this.model.imageActivity2 + "</label><br>";

				if (this.model.imageEvent2.length > 0)
					this.html += "<label>image#3:" + this.model.imageActivity3 + "</label><br>";
				else
					this.html += "<label>image#3:" + this.model.imageActivity3 + "</label><br>";
			}

			if (this.model.entityType === "event") {
				if (this.model.imageEvent1.length > 0)
					this.html += "<label>image#1:" + this.model.imageEvent1 + "</label><br>";
				else
					this.html += "<label>image#1:" + this.model.imageEvent1 + "</label><br>";

				if (this.model.imageEvent2.length > 0)
					this.html += "<label>image#2:" + this.model.imageEvent2 + "</label><br>";
				else
					this.html += "<label>image#2:" + this.model.imageEvent2 + "</label><br>";

				if (this.model.imageEvent2.length > 0)
					this.html += "<label>image#3:" + this.model.imageEvent3 + "</label><br>";
				else
					this.html += "<label>image#3:" + this.model.imageEvent3 + "</label><br>";
			}

			this.html += "<hr>";
			try {
				this.model.blackListedAccountHolders.forEach(function (accountId) {
					this.html += "<label>accountId:" + accountId + "</label><br>";
				})
			} catch (e) {

			}


			this.html += "<br>";
			this.html += "<button id=continueEditing class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green w3-middle\" >Continue Editing</button>";
//			this.html += "<button id=save            class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >Save</button>";
			this.html += "<br>";
			this.html += "</fieldset>";
			return this.html;
		}
	};


};
//# sourceURL=stripe_product_ux_entity_previewing.js