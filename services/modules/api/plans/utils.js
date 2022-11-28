/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// As seen by subscriptions tab
function refreshProductPlansWidgetListing() {
    var counter = 1

    var planProduct;
// Get plans owned by this account
    payload = {
        "accountId": accountId,
        "limit": 100,
        "active": true
    };
    var plans = postRequest("PlanList", payload);

    var len = plans.data.length + 2
    var html = "<select id=selectProductPlanList  multiple size=" + len + "  class='w3-select w3-hover-grey' title='Subscriptions can't have plans with different billing periods.' required>";
    html += "<option disabled selected>Please Select</option>";
    plans.data.sort().forEach(function (plan) {
        payload = {
            "accountId": accountId,
            "productId": plan.product
        };
        planProduct = postRequest("ProductGet", payload);
        html += "<option value=" + plan.id + " >#" + counter + " Product: " + planProduct.name + "...............Title: " + plan.nickname + "...Interval: " + plan.interval + "...Interval Count: " + plan.interval_count + "....Cost: " + parseFloat(plan.amount / 100).toFixed(2) + "</option>";
        counter++
    }.bind(this))
    html += "</select>";

    return html
}




//# sourceURL=api_plans_utils.js
