/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var nsOptionsMemberModelService = {
    mydb: "options-members-model",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "platformId",
        "level": "basic", // basic, premium, professional
        "version": "0.1",
        "items": []
    },
    // "accounts":
    modelItem: {
        "ts": new Date().toISOString(),
        "accountId": ""
    },
    service: function () {
        this.getByQuery()

        // Empty or Full
        if (this.obj.length === 0 ) {
            this.create()
        } else if (this.obj.items.length > 0) {
            this.dbId = this.obj._id
            this.obj.items.push(this.modelItem)
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

//# sourceURL=api_options-members-model_service.js