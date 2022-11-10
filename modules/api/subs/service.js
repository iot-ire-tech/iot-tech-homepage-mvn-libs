/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsSubsService = {
    mydb: "subscriptions",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    numberOfMembers: 0,
    modelCreate: {
        "accountId": "",
        "subscribers": [],
        "title": "",
        "description": "",
        "ts": getTs(),
        "items": [] // array from keys
    },
    // Defaults!!!
    modelItem: {
        "members": [],
        "accountId": "",
        "customerId": "",
        "couponId": "",
        "planIds": [],
        // name / description of entity
        "title": "",
        "description": "",
// Revenue
        // Trials
        "trialFromPlan": false,
        // Recurring
        "cancelAtPeriodEnd": false,
        // Are there others...
        // "collectionMethod": "send_invoice", ....send email
        "collectionMethod": "charge_automatically", //... deducted from CC
        "dueDateDays": 1,
        "applicationFeePercent": 5
    },
    resetModelItem: function () {
        for (const prop in this.modelItem) {
            nsSubsService.modelItem[prop] = ""
            if (prop === "members" || prop === "planIds" || prop === "members")
                nsSubsService.modelItem[prop] = []
            if (prop === "trialFromPlan" || prop === "cancelAtPeriodEnd")
                nsSubsService.modelItem[prop] = false
            if (prop === "dueDateDays" || prop === "applicationFeePercent")
                nsSubsService.modelItem[prop] = 0
        }
    },
    subscriberItem: {
        "customerId": "",
        "subscriptionId": ""
    },
    addAnalytics() {
        // TODO : Add usage
    },
    isShadowOnly: false,
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            // entity
            this.modelCreate.productId = this.productId;

            if (this.items.length > 0) {

                try {
                    this.items.forEach(function (subItem) {
                        subItem.accountId = this.accountId;


                        if (!this.isShadowOnly) {
                            this.obj = postRequest("SubscriptionAdd", subItem);
                            checkBadResponse(this.obj)
                            this.subId = this.obj.id
                            this.modelCreate.subscriptionId = this.subId
                        }

                        // shadow record
                        this.modelCreate.items.push(subItem)
                        // in multiple sub mode, this wont work....
                        x:{
                            this.modelCreate.title = subItem.title // help with identif
                            this.modelCreate.description = subItem.description // help with identif
                        }

                        this.obj = postDbRequest(this.mydb, this.modelCreate)
                        this.dbId = this.obj._id
                        this.subscriptionIds.push(this.dbId)

                        // reset
                        this.modelCreate.items = []

                    }.bind(this))
                } catch (errMsg) {
                    alert(errMsg)
                    console.log(errMsg)
                }

            }

        } catch (errMsg) {
            alert(errMsg)
        }
    },
    list: function () {
        try {
            this.objs = postRequest("SubscriptionsList", {"accountId": this.accountId});
            // checkBadResponse(this.obj)
        } catch (errMsg) {
            alert(errMsg)
            console.log(errMsg)
        }
    }
    ,
    refreshListing: function () {
        // refresh list

        this.uxWidgetListing = new UxSubsListing()
        this.getAccount()
        if (this.obj.length > 0) {
            this.uxWidgetListing.data = this.obj
        } else {
            this.uxWidgetListing.data = []
        }
        var list = this.uxWidgetListing.init()
        uxLoad(".existingSubs", list)
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


//# sourceURL=api_subs_service.js