/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Modal {
	constructor(msgBoxObj) {
		this.msgBoxObj = msgBoxObj;
		return this;
		this.btnText = "Ok";
	}

	init() {
		if (this.color === undefined)
			this.color = "w3-teal";
		this.zindex = 1;
		this.html = "<div id=\"" + this.msgBoxObj.divId + "\" class=\"w3-modal\" style=\"z-index: " + this.zindex + "\">";
		this.html += "<div class=\"w3-modal-content w3-animate-top w3-card-4\">";
		this.html += "<header class=\"w3-container " + this.msgBoxObj.color + "\"> ";
		this.html += "<span onclick=\"document.getElementById('" + this.msgBoxObj.divId + "').style.display = 'none'\" class=\"w3-button w3-display-topright\">&times;</span>";
		this.html += "<h5>" + this.msgBoxObj.header + "</h5>";
		this.html += "</br>";
		this.html += "</header>";
		this.html += "<div  class=\"w3-container\">";
		this.html += "<br>";
		this.html += "<span id=\"messageBox" + this.msgBoxObj.divId + "\"></span>";
		this.html += this.msgBoxObj.message;
		this.html += "<span id=\"exitMsg_" + this.msgBoxObj.divId + "\"></span>";
		this.html += "<br>";
		if (this.getBtnText() === undefined)
			this.html += "<button id=" + this.msgBoxObj.btnOkId + " onclick=\"document.getElementById('" + this.msgBoxObj.divId + "').style.display = 'none'\" class=\"w3-btn w3-round-xxlarge w3-padding-large " + this.msgBoxObj.color + " w3-right\" >Ok</button>";
		else
			this.html += "<button id=" + this.msgBoxObj.btnOkId + " onclick=\"document.getElementById('" + this.msgBoxObj.divId + "').style.display = 'none'\" class=\"w3-btn w3-round-xxlarge w3-padding-large " + this.msgBoxObj.color + " w3-right\" >" + this.getBtnText() + "</button>";
		this.html += "<br>";
		this.html += "<br>";
		this.html += "<br>";
		this.html += "</div>";
		this.html += "<footer class=\"w3-container " + this.msgBoxObj.color + "\">";
		this.html += "</br>";
		this.html += "<p>" + this.msgBoxObj.footer + "</p>";
		this.html+= "</br>";
		this.html += "</footer>";
		this.html += "</div>";
		this.html += "</div>";
		return this;
	}
	open() {
		document.getElementById(this.msgBoxObj.divId).style.display = "block";
	}
	close() {
		document.getElementById(this.msgBoxObj.divId).style.display = "none";
	}
	getModel() {
		return this.html;
	}
	showModel() {
		//console.log("INF : Model:(" + this.msgBoxObj.html + ")");
	}
	setHeader(header) {
		this.msgBoxObj.header = header;
		return this;
	}
	setColor(color) {
		this.msgBoxObj.color = color;
		return this;
	}
	setBtnText(text) {
		this.btnText = text;
		return this;
	}
	getBtnText() {
		return this.btnText;
	}
	setMessage(message) {
		this.msgBoxObj.message = message;
		return this;
	}
	setFooter(footer) {
		this.msgBoxObj.footer = footer;
		return this;
	}
	setBtnOkId(id) {
		this.msgBoxObj.btnOkId = id;
		return this;
	}
	setDivId(id) {
		this.msgBoxObj.divId = id;
		return this;
	}
}
