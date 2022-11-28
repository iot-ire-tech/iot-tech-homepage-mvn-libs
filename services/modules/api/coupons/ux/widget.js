var uxCouponWidget = function () {
    this.counter = 0;
    this.dataMap = new Map();
    this.addInit = false;

    this.init = function () {
        this.counter++;


        this.html = '<label><b>Name [Customer Facing]</b></label>'
        this.html += '<input id=couponName class="w3-input w3-hover-grey" type="text" placeholder="20% Of Xmas cloths!" required title=""/>'
        this.html += '<br>'
        this.html += '<fieldset>'
        this.html += '<legend>Time Variants</legend>'
        this.html += '<br>'
        this.html += '<label><b>Recurrency</b></label>'
        this.html += '<select id=couponDuration class="w3-select " required title="Its nice to be nice!">'
        this.html += '<option value="" disabled selected>Please Select</option>'
        this.html += '<option value=once>Once</option>'
        this.html += '<option value=repeating>Monthly Repeats</option>'
        this.html += '<option value=forever title="For the duration of the subscription">Forever</option>'
        this.html += '</select>'
        this.html += '<br>'
        this.html += ''
        this.html += '<label><b>Number of Months Duration Should Run...</b></label>'
        this.html += '<input id=couponDurationInMonths disabled="" class="w3-input w3-hover-grey" type="number" min="1" max="12" required title=""/>'
        this.html += '<span id=couponDurationInMonthsMsg class="w3-tag w3-yellow" ></span>'
        this.html += '<br>'
        this.html += '<label><b>The time after which the coupon will expire</b></label>'
        this.html += '<input id=couponRedeemBy class="w3-input w3-hover-grey" type="datetime-local" required title="Eg: Should end at xmas"/>'
        this.html += '<span id=couponRedeemByMsg class="w3-tag w3-yellow" ></span>'
        this.html += '</fieldset>'
        this.html += ''
        this.html += '<br>'
        this.html += '<fieldset>'
        this.html += '<legend><b>Revenue Options</b></legend>'
        this.html += '<br>'
        this.html += '<label><b>Percentage Off</b></label>'
        this.html += '<select id="couponPercentageOff" class="w3-select" required title="Its nice to be nice!">'
        this.html += '<option value="" disabled selected>Please Select</option>'
        this.html += '<option value=5>5%</option>'
        this.html += '<option value=10>10%</option>'
        this.html += '<option value=15>15%</option>'
        this.html += '<option value=25>25%</option>'
        this.html += '<option value=50>50%</option>'
        this.html += '</select>'
        this.html += '<br>'
        this.html += '<br>'
        this.html += '<!--<input id=couponAmountOff class="w3-input w3-hover-grey" type="number"  min="0.00" required title=""/>-->'
        this.html += '<label><b>Max Customer Size Limit</b></label>'
        this.html += '<input id=couponTimesRedeemed class="w3-input w3-hover-grey" type="number" min="1" max="1000"required title="Allocate a max amount of customers that can redeem this coupon"/>'
        this.html += '<span id=couponTimesRedeemedMsg class="w3-tag w3-yellow" ></span>'
        this.html += '<br>'
        this.html += '<hr>'
        this.html += '<br>'
        this.html += '<div class="w3-row">'
        this.html += '<div class="w3-half">'
        this.html += '<br>'
        this.html += '<span id="addCouponMsg"></span>'
        this.html += '<br>'
        this.html += '<span>Sequence: Add one or more coupon(s), then save the coupon(s) to model</span>'
        this.html += '                    <br>'
        this.html += '<button class="w3-button w3-round w3-blue  w3-padding addCoupon w3-left">Add New Coupon</button>'
        this.html += '</div>'
        this.html += ''
        this.html += '<div class="w3-half">'
        this.html += '<br>'
        this.html += '<span id="saveCouponMsg"></span>'
        this.html += '<br>'
        this.html += '<button class="w3-button w3-round w3-blue  w3-padding saveCoupon w3-right">Save</button>'
        this.html += '</div>'
        this.html += '</div>'
        this.html += '</fieldset>'


        return this.html;
    }
};
//# sourceURL=api_coupon_widget.js