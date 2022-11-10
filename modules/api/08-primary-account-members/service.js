/*
 * This service is to replace the META entry in stripe.
 * account members will be handled here.
 *
 *
 */

var nsPrimaryAccountMembersService = {
    mydb: "primary-account-members",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "platformId": "acct_1CBNZCFOjjfpNUIx",
        "accountId": "primary",
        "ts": new Date().toISOString(),
        "items": [] // members
    },
    // "accounts":
    modelItem: {
        "ts": new Date().toISOString(),
        "payments": false, // means CC can be attached
        "payouts": false, //
        "accountId": ""
    },
    service: function () {
        this.getAccount()

        // Empty or Full
        if (this.obj.length === 0) {
            this.create()
        } else if (this.obj.length > 0) {
            this.dbId = this.obj[0]._id
            this.obj[0].items = this.modelItem
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
    },
    getCompliantAccounts: function () {
        this.getByQuery()
        this.accountIds = []
        this.obj[0].items.forEach(function (memberItem) {
            if (memberItem.payouts === true) {
                this.accountIds.push(memberItem.accountId)
            }
        }.bind(this));
    }

}

//# sourceURL=api_primary_account_members_service.js