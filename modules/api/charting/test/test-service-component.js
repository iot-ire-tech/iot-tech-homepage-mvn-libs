/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var productId = parsedUrl.searchParams.get("productId");
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");
//var assert = require('chai').assert;
//var expect = chai.expect;
//var assert = chai.assert;

var module = "xxx"
var contextPath = "";
describe(module + ' Module', function () {
    this.timeout(100000);
    this.slow(300000)

    before("Delete All", function () {
//		nsEntitiesService.modelEntityQuery.accountId = accountId
//		var allItemsRsp = nsEntitiesService.serviceList()
//		allItemsRsp.forEach(function (item) {
//			nsEntitiesService.serviceDelete(item)
//		})

//$ = require('jquery');

    })

// Tests
    describe(module + ' : Feature - Create new .....', function () {

        context('Context - Smoke Test', function () {
            it("Create test", function (done) {
                nsBizHoursService.accountId = accountId;
                nsBizHoursService.productId = productId;
                // var rsp = nsBizHoursService.create()
                chai.expect(rsp._id, /[a-zA-Z0-9]+/, 'New MM Item Created')
                done()
            });


        });
    });


});

// https://developers.google.com/chart/interactive/docs/gallery/gauge
// https://developers.google.com/chart/interactive/docs/overlays
// https://developers.google.com/chart/interactive/docs/gallery/trendlines
//A trendline is a line superimposed on a chart revealing the overall direction of the data. Google Charts can automatically generate trendlines for Scatter Charts, Bar Charts, Column Charts, and Line Charts.

// Product
graphEntry.ts.push(new Date().toISOString())
sleep(2000)
graphEntry.ts.push(new Date().toISOString())

modelAnalytics.usage.push(getTs())
modelAnalytics.entries.push(graphEntry)
//var messageRsp = postDbRequest("analytics", modelAnalytics);
function test_barchart() {

    var pc = new Chart()

    var data1 = [
        ['Element', 'Density', {role: 'style'}],
        ['Copper', 8.94, '#b87333'], // RGB value
        ['Silver', 10.49, 'silver'], // English color name
        ['Gold', 19.30, 'gold'],
        ['Platinum', 21.45, 'color: #e5e4e2'], // CSS-style declaration
    ]
    pc.width = 400
    pc.height = 400
    pc.init()
    pc.addChart(this.drawBarChart)
    setTimeout(function () {
        // Chart - Peak Activity
        pc.title = 'Peak Bookings#1'
        pc.addRows(data1).drawBarChart("chart_users_peakactivity#1")


        clearInterval(timeout);
    }, 1000)


}

function test_calchart() {

    var pc = new Chart()

    var data1 = [
        ['Country', 'Population'],
        [new Date(2012, 3, 13), 37032],
        [new Date(2012, 3, 14), 38024],
        [new Date(2012, 3, 15), 38024],
        [new Date(2012, 3, 16), 38108],
        [new Date(2012, 3, 17), 38229],
        // Many rows omitted for brevity.
        [new Date(2013, 9, 4), 38177],
        [new Date(2013, 9, 5), 38705],
        [new Date(2013, 9, 12), 38210],
        [new Date(2013, 9, 13), 38029],
        [new Date(2013, 9, 19), 38823],
        [new Date(2013, 9, 23), 38345],
        [new Date(2013, 9, 24), 38436],
        [new Date(2013, 9, 30), 38447]
    ]

    pc.width = 400
    pc.height = 400
    pc.init()
    pc.addChart(this.drawCalendarChart)
    setTimeout(function () {
        // Chart - Peak Activity
        pc.title = 'Peak Bookings#1'
        pc.addRows(data1).drawCalendarChart("chart_users_peakactivity#1")


        clearInterval(timeout);
    }, 1000)


}

function test_scatterchart() {

    var pc = new Chart()

    var data1 = [
        ['Age', 'Weight'],
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7]

    ]

    pc.title = 'Peak Bookings#1'
    pc.titleX = 'Weight'
    pc.maxX = 50
    pc.titleY = 'Height'
    pc.maxY = 50

    pc.width = 400
    pc.height = 400
    pc.init()
    pc.addChart(this.drawScatterChart)
    setTimeout(function () {
        // Chart - Peak Activity
        pc.addRows(data1).drawScatterChart("chart_users_peakactivity#1")


        clearInterval(timeout);
    }, 1000)


}

function tests() {

    var pc = new Chart()

    var dataUsers1 = [['Day', "X"], ['Moring', 2], ['Midday', 3], ['Evening', 5]]
    var dataUsers2 = [['Day', "X"], ['Children', 3], ['Teens', 2], ['Adult', 2], ['VIP', 2]]
    var dataUsers3 = [['Day', "X"], ['Males', 3], ['Femaile', 2]]

    var data = [
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]
    ]

    var userLocations = [
        ['Country', 'Population'],
        ['China', 'China: 1,363,800,000'],
        ['India', 'India: 1,242,620,000'],
        ['US', 'US: 317,842,000'],
        ['Indonesia', 'Indonesia: 247,424,598'],
        ['Brazil', 'Brazil: 201,032,714'],
        ['Pakistan', 'Pakistan: 186,134,000'],
        ['Nigeria', 'Nigeria: 173,615,000'],
        ['Bangladesh', 'Bangladesh: 152,518,015'],
        ['Russia', 'Russia: 146,019,512'],
        ['Japan', 'Japan: 127,120,000']
    ]


    pc.width = 400
    pc.height = 400
    pc.init()
    pc.addChart(this.drawPieChart)
    pc.addChart(this.drawPieLineChart)
    pc.addChart(this.drawMapChart)


    setTimeout(function () {
        // Chart - Peak Activity
        pc.title = 'Peak Bookings#1'
        pc.addRows(dataUsers2).drawPieChart("chart_users_peakactivity#2")

        pc.title = 'Age Distribution#2'
        pc.addRows(data).drawPieLineChart("chart_users_peakactivity#1")

        pc.title = 'Sex Distribution#3'
        pc.title = 'Location Distribution'
        pc.addRows(userLocations).drawMapChart("chart_users_peakactivity#3")
        clearInterval(timeout);
    }, 1000)


}

//# sourceURL=api_charting_component_test.js