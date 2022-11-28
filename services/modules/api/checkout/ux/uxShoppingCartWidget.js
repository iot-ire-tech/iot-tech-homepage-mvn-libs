var cartFunc = function (offering) {
    this.counter = 0;
    this.offering = offering;
    this.data = [];
    this.html = "";
    this.id = "";
    this.pnpEnabled = false;
    this.init = function (id) {
        this.id = id;
        return this;
    };
    this.addHeader = function () {
        this.html = "<div class='cart staycenter_right w3-container'>"
        this.html += "<table class='w3-table' BORDER=1 BORDERCOLOR=lightgray style=\"border: rgba(211, 211, 211, .2);\">"
        this.html += "<caption><b><i class=\"fa fa-cart-plus\"></i>&nbsp;Shopping Cart Options<b></caption>"
        this.html += "<tr>"
        this.html += "<td> Payment Methods: </td>"
        this.html += "<td>"
        this.html += "<input type=radio value=bank class=paymentMethod name=paymentMethod disabled><i class=\"fa fa-university\">&nbsp;SEPA</i>"
        this.html += "<br>"
        this.html += "<input type=radio value=card class=paymentMethod name=paymentMethod checked> <i class=\"credit card outline icon\">&nbsp;Card</i>"
        this.html += "</td>"
        this.html += "</tr>"


        this.html += "<tr>"
        this.html += "<td> Receipt Options: </td>"
        this.html += "<td>"
        this.html += "<input id=sms type=checkbox value=sms class=receiptMethod name=receipt ><i class=\"fa fa-commenting-o\">&nbsp;SMS </i>"
        this.html += "<br>"
        this.html += "<input id=email type=checkbox value=email class=receiptMethod name=receipt disabled checked><i class=\"fa fa-envelope-o\">&nbsp;Email</i>"
        this.html += "</td>"
        this.html += "</tr>"

        if (this.offering === "storeX") {
            pnpOption:{
                this.html += "<tr>"
                this.html += "<td> Post N Packing: </td>"
                this.html += "<td>"
                this.html += "<input id=pnpRoad type=radio value=pnpRoad class=pnpOption name=pnp  checked ><i class=\"fa fa-truck\">&nbsp;Regular</i>"
                this.html += "<br>"
                this.html += "<input id=pnpAir type=radio value=pnpAir class=pnpOption  name=pnp ><i class=\"fa fa-plane\">&nbsp;Express</i>"
                this.html += "</td>"
                this.html += "</tr>"
            }
        }

        this.html += "<tr>"
        this.html += "<td >Total  </td>"
        this.html += "<td ><span id=rt></span> </td>"
        this.html += "</tr>"


        this.html += "<tr>"
        this.html += "<td colspan=2 style=\"text-align:right\"> <button id=checkout class='w3-button w3-small w3-gray'>Buy Now</button> </td>"
        this.html += "</tr>"


        this.html += "</table>"
        this.html += "<hr>"
        return this;
    };

    this.addFooter = function () {
        this.html += "</div>"
        return this;
    };


    this.addHeaderItems = function () {
        this.html += "<table id=shoppingCart class='w3-table'>"
        this.html += "<caption><b>Shopping Items</b></caption>"
        this.html += "<tr id=firstrow>"
        this.html += "<td>Name</td>"
        this.html += "<td>Cost</td>"
        if (this.offering === "store") {
            this.html += "<td>P&P</td>"
            this.html += "<td>Units</td>"
        }
        this.html += "</tr>"
        return this;
    };
    this.addItem = function (item, id) {
        this.counter++;
        this.html = "<tr id=item_" + id + " productId=" + item.productId + " class=cart_items>"
        this.html += "<td>" + item.title + "</td>"
        this.html += "<td>" + roundNumber(item.revenue.costs.transaction) + "</td>"
        if (item.links.pnpId.length > 0)
            this.html += "<td id=pnpCost_" + item.productId + " >" + roundNumber (nsPnpService.modelItem.cost) + "</td>"
        this.html += "<td>"
        if (this.offering === "store") {
            this.html += "<input class=quantity type=number maxlength=2 size=2 style=max-width:40px value=1>"
            this.html += "<button  entryId=" + id + " class=\"quantityAdd w3-button w3-tiny  w3-circle w3-green\" style=\"padding:4px;\">+</button>&nbsp;"
            this.html += "<button  entryId=" + id + " class=\"quantitySub w3-button w3-tiny  w3-circle w3-red\"  style=\"padding:4px;\">-</button>"
        }
        this.html += "</td>"

        this.html += "</tr>"
        return this.html;
    };
    this.addFooterItems = function () {
        this.html += "</table>"
        return this;
    };

    this.addItemHook = function () {
        this.counter++;
        this.html += "<span id=cartItem>"
        return this;
    };


    this.getCart = function () {
        return this.html;
    };


};

//# sourceURL=api_checkout_cart.js