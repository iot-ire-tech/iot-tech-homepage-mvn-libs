/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsLegalService = {
    mydb: "legal",
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
        "tnc": "",
        "policy": ""
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
            if (this.items.length > 0) {
                this.modelCreate.items = this.items
                this.obj = postDbRequest(this.mydb, this.modelCreate)
                this.dbId = this.obj._id
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


//# sourceURL=api_legal_service.js