/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelDropdown = {
	"data": {},
	"title": "Please Select",
	"id": 0,
	"class": "ui fluid search dropdown",
	"provider": "semantic"
};



function dropDownUpBuilder(model) {
	var html = "";
	switch (model.provider) {
		case "semantic":
			html += "<select class=\"" + model.class + "\" id=\"" + model.id + "\"  " + model.multiple + " >"
			html += "<option disabled selected >" + model.title + "</option>";
			model.data.forEach(function (item) {
				if (item.ux !== undefined)
					html += "<option value=\"" + item.pk.dbId + "_" + item.pk.id + "\">" + item.ux.name + "</option>";
			});
			html += "</select>";
			break;
		default:
			alert("ERR: Build cant find widget");

			break;
	}


	return html;

}

function dropDownUpSubBuilder(model) {
	var html = "";
	switch (model.provider) {
		case "semantic":
			html += "<select class=\"" + model.class + "\" id=\"" + model.id + "\"  " + model.multiple + " >"
			html += "<option >" + model.title + "</option>";
			model.data.forEach(function (item) {
				item.ux.items.forEach(function (item) {
					html += "<option value=\"" + item.pk.dbId + "_" + item.pk.id + "\">" + item.name + "</option>";
				});
			});
			html += "</select>";
			break;
		default:
			alert("ERR: Build cant find widget");

			break;
	}


	return html;

}


var uxSelect = function (tmpObj, id, title, aclass, sameName, multiple, size) {
	this.tmpObj = tmpObj;
	this.id = id;
	this.title = title;
	this.size = size;
	this.multiple = multiple;
	this.html = "";
	this.sameName = sameName;
	this.init = function () {

		if (sameName === undefined)
			sameName = false;
		if (size === undefined)
			size = 1;

		var html = ""
		html += "<select id=" + this.id + " class=\"w3-select " + aclass + "\"  " + this.multiple + "   size=" + this.size + ">";
		html += "<option class=\"defaultSelectOption\" value=0 disabled selected >" + title + "</option>";
		this.tmpObj.forEach(function (item) {
			if (item.idUx > 0)
				html += "<option value=\"" + item.idUx + "\" valuename=\"" + item.name + "\">" + item.name + "</option>";
			else
				html += "<option value=\"" + item.id + "\" valuename=\"" + item.name + "\">" + item.name + "</option>";
		});
		html += "</select>";
		this.html = html;
		return this;
	};
	this.getHtml = function () {
		return this.html;
	};
	this.setSize = function (size) {
		this.size = size
		return this;
	};
	this.setMultiple = function (multiple) {
		this.multiple = multiple
		return this;
	};
	return this;
};