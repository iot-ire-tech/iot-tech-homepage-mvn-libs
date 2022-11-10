var uxShareWidget = function () {
	this.counter = 0;
	this.html = "";
	this.init = function (id) {
		this.id = id;
		return this;
	};

	this.getHtml = function () {
		return this.html;
	};


};

//# sourceURL=api_social_share_ux.js