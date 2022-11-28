/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsSeatingService = {
    mydb: "seating",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    seatingLevels: new Map().set("level_1", "Premier").set("level_2", "Middle").set("level_3", "Back Row").set("level_4", "Standing Only"),
    modelCreate: {
        "accountId": "",
        "productId": "",
        "ts": getTs(),
        "items": []
    },
    // One of four selections
    modelItem: {
        "grade": "",
        "cost": 0.00,
        "currency": "",
        "annotate": ""
    },
    create: function () {
        this.dataSize = this.uxWidget.getIds().length
        // should be pushed to analytics this is a business growth area!!!!
        try {
            if (this.dataSize > 0) {
                this.uxWidget.getIds().forEach(function (item) {
                    this.modelItem = {}
                    this.modelItem.grade = $("#" + item.grade).val();
                    this.modelItem.cost = parseFloat($("#" + item.cost).val()).toFixed(2);
                    this.modelItem.currency = $("#" + item.currency).val();
                    this.modelItem.annotate = $("#" + item.annotate).val();


                    var cost = this.modelItem.cost

                    validation:{
                        if (cost <= 0) {
                            throw Error("Cost of (" + cost + ") is not allowed")
                        }
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
            this.dbId = null
            return
        }
    },
    bestPrice: 0,
    getBestPrice() {
        this.get()
        this.bestPrice = this.obj.items.sort(function (a, b) {
            return a.cost - b.cost;
        }.bind(this));
        this.bestPrice = this.bestPrice[0].cost
    },
    sortedPriceList: [],
    getSortedPriceList() {
        // this.get()
        this.sortedPriceList = this.obj.items.sort(function (a, b) {
            return b.cost - a.cost;
        }.bind(this));
        return this;
    },
    mostExpensive: {},
    getMostExpensive() {
        this.mydb = this.mydb
        // this.get()
        this.objsSorted = this.obj.items.sort(function (a, b) {
            return b.cost - a.cost;
        }.bind(this));

        return this.objsSorted[0].cost
    },
    sortByName() {
        var byName = arrayOfObjects.slice(0);
        byName.sort(function (a, b) {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });

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

//# sourceURL=api_seating_service.js