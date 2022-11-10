/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsFixturesService = {
    mydb: "fixtures",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    validationCoorinates: {
        "addFixtureAvailStart": false,
        "addFixtureFixStart": false
    },
    // Items
    modelItem: {
        "startDateTime": "",
        "endDateTime": "",
        "annotate": "",
        "inc": "min"
    },
    sortedDateList: [],
    getSortedDateList() {
        // this.get()
        this.sortedDateList = this.obj.items.sort(function (a, b) {
            return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
        }.bind(this));
        return this;
    },
    create: function () {
        var startDateTimeObj;
        var endDateTimeObj;
        this.dataSize = this.uxWidget.getIds().length
        // should be pushed to analytics this is a business growth area!!!!
        try {
            if (this.dataSize > 0) {
                this.uxWidget.getIds().forEach(function (item) {
                    this.modelItem = {}
                    this.modelItem.startDateTime = $("#" + item.startDateTime).val();
                    this.modelItem.endDateTime = $("#" + item.endDateTime).val();
                    this.modelItem.annotate = $("#" + item.annotate).val();

                    startDateTimeObj = new Date(this.modelItem.startDateTime)
                    endDateTimeObj = new Date(this.modelItem.startDateTime)

                    validation:{
                        if (startDateTimeObj > endDateTimeObj) {
                            throw Error("Your opening time  (" + startDateTimeObj + ") is after closing time (" + endDateTimeObj + ")")
                        } else if (this.modelItem.startDateTime > endDateTimeObj) {
                            throw Error("Your closing time  (" + endDateTimeObj + ") is before opening time (" + startDateTimeObj + ")")
                        }
                    }
                    this.modelCreate.items.push(this.modelItem);

                }.bind(this));
                this.modelCreate.accountId = this.accountId;
                this.modelCreate.productId = this.productId;
                this.obj  = postDbRequest(this.mydb, this.modelCreate)
                this.dbId = this.obj._id

            }

        } catch
            (errMsg) {
            alert(errMsg)
            this.dbId = null
            return
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

//# sourceURL=api_fixtures_service.js
