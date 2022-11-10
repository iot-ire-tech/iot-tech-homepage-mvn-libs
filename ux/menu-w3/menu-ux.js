/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */

var menuOption = {
	logout: true,
	login: false,
	events: false,
	facilities: true,
	cart: true,
	tour: true,
	support: true,
	feedback: true,
	messages: true
};


function menuBuilder(menu) {
	var html = "";

	html = "<div class=\"w3-bar w3-light-grey w3-border \">";
	html += menu;
//	//console.log("XXX: %s", patronObj.media.picProfileSmall.name)
//	tmp = location.origin + "/" + contextPath + "/resources/media/clients/" + patronObj.media.picProfileSmall.name

	html += "<a href=\"#\" class=\"w3-bar-item w3-button w3-left profile\">";
	html += "<img src=" + location.origin + "/" + contextPath + "/resources/media/imgs/avatar.png" + " alt=\"MenuAvatar\"  class=\"avatar-login\">";
	html += "&nbsp;&nbsp;&nbsp;Profile";
	html += "</a>";
	html += "</div>";

	return html;
}

function addDropDownItem(itemObj) {
	var html = "";
	var item = "";
	var icon = "";


	if (itemObj.pos === "right")
		item += " w3-right";
	else if (itemObj.pos === "left")
		item += " w3-left";

	icon = getIcon(itemObj.icon);

	html = getDropDown(item, icon, itemObj);

// Content...
	html += "<div id=" + itemObj.id + " class=\"w3-dropdown-content w3-bar-block w3-card\">";
	html += itemObj.html;
	html += "<span id=ext" + itemObj.id + "></span>";
	html += "</div>";


	html += "</div>";

	return html;
}

function getDropDown(item, icon, itemObj) {

	var html = "";
	html = "<div class=\"w3-dropdown-hover\">";
	html += "<button class=\"w3-button" + item + "\">";
	html += icon;
	html += "&nbsp;&nbsp;&nbsp;";
	html += itemObj.label;
	html += "<i class=\"fa fa-caret-down\"></i>";
	html += "</button>";

	return html;
}

function getDropDownClick() {

	var html = "";
	html = "<div class=\"w3-dropdown-click\">";
	html += "<button class=\"w3-button" + item + "\" onclick=\"dropDownUp('" + itemObj.id + "')\">";
	html += icon;
	html += "&nbsp;&nbsp;&nbsp;";
	html += itemObj.label;
	html += "<i class=\"fa fa-caret-down\"></i>";
	html += "</button>";
	return html;
}
function getIcon(id) {
	var icon;

	if (id === "home")
		icon = "<i class=\"fa fa-home\"></i>";
	else if (id === "sign-in")
		icon = "<i class=\"fa fa-sign-in\"></i>";
	else if (id === "sign-up")
		icon = "<i class=\"fa fa-user-plus\"></i>";

	else if (id === "sign-out")
		icon = "<i class=\"fa fa-external-link\"></i>";

	else if (id === "search")
		icon = "<i class=\"fa fa-search\"></i>";
	else if (id === "money")
		icon = "<i class=\"fa fa-money\"></i>";
	else if (id === "cart") {
		icon = "<i class=\"fa fa-shopping\"> </i>";
		icon = "<i class=\"fa fa-cart\"> </i>";
		icon = "<i class=\"fa fa-shopping-cart\"> </i>";
	} else if (id === "message")
		icon = "<i class=\"fa fa-envelope\"></i>";
	else if (id === "events")
		icon = "<i class=\"fa fa-group\"></i>";
	else if (id === "facilities")
		icon = "<i class=\"fa fa-globe \"></i>";
	else if (id === "save")
		icon = "<i class=\"fa fa-save\"></i>";
	else if (id === "question")
		icon = "<i class=\"fa fa-question\"></i>";
	else if (id === "feedback") {
		icon = "<img src=\"" + location.origin + "/" + contextPath + "/resources/media/icons/customer_feedback.png\"></img>";
	} else if (id === "tour")
		icon = "<i class=\"fa fa-eye\"></i>";

	return icon;
}
// function addItem(itemObj) {
function addMenuItem(itemObj) {
	var html = "";
	var icon = "";

	var item = "";
	if (itemObj.type === "id")
		item = "w3-bar-item ";
	else
		item = "w3-bar-item w3-button";

	if (itemObj.color === "green")
		item += " w3-green";
	else if (itemObj.color === "blue")
		item += " w3-blue";
	else if (itemObj.color === "teal")
		item += " w3-teal";

	if (itemObj.active === true)
		item += " active";

	icon = getIcon(itemObj.icon);

	if (itemObj.pos === "right")
		item += " w3-right";
	else if (itemObj.pos === "left")
		item += " w3-left";

	if (itemObj.id != "")
		id = "" + itemObj.id + "";

// w3-hover-border-black

	if (itemObj.label === "Search") {
		tmp = "<input type=\"text\" class=\"w3-bar-item w3-input w3-white w3-mobile\" placeholder=\"Search...\">";
		html = "<button class=\"" + item + "\">" + tmp + "</button>"
	} else if (itemObj.type === "id") {
		html = "<span> Welcome back, " + itemObj.label + "</span>"
	} else
		html = "<a href=\"#\" id=" + id + "  class=\"" + item + "\">" + icon + "&nbsp;&nbsp;&nbsp;" + itemObj.label + "</a><span id=ext" + id + "></span>"


	return html;
}

function menuIt(items) {

	var itemRt = "";
	var len = items.length - 3;
	var counter = 1;
	items.forEach(function (item) {
		// Bar Item
		itemRt += addMenuItem(item)
		counter++
	})
	$("#menuBar").after(menuBuilder(itemRt));

//	items.dropDownArr.forEach(function (item) {
//	items.forEach(function (item) {
//		$("#extlogout01").after(addDropDownItem(item));
//	})
}

function dropDownUp(id) {
	var x = document.getElementById(id);
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}

function main() {

	var item = {label: "Home", active: false, pos: "", icon: "home", color: "green"};
	var items = [];
	items.push(item);
	menuIt(items);
}


function loadMenuEvents(resourceArr) {

	var charity = "<span class=\"w3-tag w3-medium w3-padding w3-yellow\" style=\"transform:rotate(-5deg)\"> Charity Event<br>Please Give Generously!!!</span>";
	var community = "<span class=\"w3-tag w3-medium w3-padding w3-green\" style=\"transform:rotate(+5deg)\"> Community Event<br>Please Support!!!</span>";

	var html = ""
	var resourceHtml = ""

	// for each category lets list out whats available
	resourceArr.some(function (itemResource) {
		resourceHtml += "<a href=\"#" + itemResource.socialize.name + "\" class=\"w3-bar-item w3-button\">" + itemResource.socialize.name + "</a>";
		//if (itemResource.visible === true) {
		//html += "<a href=\"#\" class=\"w3-bar-item w3-button\">Link 1</a>";

//			queryEventByResourceId(itemResource.id);
//			tmpObj = new crudIt(eventCtrl, "Event By Resource ID") .setPayload("{\"resourceId\":" + itemResource.id + "}") .query()
		tmpObj = srvEntity.setPayload({"fk": {"id": itemResource.pk.id}}).queryByType("Q. List child items?");

		eventArr = tmpObj;
		eventArr.some(function (itemEvent) {
			// Events
			if (itemEvent.pk.type === "Charity") {
				html += "<a href=\"#" + itemEvent.socialize.name + "\" class=\"w3-bar-item w3-button\">" + itemEvent.socialize.name + "&nbsp;&nbsp;&nbsp;" + charity + "</a>";
			} else if (itemEvent.pk.type === "Coorporative") {
				html += "<a href=\"#" + itemEvent.socialize.name + "\" class=\"w3-bar-item w3-button\">" + itemEvent.socialize.name + "&nbsp;&nbsp;&nbsp;" + community + "</a>";
			} else {
				html += "<a href=\"#" + itemEvent.socialize.name + "\" class=\"w3-bar-item w3-button\">" + itemEvent.socialize.name + "</a>";

			}

		});

		//}
	});

	return {resource: resourceHtml, event: html};
}


function attachMenu(options, resources) {
	// Attach menu
	var items = [];
	var dropDownArr = [];

	var home = {label: "Home", active: false, pos: "", icon: "home", color: "blue", id: "home01"};
	var search = {label: "Search", active: false, pos: "right", icon: "search", color: "", id: "search01"};
	var messages = {label: "Messages", active: false, pos: "right", icon: "message", color: "", id: "inbox01"};
	var logout = {label: "Logout", active: false, pos: "right", icon: "sign-out", color: "", id: "logout01"};
	var login = {label: "Login", active: false, pos: "right", icon: "sign-in", color: "", id: "login01"};
	var signup = {label: "Signup", active: false, pos: "right", icon: "sign-up", color: "", id: "signup01"};
	var portal = {label: "Bookings", active: false, pos: "right", icon: "events", color: "", id: "addBooking01"};

	var saveResults = {label: "Save Results", active: false, pos: "right", icon: "save", color: "", id: "saveResults01"};
	var support = {label: "Support", active: false, pos: "right", icon: "question", color: "", id: "support01"};
	var feedback = {label: "Feedback", active: false, pos: "right", icon: "feedback", color: "", id: "feedback01"};
	var tour = {label: "Tour", active: false, pos: "right", icon: "tour", color: "", id: "tour01"};

	var cart = {label: "Cart", active: false, pos: "left", icon: "cart", color: "", id: "cart01", html: ""};
//	cart = {label: "", active: false, pos: "right", icon: "cart", color: "", id: "cart01", html: ""};

	if (options.login === true)
		items.push(login);
	if (options.logout === true)
		items.push(logout);
	if (options.support === true)
		items.push(support);
	if (options.feedback === true)
		items.push(feedback);

	if (options.messages === true)
		items.push(messages);
	if (options.tour === true)
		items.push(tour);
	if (options.tour === true)
		items.push(cart);

// Squash
	if (options.signup === true)
		items.push(signup);
	if (options.portal === true)
		items.push(portal);
	if (options.saveResults === true)
		items.push(saveResults);

//	items.push(cart);
//	items.push(search);
//	items.push(home);


//
//	tmpObj = loadMenuEvents(resources);
//	var events = {label: "Events", active: false, pos: "right", icon: "events", color: "", id: "events01", html: tmpObj.event};
//	if (options.events === true)
//		dropDownArr.push(events);

//	var facilities = {label: "Facilities", active: false, pos: "right", icon: "facilities", color: "", id: "facilities01", html: tmpObj.resource};
//	if (options.facilities === true)
//		dropDownArr.push(facilities);



	if (options.cart === true)
//		dropDownArr.push(cart);


//		return {items: items, dropDownArr: dropDownArr}
		return items
}