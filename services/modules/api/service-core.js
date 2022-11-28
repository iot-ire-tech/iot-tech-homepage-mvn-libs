/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var core = {
    resetCore: function () {
        for (var member in this)
            this[member] = "";
    },
    interOps: {
        nsRevenueService: {},
        nsBizHoursService: {},
        nsCapacityMgtService: {},
        nsFixturesService: {}
    },
    ux: {
        widgetCounter: 0,


        dialogueProps: {
            modal: true,
            autoOpen: true,
            draggable: true,
            resizable: true,
            width: "auto",
            height: "auto",

            position: {my: "top", at: "top", of: window},
            closeOnEscape: false
        },


        datepickerProps: {
            onShow: function (ct) {
                this.setOptions({
                    minDate: new Date()
                })
            },
            // format:'d.m.Y H:i',
            // maxDate:'+1970/01/02'//tomorrow is maximum date calendar
//				format: 'd.m.Y H:i',
//				minDate: 0,
            startDate: new Date(),
            minDate: "0", // Today
            step: 15,
            inline: true,
            lang: 'en',
            timepicker: true,
            datepicker: true,
            todayButton: true
        }
    },
    // service
    offering: "",
    //stripe
    type: "service",
    accountId: "",
    accountIds: [],
    productId: "",
    productIds: [],
    couponId: "",
    couponIds: [],
    subscriptionId: "",
    subscriptionIds: [],
    planId: "",
    planIds: [],
    id: "",
    ids: [],
    customerId: "",
    customerIdP: "",
    customerIds: [],
    customer: {
        "type": "",
        customerId: "",
    },
    customers: [],
    // data

    obj: "",
    objs: [],
    dataSize: 0,
    dataSizeItems: 0,
    dataSizeObjs: 0,
    // Identifiers
    entityId: "",
    // messaging
    msg: "",
    checkAccountId: function () {
        if (this.accountId.length > 0) {
            return true;
        } else
            throw Error("WRN: AccountId not set")
        return this;
    },
    checkProductId: function () {
        if (this.productId.length > 0) {
            return true;
        } else
            throw Error("WRN: productId not set")
        return this;
    },
    assetId: "",
    checkAssetId: function () {
        if (this.assetId.length > 0) {
            return true;
        } else
            throw Error("WRN: assetId not set")
    },

    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    active: false,
    modelCreate: {
        "accountId": "",
        "productId": "",
        "ts": getTs(),
        "items": [] // array from keys
    },
    modelQuery: {
        "accountId": "",
        "productId": ""
    },
    modelQueryList: {
        "accountId": ""
    },
    uxWidget: {},
    getWidgetUx: function () {
        var html = "";
        this.uxWidget.data = this.objs
        this.modelQuery.accountId = this.accountId;
        this.modelQuery.productId = this.productId;
        var rsp = getDbRequestQuery(this.mydb, this.modelQuery)[0]
        return this.uxWidget.init(rsp.items);
    },
    uxWidgetListing: {},
    getWidgetListingUx: function () {
        var html = "";
        this.uxWidget.data = this.objs
        this.modelQuery.accountId = this.accountId;
        this.modelQuery.productId = this.productId;
        var rsp = getDbRequestQuery(this.mydb, this.modelQuery)[0]
        return this.uxWidgetListing.init(rsp.items);
    },
    get: function () {
        this.obj = getDbRequestQuery(this.mydb, {"accountId": this.accountId, "productId": this.productId})
        // Empty or Full
        if (this.obj.length === 0) {
            this.dbId = ""
            this.dataSizeItems = 0
        } else if (this.obj.length > 0) {
            this.obj = this.obj[0]
            this.dbId = this.obj._id

            if (this.obj.items !== undefined) {
                this.dataSizeItems = this.obj.items.length
            }
        }

        return this;
    },
    getCheck: function () {
        this.obj = getDbRequestQuery(this.mydb, {"accountId": this.accountId, "productId": this.productId})
        // Empty or Full
        if (this.obj.length === 0) {
            // throw Error("No date returned from get operation")
            return false
        } else if (this.obj.length > 0) {
            this.obj = []
            return true
        }
    },
    getAccount: function () {
        this.obj = getDbRequestQuery(this.mydb, {"accountId": this.accountId})

        // Empty or Full
        if (this.obj.length === 0) {
            this.dbId = ""
            this.dataSizeItems = 0
            // this.obj.items = []
        } else if (this.obj.length > 0) {
            if (this.obj.items !== undefined) {
                this.dataSizeItems = this.obj.items.length
            }
        }

        return this;
    },
    getByQuery: function () {
        this.obj = getDbRequestQuery(this.mydb, this.modelQuery)

        // Empty or Full
        if (this.obj.length === 0) {
            this.dbId = ""
            this.dataSizeItems = 0
            // this.obj.items = []
        } else if (this.obj.length > 0) {
            // this.obj = this.obj[0]
            // this.dbId = this.obj._id

            if (this.obj.items !== undefined) {
                this.dataSizeItems = this.obj.items.length
            }
        }

        return this;
    },
    getByDbId: function () {
        this.obj = getDbRequestId(this.mydb, this.dbId)
        this.dbId = this.obj._id
        return this;
    },
    modelGetAll: {
        "accountId": ""
    },
    crudDbOps: {
        mydb: "",
        payload: {},
        obj: {},
        create: function () {
            this.obj = postDbRequest(this.mydb, this.payload)
            return this;
        },
        delete: function () {
            postDbRequestDelete(this.mydb, this.dbId)
        },
        update: function () {
        },
        get: function () {
        },
        list: function () {
        }
    },
    crudOps: {
        ep: "",
        payload: {},
        obj: {},
        create: function () {
            this.obj = postRequest(this.ep, this.payload);
            return this;
        },
        delete: function () {
            this.obj = postRequest(this.ep, this.payload);
            if (this.obj.status !== undefined) {
                if (this.obj.status === 403) {
                    throw Error("DB_NOT_DELETE")
                }
            }

            return this;
        },
        update: function () {
            return this;
        },
        get: function () {
            this.obj = postRequest(this.ep, this.payload);
            return this;
        },
        list: function () {
            return this;
        }

    },
    getAll: function () {
        this.modelGetAll.accountId = this.accountId;
        this.objs = getDbRequestQuery(this.mydb, this.modelGetAll)
        if (this.objs !== undefined)
            this.dataSizeObjs = this.objs.length
        return this;
    },
    update: function () {
        this.obj = postDbRequest(this.mydb, this.obj, this.dbId)
        return this;

    }
    ,
    delete: function () {
        postDbRequestDelete(this.mydb, this.dbId)
        return this;
    }
    ,
    addAnalytics() {
        // TODO : Add usage
    }
}

//# sourceURL=api_core_service.js