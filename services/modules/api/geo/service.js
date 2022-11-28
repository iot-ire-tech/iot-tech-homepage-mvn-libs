/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsGeoService = {
    mydb: "geo",
    ...core,
    itemsMap: new Map(),
    items: [],
    modelCreate: {
        "accountId": "",
        "productId": "",
        // used by db query
        "planId": "",
        "ts": getTs(),
        "planIds": [],
        "items": [] // array from keys
    },
    modelItem: {
        "accountId": "",
        "productId": "",
        "active": true,
        "usageType": "licensed",
        "name": "",
        "scheme": "",
        "transaction": {"amount": 0, "amountDec": 0, "currency": ""},
        "schedule": {
            "trialPeriodDays": 0,
            "interval": "month", "count": 0
        }
    },
    addAnalytics() {
        // TODO : Add usage
    },
    create: function () {
        try {

            if (this.items.length > 0) {
                this.modelCreate.items = this.items


                try {
                    this.modelCreate.items.forEach(function (planItem) {
                        // Tag plan to this productId
                        planItem.accountId = this.accountId
                        planItem.productId = this.productId

                        // Plan Item Ready
                        this.obj = postRequest("PlanAdd", planItem);
                        this.planId = this.obj.id
                        // this.planIds.push(this.obj.id)
                        checkBadResponse(this.obj )

                        // create shadow record...
                        this.modelCreate.planId =  this.planId
                        this.obj = postDbRequest(this.mydb, this.modelCreate)
                        this.dbId = this.obj._id

                    }.bind(this))
                } catch (errMsg) {
                    alert(errMsg)
                    console.log(errMsg)
                }


                // accumulators...
                this.planIds = []
                this.items = []
                this.modelCreate.items = []
            }

        } catch (errMsg) {
            alert(errMsg)
        }
    }

}


//# sourceURL=api_geo_service.js