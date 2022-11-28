/*
 * To change this license header, choose License Headers in Project Propemsgies.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function sendSmsReceipt(poItem) {
	// ASCII
	var smsMsg = "From: IOT-Billing."
	smsMsg += "%0a"
//						smsMsg += "%0aRecipient: " + customerRsp.phone
	smsMsg += "%0aItem: " + poItem.name
	smsMsg += "%0aPurchase Date: " + getTs()
	smsMsg += "%0aDescription: " + poItem.description
	smsMsg += "%0aQuantity: " + poItem.quantity
	smsMsg += "%0aCost: " + costsCalculatorRsp.transaction + " EUR"
	smsMsg += "%0a"
	smsMsg += "Regards, IoT Tech."
	new Sms().setFrom("E-Receipt").setTo(phoneInternationalize(customerRsp.phone, "353")).setMsg(smsMsg).send();
	return smsMsg;
}
//# sourceURL=api_checkout_sms.js