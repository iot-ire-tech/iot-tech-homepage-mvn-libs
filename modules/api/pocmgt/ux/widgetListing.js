/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function UxPoCListing() {
	this.html = ""

	// Model
	this.build = function () {

		this.html = "<div class=" + this.myclass + ">"

		this.html += ' </div>'
		return this;

	}
	this.getHtml = function () {
		return this.html;
	}
	return this;
}

//# sourceURL=api_poc_widget_listing.js