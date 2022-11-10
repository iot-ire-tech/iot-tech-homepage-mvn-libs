/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");
var mytable = new tableDataFunc();
var mycart = new cartFunc();
var items = [];
var payload = {}

$(document).ready(function () {
	if (accountId === null)
		accountId = ""
// Branding
	try {
		var brandingSrv = new BrandingPage(bs.brandCtrl, "INIT");
		modelPatronRsp = srvPatron.setPayload({"pk": {"id": patronId}}).queryByType("Q. Who am I?")[0]
		if (srvPatron.answer()) {
			// Females / 40 exist, but is there brandins.
			brandingSrv.setPatron(modelPatronRsp);
			brandingSrv.setFavIcon();
			brandingSrv.setTitle();
			brandingSrv.setHeader("image");
		} else {

		}
	} catch (e) {
		tmp = location.origin + "/" + contextPath + "resources/media/clients/673859/image/hdr1/483400_football-2016_header.jpg";
		html = "<img src=" + tmp + " class=\"w3-container w3-center\" style=\"width:100%; height: 170px;\" alt=\"No Banner Pic\">";
		$("#header").html(html)
		$("#footer").html(html)

	}


// Add Card
	cart : {
		$("#cartHook").after(mycart.init("cart").addHeader().addHeaderItems().addItemHook().addFooterItems().addFooter().getCart())
		var stickiness = "position: -webkit-sticky;"
		stickiness += "position: fixed;"
		stickiness += "top: 20%;"
//	stickiness += "top: 0;"
		stickiness += "left: 85%;"
		stickiness += "width:13%;"
		var visual = "background-color: white; "
		visual += "padding: 5px; "
		$(".staycenter_right ").attr("style", stickiness + " " + visual)

	}
// Get Shopping For Primary Account Holder

	platformShop: {
		modelContext = {
			...modelUx
		}
		payload = {
			"accountId": accountId,
			...modelContext
		};
		items = postRequest("ProductGetAll", payload)
		$("#shop").html(mytable.init(items, accountId).addHeader().addBody().addFooter().getTable())
		// #bababc
		html = '<div class="w3-panel w3-light-gray ">'
		html += "<span>Shop Owner: " + accountName(accountId) + " </span>"
		html += '<div>'
		$("#hdr_" + accountId).html(html)
		$("#hdr_" + accountId).html(html)
	}

//
//
//
//
//
// Next Get Shopping For Affiliates
	accountRsp = postRequest("AccountGet", payload).metadata;
	for (key in accountRsp) {
		if (key !== "total") {
// Get Products For This Account
			accountId = accountRsp[key]
			payload = {
				"accountId": accountId,
				...modelContext
			};
			items = postRequest("ProductGetAll", payload)
// Build Table
			$("#shop").after(mytable.init(items, accountId).addHeader().addBody().addFooter().getTable())
			html = '<div class="w3-panel w3-light-gray">'
			html += "<span>Shop Owner: " + accountName(accountId) + " </span>"
			html += '<div>'
			$("#hdr_" + accountId).html(html)
			$("#shop").after("<br>")
			$("#shop").after("<br>")
			$("#shop").after("<br>")
			$("#shop").after("<br>")
		}
	}

	setTimeout(function () {
//		$('#ashop').empty()
		html = '<div class="w3-container w3-text w3-center w3-border-red">'
		html += '<br>'
		html += '<h3> Shopping Mall Experience</h3>'
		html += '<h5><i> Sportsco Sports & Leisure </i></h5>'
		html += '<br>'
		html += '</div>'
		$("#banner").html(html)
		$('.display').DataTable();
		$('.display tbody').on('click', 'tr', function () {
			$(this).toggleClass('selected');
		});
		clearInterval();
	}, 100)

});
function ratings(max) {
//	.checked {
//		color: orange;
//	}
	html = ""
	for (i = 1; i <= max; i++) {
		html += "<span class='fa fa-star checked'></span>"
	}
	for (i = max; i <= 5; i++) {
		html += "<span class='fa fa-star '></span>"
	}
	return html;
}

//# sourceURL=stripe_shop_init.js


