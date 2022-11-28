/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
customerSide:{

    $(document).on("change ", '.pnpOption', function () {

        if (this.checked) {
            addPnP = true;
            pnpcost = parseFloat(parseFloat($(this).val()).toFixed(2));
            // Update Checkout button
            // Derived from pnp Table
            var productId = $(this).attr("productId");
            var grade = $(this).attr("grade");
            // nsPnpService.modelCreate.customer.grade = grade;
            var annotate = $(this).attr("annotate");

            // update buy checkbox input element
            $("[idproduct='" + productId + "']").attr("pnpcost", pnpcost)
            $("[idproduct='" + productId + "']").attr("pnpgrade", grade)
            $("[idproduct='" + productId + "']").attr("pnpannotate", annotate)

            usage:{
                if (grade = "standard") {
                    modelUsagePnP.pnp.features.customer.levels.standard = true
                    modelUsagePnP.pnp.features.customer.levels.express = false
                    modelUsagePnP.pnp.features.customer.levels.sameday = false
                } else if (grade = "express") {
                    modelUsagePnP.pnp.features.customer.levels.standard = false
                    modelUsagePnP.pnp.features.customer.levels.express = true
                    modelUsagePnP.pnp.features.customer.levels.sameday = false
                } else if (grade = "sameday") {
                    modelUsagePnP.pnp.features.customer.levels.standard = false
                    modelUsagePnP.pnp.features.customer.levels.express = false
                    modelUsagePnP.pnp.features.customer.levels.sameday = true
                }
                modelUsage.accountId = accountId
                modelUsage.productId = productId
                modelUsage.customerId = customerId
                modelUsage.items.push(modelUsagePnP)
                nsUsageService.usageService(modelUsage)
            }
            // Update Cart Listing
            $("#shoppingCart tr").find("#pnpCost_" + productId + "").html(pnpcost);
            nsPnpService.modelItem.cost = pnpcost
        }

    });


    $(document).on("dblclick ", ".pnpOption", function () {

        ux:{
            $(this).each(function (index, item) {
                $(item).prop("checked", false)
                productId = $(this).attr("productId");
                $("[idproduct='" + productId + "']").attr("pnpcost", 0.00)
                $("[idproduct='" + productId + "']").attr("pnpgrade", "")
                $("[idproduct='" + productId + "']").attr("pnpannotate", "")
            })
        }

        usage:{
            modelUsage.accountId = accountId
            modelUsage.productId = productId
            modelUsage.customerId = customerId
            nsUsageService.usageServiceDelete(modelUsage)
        }
        input: {
            // nsPnpService.modelCreate.customer.grade = "";
            pnpcost = 0.00
            nsPnpService.modelItem.cost = 0.00
        }
        // Update Items Cart
        $("#shoppingCart tr").find("#pnpCost_" + productId + "").html(pnpcost);
//	customerId = $("#shoppingCart tr").find("#pnpCost_" + productId + "").eq(1).html();

    });

}
serverSide:{


    Form : {

        $(document).on("change", "#postNpackageCost", function () {
//	nsPnpService.modelCreate.postNpackageCost = parseFloat(parseFloat($(this).val()).toFixed(2))
        });
        $(document).on("click", "#shippable", function () {
            if (this.checked) {
                nsPnpService.modelCreate.shippable = true;
                $("#mgtPostNpackageCost").attr("disabled", false)
            } else {
                nsPnpService.modelCreate.shippable = false;
                $("#mgtPostNpackageCost").attr("disabled", true)
            }

        });

    }

    pnpModal: {

        $(document).on("click ", '#mgtPostNpackageCost', function () {
            $("#dialogPnPHook").html(uxPostNPackageWidget.init(0))
            $("#dialogPnP").dialog(dialogueProps);
            $(this).attr("disabled", true)
        });
        $(document).on("click ", '.addPostal', function () {
            $("#pnpContent").after(uxPostNPackageWidget.add(this));
        });
        $(document).on("click ", '.delPostal', function () {
            $("#pnpContent").after(uxPostNPackageWidget.del(this));
        });


        exitUx: {
            var testmode = false
            $(document).on("click ", '.btnSavePnP', function () {

                uxPostNPackageWidget.getIds().forEach(function (id) {
                    console.log($("#" + id.costId).val())
                    console.log($("#" + id.gradeId).val())
                    console.log($("#" + id.currencyId).val())
                    console.log($("#" + id.annotateId).val())
                })

                if (testmode) {
                    nsPnpService.accountId = accountId;
                    // nsPnpService.productId = productId;
                    nsPnpService.uxPostNPackageWidget = uxPostNPackageWidget;
                    var rsp = nsPnpService.create()
                }

                $("#dialogPnP").dialog("close");
            });
            $(document).on("click ", '.btnExitPnP', function () {
                $("#dialogPnP").dialog("close");
            });

        }

    }


    wholeSaleOfferings:{
        $(document).on("click ", ".pnpOption", function () {
            var cost = parseFloat(parseFloat($(this).val()).toFixed(2));
            var pnpDetail = {
                "cost": cost,
                "grade": $(this).attr("grade"),
                "currency": $(this).attr("currency"),
                "annotate": $(this).attr("annotate")
            }

            if (this.checked) {
                // Add
                pnpSelectionMap.set(cost, pnpDetail)
            } else {
                // Remove
                pnpSelectionMap.delete(cost)
            }

            nsPnpService.modelCreate.pnpVendorSelection = Array.from(pnpSelectionMap.values())
        });

        $(document).on("click ", "#btnOptInPnp", function () {
            nsPnpService.modelCreate.pnpOptIn = true
            $("#uxAssetPnPWidgetMsg").html("<p>Opting in for postal / package service</p>")
            $(this).attr("disabled", true)
        });

        var pnpSelectionMap = new Map()
        $(document).on("click ", "#btnOptOutPnp", function () {
            $("#btnOptInPnp").attr("disabled", false)

            $("#uxAssetPnPWidgetMsg").html("")
            nsPnpService.modelCreate.pnpOptIn = false
            nsPnpService.modelCreate.pnpVendorSelection = []
            pnpSelectionMap.clear()
            $(".pnpOption").each(function (index, item) {
                $(item).prop("checked", false)
                //	$(item).trigger("click")
//			$(item).attr("disabled", true)

            })

        });
    }
}


//# sourceURL=api_pnp_events.js