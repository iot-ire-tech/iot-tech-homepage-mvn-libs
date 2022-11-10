/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
Purpose:
1. Creates a shadow DB of stripe customer records
2. Possibley faster
3. Easier to program and query.
4. If stripe is down...
Services
* Checks if customer is registered against customer shadaw db.
- given a primary accounts
- check if email/mobile match
- check if account is type primary
- if both checks pass return customerId
- upstream returns connected customer account details for examination...
- ELSE?
- upstream will flag authentication error.

* Is customer billable? Does it have datasources?

 */

var nsCustomerService = {
    mydb: "customers",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],

    modelCreate: {
        "accountId": "",
        "customerId": "",
        "role": "",
        "ts": getTs(),
        "items": []
    },
    modelItem: {
        "type": "",
        "description": "",
        "ts": getTs(),
        "accountId": "",
        "customerId": "",
        "tokenId": "",
        "person": {
            firstName: "",
            lastName: "",
            sex: "",
            email: "",
            phone: "",
            "dob": {
                year: 0,
                month: 0,
                day: 0
            }
        },
        "balance": 0,
        "shipping": {
            line1: "",
            line2: "",
            town: "",
            city: "",
            zip: "",
            country: "IE",
            state: "D"
        },
        "billing": {
            line1: "",
            line2: "",
            town: "",
            city: "dublin",
            zip: "40000",
            country: "IE",
            state: "D"
        },
        card: {"number": "", "currency": "eur", "year": 0, "month": 0},
        location: {"lng": "", "lat": "", "hgt": ""},
        "meta": "",
        "role": "member",
        "userAccount": {"user": "", "pass": "", "role": "user"}
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
    age: 0,
    calculate_age: function () {
        var diff_ms = Date.now() - new Date(this.modelItem.person.dob.year, this.modelItem.person.dob.month, this.modelItem.person.dob.day).getTime();
        var age_dt = new Date(diff_ms);
        this.age = Math.abs(age_dt.getUTCFullYear() - 1970);
        return this;
    },
    username: "",
    password: "",
    isAuthenticated: false,
    isPrimaryCustomer: false,
    isPlatformCustomer: false,
    authenticate: function () {

        try {
            this.obj.forEach(function (customerItem) {
                customerItem.items.forEach(function (item) {
                        // next return primary customer Id
                        if (item.person.email === this.username && item.person.phone === this.password) {
                            // yes user exists
                            this.isAuthenticated = true
                            if (item.type === "primary") {
                                this.customer.type = "primary"
                                this.customer.customerId = item.customerId
                                this.customerId = item.customerId
                                // this.accountId = item.accountId
                                this.isPrimaryCustomer = true
                            }
                            if (item.type === "platform") {
                                this.customerIdP = item.customerId
                                // this.accountIdP = item.accountId
                                this.isPlatformCustomer = true
                            }

                            // this will return both IDs
                            if (this.isAuthenticated && this.isPlatformCustomer && this.isPrimaryCustomer) {
                                throw Error("Authenticated")
                            }
                        }
                    }
                        .bind(this)
                )
            }.bind(this))
        } catch (e) {
            return
        }
    },
    // only used for first customer!!!
    getCfo: function () {
        try {
            //
            this.getByQuery()

            this.obj.items.forEach(function (item) {
                if (item.type === "platform") {
                    this.customerIdP = item.customerId
                    this.isPlatformCustomer = true
                }

                if (item.type === "primary") {
                    this.customerId = item.customerId
                    this.isPrimaryCustomer = true
                }

                if (item.type === "partner") {
                    this.customerId = item.customerId
                    this.isPrimaryCustomer = true
                }
                if (this.isPlatformCustomer && this.isPrimaryCustomer) {
                    throw Error("Found")
                }
            }.bind(this))

        } catch (err) {
            // alert(err)
            return
        }
    },
    isEmail: false,
    isPassword: false,
    newpassword: "",
    getAccountByEmail: function () {
        try {
            //
            this.getByQuery()
            this.obj.items.forEach(function (item) {
                if (item.person.email === this.username) {
                    this.isEmail = true
                }
                if (item.person.phone === this.password) {
                    item.person.phone = this.newpassword
                    this.isPassword = true
                }

            }.bind(this))

            if (this.isEmail && this.isPassword) {
                throw Error("account updated")
            }
        } catch
            (err) {
            // alert(err)
            return true
        }
        return false
    }
    ,
    create: function () {
        try {
            this.modelCreate.customerId = this.customerId;
            this.modelCreate.accountId = this.accountId;

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


//# sourceURL=api_customer_service.js