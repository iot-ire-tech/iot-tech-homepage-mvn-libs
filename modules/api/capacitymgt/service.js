/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// capacityPlanning_mon  01:00_60__13:00_780__(sfsdf)
//

// TODO add customer listing to dialog window

var nsCapacityMgtService = {
    mydb: "capacitymgt",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    hasCapacity: function () {
        return true;
    },
    capacityCheck: function () {
        this.obj = []
        this.get()
        if (this.obj.length === 0) {
            var msg = "nsCapacityMgtService is not returning information on this item."
            msg += "\n"
            msg += "* productId:" + this.productId
            msg += "\n"
            throw Error(msg)
        } else
            this.obj = []
            return true
    }
}

// Create / Update Service
//function isAvailable(accountId, productId, reservationDateraw) {
function capacityPlanningService(productId) {
    // Data Validte?

    // Decidoe on action....
    var rsp = capacityPlanningServiceGet(accountId, productId)

    if (rsp.length === 0) {
        rsp = capacityPlanningServiceCreate(accountId, productId, modelCapacityPlanningMgt)
    } else {
        rsp = capacityPlanningServiceUpdate(rsp[0])
    }
    return rsp;
}

function capacityPlanningServiceCreate(accountId, productId, payload) {
    payload.accountId = accountId
    payload.productId = productId

    // ASYNC Send
    rsp = postDbRequest("capacitymgt", payload)

    return rsp;
}

function capacityPlanningServiceGet(accountId, productId) {

    var query = {
        "accountId": accountId,
        "productId": productId
    }
    var rsp = getDbRequestQuery("capacitymgt", query)
    return rsp
}


function capacityPlanningServiceList(accountId, productId) {

    var query = {
        "accountId": accountId
    }
    var rsp = getDbRequestQuery("capacitymgt", query)
    return rsp;
}

function capacityPlanningServiceUpdate(rsp) {
// DB ID !!!!
    rsp = postDbRequest("capacitymgt", rsp, rsp._id)

    return rsp;
}

function capacityPlanningServiceDelete() {

}

//# sourceURL=api_capacity_service.js