/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var nsPoCService = {
    mydb: "pocmgt",
    ...core,
    modelCreate: "",
    modelQuery: "",
    // Create or Update
    service: function (modelPoc) {
        var payload = modelPoc

        var rsp = this.serviceGet(payload)

        if (rsp.length === 0) {
            var newRsp = this.serviceCreate(payload)
        } else {
            var newRsp = this.serviceUpdate(rsp, payload)
        }

        return newRsp;
    }
    ,
    serviceGet: function (payload) {
        var query = {
            "accountId": payload.accountId,
            "productId": payload.productId
        }

        var rsp = getDbRequestQuery(this.mydb, query)
        this.obj = rsp;

        return rsp;
    }
    ,
    serviceGetByDbId: function (id) {
        var rsp = getDbRequestId(this.mydb, id)
        return rsp;
    },
    serviceList: function (payload) {

        var query = {
            "accountId": accountId
        }
        var rsp = getDbRequest(this.mydb)
        return rsp;
    }
    ,
    serviceCreate: function (payload) {

        var rsp = postDbRequest(this.mydb, payload)

        return rsp;
    }
    ,
    serviceUpdate: function (rsp, payload) {

        rsp.items.push(payload.items[0])
        rsp = postDbRequest(this.mydb, rsp, rsp._id)

        return rsp;
    }
    ,
    serviceDelete: function (rsp) {

        rsp = postDbRequestDelete(this.mydb, rsp._id)

    }

}

nsPoCService.modelCreate = modelPoc
nsPoCService.modelQuery = modelPocQuery

//# sourceURL=api_poc_service.js