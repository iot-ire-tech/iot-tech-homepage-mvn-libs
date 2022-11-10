/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
vars:{
    var rt = 0;
    var grandTotal = 0;
    var grandFees = 0;
    var grandTaxes = 0;
    var grandDiscounts = 0;
}
search: {
    $(document).on("keyup click ", 'input.global_filter', function () {
        filterGlobal();
    });
}

comms: {
    $(document).on("change ", 'input[name=receipt]', function () {
        if ($(this).is(':checked')) {
            // if ($(this).val() === "sms") {
            nsCheckoutService.modelCreate.workflow.comms.smsAlert = true;
        } else {
            nsCheckoutService.modelCreate.workflow.comms.smsAlert = false;
        }
    });
}

cart: {

    $(document).on("click", '.quantityAdd', function () {
        // Item  Quanity
        var id = parseInt($(this).attr("entryId"))
        nsCheckoutService.modelItem.revenue.quantity += 1

        // Item Cost
        var itemCost = nsCheckoutService.itemsMap.get(id).revenue.costs.transaction;

        // Update runtime
        rt += itemCost

        $("#rt").text((Math.round(rt * 100) / 100).toFixed(2));

        //update quanity box
        $(".quantity").val(nsCheckoutService.modelItem.revenue.quantity).change()
    });

    $(document).on("click", '.quantitySub', function () {
        // Item  Quanity
        if (nsCheckoutService.modelItem.revenue.quantity > 1) {
            nsCheckoutService.modelItem.revenue.quantity -= 1

            // Item Cost
            var id = parseInt($(this).attr("entryId"))
            var itemCost = nsCheckoutService.itemsMap.get(id).revenue.costs.transaction;

            // Update runtime
            rt -= itemCost
            $("#rt").text((Math.round(rt * 100) / 100).toFixed(2));

            //update quanity box
            $(".quantity").val(nsCheckoutService.modelItem.revenue.quantity).trigger("change")
        }

    });
    $(document).on("change", '.quantity', function () {
        // value is updated...
    });


    $(document).on("click", '.shop', function () {
        var id = parseInt($(this).attr("trId"))
        nsCheckoutService.modelCreate.offering = $(this).attr("offering")


        if (nsCheckoutService.modelCreate.offering === "webinar") {

            nsWebinarService.accountId = $(this).attr("accountId")
            nsWebinarService.productId = $(this).attr("productId")
            nsWebinarService.get()
            if (nsWebinarService.obj.items !== undefined)
                nsWebinarService.obj.items.forEach(function (webinarItem) {
                    var webinarDate = new Date(webinarItem.start_time)
                    var now = new Date()
                    if (webinarDate < now) {
                        $("input[productId=" + nsWebinarService.productId + "]").attr("disabled", true)
                        $("input[productId=" + nsWebinarService.productId + "]").attr("title", "This webinar has expired")
                    }
                })
            return
        }


        // in create is needs to be so...
        nsCheckoutService.accountId = accountId

        if ($(this).is(':checked')) {

            var pnpId = ""
            var mmId = ""
            var pnpCost = 0;
            if ($(this).attr("offering") === "store") {
                pnpCost = nsPnpService.modelItem.cost
            }

            nsCheckoutService.itemsMap.set(id, {
                "accountId": $(this).attr("accountId"),
                "productId": $(this).attr("productId"),
                "offering": $(this).attr("offering"), // Event Shop
                "title": $(this).attr("title"),
                "customerId": "",
                "ts": getTs(),
                "paid": false,
                "revenue": {
                    "barcode": "",
                    "quantity": 1,
                    "costs": {
                        "transaction": parseFloat($(this).attr("cost")), // cent
                        "transactionDecimal": 0.00, // dec
                        "discountedAmount": parseFloat($(this).attr("discount")),
                        "pnp": pnpCost,
                        "fee": 0,
                        "tax": 0.00
                    }
                },
                "links": {
                    // read the usage, will tell you what to d
                    // If webinar, post to webinar
                    // If video hub post to video
                    "usageId": $(this).attr("usageId"),
                    "mmId": $(this).attr("mmId"),
                    // "dbInventoryMgtId": $(this).attr("dbInventoryMgtId"),
                    "webinarId": $(this).attr("webinarId"),
                    "pocId": $(this).attr("pocId"),
                    "pnpId": $(this).attr("pnpId"),
                    "bookingId": $(this).attr("bookingId"),
                    // "chargeId": ""
                }
            })


            updateRt:{
                var t = nsCheckoutService.itemsMap.get(id).revenue.costs.transaction
                var q = nsCheckoutService.itemsMap.get(id).revenue.quantity
                rt += (t * q)
                $("#rt").text(roundNumber(rt));
                mycart.offering = nsCheckoutService.modelCreate.offering;
                $("#firstrow").after(mycart.addItem(nsCheckoutService.itemsMap.get(id), id))
            }
        } else {

            updateRt:{
                rt -= (nsCheckoutService.itemsMap.get(id).revenue.costs.transaction * nsCheckoutService.itemsMap.get(id).revenue.quantity)
                $("#rt").text(roundNumber(rt));
                $("#item_" + id).empty().remove();
            }

            nsCheckoutService.itemsMap.delete(id)
        }

    });
}


$(document).on("click ", '#checkout', function () {

    nsCheckoutService.items = Array.from(nsCheckoutService.itemsMap.values());
    if (nsCheckoutService.itemsMap.size > 0) {

        try {
            // primary customer Id from above  !!!
            var customerPrimaryRsp = customerGet({"accountId": accountId, "customerId": customerId})
            var customerRootToken = customerPrimaryRsp.email // primary customer Id from above  !!!
            // Used by mailer recipt.
            nsCheckoutService.modelCreate.customerId = customerPrimaryRsp.id;


            var costsCalculatorRsp = {}
            console.table(nsCheckoutService.items)
            nsCheckoutService.items.forEach(function (item) {
                // Process shopping cart
                nsCheckoutService.modelCreate.name = customerPrimaryRsp.name;
                nsCheckoutService.modelCreate.phone = customerPrimaryRsp.phone;
                nsCheckoutService.modelCreate.email = customerPrimaryRsp.email;

                responsesReset :{
                    var billingModelRsp = {}
                    costsCalculatorRsp = {}
                    var customerRsp = {}
                }

                usageMgt:{
                    // Min Usage
                    modelUsage.accountId = item.accountId;
                    modelUsage.productId = item.productId;
                    modelUsage.customerId = customerId;
                    modelUsageCheckout.checkout.features.customer.checkout = true;
                    modelUsageCheckout.checkout.features.customer.checkout = true;
                    modelUsage.items.push(modelUsageCheckout)
                    nsUsageService.usageService(modelUsage)
                    customerUsage:{
                        var payload = {"accountId": accountId, "customerId": customerId}
                        var customerUsageRsp = nsUsageService.usageServiceGet(payload)
                    }
                }

                customerAccountMatch : {
                    // No need to find connected account customer Id for Primary Connected Account
                    if (accountId !== item.accountId)
                        customerRsp = customerFind({"accountId": item.accountId, "email": customerRootToken}) // Scan accounts for this customer ID!!!
                    else
                        customerRsp = customerPrimaryRsp
                    item.customerId = customerRsp.id;
                }


                billCustomer:{

                    accountSpecificBilling:{
                        nsBillingModelMemberService.modelQuery = {
                            "accountId": platformId,
                            "items": {"$elemMatch": {"accountId": item.accountId}}
                        };
                        nsBillingModelMemberService.getByQuery()
                        nsBillingModelService.modelQuery = {
                            "accountId": nsBillingModelMemberService.obj[0].accountId,
                            "loyalty": nsBillingModelMemberService.obj[0].loyalty,
                            "version": nsBillingModelMemberService.obj[0].version
                        };
                        nsBillingModelService.getByQuery()
                        billingModelRsp = nsBillingModelService.obj[0]
                        if (billingModelRsp === undefined)
                            throw Error("Billing model not found for account (" + item.accountId + ")")
                    }
                    costsCalculatorRsp = costsCalculator(item, billingModelRsp, customerUsageRsp)
                }
                // Barcode
                item.revenue.barcode = generateBarCode(item.productId)
                // item.revenue.barcode = generateBarCode(item).match(/.{1,1000}/g);

                grandTotal += costsCalculatorRsp.transactionDecimal
                item.revenue.costs.transaction = costsCalculatorRsp.transaction
                // toString as 0.00 is converted to 0
                item.revenue.costs.transactionDecimal = costsCalculatorRsp.transactionDecimal.toString()

                grandFees += costsCalculatorRsp.feeDecimal
                item.revenue.costs.fee = costsCalculatorRsp.fee
                grandTaxes += costsCalculatorRsp.taxDecimal
                item.revenue.costs.tax = costsCalculatorRsp.tax
                grandDiscounts += (costsCalculatorRsp.discountedAmount / 100)


                // Offering = shop
                if (item.offering === "store") {
                    manageCapacityLevels:{
                        var capQueryRsp = capacityPlanningServiceGet(item.accountId, item.productId)[0]
                        capQueryRsp.levels.units -= 1;
                        var capUpdateRsp = capacityPlanningServiceUpdate(capQueryRsp)
                    }
                    employCapacityAlerting:{
                        var capQueryRsp = capacityAlertPlanningServiceGet(item.accountId, item.productId)[0]
                    }
                    employPnPMgt:{
                        // Do we need to send SMS or Email To Dispact, with Order to be shipped.
                        alertPnPContacts(item.links.pnpId, item.links.pocId, item.customerId, item.title)
                    }
                }

                // End Of Shopping Loop
            }.bind(this))


            // Post To DB!
            nsCheckoutService.modelCreate.workflow.revenue.paid = false;
            nsCheckoutService.modelCreate.workflow.comms.emailAlert = true;

            nsCheckoutService.create()


        } catch (errMsg) {
            alert("INF: We are not able to charge your presently, update card details, and/or contact support")
            consoleIt(errMsg, "Checkout failed at some level")
            return
        }

        exitTasks: {
// Reset SMS
            $('#sms').each(function () {
                this.checked = false
            })
// Empty Cart Widget
            $(".cart_items").remove();
            $("#rt").text("");
// Remove checkboxes
            $('.shop').each(function () {
//			this.checked = false
                if (this.checked) {
//				$("input[productId=" + poItem.productId + "]").attr("disabled", true)
                    $(this).attr("disabled", true)
                }

            })
// Remove selected
            $('.display tbody tr').each(function () {
                var cn = this.className
                if (cn.includes("selected"))
                    $(this).removeClass('selected');
            })

            $("#msgHook").fadeIn('fast').html("Thank your for your purchase, look forward to your return.").delay(15000).fadeOut('slow')
            var shoppingTotal = roundNumber(grandTotal + grandFees + grandTaxes)
            checkOutModal(customerRootToken, roundNumber(grandTotal), roundNumber(grandFees), roundNumber(grandTaxes), roundNumber(grandDiscounts), shoppingTotal)
            grandTotal = 0
            grandFees = 0
            grandTaxes = 0
            grandDiscounts = 0
            rt = 0

            modelCheckout.items = []
        }
        // Modal
    } else {
        $("#msgHook").fadeIn('fast').html("Please select an item before clicking on purchase button.").delay(15000).fadeOut('slow')
    }

    $(this).attr("disabled", true)
});

//
//# sourceURL=api_checkout_events.js