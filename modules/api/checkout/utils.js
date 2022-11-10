/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// https://www.merchantmaverick.com/paypal-vs-stripe/
// https://stripe.com/ie/pricing
// Granular Charges
// Service Level Costs (Fees)
// Pnp / Inventory / Notification (Email/SmS)
// Stripe

extCharges:{
// Sub Totals - Fixed
// - DB/ Google / Git / Wages / Support Widget / Stripe / SMS
}


function costsCalculator(rt, billing, usage) {
    var costs = {
        "transaction": 0, // Cent
        "transactionDecimal": 0.00, // Deciam
        "discountedAmount": 0.00, // Percentage
        "fee": 0, // Int only // applicaiton fee
        "feeDecimal": 0, // Int only // applicaiton fee
        "tax": 0.00,
        "taxDecimal": 0.00	//
    }

    try {
        var taxCost = 0.20; // Percentage
        var discountAmount = 0; // Percentage

        feeTime:{
            AnalysisCustomerUsage : {
                // 2. Add in quanity
                costs.transaction = (rt.revenue.costs.transaction * rt.revenue.quantity);
                // 1. convert price to cent
                costs.transaction *= 100

                // 3. Apply discount if any
                if (rt.revenue.costs.discountedAmount > 0) {
                    discountAmount = costs.transaction * (rt.revenue.costs.discountedAmount / 100)
                    costs.discountedAmount = parseInt(discountAmount) * 1;
                    costs.transaction -= costs.discountedAmount;
                }

                // 4. Add usage
                // costs.transaction += (rt.revenue.costs.pnp * 100)
                usage.items = []
                usage.items.forEach(function (item) {

                    if (item.name === "bookingengine") {
                        if (item.features.customer.booking.ttb)
                            costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                        if (item.features.customer.booking.bizhours)
                            costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                        if (item.features.customer.booking.booking)
                            costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)

                        if (item.features.customer.notification.email)
                            costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                        if (item.features.customer.notification.sms)
                            costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)


                    }
                    pnp: {
                        // costs.transaction += (rt.revenue.costs.pnp * 100)

// 						if (item.name === "pnp") {
// 							if (item.features.customer.levels.standard)
// 								costs.fee += (billing.costs.pnpCost + billing.costs.pnpFeeCost)
// 							if (item.features.customer.levels.express)
// 								costs.fee += (billing.costs.pnpCost + billing.costs.pnpFeeCost)
// 							if (item.features.customer.levels.sameday)
// 								costs.fee += (billing.costs.pnpCost + billing.costs.pnpFeeCost)
// 						}
                    }

                    social: {
                        if (item.name === "contactMe") {
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.sms)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.email)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                        }
                        if (item.name === "followMe") {
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.sms)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.email)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                        }
                        if (item.name === "likeMe") {
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.sms)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.email)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                        }
                        if (item.name === "linkedIn") {
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.sms)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.email)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                        }
                        if (item.name === "followMe") {
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.sms)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.tel)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                            if (item.features.customer.notification.email)
                                costs.fee += (billing.costs.smsCost + billing.costs.smsFeeCost)
                        }

                    }


// Notification Service
//					if (supportUsage)
//						costs.fee += (billing.costs.supportCost + billing.costs.supportFeeCost)
//					if (rt.revenue.usage.videoHub === "true")
//						costs.fee += (billing.costs.videoHubCost + billing.costs.videoHubFeeCost)
//					if (rt.revenue.usage.webinarHub === "true")
//						costs.fee += (billing.costs.webinarHubCost + billing.costs.webinarHubFeeCost)
                }.bind(this))
            }

// Hard Stop - Stripe
            if (costs.transaction < 50) {
                throw  Error("The charge amount +" + costs.transaction + " doesnt meet application min amount 50 cents.");
            }


            chargeTime:{

                // percentageCosts Transaction
                var percentageCosts = billing.costs.stripe.stripCCPerCost + billing.costs.applicationPerFee; // 5% of transaciton cost or .....max 10 Euro
                var percentageAmount = costs.transaction * (percentageCosts / 100)
                percentageAmount = Math.ceil(percentageAmount)  // back to int (ceil
                costs.fee += percentageAmount

                // Add Fixed Costs
                var fixedCosts = billing.costs.stripe.stripCCFixCost + billing.costs.emailCost + billing.costs.emailFeeCost; // 40 Cent Fix Profit
                costs.fee += fixedCosts

// * Limit Cap Fee Check
                if (costs.fee > billing.costs.cappedMaxChargeAmount) {
                    costs.fee = billing.costs.cappedMaxChargeAmount
                }
            }

// * Hard Stop - IoT
            if (costs.transaction < costs.fee) {
                if (billing.hardstop == true)
                    throw  Error("The charge amount +" + costs.transaction + " doesnt meet application fee amount " + costs.fee + ")");
                else
                    window.console.log("WRN: The charge amount +" + costs.transaction + " doesnt meet application fee amount " + costs.fee + ")")
            }
        }


    } catch (errMsg) {
// Present Model (Send Mail Report)
        throw  Error(errMsg);
    }

// Finalize
    costs.fee = parseInt(costs.fee)
    costs.feeDecimal = parseFloat(costs.fee / 100).toFixed(2) * 1.00

    costs.transaction = parseInt(costs.transaction)
    costs.transactionDecimal = parseFloat(costs.transaction / 100).toFixed(2) * 1.00

    costs.tax = parseInt(costs.tax)
    costs.taxDecimal = parseFloat(costs.tax).toFixed(2) * 1.00

    return costs;
}


//# sourceURL=api_checkout_utils.js