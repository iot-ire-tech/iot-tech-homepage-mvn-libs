/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/////////////////////////////
// Capacity Planning Management
/////////////////////////////

initUx:{
    var addCapacityPlanning = false;
    $(document).on("click ", '.mgtCapacityAsset , .mgtCapacityStore, .mgtCapacityActivity', function () {
        addCapacityPlanning = true;

        var html = uxCapacityWidget.init(0)
        $("#capacityPlanHook").html(html)
        $("#dialogCapacityPlan").dialog(dialogueProps);
    });


}
uxModification: {

}

exitUx: {
    $(document).on("click ", '.btnSaveCapacityPlan', function () {
        $("#dialogCapacityPlan").dialog("close");
        $('.mgtCapacityAsset , .mgtCapacityStore, .mgtCapacityActivity').attr("disabled", true)
    });
    $(document).on("click ", '.btnExitCapacityPlan', function () {
        $("#dialogCapacityPlan").dialog("close");
        $('.mgtCapacityAsset , .mgtCapacityStore, .mgtCapacityActivity').attr("disabled", true)
    });

}

dataIn:{
    capManagement :{
        var unitsTotal = false;
        var units_upper = false;
        var unitsLower = false;

        $(document).on("change", ".units_total", function () {
            unitsTotal = true;
            var max = parseInt($(this).attr("max"))
            var rt = parseInt($(this).val());

            if (rt > max) {
                alert("INF: Cannot assert a capacity value great than that currently set on the upstream asset")
            } else {
                modelCapacityPlanningMgt.levels.units_total = rt;
                modelCapacityPlanningMgt.levels.units = rt;
            }
//	modelCapacityPlanningMgt.bookings.unitsRemaining = parseInt($(this).val());

        });


// TODO untoggle default to revert screen thresholds and data
        $(document).on("change ", ".inventory_applyDefault", function () {

            if (this.checked) {
                modelCapacityPlanningMgt.levels.units_upper = 0.80
                modelCapacityPlanningMgt.levels.units_lower = 0.20

                $(".units_upper").val(modelCapacityPlanningMgt.levels.units_upper * 100).change()
                $(".units_lower").val(modelCapacityPlanningMgt.levels.units_lower * 100).change()

                $(".upperHook").text(modelCapacityPlanningMgt.levels.units_upper * 100).change()
                $(".lowerHook").val(modelCapacityPlanningMgt.levels.units_lower * 100).change()


                $(".units_upper").attr("disabled", true)
                $(".units_lower").attr("disabled", true)

                units_upper = true;
                units_lower = true;
            }
        });

        $(document).on("change ", ".units_lower", function () {
            units_upper = true;
            var lower = $(this).val()
            modelCapacityPlanningMgt.levels.units_lower = parseFloat(parseFloat($(this).val() / 100).toFixed(2))
            $(".lowerHook").text(modelCapacityPlanningMgt.levels.units_lower)
            $(".units_upper").attr("min", $(this).val())
        });

        $(document).on("change ", ".units_upper", function () {
            units_lower = true;
            modelCapacityPlanningMgt.levels.units_upper = parseFloat(parseFloat($(this).val() / 100).toFixed(2))
            $(".upperHook").text(modelCapacityPlanningMgt.levels.units_upper)
            $(".units_lower").attr("max", $(this).val())
        });

        $(document).on("change ", ".bufferoverflow", function () {
            bufferoverflow = true;
            modelCapacityPlanningMgt.levels.bufferoverflow = parseFloat(parseFloat($(this).val()).toFixed(2))
        });


    }

}

dataSave:{

}

dataDelete:{

}


//# sourceURL=api_capacity_events.js