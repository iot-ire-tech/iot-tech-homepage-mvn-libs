/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");
//	{
//	"productId": "productId#877",
//	"source": "event",
//	"purpose": "trend",
//	"ts": [
//		"2020-02-29T16:00:28.195Z",
//		"2020-02-29T16:00:29.408Z"
//	]
//		}


$(document).ready(function () {

    tabsInit();
    var map;
    var graphData = []
    var productRsp = {}
    var modelUx = modelAnalytics;
    // All analytics data belonging to this customer!
    var analyticsRps = getDbRequestXByY("analytics", "accountId", accountId);
    var optionsMostSoughtItems = {
        title: 'Most Sought After Items',
        width: '600',
        height: '600',
        hAxis: {
            title: 'Activities/Events/Shop'
        },
        vAxis: {
            title: 'Items Sold'
        }
    }
    var optionsProductCosts = {
        title: 'Distribution of Revenue',
        width: '600',
        height: '600',
//		maxValue: '20',
//		minValue: '10',
        histogram: {bucketSize: 10},
        bar: {gap: 100},
        hAxis: {
            format: 'decimal',
            title: 'Activities/Events/Shop'
//			ticks: [0, 5, 10, 15, 20, 25, 30, 40, 50]

        },
        vAxis: {
            format: 'decimal',
            title: 'Price'
        }
    }
    var zoomOut = 5
    var zoomIn = 15
    var zoomInMax = 19
    var optionsMap = {
        zoomLevel: 15,
        showTooltip: true,
        showInfoWindow: true,
        icons: {
            default: {
                normal: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Ball-Azure-icon.png',
                selected: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Ball-Right-Azure-icon.png'
            }
        }
    }
    var optionsAgeDistro = {
        title: 'Age Distribution',
        titlePosition: 'out',
        width: '600',
        height: '600',
        legend: {position: 'none'},
        hAxis: {
            title: 'Age Distribution'
        },
        vAxis: {
            title: 'Frequency'
        }
    }
    var optionsGenderDistro = {
        title: 'Gender Distribution',
        width: '600',
        height: '600',
        hAxis: {
            title: 'Gender'
        },
        vAxis: {
            title: 'Total'
        }
    }
    var optionsCustomerSigning = {
        title: 'Date Customer Signed Up / Month',
        width: '600',
        height: '600',
        legend: 'none',
        hAxis: {
            format: 'yyyy MMM, dd',
            title: 'Signed-up date'
        },
        vAxis: {
            title: 'Response',
            minValue: 0,
            maxValue: 1
        }
    }

    var optionsCustomerPurchases = {
        title: 'Customer Purchases',
        titleTextStyle: {
            color: '333333',
            fontName: 'Arial',
            fontSize: 10
        },
        legend: "none",
        allowHtml: true,
        height: '500',
//			cellColor: {
//				stroke: 'black', // Color the border of the squares.
//				strokeOpacity: 0.5, // Make the borders half transparent.
//				strokeWidth: 2 // ...and two pixels thick.
//			},
        dayOfWeekLabel: {
            fontName: 'Times-Roman',
            fontSize: 12,
            color: '#1a8763',
            bold: true,
            italic: true
        },
        dayOfWeekRightSpace: 15,
        cellSize: 15,
        noDataPattern: {
            backgroundColor: 'red',
            color: 'red'
        }
    }

    var optionsBookingsMissed = {
        title: 'Date Missed Bookings Due To Availabity Times',
        width: '1200',
        height: '800',
        legend: {position: ''},
        allowHtml: true,
        hAxis: {
            // Feb 29 2020
            format: 'date',
            title: 'Booking dates',
//			viewWindow: {
//				min: new Date(2020, 1, 1),
//				max: new Date(2021, 1, 1)
//			}
        },
        vAxis: {
            ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // display labels every 25
            viewWindow: {
                interval: 1,
                max: 23,
                min: 0
            },
            format: 'number',
            title: 'Time Of Day This Happened'
        }
    }
// Time busy
// FootFall growth/lose
// Money growth/lose

    var chartTable = {}
    var data = {}
    window.Error(function (error) {
        alert(error)

    })
    window.addEventListener('load', function (events) {

        var loaded = google.charts.load('current', {
            'packages': ['corechart', 'bar', 'map', 'calendar', "table"],
            "mapsApiKey": "AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig"
        });
        loaded = google.charts.load('upcoming', {
            'packages': ['corechart', 'bar', 'map', 'calendar', "table"],
            "mapsApiKey": "AIzaSyAFw5MrTjf1C880bHyZbq3upB6gEyCTiig"
        });
//		var loaded = google.charts.load('current', {'packages': ['corechart', 'bar', 'map', 'calendar', "table"]});
        var callback = google.charts.setOnLoadCallback();
// Returning as promised.
        callback.then(function () {
//			chartTable = new google.visualization.DataTable();

            graphDataBookingMissedOpertunities = [['Booking Date', "Time"]]


            graphDataCustomerPurchaseDates = [['Signup Date', "id"]]

            graphDataCustomerSigning = []
            graphDataCustomerSigning.push(['Signup Date', "id"])

            graphDataCustomerAge = []
            graphDataCustomerAge.push(["Id", 'Age'])

            graphDataCustomerGender = []
            graphDataCustomerGender.push(['Gender', "Count"])
            male = 0;
            female = 0;
            graphDataCustomerLocation = []
            graphDataCustomerLocation.push(['Lat', 'Long', 'Name'])
            graphDataQuantitive = []
            graphDataProductPricing = []
            analyticsRps.forEach(function (item) {

                item.entries.forEach(function (entry, index) {
                    try {

                        if (entry.productId.length === 0)
                            return
                        //
                        productRsp = getProductDetails(accountId, entry.productId)
                        if (productRsp.statusText !== undefined)
                            return

                    } catch (e) {
                        return
                    }
                    $("#historicalPurchasesHook").after(productRsp.name + "<div  class='w3-container w3-padding-large' id=historicalPurchases" + index + "></div>")
                    var elementId = $("#historicalPurchases" + index)

                    graphData = []
                    if (entry.ts !== undefined) {
                        entry.ts.forEach(function (ts, index) {
                            var epoch = new Date(ts).getTime();
                            graphData.push([productRsp.name + index, new Date(ts)]);
                            var year = new Date(ts).getFullYear();
                            var month = new Date(ts).getMonth();
                            var day = new Date(ts).getDate();
                            // Query Price
                            graphDataCustomerPurchaseDates.push([new Date(year, month, day), getRandInt(10, 100)]);
                        })

                        graphDataQuantitive.push([productRsp.name, entry.ts.length]);
                        if (productRsp.metadata.cost !== undefined) {
                            var x = parseFloat(productRsp.metadata.cost)
                            graphDataProductPricing.push([productRsp.name, x]);
                        }
                    }
                    if (entry.source === "signup") {
                        // Location
                        graphDataCustomerLocation.push([entry.location.lat, entry.location.lng, "x"]);
                        // Gender
                        if (entry.gender === "male")
                            male++
                        else
                            female++
                        // Age
                        graphDataCustomerAge.push([entry.age, "x"]);
                        var year = new Date(entry.startDate).getFullYear();
                        var month = new Date(entry.startDate).getMonth();
                        var day = new Date(entry.startDate).getDate();
                        graphDataCustomerSigning.push([new Date(year, month, day), 1]);
                        graphDataCustomerLocation.push([37.4232, -122.0853, 'Work']);
                    }
// Historical Purchase
                    if (entry.source === "event") {


                        var pc1 = new Chart()
                        pc1.title = "Purchase History"
                        pc1.width = "auto"
                        pc1.height = "auto"
                        pc1.setDataType(new google.visualization.DataTable())
                        pc1.setChartType(new google.visualization.Table(elementId[0]))
                        pc1.addCols(new Map([["Item", "string"], ["Date", "datetime"]]))
                        pc1.addRows(graphData)
                        pc1.drawTable()
                    }

                    // Historical Purchase
                    if (entry.source === "booking" && entry.purpose === "availability") {
                        var epoch = new Date(entry.availability).getTime();
                        var year = new Date(entry.availability).getFullYear();
                        var month = new Date(entry.availability).getMonth();
                        var day = new Date(entry.availability).getDate();
                        var hourOfDay = new Date(entry.availability).getHours();
                        graphDataBookingMissedOpertunities.push([new Date(year, month, day).toDateString(), hourOfDay]);
                    }
// Quanitivie Purchase

                })
            })
            //  Let Bar Chart got popularty details
            var pc1 = new Chart()
            pc1.title = "Most Sought After Products/Services"
            pc1.width = "100%"
            pc1.height = "100%"
            pc1.setDataType(new google.visualization.DataTable())
            var qh = $("#quanitySoldHook")
            pc1.setChartType(new google.visualization.ColumnChart(qh[0]))
            pc1.addCols(new Map([["Products", "string"], ["Amount Sold", "number"]]))
            pc1.addRows(graphDataQuantitive)

            pc1.drawTable(optionsMostSoughtItems)

            // Histogram: Lets pigeon hole product prices across the range
            var pc1 = new Chart()
            pc1.title = "Most Sought After Products/Services"
            pc1.width = "100%"
            pc1.height = "100%"
            pc1.setDataType(new google.visualization.DataTable())
            var qh = $("#productPricingHook")
            pc1.setChartType(new google.visualization.Histogram(qh[0]))
            pc1.addCols(new Map([["Products", "string"], ["Price", "number"]]))
            pc1.addRows(graphDataProductPricing)
            pc1.drawTable(optionsProductCosts)


// Map : Customer Locations
            var pc1 = new Chart()
            pc1.setDataType(google.visualization.arrayToDataTable(graphDataCustomerLocation))
            var qh = $("#customerMapHook")
            pc1.setChartType(new google.visualization.Map(qh[0])).chartType
            pc1.drawTable(optionsMap)
//			map.getSelection()

// Pie Chart: Gender distribution
            var pc1 = new Chart()
            graphDataCustomerGender.push(["Male", male]);
            graphDataCustomerGender.push(["Female", female]);
            pc1.setDataType(google.visualization.arrayToDataTable(graphDataCustomerGender))
            var qh = $("#genderSpreadHook")
            pc1.setChartType(new google.visualization.PieChart(qh[0])).chartType
            pc1.drawTable(optionsGenderDistro)
//			return

// Histogra Chart: Age distribution
            var pc1 = new Chart()
            pc1.setDataType(google.visualization.arrayToDataTable(graphDataCustomerAge))
            var qh = $("#ageDistributionHook")
            pc1.setChartType(new google.visualization.Histogram(qh[0])).chartType
            pc1.drawTable(optionsAgeDistro)

// Bar ; optionsCustomerSigning
            var pc1 = new Chart()
            pc1.setDataType(google.visualization.arrayToDataTable(graphDataCustomerSigning))
            qh = $("#signupSpreadHook")
            pc1.setChartType(new google.visualization.ColumnChart(qh[0])).chartType
            pc1.drawTable(optionsCustomerSigning)

// Bar ; Purchase history
            var pc1 = new Chart()
            pc1.setDataType(google.visualization.arrayToDataTable(graphDataCustomerPurchaseDates))
//			var formatter = new google.visualization.NumberFormat({negativeColor: 'red', negativeParens: true, pattern: '$######'});
//			formatter.format(pc1.data, 1);
            qh = $("#historicalPurchasesBarHook")
            pc1.setChartType(new google.visualization.Calendar(qh[0])).chartType
            pc1.drawTable(optionsCustomerPurchases)

// Bar ; Missed Bookings history
            var pc1 = new Chart()
            pc1.setDataType(google.visualization.arrayToDataTable(graphDataBookingMissedOpertunities))
//			pc1.setDataType(google.visualization.arrayToDataTable(x))
//			var x = [['Year', 'Asia'], ['2012', 900], ['2013', 1000], ['2014', 1170], ['2015', 1250], ['2016', 1530]];
//			x = [['Year', 'Asia']]
//			x.push(['2012', 900])
//			pc1.setDataType(google.visualization.arrayToDataTable(x))
            qh = $("#historicalBookingMissedHook")
            pc1.setChartType(new google.visualization.ColumnChart(qh[0])).chartType
//			pc1.setChartType(new google.visualization.LineChart(qh[0])).chartType
            pc1.drawTable(optionsBookingsMissed)


        });
    })

//	mostPurchasedService()
//	mostPurchasedResources()
//		customersJoined()
//		customersLeft()
//
//		customersLocations()
//
//		resourceBookingsMissed()


});
//# sourceURL=analytics_init.js