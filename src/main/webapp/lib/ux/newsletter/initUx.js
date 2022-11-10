/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {

	var newsLetterObj = {
		hdr: "be the first to get the news on all things squash",
		check: "Weekly NewsLetter",
		id: 1,
		tdr: ""
	}
	$("#newsLetterHook").html(newsLetterIt(newsLetterObj));


});


function header(newsletterObj) {
	var html = "";
	html += "<div class=\"w3-container w3-light-grey w3-padding-16\">";
	html += "<h2>Subscribe to our Newsletter</h2>";
	html += "<p>" + newsletterObj.hdr + "</p>";
	html += "</div>";
	return html;
}

function body(newsletterObj) {

	var html = "";
	html = "<div class=\"w3-container\" style=\"background-color:white\">";
	html += "<input class=\"w3-input w3-padding-16\" type=\"text\" placeholder=\"Name\" name=\"name\" required>";
	html += "<input  class=\"w3-input w3-padding-16\" type=\"text\" placeholder=\"Email address\" name=\"mail\" required>";
	html += "<label>";
	html += "<input  class=\"w3-check\" type=\"checkbox\" checked=\"checked\" name=\"subscribe\">" + newsletterObj.check + "";
	html += "</label>";
	html += "</div>";
	return html;
}

function trailer(newsletterObj) {
	var html = "";
	html += "<div class=\"w3-container w3-light-grey w3-padding-16\">";
	html += "<button id=\"newsLetter\"" + newsletterObj.id + " class=\"w3-button w3-right w3-" + btnColor + "\">Subscribe</button>";
	html += "</div>";
	return html;
}

function newsLetterIt(newsletterObj) {
	var html;
	html = "<div class=\"w3-container \">";
	html += header(newsletterObj);
	html += body(newsletterObj);
	html += trailer(newsletterObj);
	html += "</div>";

	return html;
}