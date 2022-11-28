var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");
var originId = parsedUrl.searchParams.get("originId");


var uxWidgetOrdered = new widgetOrdered();
$(window).ready(function () {

    var html = uxWidgetOrdered.init(
        "Branding", "Lets get your logo out there!",
        "Onboarding", "From here you can complete all<br> of your onboarding steps.",
        "Provisioning", "Provision your platfrom<br> with feature rich products and services",
        "Customer", "Check your customer <br>portal once provision is complete, enjoy!")

    uxLoad("#orderHook", html)
    html = ""
    html += "<div class='w3-center'>"
    html += "<img src=/logos/LogoFiles/ForWeb/medium.png height='130px'>"
    html += "</div>"
    uxLoad("#hdr", html)


    var uxBuinessMenuWidget = new UxDashboardMenuWidget();
    uxLoad("#menuBarXHook", uxBuinessMenuWidget.init())


    var attrMap = new Map()
    // attrMap.set("position", "absolute")
    // attrMap.set("opacity", ".01")
    // attrMap.set("height", "0")
    // attrMap.set("overflow", "hidden")


    if (originId === null) {
        url = "https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "originId=dashboard"
    } else {
        url = "https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?" +
            "accountId=" + originId + "&" +
            "accountIdP=" + originId + "&" +
            "accountIdC=" + accountId + "&" +
            "originId=dashboard"
    }
    var iframe = "<iframe width=\"560\" height=\"315\" src=\"" + url + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    attrMap.set("value", iframe)
    uxLoadAttrib("#embedMeText", attrMap)


    attrMap = new Map()
    var inlineMeText = ""
    if (originId === null) {
        url = "https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "originId=dashboard"
    } else {
        url = "https://www.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp?" +
            "accountId=" + originId + "&" +
            "accountIdP=" + originId + "&" +
            "accountIdC=" + accountId + "&" +
            "originId=dashboard"
    }
    attrMap.set("value", url)
    uxLoadAttrib("#inlineMeText", attrMap)

});

//# sourceURL=client_dashboard_init.js
