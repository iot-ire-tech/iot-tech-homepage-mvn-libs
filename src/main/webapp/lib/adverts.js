/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function addAdvert(pubId, slotId) {




	html = ""
	html += "<script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>"
	html += "<ins class=\"adsbygoogle\""
	html += "style=\"display:block\""
	html += "data-ad-client=\"ca-pub-6158262624303549\""
	html += "data-ad-slot=\"8328011038\""
	html += "data-ad-format=\"auto\""
	html += "data-full-width-responsive=\"true\"></ins>"
	html += "<script>"
	html += "(adsbygoogle = window.adsbygoogle || []).push({});"
	html += "</script>"

	return html;
}