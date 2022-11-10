/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsCouponsService = {
    mydb: "coupons",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "",
        // used by query later
        "couponId": "",
        "ts": getTs(),
        "items": [] // array from keys
    },
    modelItem: {
//Name of the coupon displayed to customers on, for instance invoices, or receipts. By default the id is shown if name is not set.
        "name": "",
// Money
// A positive integer representing the amount to subtract from an invoice total (required if percent_off is not passed).
        "amountOff": 0,
        "percentageOff": 0,
        "currency": "",
// Time
// Specifies how long the discount will be in effect. Can be forever, once, or repeating.
        "duration": "",
        "durationInMonths": 0,
        "redeemBy": 0,
        "timesRedeemed": 0
    },
    addAnalytics() {
        // TODO : Add usage
    },
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            // this.modelCreate.productId = this.productId;

            if (this.items.length > 0) {

                try {
                    this.items.forEach(function (couponItem) {

                        couponItem.accountId = this.accountId;
                        this.obj = postRequest("CouponsAdd", couponItem);
                        this.couponId = this.obj.id
                        checkBadResponse(this.obj)

                        // shadow record
                        this.modelCreate.couponId = this.couponId
                        this.obj = postDbRequest(this.mydb, this.modelCreate)
                        this.dbId = this.obj._id
                        this.couponIds.push(this.dbId)

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
            this.objs = postRequest("CouponsList", {"accountId": this.accountId});
            // checkBadResponse(this.obj)
        } catch (errMsg) {
            alert(errMsg)
            console.log(errMsg)
        }
    },
    delete: function () {
        postRequest("CouponDelete", {"accountId": this.accountId, "couponId": this.couponId});

        // shadow record
        this.obj = getDbRequestQuery(this.mydb, {"accountId": this.accountId, "couponId": this.couponId})
        postDbRequestDelete(this.mydb, this.obj[0]._id)

    },
    refreshListing: function () {
        // refresh list
        this.uxWidgetListing = new UxCouponListing()
        this.list()
        this.uxWidgetListing.data = this.objs.data
        var couponslist = this.uxWidgetListing.init()
        uxLoad(".existingCouponsHook", couponslist)
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


//# sourceURL=api_coupon_service.js