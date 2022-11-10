/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsCommsService = {
    mydb: "comms",
    ux: {
        dialogueProps: {
            modal: true,
            autoOpen: true,
            draggable: true,
            resizable: false,
            width: "auto",
            position: {my: "top", at: "top", of: window},
            closeOnEscape: false
        },
        datepickerProps: {
//				format: 'd.m.Y H:i',
//				minDate: 0,
            startDate: new Date(),
            step: 15,
            inline: true,
            lang: 'en',
            timepicker: true,
            datepicker: true,
            todayButton: true
        }
    },

    dbId: "",
    obj: "",
    objs: [],
    // Identifiers
    accountId: "",
    productId: "",
    customerId: "",
    customers: [],
    items: new Map(),
    modelCreate: {
        "accountId": "",
        "productId": "",
        "customers": [],
        "ts": getTs(),
        "items": [] // array from keys
    },
    // Items
    modelItem: {
        "sentStatus": false,
        "type": ""
    },
    addAnalytics() {
        // TODO : Add usage
    },
    service: function () {

        return newRsp;
    },
    widgetCounter: -1,
    uxWidget: {},
    getWidgetUx: function () {
        var html = "";
        this.uxWidget.data = ""
        this.modelQuery.accountId = this.accountId;
        this.modelQuery.productId = this.productId;
        var rsp = getDbRequestQuery(this.mydb, this.modelQuery)[0]
        return this.uxWidget.init(rsp.items);
    }
    ,
    uxWidgetListing: {},
    getWidgetListingUx: function () {
        var html = "";
        this.uxWidget.data = ""
        this.modelQuery.accountId = this.accountId;
        this.modelQuery.productId = this.productId;
        var rsp = getDbRequestQuery(this.mydb, this.modelQuery)[0]
        return this.uxWidgetListing.init(rsp.items);
    }
    ,
    getByDbId: function (id) {
        var rsp = getDbRequestId(this.mydb, id)
        return rsp;
    }
    ,
    modelGetAll: {
        "accountId": ""
    },
    getAll: function () {
        this.modelGetAll.accountId = this.accountId;
        this.objs = getDbRequestQuery(this.mydb, this.modelGetAll)
    },

    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.productId = this.productId;
            this.modelCreate.customerId = this.customerId;
            this.modelCreate.customers = this.customers;
            this.modelCreate.items = Array.from( this.items.values() );
            var rsp = postDbRequest(this.mydb, this.modelCreate)
            this.dbId = rsp._id
            this.items=new Map()
        } catch (errMsg) {
            alert(errMsg)
        }
    } ,
    update: function (rsp) {
        postDbRequest(this.mydb, rsp, this.dbId)
    }
    ,
    delete: function () {
        postDbRequestDelete(this.mydb, this.dbId)
    }

}


//# sourceURL=api_comms_service.js