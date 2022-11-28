/*
 * To change this license header, choose License Headers in Project Propemsgies.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function sendInventoryText(alertDetails, msg) {

	var pname = getProductDetails(alertDetails.accountId, alertDetails.productId).name
	var smsMsg = "From: IOT-Inventory-Alert."
	smsMsg += "%0a"
	smsMsg += "%0aItem: " + pname
	smsMsg += "%0aDate: " + getTs()
	smsMsg += "%0aLevel: " + alertDetails.level
	smsMsg += "%0aOverflow: " + alertDetails.level
	smsMsg += "Regards, IoT Tech.`"
	if (mode !== "debug")
		new Sms().setFrom("E-Receipt").setTo(phoneInternationalize(alertDetails.sms, "353")).setMsg(smsMsg).send();
}
function sendInventoryMail(alertDetails, msg) {


	var pname = getProductDetails(alertDetails.accountId, alertDetails.productId).name
	var payload = {
		...alertDetails,
		"ts": getTs(),
		"productName": pname
	}
	postRequest("MailBusinessInventoryAlert", payload);
}

function chargeInventoryMgt(purchaseOrderItem, stockEventHandlerRsp) {

	var chargeAmount = 0;
	if (stockEventHandlerRsp.usageSms) {
		chargeAmount = smsCost + smsFeeCost
		chargeAmount *= 100
		chargingModel = {"transaction": new Transaction({"amount": chargeAmount, "currency": "eur", "description": "Charging account (" + purchaseOrderItem.accountId + ") sms inventory alerting"})}
	} else if (stockEventHandlerRsp.usageEmail) {
		chargeAmount = emailCost + emailFeeCost
		chargeAmount *= 100
		chargingModel = {"transaction": new Transaction({"amount": chargeAmount, "currency": "eur", "description": "Charging account (" + purchaseOrderItem.accountId + ") mail inventory alerting"})}
	} else if (stockEventHandlerRsp.usageEmail && stockEventHandlerRsp.usageSms) {
		chargeAmount = smsCost + smsFeeCost + emailCost + emailFeeCost
		chargeAmount *= 100
		chargingModel = {"transaction": new Transaction({"amount": chargeAmount, "currency": "eur", "description": "Charging account (" + purchaseOrderItem.accountId + ") mail/sms inventory alerting"})}
	}

	if (chargeAmount > 0) {
//		var inventoryAlertChargeRsp = chargeAccount({"accountId": purchaseOrderItem.accountId, "payload": chargingModel})
		if (inventoryAlertChargeRsp.id === undefined) {
			throw  Error("Checkout, Inventory charge not possible")
		}
	}
}

function stockEventHandler(rt, inventorymgtRsp) {
	var msg;
	var inventoryMgt = rt.inventoryMgt
	var eventContextObj = {
		"alertFound": false,
		"usageSms": false,
		"usageEmail": false
	}

	try {



		unitRatio = inventoryMgt.stockUtilization;
		if (inventoryMgt.stockActive && inventoryMgt.alertReminderCap > 0) {
//			decrementCap:{
//				var payload = {"accountId": rt.accountId, "productId": rt.productId}
//				var inventorymgtRsp = getDbRequestQuery("capacitymgt", payload);
//				inventorymgtRsp.alerting.alertReminderCap -= 1;
//				putDbRequestAsync("capacitymgt", inventorymgtRsp, inventoryMgt.dbInventoryMgtId)
//			}

			var alertDetails = {
				"accountId": rt.accountId,
				"productId": rt.productId,
				"email": inventoryMgt.stockEmail,
				"sms": inventoryMgt.stockSms,
				"overflow": inventorymgtRsp.levels.bufferoverflow,
				"level": ""
			}

			if (unitRatio > inventoryMgt.unit_ratio_upper) {
// Level#4 - Safe
				msg = "INF: Safe Provisioning capacity threshold achieved...inform customer."

			} else if (unitRatio >= inventoryMgt.unit_ratio_lower && unitRatio <= inventoryMgt.unit_ratio_upper) {
// Level#3
				msg = "Level#1 Treshold met, zero stock inventoryMgts left for sale!"
				if (inventoryMgt.stockLevel1 === true && inventoryMgt.stockSms.length === true) {
					alertDetails.level = "level1"
					sendInventoryText(alertDetails, msg)
					eventContextObj.aleinventoryMgtFound = true
					eventContextObj.usageSms = true
				}
				if (inventoryMgt.stockLevel1 === true && inventoryMgt.stockEmail.length > 0) {

					alertDetails.level = "level1"
					sendInventoryMail(alertDetails, msg);
					eventContextObj.aleinventoryMgtFound = true
					eventContextObj.usageEmail = true
				}

			} else if (unitRatio > 0 && unitRatio < inventoryMgt.unit_ratio_lower) {
// Level#2
				msg = "Level#2 Treshold met, zero stock inventoryMgts left for sale!"
				postRequest("MailBusinessReciept", msg.receiptItems);
				if (inventoryMgt.stockLevel2 === true && inventoryMgt.stockSms.length > 0) {
					alertDetails.level = "level2"
					sendInventoryText(alertDetails, msg)
					eventContextObj.aleinventoryMgtFound = true
					eventContextObj.usageSms = true
				}
				if (inventoryMgt.stockLevel2 === true && inventoryMgt.stockEmail.length > 0) {
					alertDetails.level = "level2"
					sendInventoryMail(alertDetails, msg);
					eventContextObj.aleinventoryMgtFound = true
					eventContextObj.usageEmail = true
				}

			} else if (unitRatio === 0) {
// Level#1
				msg = "Level#3 Treshold met, zero stock inventoryMgts left for sale!"
				if (inventoryMgt.stockLevel3 === true && inventoryMgt.stockSms.length > 0) {
					alertDetails.level = "level3"
					sendInventoryText(alertDetails, msg)
					eventContextObj.aleinventoryMgtFound = true
					eventContextObj.usageSms = true
				}
				if (inventoryMgt.stockLevel3 === true && inventoryMgt.stockEmail.length > 0) {
					alertDetails.level = "level3"
					sendInventoryMail(alertDetails, msg);
					eventContextObj.aleinventoryMgtFound = true
					eventContextObj.usageEmail = true
				}
			}



			if (mode !== "debug")
				chargeInventoryMgt(rt, eventContextObj)

		}
	} catch (errMsg) {
		throw Error(msg)

	}

	return eventContextObj;
}

//# sourceURL=api_checkout_stockeventhndlr.js