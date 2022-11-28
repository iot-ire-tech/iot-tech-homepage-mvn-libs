/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsXService = {
    mydb: "comms",
    ...core,
    modelCreate: {
        "accountId": "",
        "productId": "",
        "ts": getTs(),
        "items": [] // array from keys
    },
    modelItem: {
        "type": ""
    },
    addAnalytics() {
        // TODO : Add usage
    },
    service: function () {

        try {
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.productId = this.productId;
            this.modelCreate.items = Array.from(this.modelItem);
            this.obj = postDbRequest(this.mydb, this.modelCreate)
            this.dbId = this.obj._id

        } catch (errMsg) {
            alert(errMsg)
        }
    },
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.productId = this.productId;
            this.modelCreate.items = Array.from(this.modelItem);
            this.obj = postDbRequest(this.mydb, this.modelCreate)
            this.dbId = this.obj._id

        } catch (errMsg) {
            alert(errMsg)
        }
    }

}


//# sourceURL=api_comms_service.js