// Origin : Local Developer Workspace


var parsedUrl = new URL(window.location.href);
var origins = parsedUrl.searchParams.get("origins");

$(window).ready(function () {

    var demo = "demoMailAnchor"
    // <a class=demoMailAnchor href="mailto:admin@iottech.ie?subject=Demo Request&body=Hello!!!%0AThank you for showing interest in our products. In order to best serve you. Please include your fullname, a work contact number, and a short description of your business, and we will get back to you asap." target="blank">Request A Demo</a>
    // Thank you for showing interest in our products. In order to best serve you. Please include your fullname, a work contact number, and a short description of your business, and we will get back to you asap." target="blank">Request A Demo</a>

    if (origins === "homepage") {
        var x = setTimeout(function () {
            clearTimeout(x)
            $('#purpose option[value="demo"]')
            $('#purpose').val("demo")
            $("#purpose").attr("disabled", true)
        }, 1000)
        // $("#query")
    }
    if (origins === "support") {
        var x = setTimeout(function () {
            clearTimeout(x)
            $('#purpose option[value="support"]')
            $('#purpose').val("support")
            $("#purpose").attr("disabled", true)
        }, 1000)
        // $("#query")
    }
})


//# sourceURL=api_contactus_init.js