


var uxFollowMeWidget = function () {
	this.counter = 0;




	this.init = function (offering, accountId, productId, customerId) {
		this.offering = offering;
		this.accountId = accountId;
		this.productId = productId;
		this.customerId = customerId;

		this.html = "<div class='w3-container w3-center'>"
		this.html += "<h3>Get alerts of any upcoming videos, from this organizer</h3>"
		this.html += "<br>"
		this.html += "<span>By clicking okay, you are agreeing to receive marketing emails and notifications about creators you follow so that you don’t miss out.</span> "
		this.html += "<br>"
		this.html += "<br>"
		this.html += "<div class=w3-row>"

		this.html += "<div class=w3-half>"
		this.html += "<button class='w3-button alertsNo'>No Thanks</button>"
		this.html += "</div>"

		this.html += "<div class=w3-half>"
		this.html += "<button  class='w3-button alertsYes' offering=" + this.offering + " accountId=" + this.accountId + " productId=" + this.productId + " customerId=" + this.customerId + ">Okay</button>"
		this.html += "</div>"

		this.html += "</div>"
		this.html += "</div>"
		this.html += "<br>"


		return this;
	};
	this.addHeader = function () {
		return this;
	};
	this.addFooter = function () {
		return this;
	};
	this.getHtml = function () {
		return this.html;
	};
};

//# sourceURL=api_followme_ux.js