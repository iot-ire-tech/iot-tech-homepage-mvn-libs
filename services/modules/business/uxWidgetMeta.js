var metaFunc = function () {
	this.counter = 0;
	this.data = [];
	this.html = "";
	this.id = "";
	this.init = function (id) {
		this.id = id;
		return this;
	};
	this.addHeader = function () {
		this.html = "<div class='cart staycenter_left w3-container'>"
		this.html += "<table class='w3-table' BORDER=1 style=\"border: rgba(211, 211, 211, .2);\" > "
		this.html += "<caption><b><i class=\"thumbtack icon\"></i>Session Information<b></caption>"
		return this;
	}
	this.addBody = function () {
		this.html += "<tr>"
		this.html += "<td>"
		this.html += "Language <i class='ie flag'></i>"
		this.html += "</td>"
		this.html += "<td>"
		this.html += "<span id=flagsHook></span>"
		this.html += "</td>"
		this.html += "</tr>"

		this.html += "<tr>"
		this.html += "<td>"
		this.html += "Currency <i class=\"currency icon\"></i>"
		this.html += "</td>"
		this.html += "<td>"
		this.html += "<span id=currencyHook></span>"
		this.html += "</td>"
		this.html += "</tr>"

		this.html += "<tr>"
		this.html += "<td>"
		this.html += "Client <i class=\"building icon\"></i>"
		this.html += "</td>"
		this.html += "<td>"
		this.html += "<span id=clientName> </span>"
		this.html += "</td>"
		this.html += "</tr>"

		this.html += "<tr>"
		this.html += "<td>"
		this.html += "Username <i class=\"user outline icon\"></i>"
		this.html += "</td>"
		this.html += "<td>"
		this.html += "<span id=customerName> </span>"
		this.html += "</td>"
		this.html += "</tr>"


		this.html += "<tr>"
		this.html += "<td>"
		this.html += "Todays Date <i class=\"calendar alternate outline icon\"></i>"
		this.html += "</td>"
		this.html += "<td>"
		this.html += "<span id=loginDate> </span>"
		this.html += "</td>"
		this.html += "</tr>"

		this.html += "<tr>"
		this.html += "<td>"
		this.html += "Inbox <i class=\"calendar alternate outline icon\"></i> "
		this.html += "</td>"
		this.html += "<td>"
		this.html += "<span id=msgHook>No messages!</span>"
		this.html += "</td>"
		this.html += "</tr>"
		return this;
	}
	this.addFooter = function () {
		this.html += "</table>"
		this.html += "</div>"
		return this;
	};


	this.getWidget = function () {
		return this.html;
	};
}


//# sourceURL=stripe_business_funcs_meta.js