/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
Purpose
 */
var nsAuthenticationService = {
    mydb: "authentication",
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
        "ts": new Date().toISOString(),
        "type": "",
        "offering": "",
        "username": "",
        "password": "",
        "role": "user"
    },
    resetModelItem: function () {
        for (var m in core)
            core[m] = "";
    },
    resetItems: function () {
        for (let e in this.items) {
            delete this.items[e];
        }
    },
    addAnalytics() {
        // TODO : Add usage
    },
    username: "",
    password: "",
    isAuthenticated: false,
    isPrimaryCustomer: false,
    authenticate: function () {

        this.obj.forEach(function (customerItem) {
            customerItem.items.forEach(function (item) {
                // next return primary customer Id
                if (item.person.email === this.username && item.person.phone === this.password) {
                    // yes user exists
                    this.isAuthenticated = true
                }
                if (item.type === "primary") {
                    this.customerId = item.customerId
                    this.isPrimaryCustomer = true
                }
            }.bind(this))
        }.bind(this))
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

            if (this.items.length > 0) {
                this.modelCreate.items = this.items
                this.obj = postDbRequest(this.mydb, this.modelCreate)
                this.dbId = this.obj._id
            }

            // reset
        } catch (errMsg) {
            alert(errMsg)
        }
    }
}


//# sourceURL=api_authentication_service.js