/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var nsContactUsService = {
    mydb: "contactus",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "ts": new Date().toISOString(),
        "fname": "",
        "lname": "",
        "priority": "",
        "purpose": "",
        "url": "",
        "comms": {
            "email": false,
            "phone": false
        },
        "query": "",
        "geo": {
            "lon": "",
            "lat": ""
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


//# sourceURL=api_contactus_service.js