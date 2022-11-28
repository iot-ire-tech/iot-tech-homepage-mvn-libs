/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");

var accountIdP = parsedUrl.searchParams.get("accountIdP");
var accountIdC = parsedUrl.searchParams.get("accountIdC");

var dataMap = new Map()
var dataMapTrace = new Map()
var dataSet = new Set()
var dataArray = new Array()
var productRsp;
var graphWidth = 1800
var data;
var year, month, day;
var males = 0, females = 0;
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

            nsAuthenticationService.accountId = accountId;
            nsAuthenticationService.getAccount()

            chart:{
                nsChartingService.width = "100%"
                nsChartingService.height = "100%"
            }


            loginActivity: {
                nsChartingService.setDataType(new google.visualization.DataTable())
                nsChartingService.data.addColumn('timeofday', 'Time Of Day');
                nsChartingService.data.addColumn('number', 'Login Activity');
                dataMap.clear()
                nsAuthenticationService.obj.forEach(function (loginActivity) {
                    loginActivity.items.forEach(function (loginActivityItem) {
                        // collect data
                        var date = loginActivityItem.ts.split("T")[0]
                        var tod = loginActivityItem.ts.split("T")[1]

                        var hour = parseInt(tod.split(":")[0])
                        var min = parseInt(tod.split(":")[1])
                        var sec = parseInt(tod.split(":")[2])
                        sec = 0

                        if (loginActivityItem.type === "login")
                            if (!dataMapTrace.has(hour + min)) {
                                dataMapTrace.set(hour + min, 1)
                                dataMap.set([hour, min, sec], 1)
                            } else {
                                var rt = dataMapTrace.get(hour + min)
                                rt++
                                dataMapTrace.set(hour + min, rt)
                                dataMap.set([hour, min, sec], rt)
                            }
                    })
                })

                console.table(y)
                // [  [[8, 30, 45], 5], [[8, 30, 45], 5] ]
                // var data = [[8, 30, 45], 5]
                var data = [];
                var x = Array.from(dataMap.values())
                var y = Array.from(dataMap.entries())
                for (const [key, value] of dataMap.entries()) {
                    console.log(key, value);
                    data.push([key, value])
                }
                console.table(data)
                // console.table([[[8, 30, 45], 5], [[8, 30, 45], 5]])
                nsChartingService.data.addRows(data);
                // nsChartingService.data.addRows([[[8, 30, 45], 5], [[8, 30, 45], 5]]);
                // nsChartingService.setChartType(new google.charts.Bar(document.getElementById('authententicationModuleTime')))
                nsChartingService.setChartType(new google.visualization.LineChart(document.getElementById('authententicationModuleLogin')))
                // bar: {width: "50%", height: "800", gap: "10%"}
                chart:{
                    nsChartingService.options = {
                        'title': 'Login Activity Distributions',
                        'width': graphWidth,
                        'height': 600,
                        hAxis: {
                            // format: 'M/d/yy',
                            gridlines: {count: 15}
                        },
                        vAxis: {
                            // gridlines: {color: 'none'},
                            minValue: 0
                        }
                    };
                    nsChartingService.drawTable()
                }

            }


            logoutActivity: {
                nsChartingService.data = {}
                dataMap.clear()
                dataMapTrace.clear()
                nsChartingService.setDataType(new google.visualization.DataTable())
                nsChartingService.data.addColumn('timeofday', 'Time Of Day');
                nsChartingService.data.addColumn('number', 'Logout Activity');
                nsAuthenticationService.obj.forEach(function (loginActivity) {
                    loginActivity.items.forEach(function (loginActivityItem) {
                        // collect data
                        var date = loginActivityItem.ts.split("T")[0]
                        var tod = loginActivityItem.ts.split("T")[1]
                        var hour = parseInt(tod.split(":")[0])
                        var min = parseInt(tod.split(":")[1])
                        var sec = parseInt(tod.split(":")[2])
                        sec = 0

                        if (loginActivityItem.type !== "login")
                            if (!dataMapTrace.has(hour + min)) {
                                dataMapTrace.set(hour + min, 1)
                                dataMap.set([hour, min, sec], 1)

                            } else {
                                var rt = dataMapTrace.get(hour + min)
                                rt++
                                dataMapTrace.set(hour + min, rt)
                                dataMap.set([hour, min, sec], rt)
                            }
                    })
                })

                data = [];
                for (const [key, value] of dataMap.entries()) {
                    console.log(key, value);
                    data.push([key, value])
                }
                console.table(data)
                nsChartingService.data.addRows(data);
                nsChartingService.setChartType(new google.visualization.LineChart(document.getElementById('authententicationModuleLogout')))
                chart:{
                    nsChartingService.options = {
                        'title': 'Logout Activity Distributions',
                        'width': graphWidth,
                        'height': 600,
                        hAxis: {
                            // format: 'M/d/yy',
                            gridlines: {count: 15}
                        },
                        vAxis: {
                            // gridlines: {color: 'none'},
                            minValue: 0
                        }
                    };
                    nsChartingService.drawTable()
                }

            }



        }).finally(function () {

            // $("text").each(function () {
            //     $(this).addClass("w3-padding-large")
            // })
        });

    })


});

function chartMe(qh) {

}

//# sourceURL=business_analytics_revenue_init.js