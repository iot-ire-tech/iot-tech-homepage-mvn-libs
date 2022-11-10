/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function isPlanComboSubscriptionReady(Ids) {
// Plans must have same interval and cost (currency, also trial period...)
    var dbId = Ids[0].split(",")[0]
    var planZeroId = Ids[0].split(",")[1]


    var planZero = getPlan(accountId, planZeroId)
    try {

        Ids.forEach(function (id) {
            var dbId = id.split(",")[0]
            var planId = id.split(",")[1]

            var planX = getPlan(accountId, planId)

            if (planX.interval !== planZero.interval) {
                $("#msgErrorPlanSelection").fadeIn("now")
                $("#msgErrorPlanSelection").html("<span class='w3-tag w3-yellow'>Selected plans must match on interval</span><br>")
                $("#msgErrorPlanSelection").delay(5000).fadeOut("slow")
                throw  "bad dataset"
            }
            if (planX.interval_count !== planZero.interval_count) {
                $("#msgErrorPlanSelection").fadeIn("now")
                $("#msgErrorPlanSelection").html("<span class='w3-tag w3-yellow'>Selected plans must match on iteration count</span><br>")
                $("#msgErrorPlanSelection").delay(5000).fadeOut("slow")
                throw  "bad dataset"
            }
        });
        $("#msgErrorPlanSelection").fadeIn("now")
        $("#msgErrorPlanSelection").html("<span class='w3-tag w3-yellow'>Selected plans are valid, you can precede, or add additional plans to this subscription.</span><br>")
        $("#msgErrorPlanSelection").delay(5000).fadeOut("slow")
        return true
    } catch (e) {
        $(".planListingSubs").find("option").attr("selected", false);
        $(".planListingSubs").val([]);
        return false
    }

};

//# sourceURL=api_plans_validation.js
