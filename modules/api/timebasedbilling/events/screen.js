/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

ttbModel:{

    var addTbb = false;
    $(document).on("click ", '#mgtTbb', function () {
        addTbb = true;

        var html = uxTbbDialog.init(0)
        $("#moneymanagementHook").html(html)
        $("#dialogTbb").dialog(nsRevenueService.ux.dialogueProps);

    });

    $(document).on("click ", '.addTbb , #btnSaveTbb', function () {


        nsRevenueService.itemsMap.set($(this).attr("id"), {
            // "sellable": false,
            mode: nsRevenueService.modelItem.mode,
            "bestprice": nsRevenueService.modelItem.bestprice,
            "annotate": nsRevenueService.modelItem.annotate,

            "transaction": nsRevenueService.modelItem.transaction,
            "currency": nsRevenueService.modelItem.currency,
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

        if ($(this).attr("id") !== "btnSaveTbb") {
            var html = uxTbbDialog.add(this);
            $("#moneymanagementHook").after(html);
        }
    });
    $(document).on("click ", '.delTbb', function () {
        var html = uxTbbDialog.del(this);

        var id = $(this).attr("id")
        nsRevenueService.itemsMap.delete(id)

        $("#moneymanagementHook").after(html);
    });

    $(document).on("click ", '#btnSaveTbb', function () {
        $("#dialogTbb").dialog("close");
        // Copy to revenue
        // $(".addRevenueActivity").click()
        $("#tbb").attr("disabled",true)
    });
    $(document).on("click ", '#btnExitTbb', function () {
        $("#dialogTbb").dialog("close");
        $("#tbb").attr("disabled",true)
    });

}

var offeringCost = 0.0
$(document).on("click ", ".tbb", function () {
    offeringCost = parseFloat(parseFloat($(this).val()).toFixed(2));
});


//# sourceURL=api_ttb_events.js