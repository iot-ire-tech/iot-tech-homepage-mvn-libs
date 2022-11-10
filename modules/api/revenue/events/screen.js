/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).on("click ", ".addRevenueWeb, .addRevenueVideo, .addRevenueActivity, .addRevenueEvent, .addRevenueStore", function () {


    if ($(this).attr("class").toString().includes("addRevenueActivity")) {
        $("#mgtTbb").attr("disabled", true)
        $(".mgtAvailabilityActivity").attr("disabled", true)
        $(".mgtCapacityActivity").attr("disabled", true)
        $(".mgtCapacityAlertingActivity").attr("disabled", true)
    }

    if ($(this).attr("class").toString().includes("addRevenueStore")) {
        $(".mgtCapacityStore").attr("disabled", true)
        $(".mgtCapacityAlertingStore").attr("disabled", true)
    }

    nsRevenueService.itemsMap.set(getRand(), {
        // "sellable": false,
        mode: nsRevenueService.modelItem.mode,
        "bestprice": nsRevenueService.modelItem.bestprice,
        "annotate": nsRevenueService.modelItem.annotate,

        "currency": nsRevenueService.modelItem.currency,
        "transaction": nsRevenueService.modelItem.transaction,
        "transactionCent": nsRevenueService.modelItem.transactionCent,
        "discount": nsRevenueService.modelItem.discount,
        "tax": {
            "vat": nsRevenueService.modelItem.tax.vat,
            "other": nsRevenueService.modelItem.tax.other
        },
        "barcode": nsRevenueService.modelItem.barcode,


        // volume based billing
        vbb: {
            "quantity": nsRevenueService.modelItem.vbb.quantity,

        },


        tbb: {
            "unitTime": nsRevenueService.modelItem.tbb.unitTime,
            "inc": nsRevenueService.modelItem.tbb.inc,
        },
        "status": {
            "paid": nsRevenueService.modelItem.status.paid,
            "date": getTs()
        }
    })

    $(this).attr("disabled", true)
    // reset Item
    // nsMetaService.modelItem
});

var billingModelRsp = undefined
$(document).on("change ", ".cost", function () {

    accountSpecificBilling:{
        billingModelRsp = getDbRequestQuery("billing-model", {
            "name": "default",
            "members": {"$in": [accountId]}
        }) [0];

        // determine billing model u are at
        nsBillingModelMemberService.modelQuery = {
            "accountId": "acct_1CBNZCFOjjfpNUIx",
            "items": {"$elemMatch": {"accountId": accountId}}
        };
        nsBillingModelMemberService.getByQuery()
        if (nsBillingModelMemberService.obj.length === 0) {
            taganalert(".revenueMsg", "yellow", "Billing model not found for account (" + accountId + ")")
            // $(".save").attr("disabled", true)
            return
        }

        // return model
        nsBillingModelService.modelQuery = {
            "accountId": nsBillingModelMemberService.obj[0].accountId,
            "loyalty": nsBillingModelMemberService.obj[0].loyalty,
            "version": nsBillingModelMemberService.obj[0].version
        };

        nsBillingModelService.getByQuery()

        billingModelRsp = nsBillingModelService.obj[0]


        if (billingModelRsp === undefined) {
            taganalert(".revenueMsg", "yellow", "Billing model not found for account (" + accountId + ")")
        } else {
            taganalert(".revenueMsg", "yellow", "Loading billing model for account (" + accountId + ")")
        }

    }

    nsRevenueService.modelItem.transaction = parseFloat($(this).val()).toFixed(2) * 1.00
    // Case 1.99
    if (nsRevenueService.modelItem.transaction >= 1)
        nsRevenueService.modelItem.transactionCent = nsRevenueService.modelItem.transaction * 100
    else
        // Case 0.99
        nsRevenueService.modelItem.transactionCent = nsRevenueService.modelItem.transaction * 100


// Ready to commit
    nsRevenueService.modelItem.min = parseFloat(billingModelRsp.stripe.minCharge / 100).toFixed(2) * 1.00;
    nsRevenueService.modelItem.max = parseFloat(billingModelRsp.stripe.maxCharge / 100).toFixed(2) * 1.00;

    if (nsRevenueService.modelItem.transactionCent <= billingModelRsp.stripe.minCharge) {
        taganalert(".revenueMsg", "yellow", "Charge amount must be above min. charge amount " + billingModelRsp.stripe.minCharge + " cent")
        $(".saveStoreItem").attr("disabled", true)
    } else if (nsRevenueService.modelItem.transactionCent >= billingModelRsp.stripe.maxCharge) {
        taganalert(".revenueMsg", "yellow", "Charge amount must be less than the max. charge amount " + roundNumber(billingModelRsp.stripe.maxCharge / 100) + " EUR")
        $(".saveStoreItem").attr("disabled", true)
    } else {
        nsRevenueService.modelItem.viable = true
        $(".saveStoreItem").attr("disabled", false)
    }

    $(".discount").val(0)

});
$(document).on("change ", ".discount", function () {
    var d = parseInt($(this).val())

    var transactionCost = nsRevenueService.modelItem.transactionCent
    var discount = transactionCost * (d / 100)
    var cost = transactionCost - discount


    if (cost <= billingModelRsp.stripe.minCharge) {
        taganalert(".revenueMsg", "yellow", "Charge amount plus this applied discount, must be above min. charge amount " + billingModelRsp.stripe.minCharge + " cent")
        $(".saveStoreItem, .saveVideo").attr("disabled", true)
    } else if (nsRevenueService.modelItem.transactionCent >= billingModelRsp.stripe.maxCharge) {
        taganalert(".revenueMsg", "yellow", "Charge amount plus this applied discount, must be less than the max. charge amount " + roundNumber(billingModelRsp.stripe.maxCharge / 100) + " EUR")
        $(".saveStoreItem").attr("disabled", true)
    } else {
        nsRevenueService.modelItem.viable = true
        $(".saveStoreItem").attr("disabled", false)
    }


    nsRevenueService.modelItem.discount = parseInt($(this).val())
});

$(document).on("change ", ".currency", function () {
    nsRevenueService.modelItem.currency = $(this).val()
});

$(document).on("click ", ".bestprice", function () {

    var counter = $(this).attr("id").split("_")[1]

    // new best price, reset others!!!

    if (this.checked) {
        $(this).each(function () {
            var rt = this.id.toString().split("_")[1]
            if (rt !== counter) {
                this.value = false
                this.check = false
            }
        })
    } else {
        $(this).attr('value', false);
    }

});

ttb:{
    $(document).on("change ", ".ttbUnitTime", function () {
        nsRevenueService.modelItem.tbb.unitTime = parseInt($(this).val())
        nsRevenueService.modelItem.tbb.inc = $("option:selected", this).attr("incId")

        var counter = $(this).attr("id").split("_")[1]

        if (nsRevenueService.modelItem.tbb.unitTime === 0) {
            $("#cost_" + counter).attr("disabled", true)
            $("#cost_" + counter).val(0)

            $("#cost_" + counter).attr("disabled", true)
            $("#cost_" + counter).val(0)

            $("#currency_" + counter).attr("disabled", true)
            $("#currency_" + counter).val("eur")

            $("#annotate_" + counter).val("best price")
            $("#annotate_" + counter).attr("disabled", true)

            $("#bestprice_" + counter).val(true)
            $("#bestprice_" + counter).attr("disabled", true)

        } else {

            $("#cost_" + counter).attr("disabled", false)
            $("#currency_" + counter).attr("disabled", false)
            $("#annotate_" + counter).attr("disabled", false)
            $("#bestprice_" + counter).attr("disabled", false)

        }

    });

    $(document).on("change ", ".ttbIncrement", function () {
        nsRevenueService.modelItem.tbb.inc = $(this).val()
    });


}


//# sourceURL=api_revenue_events.js


