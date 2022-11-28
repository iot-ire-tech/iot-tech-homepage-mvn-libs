/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// checkout_mon  01:00_60__13:00_780__(sfsdf)
//

// init file

var nsCheckoutService = {
    mydb: "checkout",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "",
        "customerId": "",
        "email": "",
        "name": "",
        "phone": "",

        "productId": "",
        "ts": getTs(),
        "offering": "",
        "workflow": {
            "revenue": {
                "paid": false
            },
            "comms": {
                "smsAlert": false,
                "emailAlert": true
            }
        },
        "items": []
    },
    modelItem: {
        "ts": getTs(),
        "accountId": "",
        "productId": "",
        "title": "",
        "customerId": "",
        "paid": false,
        "revenue": {
            "barcode": "",
            "quantity": 1,
            "costs": {
                "transaction": 0, // cent
                "transactionDecimal": 0.00, // dec
                "discountedAmount": 0.00,
                "fee": 0,
                "tax": 0.00
            }
        },
        "links": {
            // read the usage, will tell you what to d
            // If webinar, post to webinar
            // If video hub post to video
            "usageId": "",
            "chargeId": "",
            "dbInventoryMgtId": "",
            "pocId": "",
            "pnpId": "",
            "webinarId": "",
            "bookingId": "",
            "videoHubId": ""
        }
    },
    addAnalytics() {
        // TODO : Add usage
    },
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.productId = this.productId;

            if (this.items.length > 0) {
                this.items.forEach(function (item) {

                    // Prime
                    this.modelCreate.items.push(item);

                    // save
                    this.obj = postDbRequest(this.mydb, this.modelCreate)

                    // Collect and Clean
                    this.dbIds.push(this.obj._id)
                    this.modelCreate.items = []
                }.bind(this))
            }

        } catch (errMsg) {
            alert(errMsg)
        }
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
//# sourceURL=api_checkout_service.js