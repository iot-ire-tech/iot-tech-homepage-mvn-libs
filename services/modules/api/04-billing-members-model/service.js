/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var nsBillingModelMemberService = {
    mydb: "billing-model-members",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "platformId",
        "loyalty": "default", // off the street member
        "version": "0.1",
        "items": []
    },
    // "accounts":
    modelItem: {
        "ts": new Date().toISOString(),
        "accountId": ""
    },
    // The model will be changed via an edit form.
    service: function () {
        this.getAccount()

        // Empty or Full
        if (this.obj.length === 0) {
            this.create()
        } else if (this.obj.length > 0) {
            this.dbId = this.obj[0]._id
            this.obj[0].items.push(this.modelItem)
            this.update()
        }
    },
    create: function () {
        try {
            this.obj = postDbRequest(this.mydb, this.modelCreate)
            this.dbId = this.obj._id
        } catch (errMsg) {
            alert(errMsg)
        }
    }


}

//# sourceURL=api_billing-members-model_service.js