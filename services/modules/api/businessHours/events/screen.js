/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/////////////////////////////
// Time Management : Availability
/////////////////////////////

//hrmin = $("#" + item.openingId).val();
//ot = convertHrMin2Mins(hrmin)
//hrmin = $("#" + item.closingId).val();
//ct = convertHrMin2Mins(hrmin)


initUx:{
    $(document).on("click ", '.mgtAvailabilityAsset , .mgtAvailabilityActivity', function () {

        // TODO destroy widget after save
        var html = uxBusinessHoursWidget.init()
        $("#dialogBusinessHoursHook").html(html)
        $("#dialogBusinessHours").dialog(nsBizHoursService.ux.dialogueProps);
    });

}
uxModification: {

    var days = 1
    $(document).on("click ", '.btnAddWeek', function () {

        $(this).attr("disabled", true)
        $("#dialogBusinessHoursHook").after(uxBusinessHoursWidget.addWeek(this));
        days = 8
    });

    dataImpact: {
        $(document).on("click ", '.add, .btnAddDay', function () {
            if (days <= 7) {
                days++
                $("#dialogBusinessHoursHook").after(uxBusinessHoursWidget.add(this));
            } else {
                $(this).attr("disabled", true)
            }
        });
        $(document).on("click ", '.del', function () {
            days--
            $("#dialogBusinessHoursHook").after(uxBusinessHoursWidget.del(this));
        });
    }
}

exitUx: {
    var testmode = false
    $(document).on("click ", '.btnSaveBizHours', function () {
// print all the entries.
        uxBusinessHoursWidget.getIds().forEach(function (id) {
            console.log($("#" + id.dowId).val())
            console.log($("#" + id.openingId).val())
            console.log($("#" + id.closingId).val())
            console.log($("#" + id.annotateId).val())

        })
        if (testmode) {
            nsBizHoursService.accountId = accountId;
            nsBizHoursService.productId = productId;
            nsBizHoursService.uxBusinessHoursWidget = uxBusinessHoursWidget;
            var bizHoursRsp = nsBizHoursService.create()
        }

        $("#dialogBusinessHours").dialog("close");
        $('.mgtAvailabilityAsset , .mgtAvailabilityActivity').attr("disabled", true)
    });
    $(document).on("click ", '#btnExitBizHours', function () {

        $("#dialogBusinessHours").dialog("close");
        $('.mgtAvailabilityAsset , .mgtAvailabilityActivity').attr("disabled", true)
    });

}

dataSave:{

}

dataDelete:{

}


//# sourceURL=api_bizHours_events.js