var UxPlanListing = function (target) {
    this.counter = 1;
    this.data = [];
    this.html = "";
    this.dbId = "";
    this.planId = "";
    this.productId = "";

    this.init = function () {
        this.counter = 1
        var len = this.data.length + 2
        var html = "<select  size=" + len + "  class=\"w3-select  planListing" + target + "\" multiple>"
        html += "<option default disabled>Please select one</option>"
        this.data.forEach(function (planItem) {
            this.dbId = planItem._id
            this.planId = planItem.planId
            // this.productId = planItem.productId

            planItem.items.forEach(function (item) {

                var payload = {
                    "accountId": accountId,
                    "productId": item.productId
                };
                var product = postRequest("ProductGet", payload);

                html += "<option "
                html += "value=" + this.dbId + "," + this.planId + " "
                html += "dbId=" + this.dbId + " "
                html += "planId=" + this.planId + " "
                html += "productId=" + item.productId + " "
                html += "amount=" + item.transaction.amount + " "
                html += "interval=" + item.schedule.interval + " "
                html += "interval_count=" + item.schedule.count + " "
                html += "trial_period_days=" + item.schedule.trialPeriodDays + " "
                html += ">"

                var productName = " Product: " + product.name
                var charsRemaining = 50 - productName.length

                for (i = 0; i <= charsRemaining; i++) {
                    productName += "."
                }
                html += "#" + this.counter + " " + productName + "...Plan Title: " + item.name + "...amount: " + parseFloat(item.transaction.amount / 100).toFixed(2) + "...interval: " + item.schedule.interval + "...interval_count: " + item.schedule.count + "...trial_period_days: " + item.schedule.trialPeriodDays
                html += "</option>"

                this.counter++
            }.bind(this));
        }.bind(this));

        html += "</select>"
        html += "<br>"
        return html;
    };
}


function widgetPlansDetailCosts(plan) {

    var html = ""
    html += "<div class=w3--center>"
    html += "<span>Detail cost information concerning bundled plan.</span>"
    html += "<br>"
    html += "<br>"

    html += "<label>Plan: " + plan.nickname + "</label><br>"
    html += "<label>Cost: <span class='fa fa-euro' style='font-size:12px;color:#21BA45'>" + parseFloat(plan.amount / 100).toFixed(2) + "</span></label><br>"
    html += "<label>Duration: " + plan.interval_count + " [" + plan.interval + "]</label><br>"
//	html += "<label>Duration: " + plan.interval + " </label><br>"
    if (plan.coupon !== undefined)
        html += "<label>Coupon: " + plan.coupon + " </label><br>"
    else
        html += "<label>Coupon: n/a</label><br>"
    html += "<label>Trail Period: " + plan.trial_period_days + "[" + plan.interval + "]</label><br>"

    html += "</div>"
    return html;
}


function widgetPlansDetailCouponX(couponDetail) {

//	amount_off: null
//	created: 1589567845
//	currency: null
//	deleted: null
//	duration: "once"
//	duration_in_months: null
//	id: "k3E5XV0U"
//	livemode: true
//	max_redemptions: 4
//	metadata: {
//	}
//	name: null
//	object: "coupon"
//	percent_off: 5
//	redeem_by: 1590105600
//	times_redeemed: 2
//	valid: true

    var html = ""

    html += "<div class=w3--center>"
    html += "<span>Coupon come with the following limitations. </span>"
    html += "<br>"
    html += "<br>"
    html += "<label>Coupon Id: " + couponDetail.name + " </label><br>"
    if (couponDetail.percentageOff !== undefined) {
        html += "<label>Percentage Discount: <span class='fa fa-euro' style='font-size:12px;color:#21BA45'>" + couponDetail.percentageOff + "</span></label><br>"
    } else {
        html += "<label>Amount Off: <span class='fa fa-euro' style='font-size:12px;color:#21BA45'>" + couponDetail.amountOff + "</span></label><br>"
    }
    if (couponDetail.duration === "once") {
        html += "<label>Duration: One time offer!</label><br>"
    } else {
        html += "<label>durationInMonths: " + couponDetail.durationInMonths + "</label><br>"
    }
    html += "<label>Offer Expires: " + new Date(couponDetail.redeemBy).toLocaleDateString() + " </label><br>"
    html += "<label>Number of Coupons Remaining : " + (couponDetail.max_redemptions - couponDetail.timesRedeemed) + " get this offer, be one of them!</label><br>"
    html += "</div>"

    return html;
}

function widgetPlansDetailCouponNone(couponDetail) {

    var html = ""
    html += "<div class=w3-center>"
    html += "<br>"
    html += "<span>Sorry No coupons available for this subscription</span>"
    html += "<br>"
    html += "</div>"

    return html;
}

function widgetPlansDetailCoupon(couponDetail) {
//Coupon Id: null
//Amount Off: undefined
//Offer Expires: Invalid Date
//Number of Coupons Remaining : NaN get this offer, be one of them!

    var html = ""
    html += "<br>"
    html += "<div class=w3-center>"
    html += "<span>Great news, spread the word, coupons remaining!</span>"
    html += "<hr>"
    var remaining = (couponDetail.max_redemptions - couponDetail.times_redeemed)
    var percentage = (remaining / couponDetail.max_redemptions) * 100
    if (remaining === 1) {
        html += "<label><span class='w3-tag w3-red'>Last coupon remaining : " + remaining + " </span></label><br>"
    } else if (percentage > 1 && percentage < 10) {
        html += "<label><span class='w3-tag w3-yellow'>Limited number of coupons remaining : " + percentage + " </span></label><br>"
    } else {
        html += "<label><span class='w3-tag w3-green'>Total Remaining : " + remaining + " </span></label><br>"
    }
    html += "<br>"
    if (couponDetail.percent_off !== undefined) {
        html += "<label>Discount Available: " + couponDetail.percent_off + " <span class='fa fa-percent' style='font-size:14px;'></span></label><br>"
    } else {
        html += "<label>Amount Off: <span class='fa fa-euro' style='font-size:14px;color:#21ba45'> " + couponDetail.amount_off + "</span></label><br>"
    }
    html += "<br>"
    html += "<label>Offer Expires:  " + new Date(couponDetail.redeem_by * 1000).toDateString() + " </label><br>"
    html += "<br>"
    html += "</div>"

    return html;
}


function widgetPlansDetailRecurring(plan, productRsp) {

    var html = ""
    html += "<div class=w3--center>"
    html += "<span>Should this plan be tagged as recurring?</span><br>"
    html += "<input id=recurring checked type=checkbox required />"
    html += "<span> For convenience, recurring billing is enabled by default.</span>"
    html += "<span> Uncheck if you want the subscription to end at the end of the billing period.</span>"
    html += "</div>"

    return html;
}

function widgetPlansDetailPoC(pocObj) {

    var html = ""
    var style = "text-decoration:none; color:green; border-bottom:1px solid red;"

    html += "<div class=w3--center>"
    html += "<span>Person(s) you can contact to find out more about this service</span>"
    html += "<br>"
    html += "<br>"
    // html += "<label>Responsibility: " + pocObj.description + " </label><br>"
    html += "<label>Name: " + pocObj.fullName + " </label><br>"
    html += "<label>Phone: <a target=_blank style=\"" + style + "\" href=\"tel:+353" + pocObj.phone + "\">Call Us</a> </label><br>"
    html += "<label>Email: <a target=_blank style=\"" + style + "\" href=\"mailto:" + pocObj.email + "\">Email Us</a> </label><br>"
    // html += "<label>TnC: " + pocObj.tnc + " </label><br>"
    html += "</div>"

    return html;
}

function widgetPlansDetailPoCNot() {


    html += "<div class=w3--center>"
    html += "<span>There is no point of contact associated with this subscription</span>"
    html += "<br>"
    html += "<label>Responsibility: </label><br>"
    html += "<label>Name:  </label><br>"
    html += "<label>Phone: </label><br>"
    html += "<label>Email:  </label><br>"
    html += "</div>"

    return html;
}

function widgetPlansDetailVideo(id) {

    var html = ""

    html += "<div class=w3-center>"
    html += "<span>Media content associated with this plan</span>"
    html += "<br>"
    html += "<video width=400 controls>"
    html += "<source  type=video/mp4>"
    html += "Your browser does not support HTML video."
    html += "</video>"
    html += "<br>"
    html += "</div>"
    html += "<span>MM ID: " + id + "</span>"

    return html;
}

function widgetPlansDetailFacebook(link) {

    var html = ""

    html += "<div class=w3-center>"
    html += "<span>Social Media Faceboook</span>"
    html += "<i style=\"font-size:32px;color:blue\" class=\"fa fa-facebook-official\"></i>"
    html += "<br>"
    var id = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=true&width=734&height=502&appId"
//	html += "<iframe " + style + " allowfullscreen src=" + item.social.facebook.name + "></iframe><";
    html += "<iframe src=\"" + link + "\" width = \"400\" height = \"200\" style = \"border:none; overflow:hidden\" scrolling = \"no\" frameborder = \"0\" allowTransparency = \"true\" allow = \"encrypted-media\" allowFullScreen = \"true\" > </iframe>"
    html += "<br> "
    html += "</div>"

    return html;
}

function widgetPlansDetailYouTube(link) {

    var html = ""

    html += "<div class=w3-center>"
    html += "<span>Social Media Youtube</span>"
    html += "<br>"
    html += "<iframe id=youtubeOutput src=\"" + link + "\"  allow=\"autoplay; encrypted-media\" frameborder=0 scrolling=no marginheight=0 marginwidth=0 width=400 height=200 type=text/html allowfullscreen src=></iframe>";
    html += "<br>"
    html += "</div>"

    return html;
}

function widgetPlansDetailTimeTable(timetable) {

    var html = ""
    // businessHours = nsBizHoursService(accountId, plan.product)
    html += "<span>Below are the times this service can be used</span>"
    html += "<br>"
    html += timetable

    return html;
}

function widgetPlansDetailTimeTableNot() {

    var html = ""
    html += "<span>There is no time table associated with this subscription</span>"
    html += "<br>"

    return html;
}

function widgetPlansDetail(plan) {

    html = "<label>Cost: " + parseFloat(plan.amount / 100).toFixed(2) + "</label><br>"
    html += "<label>Interval: " + plan.interval + " </label><br>"
    html += "<label>Duration: " + plan.interval_count + " </label><br>"
//	html += "<label>Coupon: " + plan.coupon + " </label><br>"
//	html += "<label>Trail Period: " + plan.cancelPeriod + " </label><br>"
    // Get Product Description

    if (plan.product !== undefined) {
        payload = {
            "accountId": accountId,
            "productId": plan.product
        };
        productRsp = postRequest("ProductGet", payload);
        html += "<hr>"
        html += "<fieldset>"
        html += "<legend> Point Of Contact</legend>"
        html += "<label>Introduction: " + productRsp.description + " </label><br>"
        html += "<label>Name: " + productRsp.metadata.pocFullname + " </label><br>"
        html += "<label>Phone: " + productRsp.metadata.pocPhone + " </label><br>"
        html += "<label>Email: " + productRsp.metadata.pocEmail + " </label><br>"
        html += "<label>TnC: " + productRsp.metadata.tnc + " </label><br>"
        html += "</fieldset>"

        businessHours = bizHoursServiceGet(accountId, plan.product)
        UxBizHourListing.frame = false;
        UxBizHourListing.small = true;
        html += "<hr>"
        html += "<fieldset>"
        html += "<legend> Timetable </legend>"
        html += UxBizHourListing.init(businessHours)
        html += "</fieldset>"
    }
// Get Product Availability

    html += "<br>"
    html += "<label>Should this plan be tagged as recurring?</label><br>"
    html += "<input id=recurring checked type=checkbox required />"
    html += "<span> For convenience, recurring billing is enabled by default.</span>"
    html += "<span> Uncheck if you want the subscription to end at the end of the billing period.</span>"

    return html;
}

function getPlanDetail(accountId, planId) {

    payload = {
        "accountId": accountId,
        "planId": planId
    };
    return postRequest("PlanGet", payload);
}

function widgetPlansDetailLocation(plan, productRsp) {

    var html = ""
    html += "<div class=w3-center>"
    html += "<span>Cant find the service, check here first.</span>"
    html += "<br>"
//	html += "<label>Location: " + productRsp.location + " </label><br>"
    html += "<iframe style=\"width:100%; height:400px\" frameborder=0 scrolling=no marginheight=0 marginwidth=0 src='https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ5ZH5HecOZ0gRtmi9GWheZsI&key=AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig'>"
    html += "</iframe>"
    html += "</div>"

    return html;
}

function widgetPlansDetailLocationNot() {

    var html = ""
    html += "<div class=w3-center>"
    html += "<span>There is not location detail associated with this subscription.</span>"
    html += "<br>"
    html += "<iframe style=\"width:100%; height:400px\" frameborder=0 scrolling=no marginheight=0 marginwidth=0 src='https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ5ZH5HecOZ0gRtmi9GWheZsI&key=AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig'>"
    html += "</iframe>"
    html += "</div>"

    return html;
}

//# sourceURL=api_plan_uxlisting.js