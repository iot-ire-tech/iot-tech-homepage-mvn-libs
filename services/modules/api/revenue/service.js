/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsRevenueService = {
    mydb: "revenue",
    ...core,

    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "",
        "productId": "",
        "ts": getTs(),
        "items": [] // array from keys
    },
    modelItem: {
        "min": 0,
        "max": 0,
        "viable": false, // entity only created with charge > min amount
        // "sellable": false,
        "bestprice": false,
        "annotate": "",
        // volume based billing
        vbb: {
            "quantity": 0,

        },
        tbb: {
            "unitTime": 0,
            "inc": 0,
        },
        "transaction": 0,
        "currency": "",
        "transactionCent": 0,
        "discount": 0,
        "tax": {
            "vat": 0.00,
            "other": 0.00
        },
        "barcode": "",
        "status": {
            "paid": false,
            "date": getTs()
        }
    },
    resetModelItem: function () {
        for (var m in core)
            core[m] = "";
    },
    resetItems: function () {
        for (let e in this.items) {
            delete this.items[e];
        }
    },
    addAnalytics() {
        // TODO : Add usage
    },
    service: function () {
        try {

        } catch (errMsg) {
            alert(errMsg)
        }
    },
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.productId = this.productId;

            this.items = Array.from(this.itemsMap.values())
            if (this.items.length > 0) {
                this.modelCreate.items = this.items

                this.obj = postDbRequest(this.mydb, this.modelCreate)
                this.dbIds.push(this.obj._id)
            }

            // reset
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


//# sourceURL=api_revenue_service.js