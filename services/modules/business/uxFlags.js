

var widgetFlags = function () {
	this.counter = 0;
	this.data = [];
	this.html = "";
	this.id = "";

	this.init = function (countries) {

		this.html = "<select class='w3-select'>"
		this.html += "<option selected>Please Select</option>"
//		this.html += "<option><i class='ae flag'></i></option>"
		this.html += "<option>English</option>"
		this.html += "</select>"

		return this.html;
	};
};


var widgetCurrency = function () {
	this.counter = 0;
	this.data = [];
	this.html = "";
	this.id = "";

	this.init = function (countries) {

		this.html = "<select class='w3-select'>"
		this.html += "<option selected>Please Select</option>"
		this.html += "<option>EURO</option>"
		this.html += "<option disabled>Pound</option>"
		this.html += "</select>"

		return this.html;
	};
};
//# sourceURL=stripe_business_ux_flags.js"