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


var contextPath = ""

describe('Booking Module', function () {
	this.timeout(100000);
	this.slow(300000)
//	this.normal(500)
//	this.fast(100)

// Booking Items
// 9 to 9:30 	// Next free at 9:30
// 9 to 10:00
// 9 to 10:30

	var testsSmoke = [{
			args: {
				"accountId": accountId,
				"assetId": "prod_HIqrrSdRkT5srg", // 3
				"productId": "prod_HIpYhJumMJaOLZ", // 1
				"startTimeMins": 0, // For this instance is time (epoch)
				"endTimeMins": 0, // For this instance is time (epoch)
				"unitsRemaining": 0, // Asset Thing
				"bookingsRemaining": 0, // Booking Thing....
				"items": [{
						"customerId": customerId,
						"active": false,
						"durationMins": 0,
						"reservationDate": "",
						"ts": getTs(),
						"cost": 0.00,
						"alerts": [],
						"comms": [customerId],
						"reminderdate": ""
					}]
			},
			expected: /[a-zA-Z0-9]+/

		}
	]

	//var testsTwoProductsSameTime = [{
	var testsTwoProductsSameTime = [{
			args: {
				"accountId": accountId,
				"assetId": "prod_HIqrrSdRkT5srg",
				"productId": "prod_HIpYhJumMJaOLZ",
				"startTimeMins": 0, // For this instance is time (epoch)
				"endTimeMins": 0, // For this instance is time (epoch)
				"unitsRemaining": 0, // Asset Thing
				"bookingsRemaining": 0, // Booking Thing....
				"items": [{
						"customerId": customerId,
						"active": false,
						"durationMins": 0,
						"reservationDate": "",
						"ts": getTs(),
						"cost": 0.00,
						"alerts": [],
						"comms": [customerId],
						"reminderdate": ""
					}]
			},
			expected: /[a-zA-Z0-9]+/

		},
		{
			args: {
				"accountId": accountId,
				"assetId": "prod_HY8uxYBDWxtOr6",
				"productId": "prod_HanBNFEBAdcorR",
				"startTimeMins": 0, // For this instance is time (epoch)
				"endTimeMins": 0, // For this instance is time (epoch)
				"unitsRemaining": 0, // There is x amount of start places.
				"bookingsRemaining": 0, // Booking Thing....
				"items": [{
						"customerId": customerId,
						"active": false,
						"durationMins": 0,
						"reservationDate": "",
						"ts": getTs(),
						"cost": 0.00,
						"alerts": [],
						"comms": [customerId],
						"reminderdate": ""
					}]
			},
			expected: /[a-zA-Z0-9]+/

		}
	]
	before("Delete All", function () {

//		var allBookingsRsp = bookingReservationServiceGetAll()
//		allBookingsRsp.forEach(function (item) {
//			bookingReservationServiceDelete(item)
//		})
	})



// Tests

	describe('Booking Module: Ux Tab Only', function () {

		it("Tab Only", function (done) {
			var html = uxBookingReservationTab.init()
			$("#tabOnly").html(html)
			uxLoadTab(".tabBookingOptions")
			done()
		});

		it("Module Without Tab", function (done) {
			var html = uxBookingReservationTab.init()
			$(".bookingMgt").click()
			done()
		});


	});
	xdescribe('Booking Module: Feature - Booked Out', function () {



		testsSmoke.forEach(function (test) {

			context('make booking reservation, with capacity of 3', function () {

				it("first booking: should start at " + test.args.startTimeMins + ", with a duration of " + test.args.items[0].durationMins + "", function (done) {
					var rsp = bookingReservationService(test.args)
					chai.expect(rsp._id).to.match(test.expected);
					// Capacity is reduced?
//				bookingReservationServiceGet(payload)
					done()
				});
				it("second booking: should start at " + test.args.startTimeMins + ", with a duration of " + test.args.items[0].durationMins + "", function (done) {
					var rsp = bookingReservationService(test.args)
					chai.expect(rsp._id).to.match(test.expected);
					done()
				});
				it("third booking: should start at " + test.args.startTimeMins + ", with a duration of " + test.args.items[0].durationMins + "", function (done) {
					var rsp = bookingReservationService(test.args)
					chai.expect(rsp._id).to.match(test.expected);
					done()
				});
				it("fourth booking: should should fail", function (done) {
					var rsp = bookingReservationService(test.args)
//				chai.expect(rsp._id).to.match(test.expected);
					chai.expect(rsp._id).to.match("Booked out");
//				assert.throw(function() { iThrowError(args) }, Error, /Booked out/);
					done()
				});
			});
		})




	});

	xdescribe('Booking Module: Feature - Multiple Products / Same Window', function () {
		testsTwoProductsSameTime.forEach(function (test) {
			context('two products, same start times', function () {

				it("booking: should start at " + test.args.startTimeMins + ", with a duration of " + test.args.items[0].durationMins + "", function (done) {
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
// Level 1 : Identity
//	"accountId": payload.accountId,
//	"productId": payload.productId,
//	// Level 2 :Capacity
//	"unitsRemaining": {"$gte": 0}, // Totally booked out
//	"bookingsRemaining": {"$gte": 0}, // No Tickets Remaining
//	// Level 3 : Booking Window / Slot / Schedule
//	"$and": [{"startTimeMins": {"$gte": payload.startTimeMins}}, {"endTimeMins": {"$lte": payload.endTimeMins}}]

xdescribe('Query Reservation Status', function () {

	context('Single Account Level Query', function () {

		it("", function (done) {
//			var rsp = bookingReservationService(test.args)
//			chai.expect(rsp._id).to.match(test.expected);
			done()
		});
	});

	context('Community Account Level Query', function () {

		it("", function (done) {
//			var rsp = bookingReservationService(test.args)
//			chai.expect(rsp._id).to.match(test.expected);
			done()
		});

	});

});
//# sourceURL=api_booking_test.js