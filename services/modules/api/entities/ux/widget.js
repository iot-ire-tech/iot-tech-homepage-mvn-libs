/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function UxEntities() {
	this.myclass = "customerListHook";
	this.title = "Primary Contact Owner";
	this.html = ""

	// Model
	this.build = function (htmlMembersCombo) {
		this.html = "<div >"
		this.html += "<fieldset>"
		this.html += "<legend><b>" + this.title + "</b></legend>"
		this.html += "<label>Members Listing</label>"
		this.html += htmlMembersCombo
		this.html += "<br>"
		this.html += "<br>"

		this.html += "<label>Name</label>"
		this.html += '<input class="w3-input w3-hover-grey  pocName" type="text" value="" required title=""/> <br>'
		this.html += "<label>Email</label>"
		this.html += '<input disabled class="w3-input w3-hover-grey pocEmail" type="email" value="" required title=""/> <br>'
		this.html += "<label>Phone</label>"
		this.html += '<input disabled class="w3-input w3-hover-grey pocPhone" type="tel" value="" required title=""/> <br>'
		this.html += "</fieldset>"

		this.html += ' </div>'
		return this;

	}
	this.getHtml = function () {
		return this.html;
	}
	return this;
}

function refreshResourceAssetScopeList(masterList, InComingBizScope, target) {

	var html = "";
	var isblackListedAccount = getDbRequestXByY("blacklisted", "accountId", accountId);
	if (masterList.length >= 10)
		html = "<select  size=" + 11 + " class=\"w3-select " + target + "\" required> "
	else if (masterList.length < 10)
		html = "<select  size=" + (masterList.length + 3) + " class=\"w3-select " + target + "\" required> "


	try {
		var htmlOptions = ""
		var Options = ""
		var accountRsp = accountDetails(accountId)
		html += "<optgroup label=\"" + accountRsp.business_profile.name + " (" + accountId + ")\" > "
		masterList.forEach(function (item, index) {
			// Lets examine Product for varsatility

			try {
				html += "<optgroup label=\"" + (index + 1) + ". Asset(" + item.name + ")\">"
				htmlOptions = ""
				Options = ""
				// whitelistAccountHolder
				// If account is whitelisted then show assets on sale!


				// Get those assets.
				nsBusinessService.accountId = item.accountId;
				nsBusinessService.productId = item.productId;
				nsBusinessService.get();
				nsBusinessService.obj.scope.forEach(function (registeredBizScope, index) {
					if (registeredBizScope.includes(InComingBizScope)) {
						htmlOptions += "<option accountId=" + item.accountId + " productId=" + item.productId + " target = " + registeredBizScope + " title = \"" + Options + "\">"
						htmlOptions += "scope: " + InComingBizScope
						htmlOptions += "</option>"
						html += htmlOptions
						htmlOptions = ""
					}
				}.bind(this));
				html += "</optgroup>"
			} catch (errMsg) {
				alert("ERR: refreshGlobalAssetList, contact support asap, message detail : (" + errMsg + ")")
			}
		}.bind(this));
		html += "</optgroup>"
	} catch (item) {
// alert("INF: Product not with blacklist error (" + JSON.parse(item) + ")")
	}
	html += "</select>"
	html += "<br>"
	html += "<button id=refreshAssetlist class=\"w3-button w3-small w3-border w3-border-red w3-right w3-padding\">Refresh</button>"
	html += "<br>"

	return html;
}

//# sourceURL=api_entities.js