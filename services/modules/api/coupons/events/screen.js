/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("click ", ".saveCoupon", function () {
    // Add items to
    if (nsCouponsService.items.length > 0) {
        nsCouponsService.accountId = accountId;
        nsCouponsService.create()
        // ux
        $(this).attr("disabled", true)
        nsCouponsService.refreshListing()
        // data

        // DB delete
        $("#saveCouponMsg").delay(1000).fadeIn("now")
        $("#saveCouponMsg").html("<br><span class='w3-tag w3-yellow w3-right'>Great coupon (" + nsCouponsService.couponId + ") has been added</span>")
        $("#saveCouponMsg").delay(10000).fadeOut("slow")
    }

    $(this).attr("disabled", true)
});

$(document).on("click ", ".addCoupon", function () {
    // Add items to
    nsCouponsService.items.push(nsCouponsService.modelItem)
    $(this).attr("disabled", true)
    $("#addCouponMsg").delay(1000).fadeIn("now")
    $("#addCouponMsg").html("<br><span class='w3-tag w3-yellow w3-left'>New Coupon added....only upon save will it be committed!</span>")
    $("#addCouponMsg").delay(10000).fadeOut("slow")

    // $(this).attr("disabled", true)
});


$(document).on("click ", ".couponListing", function () {
    nsCouponsService.couponId = $("option:selected", this).attr("couponId");
    nsSubsService.modelItem.couponId = $("option:selected", this).attr("couponId");

    $("#couponSelectionMsg").fadeIn("now")
    $("#couponSelectionMsg").html("<span class='w3-tag w3-yellow'>Coupon selected :" + nsCouponsService.couponId + "</span><br>")
    $("#couponSelectionMsg").delay(5000).fadeOut("slow")

    $(".deleteCoupon").attr("couponId", nsCouponsService.couponId)
});

$(document).on("dblclick ", ".couponListing", function () {
    nsCouponsService.couponId = ""
    nsSubsService.modelItem.couponId = "";
    $(this).val(0)
    $(".deleteCoupon").attr("couponId", "")

    $("#couponSelectionMsg").fadeIn("now")
    $("#couponSelectionMsg").html("<span class='w3-tag w3-yellow'>Coupon deselected!" + nsCouponsService.couponId + "</span><br>")
    $("#couponSelectionMsg").delay(5000).fadeOut("slow")
});


$(document).on("click ", ".deleteCoupon", function () {
    // Add items to
    // Stripe delete
    if (nsCouponsService.couponId.length > 0) {
        // stripe delete
        nsCouponsService.crudOps.ep = "CouponDelete"
        nsCouponsService.crudOps.payload = {"accountId": accountId, "couponId": nsCouponsService.couponId}
        nsCouponsService.crudOps.delete()

        // DB delete
        nsCouponsService.delete()
        // UX
        nsCouponsService.refreshListing()

        $("#deleteCouponMsg").delay(1000).fadeIn("fast")
        $("#deleteCouponMsg").html("<br><span class='w3-tag w3-yellow w3-right'>Great coupon (" + nsCouponsService.couponId + ") has been deleted</span>")
        $("#deleteCouponMsg").delay(10000).fadeOut("fast")
    }

})
;


$(document).on("change", "#couponName", function () {
    nsCouponsService.modelItem.name = $(this).val();
});
$(document).on("change", "#couponPercentageOff", function () {
    nsCouponsService.modelItem.percentageOff = parseFloat($(this).val()).toFixed(2);
    // Create Coupon here?
    // Does such a coupon already exist?
    // Show customer coupon....
});
$(document).on("change", "#couponAmountOff", function () {
    nsCouponsService.modelItem.amountOff = parseFloat($(this).val()).toFixed(2)
});
$(document).on("change", "#couponDuration", function () {
    nsCouponsService.modelItem.duration = $(this).val();
    if (nsCouponsService.modelItem.duration === "repeating") {
        $("#couponDurationInMonths").attr("disabled", false)
    } else
        $("#couponDurationInMonths").attr("disabled", true)
});
$(document).on("change", "#couponDurationInMonths", function () {
    var rt = parseInt($(this).val());
    var max = parseInt($(this).attr("max"));

    if (rt <= 0 || rt > 12) {
        // $(this).val(max);
        $("#couponDurationInMonthsMsg").fadeIn("now").html(
            "Max. allowed value for this interval is (" + max + ")"
        ).delay(10000).fadeOut("slow")
        nsCouponsService.modelItem.durationInMonths = max;
        $(".addCoupon, .saveCoupon").attr("disabled", true)
    } else {
        $(".addCoupon, .saveCoupon").attr("disabled", false)
        nsCouponsService.modelItem.durationInMonths = rt;
    }
});
$(document).on("change", "#couponRedeemBy", function () {
    var startDate = new Date($(this).val()).toISOString();
    var startDateM = moment(new Date($(this).val()));
    var now = new Date(); //todays date
    var nowM = moment(new Date()); //todays date

    $(".addCoupon, .saveCoupon").attr("disabled", true)

    // event must be same day
    var isSameDay = nowM.isSame(startDateM, 'day');
    if (isSameDay) {
        $("#couponRedeemByMsg").fadeIn("now").html("Coupon date cannot expire today").delay(10000).fadeOut("slow")
        return
    }

    // Not Tomorrow
    var isTomorrow = moment.duration(startDateM.diff(nowM)).asHours()
    if (isTomorrow >= 0 && isTomorrow <= 24) {
        $("#couponRedeemByMsg").fadeIn("now").html("Coupon date must be 24 hours from now").delay(10000).fadeOut("slow")
        return
    }
    // Past
    var past = moment.duration(startDateM.diff(nowM)).asMinutes();
    if (past < 0) {
        $("#couponRedeemByMsg").fadeIn("now").html("Coupon date, cant be in the past").delay(10000).fadeOut("slow")
        return
    }

    $(".addCoupon, .saveCoupon").attr("disabled", false)
    nsCouponsService.modelItem.redeemBy = (new TimeConverter(startDate).getEpoch() / 1000)
});
$(document).on("change", "#couponTimesRedeemed", function () {
    var rt = parseInt($(this).val());
    var max = parseInt($(this).attr("max"));
    var min = parseInt($(this).attr("min"));

    if (rt <= 0 || rt > max) {
        // $(this).val(max);
        $("#couponTimesRedeemedMsg").fadeIn("now").html(
            "Max. allowed value for this is (" + max + ")" +
            "<br>" +
            "Min. allowed value for this is (" + min + ")"
        ).delay(10000).fadeOut("slow")
        nsCouponsService.modelItem.timesRedeemed = max;
        $(".addCoupon, .saveCoupon").attr("disabled", true)
    } else {
        nsCouponsService.modelItem.timesRedeemed = rt;
        $(".addCoupon, .saveCoupon").attr("disabled", false)
    }

});

//# sourceURL=api_coupons_events.js


