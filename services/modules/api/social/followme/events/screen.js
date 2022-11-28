/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/////////////////////////////
// Capacity Alerting Planning Management
/////////////////////////////

initUx:{


}
uxModification: {

}

exitUx: {

}

dataIn:{

    $(document).on("click ", '.btnFollowMe', function () {

        var accountId = $(this).attr("accountId")
        var productId = $(this).attr("productId")
        var customerId = $(this).attr("customerId")
        var offering = $(this).attr("offering")


        $("#dialogFollowMeHook").html(uxFollowMeWidget.init(offering, accountId, productId, customerId).getHtml());
        $("#dialogFollowMe").dialog(dialogueProps);

        // Update Data with Id of customer..
//		$(this).prop("disabled", "disabled");
    });


    $(document).on("click ", '.alertsYes', function () {
        var productId = $(this).attr("productId")
        var customerId = $(this).attr("customerId")
        var offering = $(this).attr("offering")


        var query = {
            "accountId": accountId,
            "item": {"$elemMatch": {"productId": productId}}
        }

        var rspFollowMeRsp = getDbRequestQuery("follow-me", query)[0]
        modelFollowMe.accountId = accountId
        if (rspFollowMeRsp === undefined) {
            // First Object In Array
            modelFollowMeItem.productId = productId
            modelFollowMeItem.customers.push(customerId)
            modelFollowMeItem.runningTotal = 1
            modelFollowMe.item.push(modelFollowMeItem)
            rsp = postDbRequest("follow-me", modelFollowMe)
            total = 1
        } else {
            // Updating element in array
            rspFollowMeRsp.item[0].customers.push(customerId)
            rspFollowMeRsp.item[0].runningTotal += 1
            total = rspFollowMeRsp.item[0].runningTotal
            rsp = postDbRequest("follow-me", rspFollowMeRsp, rspFollowMeRsp._id)
        }


        var htmlBtn = ""
        htmlBtn += total + ' Followers! '
        htmlBtn += "&nbsp;"
        htmlBtn += '<br>'
        htmlBtn += "<span class=likeMeHook id=" + productId + "></span>"
        htmlBtn += '<i class=\"user plus icon\"></i>'
        $(".btnFollowMe[productId=" + productId + "]").html(htmlBtn);
        $(".btnFollowMe[productId=" + productId + "]").attr("disabled", true);


        modelUsageSocial.followMe.features.customer.service = true
        // nsUsageService.usageService({
        //     "accountId": accountId,
        //     "productId": productId,
        //     "customerId": customerId
        // }, modelUsageSocial.followMe.features.customer)

        $("#dialogFollowMe").dialog("close");

    });

    $(document).on("click ", '.alertsNo', function () {
        $("#dialogFollowMe").dialog("close");
    });


}

dataSave:{

}

dataDelete:{

}


//# sourceURL=api_social_followme_events.js