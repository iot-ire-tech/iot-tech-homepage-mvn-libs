/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var uxCustomerAccountManagment = function () {
	this.counter = 0;
	this.html = "";
	this.accountCounter = 0;
	this.accountType = 0;
	this.detected = false;

	this.init = function () {
		return this;
	};
	this.addHeader = function (actionMsg, accountType) {
		this.actionMsg = actionMsg;
		this.accountType = accountType;
		this.html = "<table class='w3-table-all'>"
		if (this.accountType === "bank_account") {
			this.html += "<tr><th>Name On Account</th><th>Bank Type</th><th>Bank Name</th><th>Country</th><th>Account Number(last4) / Currency</th><th>Status</th><th>" + this.actionMsg + "</th></tr>"
		} else if (this.accountType === "card") {
			this.html += "<tr><th>Brand</th><th>Country</th><th>Default Card</th><th>Funding</th><th>Last Four Digits</th><th>Expiry Date[yyyy/mm]</th><th>" + this.actionMsg + "</th></tr>"
		}
		return this;
	};
	this.addFooter = function () {
		this.html += "</table>"
		return this;
	};
	this.addBody = function (rowData, accountType, nameTag) {
		this.rowData = rowData;
		this.accountType = accountType;
		this.nameTag = nameTag;
		this.rowData.forEach(function (data) {
			this.counter++;
			if (data.object === "bank_account" && this.accountType === "bank_account") {
				this.accountCounter++
				this.detected = true
				this.html += "<tr><td>" + data.account_holder_name + "</td><td>" + data.account_holder_type + "</td><td>" + data.bank_name + "</td><td>" + data.country + "</td><td>" + data.last4 + "/" + data.currency + "(" + data.default_for_currency + ")</td><td>" + data.status + "</td><td> <input id=" + data.id + " type=radio name=" + this.nameTag + "> </td > </tr>"
			} else if (data.object === "card" && this.accountType === "card") {
				this.accountCounter++
				this.detected = true
				this.html += "<tr><td>" + data.brand + "</td><td>" + data.country + "</td><td>" + data.default_for_currency + "</td><td>" + data.funding + "</td><td>" + data.last4 + "</td><td>" + data.exp_year + "/" + data.exp_month + "</td><td> <input id=" + data.id + " type=radio name=" + this.nameTag + "> </td></tr>"
			}
		}.bind(this))
		return this;
	};
	this.getTable = function () {
		return this.html;
	};
}

function uxAccountBankUpdate(cardSourcesRsp) {

	var cardHtml = "<span>Bank Account Management - Default Currency</span>";
	var extAccountListing = new uxCustomerAccountManagment()
	cardHtml += extAccountListing.init().addHeader("Click New Default", "bank_account").addBody(cardSourcesRsp, "bank_account", "extAccountsUpdate").addFooter().getTable()
	cardHtml += "<br>"
	if (extAccountListing.detected && extAccountListing.accountCounter >= 1)
		$("#banksListUpdate").html(cardHtml)
}
function uxAccountBankDelete(cardSourcesRsp) {

	var cardHtml = "<span>Bank Account Management - Housekeeping</span>";
	var extAccountListing = new uxCustomerAccountManagment()
	cardHtml += extAccountListing.init().addHeader("Click Account To Remove", "bank_account").addBody(cardSourcesRsp, "bank_account", "extAccountsDelete").addFooter().getTable()
	cardHtml += "<br>"
	if (extAccountListing.detected && extAccountListing.accountCounter >= 1)
		$("#banksListDelete").html(cardHtml)
}

function uxAccountCardUpdate(cardSourcesRsp) {

	var cardHtml = "<span>Card Account Management - Default Currency</span>";
	var extAccountListing = new uxCustomerAccountManagment()
	cardHtml += extAccountListing.init().addHeader("Click New Default", "card").addBody(cardSourcesRsp, "card", "extAccountsUpdate").addFooter().getTable()
	cardHtml += "<br>"
//	if (extAccountListing.detected && extAccountListing.accountCounter >= 1)
	$("#cardListUpdate").html(cardHtml)
}
function uxAccountCardDelete(cardSourcesRsp) {

	var cardHtml = "<span>Card Account Management - Housekeeping</span>";
	var extAccountListing = new uxCustomerAccountManagment()
	cardHtml += extAccountListing.init().addHeader("Click Account To Remove", "card").addBody(cardSourcesRsp, "card", "extAccountsDelete").addFooter().getTable()
	cardHtml += "<br>"
//	if (extAccountListing.detected && extAccountListing.accountCounter >= 1)
	$("#cardListDelete").html(cardHtml)
}