/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsUserAccountService = {
    mydb: "useraccount",
    ...core,
    itemsMap: new Map(),
    items: [],
    modelCreate: {
        "accountId": "",
        "productId": "",
        "ts": getTs(),
        "items": [] // array from keys
    },
    modelItem: {
        "username": "",
        "password": "",
        "type": ""
    },
    addAnalytics() {
        // TODO : Add usage
    },
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.productId = this.productId;
            if (this.items.length > 0) {
                this.modelCreate.items = this.items
                this.obj = postDbRequest(this.mydb, this.modelCreate)
                this.dbId = this.obj._id
                // Update Usage Model!!!
            }
        } catch (errMsg) {
            alert(errMsg)
        }
    }

}

//# sourceURL=api_useraccount_service.js