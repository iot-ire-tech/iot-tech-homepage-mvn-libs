/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsScheduleService = {
    mydb: "schedule",
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
        "startDateTime": "",
        "endDateTime": "",
        "timezone": "",
        "duration": {
            "hours": 0,
            "minutes": 0,
            "seconds": 0
        },
        "type": "",
        recurrence: {
            "type": "",
            "startDateTime": "",
            "endDateTime": "",
            "repeatInterval": "",
            "weeklyDays": "",
            "monthlyDay": "",
            "monthlyWeek": "",
            "monthlyWeekDay": "",
            "endTime": ""
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
                this.modelCreate.items = this.items
                this.obj = postDbRequest(this.mydb, this.modelCreate)
                this.dbId = this.obj._id
                // Update Usage Model!!!

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


//# sourceURL=api_schedule_service.js