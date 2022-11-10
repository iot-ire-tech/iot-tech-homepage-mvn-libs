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


    $(document).on("change ", ".pocCustomerList", function () {


        pocProxy.items = []
//		var commsList = []
//		$(this).val().forEach(function (item) {
//			commsList.push(item)
//		})
        var customerId = $('option:selected', this).attr("from");
        // customerId = $('option:selected', this).val();
        var customerIds = $(this).val();


        var rsp={}
        customerIds.forEach(function (item) {
            rsp = customerGet({"accountId": accountId, "customerId": item})
            pocProxy.items.push({
                "customerId": rsp.id,
                "fullName": rsp.name,
                "email": rsp.email,
                "phone": rsp.phone,
                "ts": getTs()
            });
        })

// Update Widget with last customer
        $(".pocName").val(rsp.name).trigger("change")
        $(".pocEmail").val(rsp.email).change();
        $(".pocPhone").val(rsp.phone).trigger("change")


    });
    var addPoc = false;
    $(document).on("change ", ".pocName", function () {
        addPoc = true
        addPocName = true
        pocProxy.fullName = $(this).val();
    });
    $(document).on("change ", ".pocEmail", function () {
        addPocEmail = true
        pocProxy.email = $(this).val();
    });
    $(document).on("change ", ".pocPhone", function () {
        addPocPhone = true
        pocProxy.phone = $(this).val();
    });


}

exitUx: {

}

dataIn:{

}

dataSave:{

}

dataDelete:{

}


//# sourceURL=api_poc_events.js