/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parseInt(parsedUrl.searchParams.get("clientId"));
var patronId = parseInt(parsedUrl.searchParams.get("patronId"));

var username;
var password;



$(document).ready(function () {


	localStorage.client = "";

// Once body is loaded, you can insert model
//	url = location.origin + contextPath + "/services/authentication/ux/authenticate.html"
//	$("#authenticationWidgetTarget").html(url)
//	new PageLoad(url, "authenticationWidgetTarget", "n/a").put()

	$('#username').val('')
	$('#password').val('')


// Generic or IOT
	if (document.URL.includes("login.jsp")) {
		var brandingSrv = new BrandingPage(bs.brandCtrl, "INIT");

		branding = brandingGenericWorkFlow(brandingSrv);

		//console.table(branding);
		brandingSrv.queryByType("Q. List all?");

		if (brandingSrv.answer()) {
			brandingSrv.setFavIcon();
			brandingSrv.setTitle();
			brandingSrv.setHeaderFooter("image");
		}
	}


});


//# sourceURL=auth_init.js