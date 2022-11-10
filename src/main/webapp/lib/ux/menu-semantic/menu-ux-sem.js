/* 
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */


function menuBuilder(menu) {
	var html = "";

	html = "<div class=\"ui pointing menu\">";
	html += menu;
	html += "</div>";

	return html;
}

function addItemPositionaly(item) {
	var item = "";
	if (itemObj.pos === "right") {
		item += "<div class=\"right menu\">"
		item += "<div class=\"item\">"
		item += item;
		item += "</div>";
		item += "</div>";
	}

	if (itemObj.pos === "left") {
		item += "<div class=\"right menu\">"
		item += itemObj;
		item += "</div>";
	}
	return item;
}

function addItem(itemObj) {
	var html = "";

	var item = "item";

	if (itemObj.active === true)
		item = " active";



	html = "<a class=\"" + item + "\">" + itemObj.label + "</a>"

	return html;
}
function addSegment(segment) {
	var html = "";

	html = "<a class=\"ui segment\">" + segment + "</a>"

	return html;
}

function menuIt(items) {

	var itemRt = "";
	items.items.forEach(function (item) {
		// Bar Item
		itemRt += addItem(item)
		// Item With Position
		if (item.pos === "right" || item.pos === "left")
			itemRt += addItemPositionaly(item)
	})
	$("#menuBar").after(menuBuilder(itemRt));
//	$("#menuBar").after(addSegment("<p>Hi</p>"));

}

function main() {

	var item = {label: "Home", active: false, pos: "", icon: "bell"};
	var items = [];
	items.push(item);
	menuIt(items);
}

