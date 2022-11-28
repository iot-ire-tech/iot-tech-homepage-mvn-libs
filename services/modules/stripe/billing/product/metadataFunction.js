
var metaDataFunc = function () {
	this.counter = 0;
	this.data = [];

	this.init = function () {
		this.counter++;
		this.html = "<fieldset id=container_" + this.counter + ">";

		this.html += "<label><b>Key</b></label>";
		this.html += "<input id=key_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"text\" value=\"\" required />"
		this.html += "<label><b>Value</b></label>";
		this.html += "<input id=val_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"text\" value=\"\" required />"

		this.html += "<button id=btnAdd_" + this.counter + " class=\"add w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
		this.html += "</fieldset>";
		this.saveId(this.counter);

		return this.html;
	};


	this.add = function () {
		this.counter++;
		this.html = "<fieldset id=container_" + this.counter + ">";

		this.html += "<label><b>Key</b></label>";
		this.html += "<input id=key_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"text\" value=\"\" required />"
		this.html += "<label><b>Value</b></label>";
		this.html += "<input id=val_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"text\" value=\"\" required />"

		this.html += "<button id=btnAdd_" + this.counter + " class=\"add w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
		this.html += "<button id=btnDel_" + this.counter + " class=\"del w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";
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
		this.data.push(
			{
				"keyId": "key_" + counter,
				"valId": "val_" + counter
			})
	}
	this.removeId = function (counter) {
		this.data.splice(counter - 1, 1)
	}
	this.getIds = function (counter) {
		return this.data
	}



};
//# sourceURL=stripe_product_funcs_timemgt.js