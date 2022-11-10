/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function UxEntitiesListing() {
    this.html = ""
	this.data = []
    this.disabled = ""

	this.init = function () {
        var len = this.data.length + 5

        var html = "<select  size=" + len + "  class=\"w3-select entityListing\" " + this.disabled + "> "
        html += "<option default disabled>Please select one</option>"
        this.data.forEach(function (item) {
            html += "<option accountId=" + item.accountId + " productId=" + item.productId + ">" + item.name + "</option>"
        });
        html += "</select>"
        html += "<br>"
        return html;

    }
}

//# sourceURL=api_entities_widget_listing.js