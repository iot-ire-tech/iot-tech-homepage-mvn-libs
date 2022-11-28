/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// accountId=acct_1GRdJxF6KR5nnzB2&productId=prod_HIqrrSdRkT5srg&assetId=prod_HhQYITA1r08U2j&customerId=cus_GzcZjg8K4BliTA
var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");
var assetId = parsedUrl.searchParams.get("assetId");
var productId = parsedUrl.searchParams.get("productId");
var customerId = parsedUrl.searchParams.get("customerId");
//var assert = require('chai').assert;
//var expect = chai.expect;
//var assert = chai.assert;


// Asset Feature
// Cap = X
// Virtual Capactiy = Y
// Is is X*Y....... possible slippling Hall into sections....

var contextPath = ""
nsBookingService.mydb = "bookings-qa"
// Booking Constraints
// Create aset with capacity
// Create aset with availability
// var startDateTime": moment(new Date(startDateTime)).add(duration, 'm').toISOString(),
var startDateTime = "2020-10-26T09:00:00.000Z"
var testduration = 30
var duration = 30

describe('Booking Module', function () {
    this.timeout(1000000);
    this.slow(300000)

    var testSuite = [{
        args: [
            {
                "accountId": accountId,
                "offering": "event",
                "assetId": assetId,
                "productId": productId,
                "startDateTime": moment(new Date(startDateTime)).add(testduration, 'm').toISOString(),
                "duration": duration,
                "item": {"active": true, "entityId": getRand()}
            }
            ,
            {
                "accountId": accountId,
                "offering": "event",
                "assetId": assetId,
                "productId": productId,
                "startDateTime": moment(new Date(startDateTime)).add(testduration, 'm').toISOString(),
                "duration": duration,
                "item": {"active": true, "entityId": getRand()}
            }
            ,
            {
                "accountId": accountId,
                "offering": "event",
                "assetId": assetId,
                "productId": productId,
                "startDateTime": moment(new Date(startDateTime)).add(testduration, 'm').toISOString(),
                "duration": duration,
                "item": {"active": true, "entityId": getRand()}
            }
            ,
            {
                "accountId": accountId,
                "offering": "event",
                "assetId": assetId,
                "productId": productId,
                "startDateTime": moment(new Date(startDateTime)).add(testduration, 'm').toISOString(),
                "duration": duration,
                "item": {"active": true, "entityId": getRand()}
            }
            ,
            {
                "accountId": accountId,
                "offering": "event",
                "assetId": assetId,
                "productId": productId,
                "startDateTime": moment(new Date(startDateTime)).add(testduration, 'm').toISOString(),
                "duration": duration,
                "item": {"active": true, "entityId": getRand()}
            }
            // This will trigger next available
            ,
            {
                "accountId": accountId,
                "offering": "event",
                "assetId": assetId,
                "productId": productId,
                "startDateTime": moment(new Date(startDateTime)).add(testduration, 'm').toISOString(),
                "duration": duration,
                "item": {"active": true, "entityId": getRand()}
            }
            // This will not be counted as a booking
            ,
            {
                "accountId": accountId,
                "offering": "event",
                "assetId": assetId,
                "productId": productId,
                "startDateTime": "2020-08-26T09:00:00.000Z",
                "startDateTime": moment(new Date(startDateTime)).add(testduration, 'm').toISOString(),
                "duration": duration,
                "item": {"active": false, "entityId": getRand()}
            }
        ],
        expected: /[a-zA-Z0-9]+/

    }
    ]
    // TODO add javascript confirm here...
    before("Delete All", function () {
        nsBookingService.accountId = accountId
        nsBookingService.getAll()
        nsBookingService.objs.forEach(function (item) {
            nsBookingService.dbId = item._id
            nsBookingService.delete()
        })
    })

    try {

        testSuite.forEach(function (testcase) {
            describe('Booking Module: Feature - Booked Out', function () {
                testcase.args.forEach(function (test) {

                    nsBookingService.offering = test.offering

                    nsRevenueService.accountId = test.accountId
                    nsRevenueService.assetId = test.assetId // Rev#1
                    nsRevenueService.productId = test.productId // Rev#2

                    nsBizHoursService.accountId = test.accountId
                    nsBizHoursService.assetId = test.assetId // Biz Hour#1
                    nsBizHoursService.productId = test.productId // Biz Hour#2

                    nsCapacityMgtService.accountId = test.accountId
                    nsCapacityMgtService.assetId = test.assetId // Cap#1
                    nsCapacityMgtService.productId = test.productId // Cap#2

                    nsFixturesService.accountId = test.accountId
                    nsFixturesService.assetId = test.assetId // Fix#1
                    nsFixturesService.productId = test.productId // Fix#2
                    nsFixturesService.accountId = test.accountId
                    nsSeatingService.assetId = test.assetId // Fix#1
                    nsSeatingService.productId = test.productId // Fix#2

                    nsBookingService.accountId = test.accountId
                    nsBookingService.productId = test.productId
                    nsBookingService.assetId = test.assetId

                    // Time
                    nsBookingService.startDateTime = test.startDateTime
                    nsBookingService.duration =test.duration


                    setupService:{
                        nsBookingService.revenueService = nsRevenueService
                        // has revenue
                        nsBookingService.bizHoursService = nsBizHoursService
                        // has opening hours
                        nsBookingService.capacityMgtService = nsCapacityMgtService
                        // has capacity
                        nsBookingService.fixturesService = nsFixturesService
                        // has capacity
                    }

                    // Is ready to book
                    if (!nsBookingService.isReadyToBook()) {

                        // Fail the test
                        chai.expect("", /[a-zA-Z0-9]+/, 'Ready To Booking Item')
                        // Fail the test
                        throw Error("Not ready to book (" + nsBookingService.msg + ")")
                    } else {
                        // Valua added services

                        nsBookingService.setMaxNumSlotsAvailable()

                        context('make booking reservation, in the morning time', function () {
                            it("Bookings are go", function (done) {

                                nsBookingService.item = test.item
                                nsBookingService.service();
                                chai.expect(nsBookingService.dbId, /[a-zA-Z0-9]+/, 'Item Booked')
                                done()
                            })
                        });
                    }
                })
            })
        })
    } catch (errMsg) {
        alert("TEST Alert (" + errMsg + ")")
    }

    describe('Booking Module: Ux Tab Only', function () {
        var tabsHtml;
        it("Tab Only", function (done) {
            tabsHtml = uxBookingReservationTab.init()

            $("#tabOnly").html(tabsHtml)
            uxLoadTab(".tabBookingOptions")
            done()
        });

        it("Module Without Tab", function (done) {
            uxBookingReservationWidget.accountId = accountId;
            uxBookingReservationWidget.productId = productId;
            uxBookingReservationWidget.offering = "activity";
            uxBookingReservationWidget.tabsHtml = tabsHtml;
            var html = uxBookingReservationWidget.init()
            done()
        });


    });

    xdescribe('Booking Module: Feature - Multiple Products / Same Window', function () {

        var bookDifferentProducts = [{
            args: [
                {
                    "accountId": accountId,
                    "assetId": assetId,
                    "productId": productId,
                    "startDateTime": "2020-07-26T09:00:00.000Z",
                    "duration": 30,
                    "item": {"active": true, "entityId": getRand()}
                }
                ,
                {
                    "accountId": accountId,
                    "assetId": assetId,
                    "productId": productId,
                    "startDateTime": "2020-07-26T09:00:00.000Z",
                    "duration": 30,
                    "item": {"active": true, "entityId": getRand()}
                }
            ],
            expected: /[a-zA-Z0-9]+/
        }
        ]


        bookDifferentProducts.forEach(function (test) {
            context('two products, same start times', function () {
                it("booking: should start at, with a duration of ", function (done) {
//				var rsp = bookingReservationService(test.args)
//				chai.expect(rsp._id).to.match(test.expected);
                    done()
                });
            });
        })
    })

    xdescribe('Booking Module: Feature - Next Available Booking Is!', function () {
    })


});
//# sourceURL=api_booking_test.js