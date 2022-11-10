var uxCustomerWidget = function () {
    this.counter = 0;
    this.dataMap = new Map();
    this.addInit = false;

    this.init = function () {
        this.counter++;
        return this.html;
    }
};
//# sourceURL=api_customer_widget.js