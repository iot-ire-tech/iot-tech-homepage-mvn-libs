/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function switchCustomerAccount(accountId, primaryCustomerRsp) {
    try {
        payload = {
            "accountId": accountId,
            "limit": 100
        }
        var customerListingRsp = postRequest("CustomerListing", payload);
        customerListingRsp.forEach(function (item) {
            if (item.email === primaryCustomerRsp.email) {
                // Update Account Id and Current Id
                customerId = item.id;
                //	throw Error("INF: Found matching customer " + item.email + " === " + primaryCustomerRsp.email + ") in new account (" + accountId + ")")
            }
        }.bind(this))

    } catch (errMsg) {
        alert(errMsg)
        console.log(errMsg)
    }

    return  customerId;
}

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

//# sourceURL=api_subs_utils.js
