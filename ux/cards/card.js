/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function cardBuilder(cardObj) {

	;
	html = "<div id=\"welcomeCard\" class=\"w3-padding-8 w3-card\" style=\" margin-left:20px; max-width:250px; " + cardObj.style + "\">";
	html = "<div  id=\"welcomeCard\" class=\"w3-padding-8 w3-card\" style=\"max-width:250px; " + cardObj.style + "\">";

	html += "<div class=\"w3-container w3-center\">";
	html += cardObj.cnt;
	html += "</div>";
	html += "</div>";

	$("#" + cardObj.attachId).replaceWith(html);
//	$("#" + cardObj.attachId).fadeOut("slow");

	return html;
}
function addHeader(cnt) {

	html = "<header class=\"w3-container w3-light-grey\">";
	html += cnt;
	html += "</header>";

	return html;

}
function addSecion(cnt) {

	html = "<div class=\"w3-section\">";
	html += cnt;
	html += "</div>";

	return html;
}
