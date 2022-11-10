/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var footer = "MyBusinessPal.Com";
var msghdlrRa = new Map();
var msghdlrMsgEnquiries = new Map();
var msghdlrNewsLetter = new Map();
var msghdlrBookings = undefined;

function loadMessageBoxUserPassordForget(cnt, clientId) {
	var msghdlr;

	var srvClient = new Client(bs.clientCtrl, "INIT: Client Registration");
	var clientRsp = srvClient.setPayload({"pk": {"id": clientId}}).queryByType("Q. Who am I?")[0]

	var msgBoxObj = {
		"divId": "modelPatron_" + getRand(),
		"btnOkId": "actionResetPassword",
		"color": "w3-blue",
		"header": "User Account: Forgot Password",
		"footer": clientRsp.company + " Account Management",
		"message": cnt
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelsTarget").after(msghdlr.getModel());

	return msghdlr;

}

function loadMessageBoxNewUser(cnt, clientId) {
	var msghdlr;

	var srvClient = new Client(bs.clientCtrl, "INIT: Client Registration");
	var clientRsp = srvClient.setPayload({"pk": {"id": clientId}}).queryByType("Q. Who am I?")[0]

	var msgBoxObj = {
		"divId": "modelPatron_" + getRand(),
		"btnOkId": "save",
		"color": "w3-blue",
		"header": "New User Registration",
		"footer": clientRsp.company + " Account Management",
		"message": cnt
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelsTarget").after(msghdlr.getModel());

	return msghdlr;

}


function loadMessageBoxResourceAvail(payloadObj) {
	var msghdlr;

	srvEntitiesDays.setPayload({"fk": {"id": payloadObj.pk.id}}).queryByType("Q. List By FkId?")
	var cnt = srvEntitiesDays.displayModal("Associated Business Hours Listing");

	var msgBoxObj = {
		"divId": "modelResourceAvailability" + payloadObj.pk.id,
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": cnt
	};
	msghdlr = new Modal(msgBoxObj).init();
//	$("#modelResourceAvailabilityTarget" + payloadObj.id).after(msghdlr.getModel());
	$("#modelResourceAvailabilityTarget" + payloadObj.pk.id).after(msghdlr.getModel());
	return msghdlr;
}


function loadMessageBoxResourceEnquiries(patronObj, resourceId) {

	var msghdlr;
	var msgBoxObj = {
		"divId": "modelResourceEnquiries" + resourceId,
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": loadOwnerCard({"patronObj": patronObj, "title": ""})
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelResourceEnquiriesTarget" + resourceId).after(msghdlr.getModel());
	return msghdlr;

}

function loadMessageBoxResourceNewsLetter(resourceObj) {
	var newsLetterObj = {
		hdr: "be the first to get the news on all things " + resourceObj.socialize.name,
		check: "Weekly NewsLetter",
		id: resourceObj.pk.id,
		section: "half"
	}
	html = newsLetterIt(newsLetterObj);


	var msghdlr;
	var msgBoxObj = {
		"divId": "modelResourceNewsLetter" + resourceObj.pk.id,
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": newsLetterIt(newsLetterObj)
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelResourceNewsLetterTarget" + resourceObj.pk.id).after(msghdlr.getModel());
	return msghdlr;

}

function loadMessageBoxMessaging(messageObj) {
	var html = "";
	html = "<br>"
	html += "<b>Date/Time: </b>" + getTodaysDate() + "<br>"
	html += "<b>Importance: </b>" + messageObj.message.importance + "<br>"
	html += "<b>Audiance: </b>" + messageObj.message.type + "<br>"
	html += "<hr>"
	html += "<b>Headline: </b>" + messageObj.message.headline + "<br>"
	html += "<hr>"
	html += "<b>Message Detail: </b>"
	html += messageObj.message.content;
	html += "<br>";

// End Of UX - Content

	var msghdlr;
	var msgBoxObj = {
		"divId": "modelPeriodicals" + messageObj.id,
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "<i class=\"fa fa-inbox\"></i> Info Point: Message Center",
		"footer": footer,
		"message": html
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelPeriodicalsTarget").after(msghdlr.getModel());
	return msghdlr;
}

function loadMessageBoxTour() {
	var html = "";
	html = "<br>"
	html = "<br>"
	html = "<iframe src=\"https://giphy.com/embed/8gZP1in4xeNyOFvLdU\" width=\"480\" height=\"270\" frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></iframe><p><a href=\"https://giphy.com/gifs/8gZP1in4xeNyOFvLdU\">via GIPHY</a></p>";
	html += "<br>";

// End Of UX - Content

	var msghdlr;
	var msgBoxObj = {
		"divId": "modelTour",
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": html
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelsTarget").after(msghdlr.getModel());
	return msghdlr;
}

function loadMessageBoxSupport() {
	var html = "";
	html += "<div class=\"w3-container w3-center\">"
	html += "<b>Breifly describe your issue, we will get back to your asap</b>";
	var supportRequest = `
      <h6>We are at your service</h6>
      <p>Please provide as accurate detail as possible, be it a issue or new feature request!</p>
      <hr>

      <br><br>
      <i class=\"fa fa-vcard\"></i>
      <label> Full Name </label>
      <input id=name type="text"></input>
      <span id=clientUsersHook></span>



      <br><br>
      <i class=\"fa fa-info\"></i>
      <label> Enter your request below... </label>
      <textarea rows=\"8\" >
Eg: I would like a add a new service......
Eg: I would like to see a flashing icon after I make a bookign......
      </textarea>


      <span id=msgResult></span>

`;
	html += supportRequest;
	html += "<br>";

//	html += "<label>Severity</label>";
//	html += "<select class=\"w3-select\" name=\"option\">";
//	html += "<option value=\"\" disabled selected >Please Select</option>";
//	html += "<option value=\"high\">High</option>";
//	html += "<option value=\"med\">Medium</option>";
//	html += "<option value=\"low\">Low</option>";
//	html += "</select>";

	html += "<br>";
	html += "<textarea rows=5> </textarea>";
	html += "<br>";
	html += "</div>";

// End Of UX - Content

	var msghdlr;
	var msgBoxObj = {
		"divId": "modelTour",
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": html
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelsTarget").after(msghdlr.getModel());
	return msghdlr;
}

function loadMessageBoxFeeback() {
	var html = "";
	html += "<div class=\"w3-container w3-center\">"
	html += "<br>";
	html += "<textarea rows=5> </textarea>";
	html += "<br>";
	html += "<b>Continuous Improvement is at the heart of what we do, thank your for your feedback</b>";
	html += "<br>";
	html += "</div>";

// End Of UX - Content

	var msghdlr;
	var msgBoxObj = {
		"divId": "modelTour",
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": html
	};
	msghdlr = new Modal(msgBoxObj).init();
	$("#modelsTarget").after(msghdlr.getModel());
	return msghdlr;
}


function loadMessageBoxBookings(cnt) {
	var html;
	html = "<div class=\"w3-container w3-center w3-padding-16\" >";
	html += "<table class=\"w3-table-all w3-small\" >";
	html += "<caption> Your Service Cart </caption>";
	html += cnt;
	html += "</table>";
	html += "</div>";
// End Of UX - Content

	var msghdlr;
	var msgBoxObj = {
		"divId": "modelBookings",
		"btnOkId": "btnReserveNow",
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": html
	};
	msghdlr = new Modal(msgBoxObj);
	msghdlr.setBtnText("Book Now").init();
	$("#modelsTarget").html(msghdlr.getModel());
	return msghdlr;
}

function loadMessageBoxBookingsEmpty() {
	var html;
	html = "<div class=\"w3-container w3-center w3-padding-16\" >";
	html += "<p>Your Shopping Cart is empty, browse activities to make bookings</p>";
	html += "</div>";
// End Of UX - Content

	var msghdlr;
	var msgBoxObj = {
		"divId": "modelBookings",
		"btnOkId": getRand(),
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": html
	};
	msghdlr = new Modal(msgBoxObj);
	msghdlr.setBtnText("Ok").init();
	$("#modelsTarget").html(msghdlr.getModel());
	return msghdlr;
}

function loadMessageBoxCardRegistration(html) {
// Importing Model

	var msghdlr;
	var msgBoxObj = {
		"divId": "modelBookings",
		"btnOkId": "modelCardRegistration",
		"color": "w3-blue",
		"header": cardSignUpHdr,
		"footer": tdr,
		"message": html
	};
	msghdlr = new Modal(msgBoxObj);
	msghdlr.setBtnText("Register").init();
	$("#modelsTarget").html(msghdlr.getModel());
	return msghdlr;
}

function loadMessageBoxWelcomeVid(branding, patron) {

//	if (branding.media.vid1.slideshow === true && localStorage.welcomeVidDisable !== "false") { }

	html = "<div class=\"w3-container w3-center\">";
	html += "<h5>" + branding.modal.headline + "</h5>";
	html += "<img src=\"" + location.origin + "/" + contextPath + "/resources/media/clients/" + branding.modal.icon.name + "\"/>";
	html += "<h6>Welcome " + patron.fname + ", enjoy your experience</h6>";
	html += "<p class=\"w3-center\">To enjoy video in full screen, double click it</p>"
	html += "<video autoplay controls id=myVideo width=300px height=300px >"
	html += "<source src=" + location.origin + "/" + contextPath + "/resources/media/clients/" + branding.modal.vid.name + " type=\"video/mp4\">"
	html += "</video>"
	html += "<br><label>Check if you dont want to see again </label>"
	html += "<input id=welcomeVidDisable type=checkbox >"
	html += "</div>"

// End Of UX



	var msghdlr;
	var msgBoxObj = {
		"divId": "modelBookings",
		"btnOkId": "endWelcome",
		"color": "w3-blue",
		"header": "this is a hdr",
		"footer": "this is a tdr",
		"message": html
	};
	msghdlr = new Modal(msgBoxObj);
	msghdlr.setBtnText("Ok").init();
	$("#modelsTarget").html(msghdlr.getModel());
//

	$('#myVideo').bind('ended', function () {
//		$(this).parent().fadeOut()
		document.getElementById('modelBookings').style.display = 'none'
		redirectMe(location.origin + contextPath + "/ux/client/portal/userPortal.jsp?clientId=" + patron.clientId + "&patronId=" + patron.pk.id);
	})
	$('#myVideo').on('click', function () {
		fullScreenIt($(this).attr("id"))
	});
	$('#welcomeVidDisable').on('click', function () {
		// Update Patron Object
		localStorage.setItem("welcomeVidDisable", false)
	});

	$(document).on("click", "#endWelcome", patron, function () {
		redirectMe(location.origin + contextPath + "/ux/client/portal/userPortal.jsp?clientId=" + patron.clientId + "&patronId=" + patron.pk.id);
	});


	return msghdlr;

}

function getContentMessagingOrg(msghdlr, amessage) {
	var html = "";
	html = "<br>"
	html += "<b>Date/Time: </b>" + getTodaysDate() + "<br>"
	html += "<b>Importance: </b>" + amessage.message.importance + "<br>"
	html += "<b>Audiance: </b>" + amessage.message.type + "<br>"
	html += "<hr>"
	html += "<b>Headline: </b>" + amessage.message.headline + "<br>"
	html += "<hr>"
	html += "<b>Message Detail: </b>"
	html += amessage.message.content;
	html += "<br>";

	msghdlr.setMessage(html);
	html = msghdlr.init().getModel();
	$("#modelPeriodicalsTarget").html(html);
	msghdlr.open();
}


/*
 *
 *  News Letter Builder
 *
 */




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

//# sourceURL=ux_models.js