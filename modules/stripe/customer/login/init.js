var parsedUrl = new URL(window.location.href);


var originId = parsedUrl.searchParams.get("originId");

var accountId = parsedUrl.searchParams.get("accountId");
// need for redirect purpose
var accountIdP = parsedUrl.searchParams.get("accountIdP");
var accountIdC = parsedUrl.searchParams.get("accountIdC");


var productShareId = parsedUrl.searchParams.get("productShareId");


if (productShareId !== null)
    productShareId = "&productShareId=" + productShareId
else
    productShareId = ""

var aslideShow = new slideShowFunc();


$(window).ready(function () {

    var slides = []
    slides.push('<div class="w3-container w3-padding-large">Shop</div>')
    slides.push('<div class="w3-container w3-padding-large">Activities</div>')
    slides.push('<div class="w3-container w3-padding-large">Events</div>')
    slides.push('<div class="w3-container w3-padding-large">Membership</div>')
    slides.push('<div class="w3-container w3-padding-large">Covid</div>')
    slides.push('<div class="w3-container w3-padding-large">Steaming</div>')
    slides.push('<div class="w3-container w3-padding-large">Video</div>')
    tmp = aslideShow.init("", slides, "options").addHeader().addFooter().getSlideShow();
    uxLoad("#carosel", tmp)

    try {

        if ($('body').slick) {
            // accessibility = tabbing and arrow key navigation
        } else {
            var repeatSlides = setInterval(function () {
                if ($('body').slick) {

                    nsBrandingService.accountId = accountId
                    nsBrandingService.brandMe();

                    clearInterval(repeatSlides)
                    $('.mySlides').slick({
                        centerPadding: '10px',
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        centerMode: true,
                        autoplay: true,
                        dots: true
                    });
                    $('.mySlidesAdmin').slick({
                        centerPadding: '5px',
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        centerMode: true,
                        autoplay: false,
                        dots: true
                    });

                    $('.mySlidesAdminBusiness').slick({
                        centerPadding: '5px',
                        slidesToShow: 1,
                        slidesToScroll: 2,
                        centerMode: true,
                        autoplay: false,
                        dots: true
                    });
                    $('.mySlidesAdminBusinessInvite').slick({
                        centerPadding: '5px',
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerMode: true,
                        autoplay: false,
                        dots: true
                    });
                    $('.mySlidesOnboarding_l1').slick({
                        centerPadding: '5px',
                        slidesToShow: 1,
                        slidesToScroll: 2,
                        centerMode: true,
                        autoplay: false,
                        dots: true
                    });
                    $('.mySlidesOnboarding_l2').slick({
                        centerPadding: '5px',
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        centerMode: true,
                        autoplay: false,
                        dots: true
                    });
                    $("i").attr("style", "font-size:16px;color:red;")
//					$('.carousel-inner').css({"margin": "0 auto"})
                }

//				$('.left').click(function () {
//					$('.mySlides').slick('slickPrev');
//				})
//
//				$('.right').click(function () {
//					$('.mySlides').slick('slickNext');
//				})


                if (accountId === null) {
                    alert("INF: Your account login url is not correct, contact support asap")
                    return;
                }

                modelContext = {
                    ...modelUx
                }


                // reduemntation
                var accountRsp = getAccount(accountId);
                if (accountRsp.charges_enabled === true) {

                    var bizName = accountDetails(accountId).business_profile.name;
                    if (bizName === null) {
                        $("#primaryAccountOwner")
                            .attr("style", "width:40%")
                            .addClass("w3-container w3-yellow")
                            .html(
                                "<span><b>Account:" + accountId + " is not fully registered<br>Contact support if you are not sure what to do<br>Until then you cannot accept payments from customers<b></span>"
                            )
                        // $("#btnAuthenticate").attr("disabled", true)
                    } else
                        $("#primaryAccountOwner").html("<b>" + bizName + "<b>")
                } else {
                    $("#primaryAccountOwner")
                        .attr("style", "width:40%")
                        .addClass("w3-container w3-yellow")
                        .html(
                            // "<span><b>Account:" + accountId + " n set, complete registration below<br>Contact support if you are not sure what to do<br>Until then you cannot accept payments from customers<b></span>"
                            "<span><b>Account:" + accountId + " is not fully registered<br>Contact support if you are not sure what to do<br>Until then you cannot accept payments from customers<b></span>"
                        )
                }

            }, 1000)
        }


    } catch (e) {

    }

    //  Bank account is where customer payments will land, and subsription services, is the payment plan you wish to sign up to.


    var orderWidget = setInterval(function () {
        clearInterval(orderWidget)
        if (window.location.pathname.includes("onboarding")) {
            var uxWidgetOrdered = new widgetOrdered();
            $("#orderHook").html(uxWidgetOrdered.init(
                "Payment Plan", "Subscribe to a service level plan that is suitable for you",
                "Bank", "The bank account is where customers will pay into",
                "Registration", "In order for payments to be processed you need to complete this. Only  then will you be live"))

        }


    }, 1000)

    var accountReqs = setInterval(function () {
        clearInterval(accountReqs)
        var status = getAccountCompliance(accountId)
        if (!status) {
            $(".onboarding").each(function (index) {
                $(this).attr("disabled", true)
            })

            if (!window.location.href.includes("business_growth")) {

                var msg = '<div class="w3-panel w3-light-grey w3-padding w3-center" style="margin-left: -45%; margin-right: -45%;">'
                msg += "<br>"
                msg += "<h1>This account is not fully compliant yet.</h1>"
                msg += "<h3>Please return to your dashboard to resolve</h3>"
                msg += "<h5>If you need further assistance, contact support asap</h5>"
                msg += "<br>"
                msg += "</div>"
                uxLoad("#msgAlerts", msg)
            }

            $("#btnAuthenticate").attr("disabled", true)
        } else {
            // status is good, but busines growth, still not  subjenced to authentication...
            if (
                window.location.href.includes("business_growth")
            ) {

                $("#btnAuthenticate").attr("disabled", true)
            }

        }
    }, 2000)

    if (window.location.href.includes("business_growth")) {
        var uxBuinessMenuWidget = new UxClientSubscriptionMenuWidget();
        uxLoad("#menuBarHookX", uxBuinessMenuWidget.init())
    }

});
//# sourceURL=customer_login_init.js