

var tableDataFunc = function () {
	this.counter = 0;
	this.data = [];
	this.html = "";
	this.id = "";
	this.init = function (data, id) {
		this.data = data;
		this.id = id;
		return this;
	};
	this.addHeader = function () {
		this.html = "<span id=hdr_" + this.id + "></span>"
		this.html += "<table id=shop_" + this.id + " class='display cell-border' style=width:100%>"
		this.html += "<thead> <tr> <th>Name</th>  <th>Description</th> <th>Image</th> <th>Cost</th> <th>Purchase</th> </tr> </thead>"
		return this;
	};
	this.addFooter = function () {
//		this.html += "<tfoot> <tr> <th>Account</th> <th>Name</th> <th>Description</th> <th>Cost</th> <th>Purchase</th> </tr> </tfoot>"
		this.html += "</table>"
		return this;
	};
	this.getImg = function (location) {
		if (location === undefined)
			return "No Product Pic Available"
		else
			return "<img src=/resources/media/clients/" + location + " style=\"width:200px; height: 100px;\" alt=\"No Product Pic\" >"
	}
	this.addBody = function () {
		this.html += "<tbody>"
		var that = this;
		this.data.forEach(function (row) {
			this.counter++;
			if (row.metadata.cost !== undefined) {

				// If units = 0 Disable ROW, and alert....column....
				that.html += "<tr "
				that.html += "id=row_" + this.counter + ">"
				that.html += "<td id=name_" + this.counter + ">" + row.name + "</td>"
				that.html += "<td id=desc_" + this.counter + ">" + row.description + "</td>"

				that.html += "<td id=image_" + this.counter + ">" + that.getImg(row.metadata.urlShop) + "</td>"
				that.html += "<td id=cost_" + this.counter + ">" + row.metadata.cost + "</td>"
				that.html += "<td>"
				that.html += "<input type=checkbox class=shop id=action_" + this.counter + " />"
				that.html += "</td>"
				that.html += "</tr>"
			}
		})
		this.html = that.html;
		this.html += "</tbody>"
		return this;
	};
	this.getTable = function () {
		return this.html;
	};
	this.add = function () {
		this.html += "<label><b>Key</b></label>";
		this.html += "<input id=key_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"text\" value=\"\" required />"
		this.html += "<label><b>Value</b></label>";
		this.html += "<input id=val_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"text\" value=\"\" required />"

		this.html += "<button id=btnAdd_" + this.counter + " class=\"add w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
		this.html += "<button id=btnDel_" + this.counter + " class=\"del w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";
		return this.html;
	};
};
//# sourceURL=stripe_shop_funcs_shop.js