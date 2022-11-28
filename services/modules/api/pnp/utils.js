/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function alertPnPContacts(pnpId, pocId, customerId, productName) {

    // Get Point Of Contact
    var rspPoc = nsPoCService.serviceGetByDbId(pocId)
    // 5f16bc354ddf8b6c00004627
    nsPnpService.dbId = pnpId
    var rspPnp = nsPnpService.getByDbId()

    // nsPnpService.forEach(function (item) {

    if (nsPnpService.obj.alerting.active) {
// Send Sms
        var msg = "%0a";
        msg += "AccountId :" + rspPoc.accountId
        msg += "%0a";
        msg += "OrderFor :" + customerId
        msg += "%0a";
        msg += "ProductId :" + rspPoc.productId
        msg += "%0a";
        msg += "Item :" + productName;
        msg += "%0a";
        var grade = ""
        nsPnpService.obj.items.forEach(function (item) {
            grade = item.grade;
            msg += "Mode :" + item.grade;
        })
        msg += "%0a";
        msg += "Regards, IoT Tech."

        rspPoc.items.forEach(function (poc) {
// Send SMS
            new Sms().setFrom("MyBizPalPnP").setTo(phoneInternationalize(poc.phone, "353")).setMsg(msg).send();
// Send Email
            var msgObject = {
                "accountId": rspPoc.accountId,
                "productId": rspPoc.productId,

                "customerId": customerId,
                "email": poc.email,
                "ts": nsPnpService.obj.ts,
                "grade": grade,
                "productName": productName
            }
            postRequestAsync("MailPnPNewOrder", msgObject)

        })

    }
    // }.bind(this))
}

function phoneInternationalize(phone, country) {

    var tmp = phone.charAt(0);
    if (tmp === "0")
        tmp = phone.substring(1);
    else
        tmp = phone;
    return "+" + country + tmp;
}

function getAssetPostNPackageCost(accountId, productId) {
    var modelPnpMgt = {
        "accountId": "",
        "productId": "",
        "shippable": false,
        "pnp": [
            {
                "grade": "",
                "cost": 0.00,
                "comment": ""
            }
        ]
    }
    var payload = {"accountId": accountId, "productId": productId}
    payloadRsp = getDbRequestQuery("pnpMgt", payload)[0];

    return payloadRsp;

}

function getAssetPostNPackageCostVendor(accountId, productId) {


    payload = {
        "accountId": accountId,
        "productId": productId
    }
    var payloadRsp = postRequest("ProductGet", payload);

    return payloadRsp.metadata.postNpackageVendorSelection;
}


function sendText() {
    // Ship Item....

}

function sendMail() {
    // Ship Item....

}

function chargePnP(amount, rt) {

    amount *= 100 // To Cent
    amount += (parseFloat(pnpFeeCost).toFixed(2) * 100)

    chargingModel = {
        "transaction": new Transaction(
            {"amount": amount, "currency": "eur", "description": "Charging account (" + rt.accountId + ") pnp mgt"}
        )
    }
    var pnpMgtRsp = chargeAccount({"accountId": rt.accountId, "payload": chargingModel})

    if (pnpMgtRsp.id === undefined) {
        throw  Error("Checkout, pnp charge not possible")
    }

    return pnpMgtRsp.id
}

function pnpEventHandler(rt) {
//	var rt = rt.pnpMgt
    var amount = 0;
    var eventContextObj = {
        "alertFound": false,
        "usageSms": false,
        "usageEmail": false,
        "chargeId": ""
    }


//	pnpServiceDetail:{
//		var payload = {"accountId": rt.accountId, "productId": rt.productId}
//		var pnpMgtRsp = getDbRequestId("pnpmgt", rt.pnpMgt.dbId);
//	}

    var shippingDetails = {
        "accountId": rt.accountId,
        "productId": rt.productId,
        "email": pnpMgtRsp.alerting.email,
        "sms": pnpMgtRsp.alerting.sms,
        "customerId": customerId,
        "grade": rt.pnpMgt.grade,
        "annotate": rt.pnpMgt.annotate,
        "cost": rt.pnpMgt.cost
    }

    if (pnpMgtRsp.alerting.active) {
        eventContextObj.alertFound = true

        if (pnpMgtRsp.alerting.sms.length > 0) {
            sendText(shippingDetails, "New shipping request!")
            eventContextObj.usageSms = true
            amount += smsCost + smsFeeCost
        }
        if (pnpMgtRsp.alerting.email.length > 0) {
            sendMail(shippingDetails, "New shipping request!")
            eventContextObj.usageEmail = true
            amount += emailFeeCost
        }

        if (eventContextObj.usageSms === true || eventContextObj.usageEmail === true) {
            if (mode !== "debug")
                eventContextObj.chargeId = chargePnP(amount, rt)
        }
    }

    return eventContextObj;

}

//# sourceURL=api_pnp_utils.js