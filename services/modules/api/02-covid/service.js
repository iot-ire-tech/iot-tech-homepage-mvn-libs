/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var nsCovidService = {
    mydb: "covid",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "",
        "customerId": "",
        "ts": getTs(),
        "items": []
    },

    modelItem: {
        "ts": getTs(),
        "datetime": "",
        "q1": "",
        "q2": "",
        "q3": "",
        "q4": "",
        "q5": "",
        "q6": "",
        "q7": "",
        "q8": "",
        "q9": "",
        "q10": "",
        "q11": "",
        "q12": "",
        "q13": "",
        "q14": "",
        "q15": "",
        "q16": "",
        "q17": "",
        "q18": "",
        "geo": {
            "lon": "",
            "lat": ""
        },
        "agree": ""
    },
    modelItemBackend: {
        "ts": getTs(),
        "pocdbId": "",
        "smsMe": false,
        "emailMe": false
    },
    service: function () {

        this.obj = getDbRequestQuery(this.mydb, {"accountId": this.accountId, "customerId": this.customerId})

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
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.customerId = this.customerId;

            this.modelCreate.items.push(this.modelItem)

            this.obj = postDbRequest(this.mydb, this.modelCreate)
            this.dbIds.push(this.obj._id)

            // reset
        } catch (errMsg) {
            alert(errMsg)
        }
    }
}


//# sourceURL=api_covid_service.js