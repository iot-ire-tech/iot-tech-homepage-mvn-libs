/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");
// need for redirect purpose
var accountIdP = parsedUrl.searchParams.get("accountIdP");
var accountIdC = parsedUrl.searchParams.get("accountIdC");


var productSalesMap = new Map()
var productRsp;
var graphWidth = 1800
var graphHeigth = 1000
$(document).ready(function () {

    tabsInit();

    var callback = {};
    var loaded = {};
    var graphDataCustomerAge = []


    window.addEventListener('load', function (events) {

        var uxBuinessMenuWidget = new UxProvisioningMenuWidget();
        $("#menuBarHook").html(uxBuinessMenuWidget.init())


        loaded = google.charts.load('upcoming', {
            'packages': ['corechart', 'bar', 'map', 'calendar', "table"],
            "mapsApiKey": "AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig"
        });
        callback = google.charts.setOnLoadCallback();
        callback.then(function () {

            nsChartingService.title = "Most Sought After Products/Services"
            nsChartingService.width = "100%"
            nsChartingService.height = "100%"
            nsCheckoutService.accountId = accountId;
            nsCheckoutService.getAccount()
            nsCheckoutService.obj.forEach(function (checkoutItem) {
                checkoutItem.items.forEach(function (item) {
                    if (!productSalesMap.has(item.title))
                        productSalesMap.set(item.title, parseInt(item.revenue.costs.transactionDecimal))
                    else {
                        var rt = productSalesMap.get(item.title)
                        productSalesMap.set(item.title, parseInt(rt + item.revenue.costs.transactionDecimal))
                    }
                })
            })

            nsChartingService.setDataType(new google.visualization.DataTable())
            nsChartingService.data.addColumn('string', 'Product');
            nsChartingService.data.addColumn('number', 'Net Income');
            var y = Array.from(productSalesMap.entries())
            nsChartingService.data.addRows(y);
            nsChartingService.setChartType(new google.visualization.ColumnChart(document.getElementById('checkoutModule')))
            nsChartingService.options = {
                'title': 'Customer Purchases',
                'width': graphWidth,
                'height': graphHeigth,
                chartArea: {
                    width: "80%",
                    height: "60%"
                },
                hAxis: {
                    title: 'Product Portfolio',
                    slantedText: true,
                    slantedTextAngle: 10,
                    slantedTextAngle: -89,
                    viewWindow: {min: [7, 30, 0], max: [17, 30, 0]}
                },
                vAxis: {title: 'Net Income [EUR]'},
                bar: {width: "50%", height: "800", gap: "10%"}
            };
            nsChartingService.drawTable()


            revenueModule:{
                productSalesMap.clear();
                nsRevenueService.accountId = accountId
                nsRevenueService.getAccount();

                nsRevenueService.obj.forEach(function (revenueItem) {
                    productRsp = getProductDetails(accountId, revenueItem.productId)
                    if (productRsp.status === undefined)
                        revenueItem.items.forEach(function (item) {
                            productSalesMap.set(productRsp.name, parseInt(item.transaction))
                        })
                })

                nsChartingService.setDataType(new google.visualization.DataTable())
                nsChartingService.data.addColumn('string', 'Product');
                nsChartingService.data.addColumn('number', 'Sale Price');
                var y = Array.from(productSalesMap.entries())
                nsChartingService.data.addRows(y);
                nsChartingService.setChartType(new google.visualization.ColumnChart(document.getElementById('revenueModule')))
                nsChartingService.options = {
                    'title': 'Product Sale Prices',
                    'width': graphWidth,
                    'height': graphHeigth,
                    chartArea: {
                        width: "80%",
                        height: "60%"
                    },
                    legend: {
                        position: 'right'
                    },

                    // isStacked: true,
                    hAxis: {
                        // legend: 'none',
                        title: 'Product Portfolio',
                        textPosition: 'out',
                        slantedText: true,
                        slantedTextAngle: 10,
                        slantedTextAngle: -89,
                        // minTextSpacing: 300,
                        viewWindowMode: 'maximized',
                        maxTextLines: 3,
                        maxAlternation: 2, // use a maximum of 1 line of labels
                        showTextEvery: 1, // show every label if possible
                        gridlines: {count: 0}
                    },
                    vAxis: {
                        title: 'Sale Price [EUR]',
                        // minTextSpacing: 300,
                        viewWindow: {min: 0},
                        format: '0',
                        gridlines: {count: 4}
                    }
                    ,
                    bar: {
                        width: "100%",
                        height: "800",
                        gap: "50%"
                    }
                };
                // nsChartingService.options = {
                //     hAxis: {
                //         title: "Month",
                //         textPosition: 'out',
                //         slantedText: true,
                //         slantedTextAngle: 90
                //     },
                //     vAxis: {
                //         title: 'Revenue',
                //         minValue: 0,
                //         viewWindow: {min: 0},
                //         format: '0',
                //     },
                //     height: 260,
                //     colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
                //     theme: 'material'
                // };

                nsChartingService.drawTable()
            }


            bizHoursModule:{
                productSalesMap.clear();
                nsBizHoursService.accountId = accountId
                nsBizHoursService.getAccount();

                nsBizHoursService.obj.forEach(function (bizHourItem) {
                    productRsp = getProductDetails(accountId, bizHourItem.productId)
                    if (productRsp.name !== undefined)
                        productSalesMap.set(productRsp.name, bizHourItem.items.length)
                })

                nsChartingService.setDataType(new google.visualization.DataTable())
                nsChartingService.data.addColumn('string', 'Product', {style: 'background-color:red;writing-mode: vertical-rl;  text-orientation: upright;'});
                nsChartingService.data.addColumn('number', 'Days Open', {style: 'background-color:red;writing-mode: vertical-rl;  text-orientation: upright;'});
                var y = Array.from(productSalesMap.entries())
                nsChartingService.data.addRows(y);
                // nsChartingService.data.setProperty(0, 0, 'style', 'width:100%');
                nsChartingService.setChartType(new google.visualization.ColumnChart(document.getElementById('bizHoursModule')))
                nsChartingService.options = {
                    'title': 'Product Sale Prices',
                    'width': graphWidth,
                    'height': graphHeigth,
                    chartArea: {
                        width: "80%",
                        height: "60%"
                    },
                    hAxis: {
                        title: 'Product Portfolio',
                        slantedText: true,
                        slantedTextAngle: 10,
                        slantedTextAngle: -89
                    },
                    vAxis: {title: 'Business Hours'},
                    allowHtml: true,
                    bar: {width: "50%", height: "800", gap: "10%"}
                };
                nsChartingService.drawTable()
            }
            // // Analytics
            //         // signup date
            //         // location
            //         // sex
            //         // age

        }).finally(function () {

            $("text").each(function () {
                $(this).addClass("w3-padding-large")
                // $(this).addClass("rotate")
            })
        });

    })


});

function chartMe(qh) {

}

//# sourceURL=business_analytics_revenue_init.js