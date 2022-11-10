

var widgetFooterBlueChips = function () {
	this.counter = 0;
	this.data = [];
	this.html = "";
	this.id = "";
	this.init = function (countries) {

		this.html = '<button class="ui facebook button">'
		this.html += '<i class="facebook icon"></i>'
		this.html += 'Facebook'
		this.html += '</button>'
		this.html += '<button class="ui twitter button">'
		this.html += '<i class="twitter icon"></i>'
		this.html += 'Twitter'
		this.html += '</button>'
		this.html += '<button class="ui google plus button">'
		this.html += '<i class="google plus icon"></i>'
		this.html += 'Google Plus'
		this.html += '</button>'
		this.html += '<button class="ui vk button">'
		this.html += '<i class="vk icon"></i>'
		this.html += 'VK'
		this.html += '</button>'
		this.html += '<button class="ui linkedin button">'
		this.html += '<i class="linkedin icon"></i>'
		this.html += 'LinkedIn'
		this.html += '</button>'
		this.html += '<button class="ui instagram button">'
		this.html += '<i class="instagram icon"></i>'
		this.html += 'Instagram'
		this.html += '</button>'
		this.html += '<button class="ui youtube button">'
		this.html += '<i class="youtube icon"></i>'
		this.html += 'YouTube'
		this.html += '</button>'

		return this.html;
	};
};
//# sourceURL=stripe_business_ux_bluechips.js"