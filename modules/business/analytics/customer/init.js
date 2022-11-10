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

        var uxBuinessMenuWidget = new UxClientSubscriptionMenuWidget();
        $("#menuBarHook").html(uxBuinessMenuWidget.init())

        loaded = google.charts.load('upcoming', {
            'packages': ['corechart', 'bar', 'map', 'calendar', "table"],
            "mapsApiKey": "AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig"
        });
        callback = google.charts.setOnLoadCallback();
        callback.then(function () {

            nsCustomerService.accountId = "acct_1CBNZCFOjjfpNUIx";
            nsCustomerService.getAccount()
            nsAuthenticationService.accountId = accountId;
            nsAuthenticationService.getAccount()

            chart:{
                nsChartingService.width = "100%"
                nsChartingService.height = "100%"
            }


            signupActivity: {
                var rtArr = []
                nsCustomerService.accountId = "acct_1CBNZCFOjjfpNUIx";
                nsCustomerService.getAccount()
                nsChartingService.data = {}
                dataMap.clear()
                dataMapTrace.clear()
                nsChartingService.setDataType(new google.visualization.DataTable())
                nsChartingService.data.addColumn('date', 'Time Of Day');
                nsChartingService.data.addColumn('number', 'Signup Activity');
                nsCustomerService.obj.forEach(function (loginActivity) {
                    // collect data
                    var dt = loginActivity.items[0].ts.split(",")[0]
                    var day = parseInt(dt.split("/")[0])
                    var month = parseInt(dt.split("/")[1]) - 1
                    var year = parseInt(dt.split("/")[2])
                    var key = day + month + year

                    if (!dataMapTrace.has(key)) {
                        dataMapTrace.set(key, 1)
                        dataMap.set(new Date(year, month, day), 1)
                        rtArr.push(1)
                    } else {
                        var rt = dataMapTrace.get(key)
                        rt++
                        dataMapTrace.set(key, rt)
                        rtArr.push(rt)
                        dataMap.set(new Date(year, month, day), rt)
                    }
                })

                data = [];
                for (const [key, value] of dataMap.entries()) {
                    console.log(key, value);
                    data.push([key, value])
                }
                console.table(data)
                nsChartingService.data.addRows(data);

                // var formatter = new google.visualization.DateFormat({formatType: 'short'});
                // formatter.format(nsChartingService.data, 0);

                nsChartingService.setChartType(new google.visualization.LineChart(document.getElementById('customerModuleSignup')))
                chart:{
                    nsChartingService.options = {
                        'title': 'Signup Activity Distributions',
                        'width': graphWidth,
                        'height': 600,
                        pointSize: 30,
                        curveType: 'function',


                        hAxis: {
                            title: 'Date',
                            // format: 'M/d/yy',
                            gridlines: {count: 0}
                        },
                        vAxis: {
                            title: 'Signup Total',
                            minValue: 0,
                            maxValue: rtArr.sort()[0] + 1,
                            gridlines: {count: 4}
                        },
                        // viewWindow: {
                        //     min: new Date(2020, 0, 1, 0),
                        //     max: new Date(2021, 0, 1, 0)
                        // },

                        // gridlines: {
                        //     count: -1,
                        //     units: {
                        //         days: {format: ['MM dd']},
                        //         hours: {format: ['HH:mm', 'ha']},
                        //     }
                        // },
                        // minorGridlines: {
                        //     units: {
                        //         hours: {format: ['hh:mm:ss a', 'ha']},
                        //         minutes: {format: ['HH:mm a Z', ':mm']}
                        //     }
                        // }
                        allowHtml: true
                    };
                    nsChartingService.drawTable()
                }

            }


            if (false)
                signUpHistogram: {
                    nsChartingService.setDataType(new google.visualization.DataTable())
                    nsChartingService.data.addColumn('datetime', 'Time Of Day');
                    nsChartingService.data.addColumn('string', 'Login Activity');

                    dataMap.set("Age Distribution", "Age")
                    nsCustomerService.obj.forEach(function (customerItem) {
                        var dt = customerItem.items[0].ts.split(",")[0]
                        var day = dt.split("/")[0]
                        var month = parseInt(dt.split("/")[1]) - 1
                        var year = dt.split("/")[2]
                        var epoch = parseInt(new Date(year, month, day).getTime() / 1000000000)
                        dataMap.set({v: customerItem.items[0].customerId, f: 'wo'}, {v: epoch, f: 'thirty two'});
                    })

                    var y = Array.from(dataMap.entries())
                    nsChartingService.data.addRows(y);
                    nsChartingService.setChartType(new google.visualization.ColumnChart(document.getElementById('checkoutModule')))


                    // bar: {width: "50%", height: "800", gap: "10%"}
                    chart:{
                        var y = Array.from(dataMap.entries())
                        nsChartingService.data = google.visualization.arrayToDataTable(y);
                        nsChartingService.setChartType(new google.visualization.ColumnChart(document.getElementById('customerModuleTime')))
                        nsChartingService.options = {
                            'title': 'Customer Age Distributions',
                            'width': graphWidth,
                            'height': 600,
                            hAxis: {title: 'Customer Base'},
                            vAxis: {title: 'Age'},
                            allowHtml: true,
                            histogram: {bucketSize: 5}

                        };
                        nsChartingService.drawTable()
                    }

                }

            ageDistributionHistogram: {
                dataMap.clear();
                dataMap.set("Age Distribution", "Age ")
                nsCustomerService.obj.forEach(function (customerItem) {
                    nsCustomerService.modelItem.person.dob.year = customerItem.items[0].person.dob.year
                    nsCustomerService.modelItem.person.dob.month = customerItem.items[0].person.dob.month
                    nsCustomerService.modelItem.person.dob.day = customerItem.items[0].person.dob.day
                    var age = nsCustomerService.calculate_age().age

                    dataMap.set(customerItem.items[0].customerId.toString(), age);
                    // dataMap.set({v:customerItem.items[0].customerId, f:'thirty two'} , age);
                })


                chart:{
                    var y = Array.from(dataMap.entries())
                    nsChartingService.data = google.visualization.arrayToDataTable(y);
                    nsChartingService.setChartType(new google.visualization.Histogram(document.getElementById('customerModuleAge')))
                    nsChartingService.options = {
                        'title': 'Customer Age Distributions',
                        'width': graphWidth,
                        'height': 600,
                        hAxis: {title: 'Customer Base'},
                        vAxis: {title: 'Age [Bucket Size 5 Years]'},
                        allowHtml: true,
                        histogram: {bucketSize: 5}

                    };
                    nsChartingService.drawTable()
                }
            }

            genderDistribution: {
                dataMap.clear();
                dataMap.set("Gender Distribution", "Gender")
                nsCustomerService.obj.forEach(function (customerItem) {
                    if (customerItem.items[0].person.sex === "male")
                        males++
                    else
                        females++
                })
                dataMap.set("males", males);
                dataMap.set("females", females);

                chart:{
                    var y = Array.from(dataMap.entries())
                    nsChartingService.data = google.visualization.arrayToDataTable(y);
                    nsChartingService.setChartType(new google.visualization.PieChart(document.getElementById('customerModuleGender')))
                    nsChartingService.options = {
                        'title': 'Gender Distributions',
                        is3D: true,
                        'width': graphWidth,
                        'height': 600,
                        allowHtml: true
                    };
                    nsChartingService.drawTable()
                }
            }


            locationDistributionMap: {
                dataArray.push(['Lat', 'Long'])
                nsCustomerService.obj.forEach(function (customerItem) {
                    var lat = parseFloat(customerItem.items[0].location.lat).toFixed(6) * .100
                    // lat=53.3394462
                    var lng = parseFloat(customerItem.items[0].location.lng).toFixed(6) * .100
                    // lng=-6.2199390999999995

                    dataArray.push([lat, lng])
                })

                chart:{
                    var wait = setInterval(function () {
                        clearInterval(wait)
                        nsChartingService.data = google.visualization.arrayToDataTable(dataArray);
                        nsChartingService.setChartType(new google.visualization.Map(document.getElementById('customerModuleGeo')))
                        var url = 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/';
                        nsChartingService.options = {
                            zoomLevel: 10,
                            showTooltip: true,
                            showInfoWindow: true,
                            useMapTypeControl: true,
                            icons: {
                                blue: {
                                    normal: url + 'Map-Marker-Ball-Azure-icon.png',
                                    selected: url + 'Map-Marker-Ball-Right-Azure-icon.png'
                                },
                                green: {
                                    normal: url + 'Map-Marker-Push-Pin-1-Chartreuse-icon.png',
                                    selected: url + 'Map-Marker-Push-Pin-1-Right-Chartreuse-icon.png'
                                },
                                pink: {
                                    normal: url + 'Map-Marker-Ball-Pink-icon.png',
                                    selected: url + 'Map-Marker-Ball-Right-Pink-icon.png'
                                }
                            }
                        };
                        nsChartingService.drawTable()
                    }, 2000)
                }
            }


        }).finally(function () {

            $("text").each(function () {
                $(this).addClass("w3-padding-large")
            })
        });

    })


});

function chartMe(qh) {

}

//# sourceURL=business_analytics_revenue_init.js