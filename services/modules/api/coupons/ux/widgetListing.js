var UxCouponListing = function () {
    this.counter = 0;
    this.data = [];
    this.html = "";

    this.init = function () {
        var len = this.data.length + 5
        var html = "<select  size=" + len + "  class=\"w3-select couponListing\" title=\"Double click on the coupon to remove it from the subscription\">"
        html += "<option default disabled>Please select one</option>"
        this.data.forEach(function (item) {

            // duration: "once"
            // duration_in_months: null
            // id: "DevxK47y"
            // livemode: true
            // max_redemptions: 11
            // metadata: {}
            // name: null
            // object: "coupon"
            // percent_off: 5
            // redeem_by: 1590105600
            // times_redeemed: 0
            html += "<option "
            html += "title=" + item.id + " "
            html += "couponId=" + item.id + " "
            html += "dbId=" + item.id + " "
            html += "percent_off=" + item.percent_off + " "
            html += "redeem_by=" + item.redeem_by + " "
            html += "times_redeemed=" + item.times_redeemed + " "
            html += "max_redemptions=" + item.max_redemptions + " "
            html += ">"
            html += "Title: " + item.name + "...Discount: " + item.percent_off + "...Expiry Date: " + new Date(item.redeem_by * 1000).toLocaleString()
            html += "</option>"
        });
        html += "</select>"
        html += "<br>"
        return html;
    };
}


//# sourceURL=api_coupon_uxlisting.js
