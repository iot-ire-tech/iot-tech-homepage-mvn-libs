/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function UxPoCInline() {
	this.myclass = "customerListHook";
	this.title = "Primary Contact Owner";
	this.html = ""

	// Model
	this.build = function (htmlMembersCombo) {
		this.html = "<div >"
		this.html += "<fieldset>"
		this.html += "<legend><b>" + this.title + "</b></legend>"
		this.html += "<label>Members Listing</label>"
		this.html += htmlMembersCombo
		this.html += "<br>"
		this.html += "<br>"

		this.html += "<label>Name</label>"
		this.html += '<input class="w3-input w3-hover-grey  pocName" type="text" value="" required title=""/> <br>'
		this.html += "<label>Email</label>"
		this.html += '<input disabled class="w3-input w3-hover-grey pocEmail" type="email" value="" required title=""/> <br>'
		this.html += "<label>Phone</label>"
		this.html += '<input disabled class="w3-input w3-hover-grey pocPhone" type="tel" value="" required title=""/> <br>'
		this.html += "</fieldset>"

		this.html += ' </div>'
		return this;

	}
	this.getHtml = function () {
		return this.html;
	}
	return this;
}

//# sourceURL=api_poc_ux.js