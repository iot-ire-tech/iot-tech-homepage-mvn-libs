/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var masterList = {}

function init() {

// id="facebookHowTo" href=facebook-howto.pn

// Join Up Models
    modelContext = Object.assign(modelUxProduct, modelUxSubscription)
    modelContext.mode = "resource"
    // Lets make all resources active by default / Sellable
    modelContext.active = true;
//	modelContext.subscription.customerId = customerId;
//	modelContext.subscription.accountId = accountId;
    modelContext.subscription.media.vids = []
    modelContext.subscription.media.pics = []


}


function getEntityTypeX(typeX) {

    var html = ""

    var payload = {
        "accountId": accountId,
        // event
        "mode": typeX,
        "limit": 0,
        "active": true
//		"sellable": false
    };
//	payloadRsp = postRequest("ProductsGetMode", payload)

    nsEntitiesService.modelQuery.accountId = accountId;
    nsEntitiesService.modelQuery.mode = typeX;
    var rsp = nsEntitiesService.serviceGetType();
    try {
        if (rsp instanceof Array) {
// I am an array
            html = "<select  size=11  class=\"w3-select " + typeX + "\" > "
            rsp.forEach(function (item) {
                html += "<option accountId=" + item.accountId + " productId=" + item.productId + ">" + item.name + "</option>"
            });
        } else {
            html = "<select  size=3  class = \"w3-select " + typeX + "\" > "
            html += "<option accountId=" + rsp.accountId + " productId=" + rsp.productId + ">" + rsp.name + "</option>"
        }
    } catch (errMsg) {

    }
    html += "</select>"
    html += "<br>"
    return html;
}

function uxSelectEntities(rsp, productClass, disabled) {

// I am an array
    var len = rsp.length + 5
    var html = "<select  size=" + len + "  class=\"w3-select " + productClass + "\" " + disabled + "> "
    html += "<option default disabled>Please select one</option>"
    rsp.forEach(function (item) {
        html += "<option accountId=" + item.accountId + " productId=" + item.productId + ">" + item.name + "</option>"
    });
    html += "</select>"
    html += "<br>"
    return html;
}


function refreshProductList(masterList, productClass) {

    var html = "";
    var isblackListedAccount = getDbRequestXByY("blacklisted", "accountId", accountId);
    if (masterList.length >= 10)
        html = "<select  size=" + 11 + " class=\"w3-select " + productClass + "\" required> "
    else if (masterList.length < 10)
        html = "<select  size=" + (masterList.length + 3) + " class=\"w3-select " + productClass + "\" required> "

    masterList.forEach(function (item, index) {
        html += "<option accountId=" + item.accountId + " productId=" + item.productId + ">"
        html += "scope: " + item.name
        html += "</option>"
    }.bind(this));

    html += "</select>"
    html += "<br>"
    html += "<button id=refreshAssetlist class=\"w3-button w3-small w3-border w3-border-red w3-right w3-padding\">Refresh</button>"
    html += "<br>"

    return html;
}

function assetProfolioForDirectProvisionAndAllocation(accountId) {
    var masterList = []
    var accountProductsRsp = getProductsByMode(accountId)
    if (accountProductsRsp.length > 0) {
        masterList = masterList.concat(accountProductsRsp)
        return masterList
    } else
        return masterList

}


function refreshPrimaryAccountsWidget(accounts) {

    var html = "<div id=divBlackListWidet>"
    html += "<br><label>Select the account(s) you do not want to share this asset with </label>"
    html += "<select disabled size=" + (accounts.length + 1) + "  class=\"w3-select\" multiple id=selectBlacklisted required> "
    accounts.forEach(function (accountId) {
        var payload = {
            "accountId": accountId
        };
        var accountName = postRequest("AccountGet", payload).business_profile.name;
        html += "<option value=" + accountId + " accountId=" + accountId + ">"
        html += "Asset: (" + accountName + ")"
        html += "</option>"
    });
    html += "</select>"
    html += "<br>"
    html += "</div>"


    return html;
}

//# sourceURL=stripe_product_utils.js
