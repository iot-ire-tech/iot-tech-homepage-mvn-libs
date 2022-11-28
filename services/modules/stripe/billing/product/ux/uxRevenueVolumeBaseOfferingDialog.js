
var uxRevenueVolumeBaseOfferingDialog = function () {
	this.counter = 0;
	this.data = new Map();
	this.addInit = false;

	this.init = function (counter) {
		this.counter = counter;
		this.counter++;
		if (this.counter === 1) {
			this.addInit = true;
			this.counter = getRandInt(2, 100000)
			this.html = "<fieldset id=container_" + this.counter + ">";
			this.html += "<legend>Cost/Quanity Constraint... </legend><br>";

			this.html += "<br>";
			this.html += "<p>If this is a one-to-one trade then volumue is set to one!</p>";
			this.html += "<label><b>Quanity</b></label>";
			this.html += "<input id=quanity_" + this.counter + " class=\"cost w3-input w3-hover-grey\" value=yes type=\"number\" min=1 required />"

			this.html += "<br>";
			this.html += "<label><b>Enter a cost for this quanity amount</b></label>";
			this.html += "<input id=cost_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"number\" step='0.01' min='0.00' value='0.00' placeholder='0.00' required />"

			this.html += "<br>";
			this.html += "<label><b>What currency is to be applied</b></label>";
			this.html += "<select id=currency_" + this.counter + " class='w3-select w3-hover-grey'  required>"
			this.html += "<option disabled selected>Please Select</option>"
			this.html += "<option value=EUR>EUR</option>"
			this.html += "<option value=BPD>UK Pound</option>"
			this.html += "<option value=USD>US Dollar</option>"
			this.html += "<option value=>Request More Contact Support</option>"
			this.html += "</select>"

			this.html += "<br>";
			this.html += "<label><b>Supply a meaningful note for this rate</b></label>";
			this.html += "<input id=annotate_" + this.counter + " class=\"annotate w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. members only rate\" required />"

			this.html += "<br>";
			this.html += "<hr>";
			this.html += "<br>";
			this.html += "<label><b>Mark this offering as best price?</b></label>";
			this.html += "<input id=bestprice_" + this.counter + " class=\"bestprice w3-input w3-hover-grey\" value=yes type=\"checkbox\" placeholder=\"\" required />"


			this.html += "<br>";
			this.html += "<button id=btnAdd_" + this.counter + " class=\"addVolumeBasedBilling w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
			this.html += "<br>";
			this.html += "</fieldset>";
			this.saveId(this.counter);

			return this.html;
		}
	};


	this.add = function () {
		this.counter++;
		this.html = "<fieldset id=container_" + this.counter + ">";
		this.html += "<legend>Cost/Quanity Constraint... </legend><br>";


		this.html += "<br>";
		this.html += "<label><b>Quanity</b></label>";
		this.html += "<input id=quanity_" + this.counter + " class=\"cost w3-input w3-hover-grey\" value=yes type=\"number\" min=1 required />"


		this.html += "<br>";
		this.html += "<label><b>Cost</b></label>";
		this.html += "<input id=cost_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"number\" step='0.01' min='0.00' value='0.00' placeholder='0.00' required />"

		this.html += "<br>";
		this.html += "<label><b>Currency</b></label>";
		this.html += "<select id=currency_" + this.counter + " class='w3-select w3-hover-grey'  required>"
		this.html += "<option disabled selected>Please Select</option>"
		this.html += "<option value=EUR>EUR</option>"
		this.html += "<option value=BPD>UK Pound</option>"
		this.html += "<option value=USD>US Dollar</option>"
		this.html += "<option value=>Request More Contact Support</option>"
		this.html += "</select>"


		this.html += "<input hidden id=bestprice_" + this.counter + " class=\"bestprice w3-input w3-hover-grey\" value=no type=\"checkbox\" placeholder=\"\" required />"

		this.html += "<br>";
		this.html += "<label><b>Note</b></label>";
		this.html += "<input id=annotate_" + this.counter + " class=\"annotate w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. members only rate\" required />"





		this.html += "<br>";
		this.html += "<button id=btnAdd_" + this.counter + " class=\"addVolumeBasedBilling w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
		this.html += "<button id=btnDel_" + this.counter + " class=\"delVolumeBasedBilling w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";
		this.html += "<br>";
		this.html += "</fieldset>";


		this.saveId(this.counter);
		return this.html;
	};
	this.del = function (that) {
		var thisId = $(that).attr("id");
		thisId = parseInt(thisId.split("_")[1]);
// Delete Data
//		this.inputIdsArr.splice(thisId - 1, 1);
// Delete UX
		$("#container_" + thisId).empty().remove();

		this.removeId(thisId);

	};

	this.getCounter = function () {
		return this.counter;
	}

	this.saveId = function (counter) {
		this.data.set(counter,
			{
				"costId": "cost_" + counter,
				"quanityId": "quanity_" + counter,
				"currencyId": "currency_" + counter,
				"bestpriceId": "bestprice_" + counter,
				"annotateId": "annotate_" + counter
			})
	}
	this.removeId = function (counter) {
		this.data.delete(counter)
	}
	this.getIds = function (counter) {
		return Array.from(this.data.values())
	}



};
//# sourceURL=stripe_product_ux_volumenbasedbilling.js