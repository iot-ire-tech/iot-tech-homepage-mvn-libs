/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsPlansService = {
    mydb: "plans",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
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
            //
            "interval": "month",
            "count": 0
        }
    },
    planReset: {
        "amount": 0,
        "interval": "",
        "interval_count": "",
        "coupon": "",
        "cancelPeriod": ""
    },
    addAnalytics() {
        // TODO : Add usage
    },
    create: function () {
        try {

            if (Array.from(this.itemsMap).length > 0) {
                try {
                    this.modelCreate.accountId = this.accountId
                    Array.from(this.itemsMap.values()).forEach(function (planItem) {
                        // Tag plan to this productId
                        planItem.accountId = this.accountId

                        // create shadow record...
                        stripe:{
                            this.obj = postRequest("PlanAdd", planItem);
                            this.planId = this.obj.id
                            // this.planIds.push(this.obj.id)
                            checkBadResponse(this.obj)
                            this.planIds.push(this.planId)
                        }

                        // create shadow record...
                        dbIo:{
                            this.modelCreate.planId = this.planId
                            this.modelCreate.productId = planItem.productId
                            this.modelCreate.items.push(planItem)
                            this.obj = postDbRequest(this.mydb, this.modelCreate)
                            this.dbId = this.obj._id
                            this.dbIds.push(this.dbId)
                            this.modelCreate.items = []
                        }

                    }.bind(this))
                } catch (errMsg) {
                    alert(errMsg)
                    console.log(errMsg)
                }

                // accumulators...
            }

        } catch (errMsg) {
            alert(errMsg)
        }
    },
    list: function () {
        try {
            this.objs = postRequest("PlanList", {"accountId": this.accountId});
            // this.objs = postRequest("PriceList", {"accountId": this.accountId});
            // checkBadResponse(this.obj)
        } catch (errMsg) {
            alert(errMsg)
            console.log(errMsg)
        }
    },
    // delete: function () {
    //     try {
    //         this.obj = postRequest("PlanDelete", {"accountId": this.accountId, "planId": this.planId});
    //     } catch (errMsg) {
    //         alert(errMsg)
    //         console.log(errMsg)
    //     }
    // },
    archive: function () {
        try {
            this.obj = postRequest("PlanUpdate", {"accountId": this.accountId, "planId": this.planId, "active": false});
        } catch (errMsg) {
            alert(errMsg)
            console.log(errMsg)
        }
    },
    refreshListing: function (target) {
        // refresh list
        this.uxWidgetListing = new UxPlanListing(target)
        this.getAccount()
        if (this.obj.length > 0) {
            this.uxWidgetListing.data = this.obj.sort()
        } else {
            this.uxWidgetListing.data = []
        }
        var list = this.uxWidgetListing.init()
        uxLoad(".existingPlansHook", list)
    }

    ,
    resetAccumulators: function () {
        // Tests are common...not good
        this.items = []
        this.itemsMap = new Map()
        // this.modelCreate.items = []
    },
    resetResults: function () {
        // results data
        this.dbId = ""
        this.dbIds = []
    }

}


//# sourceURL=api_plans_service.js