/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// at a min it does a query on this db...
var nsBillingModelService = {
    mydb: "options-model",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {},
    // "accounts":
    modelItem: {},


}

//# sourceURL=api_options-model_service.js