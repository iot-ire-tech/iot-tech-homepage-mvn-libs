/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function widgetTrialPeriod() {
// Not Ready!!!

	var html = "<select id=trailPeriod  multiple size=6  class='w3-select w3-hover-grey'  required>";
	html += "<option disabled selected>Please Select</option>";
	html += "<option value=" + plan.id + " >Title: </option>";
	html += "</select>";

	return html
}


function widgetUpdateProducts(consumer) {

// Product Listing
	payload = {
		"accountId": accountId,
		"limit": 100,
		"type": "service",
		"active": true
	};
	var products = postRequest("ProductGetCollection", payload);


	if (consumer === "planBuilder")
		html = "<select id=selectProductList4Builder  size=6  class='w3-select w3-hover-grey'  required title='These are services, facilities, experts in the field, that can make your business great'>";
	// Membership window ("init")
	else
		html = "<select id=selectProductList multiple size=6  class='w3-select w3-hover-grey'  required title='These are services, facilities, experts in the field, that can make your business great'>";


	if (products.data.length > 0) {
		html += "<option  disabled selected>Please Select</option>";
		products.data.sort().forEach(function (product) {
			html += "<option value=" + product.id + " >" + product.name + "</option>";
		})
	} else
		html += "<option  disabled selected>No Service Level Products Available</option>";
	html += "</select>";


	return html;



}


//# sourceURL=stripe_membership_builder_widgets.js