/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


initUx:{


}
uxModification: {

    dataImpact: {
    }
}

exitUx: {

}

dataIn:{
    $(document).on("click ", '.btnLikeMe', function () {
        var total = 0;
        var productId = $(this).attr("productId")
        var accountId = $(this).attr("accountId")
        var customerId = $(this).attr("customerId")
        var id = $(this).attr("id")

        var query = {
            "accountId": accountId,
            "item": {"$elemMatch": {"productId": productId}}
        }

        var rspLikeableProduct = getDbRequestQuery("likeability", query)[0]
        modelLikeMe.accountId = accountId
        if (rspLikeableProduct === undefined) {
            // First Object In Array
            modelLikeMeItem.productId = productId
            modelLikeMeItem.customers.push(customerId)
            modelLikeMeItem.runningTotal = 1
            modelLikeMe.item.push(modelLikeMeItem)
            rsp = postDbRequest("likeability", modelLikeMe)
            total = 1
        } else {
            // Updating element in array
            rspLikeableProduct.item[0].customers.push(customerId)
            rspLikeableProduct.item[0].runningTotal += 1
            total = rspLikeableProduct.item[0].runningTotal
            rsp = postDbRequest("likeability", rspLikeableProduct, rspLikeableProduct._id)
        }

        modelUsageSocial.likeMe.features.customer.likeMe = true
        nsUsageService.usageService({
            "accountId": accountId,
            "productId": productId,
            "customerId": customerId
        }, modelUsageSocial.likeMe.features.customer)

        var htmlLike = ""
        htmlLike += total + ' Likes!'
        htmlLike += '<br>'
        htmlLike += "<span class=likeMeHook id=" + productId + "></span>"
        htmlLike += '<i class=\"heart icon\"></i>'
        $(".btnLikeMe[productId=" + productId + "]").html(htmlLike);
		$("button[id=" + id + "]").prop("disabled", "disabled");
    });

}

dataSave:{

}

dataDelete:{

}


//# sourceURL=api_likeme_events.js