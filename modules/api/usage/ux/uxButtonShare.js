/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click ", '.btnShareX', function () {


	var productId = $(this).attr("productId")
	var accountId = $(this).attr("accountId")
	var description = $(this).attr("description")
	var title = $(this).attr("atitle")
	var hashtags = $(this).attr("tag")

//<button class="ui circular facebook icon button">
//	<i class="facebook icon"></i>
//</button>
//<button class="ui circular twitter icon button">
//	<i class="twitter icon"></i>
//</button>
//<button class="ui circular linkedin icon button">
//	<i class="linkedin icon"></i>
//</button>
//<button class="ui circular google plus icon button">
//	<i class="google plus icon"></i>
//</button>

	var html = ""
	html += "<div class='w3-container w3-center'>"
	html += "<h3>Organizers love to see their content shared, they thank you! </h3>"
	html += "<h5>This also help us increase our customer base, so thanks again!!</h5>"
	html += "<br>"
	html += "<span>Click on any of the icons below to share them</span> "
	html += "<br>"
	html += "<br>"
	html += "<div class='w3-row w3-border'>"

	html += "<div class=w3-quarter>"
	html += "<br>"
//	html += "<i class=\"facebook icon facebookShare \"  accountId=" + accountId + "  productId=" + productId + "  atitle=" + title + "  hashtags=" + hashtags + "></i>&nbsp;"
	html += "<i class=\"fa fa-facebook-square facebookShare fa-3x\"  accountId=" + accountId + "  productId=" + productId + "  atitle=" + title + "  hashtags=" + hashtags + "></i>&nbsp;"
	html += "<br>"
	html += "Facebook"
	html += "</div>"

	html += "<div class=w3-quarter>"
	html += "<br>"
	html += "<i class=\"fa fa-facebook facebookMsgShare fa-3x\" accountId=" + accountId + "  productId=" + productId + " atitle=" + title + " hashtags=" + hashtags + "></i>&nbsp;"
	html += "<br>"
	html += "Messenager"
	html += "</div>"

	html += "<div class=w3-quarter>"
	html += "<br>"
	html += "<i class=\"fa fa-twitter twitterShare fa-3x\"  accountId=" + accountId + "  productId=" + productId + " description= " + description + " atitle=" + title + " hashtags=" + hashtags + "></i>&nbsp;"
	html += "<br>"
	html += "Twitter"
	html += "</div>"

	html += "<div class=w3-quarter>"
	html += "<br>"
	html += "<i class=\"fa fa-linkedin-square linkedInShare fa-3x\"  accountId=" + accountId + "  productId=" + productId + "  atitle=" + title + " hashtags=" + hashtags + "></i>&nbsp;"
	html += "<br>"
	html += "LinkedIn"
	html += "</div>"

	html += "<div class=w3-quarter>"
	html += "<br>"
	html += "<i class=\"fa fa-envelope emailShare fa-3x\" accountId=" + accountId + "  productId=" + productId + " description= " + description + " atitle=" + title + " hashtags=" + hashtags + "></i>&nbsp;"
	html += "<br>"
	html += "Email"
	html += "</div>"

	html += "</div>"
	html += "</div>"
	html += "<br>"

	$("#dialogShareHook").html(html);
	$("#dialogShare").dialog(dialogueProps);

// Update Data with Id of customer..
});


//# sourceURL=stripe_business_button_share.js