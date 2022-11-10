var UxSubsListing = function () {
    this.counter = 1;
    this.data = [];
    this.dbId = "";

    this.init = function () {
        var len = this.data.length + 2

        var html = "<select  size=" + len + "  class=\"w3-select subListing\">"
        html += "<option default disabled>Please select one or more plans</option>"

        this.data.forEach(function (subItem) {
            this.dbId = subItem._id
            subItem.items.forEach(function (item) {
                html += "<option "
                html += "dbId=" + this.dbId + " "
                html += "accountId=" + item.accountId + " "
                html += "productId=" + item.productId + " "
                html += "couponId=" + item.couponId + " "
                html += ">"
                html += "#" + this.counter + " Title: " + item.title + "...description: " + item.description
                html += "</option>"

                this.counter++
            }.bind(this));
        }.bind(this));

        html += "</select>"
        html += "<br>"

        return html;
    };
}
//# sourceURL=api_subs_uxlisting.js