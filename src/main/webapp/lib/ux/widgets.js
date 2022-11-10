/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function  addWidgetMember(event) {
	html = "<div class=containerMembers>";
	html += "<br>";
	html += "<span id=\"hereplease\"></span>";
	html += "<button id=" + event.data.saveId + " class=\"w3-btn w3-round-xxlarge w3-padding-large w3-gray w3-right\">Save</button>";
	html += "<button class=\"deleteMember w3-btn w3-round-xxlarge w3-padding-large w3-gray w3-left\"  >Cancel</button>";
	html += "<br>";
	html += "</div>";
	$("#" + event.data.putId).html(html);

//	queryPatronByClientId(clientId);
	tmpObj = new crudIt(bs.patronCtrl, "Client Patrons List")
		.setPayload("{\"clientId\":" + clientId + "}")
		.query()
	$("#hereplease").html(new uxSelect(tmpObj, "membersLookupListSubEvents", "Please Select").setSize(5).setMultiple().init().getHtml());
}

function  addWidgetLocation(event) {
	html = "<div class=containerLocation>";
	html += "<br>";
	html += "<label>Name</label><input class=\"w3-input w3-hover-grey newlocation\" >";
	html += "<br>";
	html += "<button id=" + event.data.saveLocationId + " class=\"w3-btn w3-round-xxlarge w3-padding-large w3-gray w3-right\">Save</button>";
	html += "<button class=\"deleteLocation w3-btn w3-round-xxlarge w3-padding-large w3-gray w3-left\"  >Cancel</button>";
	html += "<br>";
	html += "</div>";
	$("#" + event.data.here).html(html);
}
function  addWidgetCost(event) {
	html = "<div class=containerSubEventCost>";

	html += "<div class=w3-row>";

	html += "<div class=w3-quarter>";
	html += "<label>Duration</label><input class=\"w3-input w3-hover-grey \" id=newSubEventDuration >";
	html += "</div>";

	html += "<div class=w3-quarter>";
	html += "<label>Cost</label><input class=\"w3-input w3-hover-grey \"  id=newSubEventCost>";
	html += "</div>";

	html += "<div class=w3-quarter>";
	html += "<label>Currency</label><input class=\"w3-input w3-hover-grey \"  id=newSubEventCurrency>";
	html += "</div>";

	html += "<div class=w3-quarter>";
	html += "<label>Tag</label><input class=\"w3-input w3-hover-grey \"  id=newSubEventTag>";
	html += "</div>";

	html += "</div>";

	html += "<br>";
	html += "<button id=" + event.data.saveId + " class=\"w3-btn w3-round-xxlarge w3-padding-large w3-gray w3-right\"  >Save</button>";
	html += "<button class=\"deleteSubEventCost w3-btn w3-round-xxlarge w3-padding-large w3-gray w3-left\"  >Cancel</button>";
	html += "</div>";
	html += "<br>";
	$("#" + event.data.putId).after(html);
}
function uxColorSelection(id, hereId) {
	var html;

	html = "<select id=" + id + " class=\"w3-select\">";
	html += "<option value=0 disabled selected>Please Choose</option>";
	html += "<option value=w3-text-amber>amber</option>"
	html += "<option value=w3-text-aqua>aqua</option>"
	html += "<option value=w3-text-blue>blue</option>"
	html += "<option value=w3-text-light-blue>light-blue</option>"
	html += "<option value=w3-text-brown>brown</option>"
	html += "<option value=w3-text-cyan>cyan</option>"
	html += "<option value=w3-text-blue-grey>blue-grey</option>"
	html += "<option value=w3-text-green>green</option>"
	html += "<option value=w3-text-light-green>light-green</option>"
	html += "<option value=w3-text-indigo>indigo</option>"
	html += "<option value=w3-text-khaki>khaki</option>"
	html += "<option value=w3-text-lime>lime</option>"
	html += "<option value=w3-text-orange>orange</option>"
	html += "<option value=w3-text-deep-orange>deep-orange</option>"
	html += "<option value=w3-text-pink>pink</option>"
	html += "<option value=w3-text-purple>purple</option>"
	html += "<option value=w3-text-deep-purple>deep-purple</option>"
	html += "<option value=w3-text-red>red</option>"
	html += "<option value=w3-text-sand>sand</option>"
	html += "<option value=w3-text-teal>teal</option>"
	html += "<option value=w3-text-yellow>yellow</option>"
	html += "<option value=w3-text-white>white</option>"
	html += "<option value=w3-text-black>black</option>"
	html += "<option value=w3-text-grey>grey</option>"
	html += "<option value=w3-text-light-grey>light-grey</option>"
	html += "<option value=w3-text-dark-grey>dark-grey</option>"

	html += "</select>";

	$("#" + hereId).html(html);
}
function uxFontSelection(id, hereId) {
	var html;
// https://www.w3schools.com/cssref/playit.asp?filename=playcss_font-family
	html = "<select id=" + id + " class=\"w3-select\">";
	html += "<option value=0 disabled selected>Please Choose</option>";
	html += "<option value='Georgia'>Georgia</option>"
	html += "<option value='Palatino Linotype'>Palatino Linotype</option>"
	html += "<option value='Book Antiqua'>Book Antiqua</option>"
	html += "<option value='Times New Roman'>Times New Roman</option>"
	html += "<option value='Arial'>Arial</option>"
	html += "<option value='Helvetica'>Helvetica</option>"

	html += "</select>";

	$("#" + hereId).html(html);
}


function loadResource() {
	url = urlRest + "/resourcePool";
	tmpObj = nw.setUrl(url).setMessage("Resource List Please").getMe().getResult();
	html = "<label>Resource List</label>";
	html += "<select id=resource class=\"w3-select w3-hover-grey\">";
	html += "<option value=\"all\">ALL</option>";
	tmpObj.forEach(function (item) {
		html += "<option value=" + item.id + ">" + item.name + "</option>";
	});
	html += "</select>";
	return html;
}

function loadEvent() {
	url = urlRest + "/event";
	tmpObj = nw.setUrl(url).setMessage("Event List Please").getMe().getResult();
	html = "<label>Event List</label>";
	html += "<select id=event class=\"w3-select w3-hover-grey\">";
	html += "<option value=\"all\">ALL</option>";
	tmpObj.forEach(function (item) {
		html += "<option value=" + item.id + ">" + item.name + "</option>";
	});
	html += "</select>";
	return html;
}

function loadSubEvent() {
	url = urlRest + "/subevent";
	tmpObj = nw.setUrl(url).setMessage("Sub Event List Please").getMe().getResult();
	html = "<label>Activity List</label>";
	html += "<select id=subEvent class=\"w3-select w3-hover-grey\">";
	html += "<option value=\"all\">ALL</option>";
	tmpObj.forEach(function (item) {
		html += "<option value=" + item.id + ">" + item.name + "</option>";
	});
	html += "</select>";
	return html;
}
