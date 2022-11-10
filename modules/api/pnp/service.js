/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// TODO add save to dialog..

var nsPnpService = {
    mydb: "pnpmgt",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "",
        "productId": "",
        "shippable": false,
        "ts": getTs(),
        // Service
        "alerting": {
            "active": false,
            "email": "",
            "sms": ""
        },
        // Cost Of Service
        "items": []
    },
    // One of four selections
    modelItem: {
        "grade": "",
        "cost": 0.00,
        "annotate": ""
    },
    modelQuery: {
        "accountId": "",
        "productId": "",
        "shippable": false
    },
    uxPostNPackageWidget,
    // Create or Update
    create: function () {
        this.dataSize = this.uxPostNPackageWidget.getIds().length
        // should be pushed to analytics this is a business growth area!!!!
        try {
            if (this.dataSize > 0) {

                this.uxPostNPackageWidget.getIds().forEach(function (item) {
                    this.modelItem = {}

                    this.modelItem.cost = parseFloat($("#" + item.costId).val())
                    this.modelItem.grade = $("#" + item.gradeId).val();
                    this.modelItem.annotate = $("#" + item.annotateId).val();

                    if (this.modelItem.cost <= 0) {
                        throw Error("Cost cannot be less than or equal to Zero!")
                    }
                    this.modelCreate.items.push(this.modelItem);

                }.bind(this));

                this.modelCreate.accountId = this.accountId;
                this.modelCreate.productId = this.productId;
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
//# sourceURL=api_pnp_service.js