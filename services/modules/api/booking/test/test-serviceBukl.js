/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
nsBookingService.mydb = "bookings"
// Booking Constraints
// Create aset with capacity
// Create aset with availability

describe('Booking Module', function () {
	this.timeout(1000000);
	this.slow(300000)

	var smokeTests = [{
			args: {
				"accountId": accountId,
				"assetId": assetId,
				"productId": productId,
//				"startDateTime": new Date().toISOString(),
// ISO is one hour ahead of localtime  "7/26/2020, 10:56:55 AM"
				"startDateTime": "2020-07-26T09:00:00.000Z",
				"duration": 30,
				"bookings": [
					{
						"active": true,
						"entityId": getRand()
					}
					,
					{
						"active": true,
						"entityId": getRand()
					}
					,
					{
						"active": true,
						"entityId": getRand()
					}
					,
					{
						"active": true,
						"entityId": getRand()
					}
					,
					{
						"active": true,
						"entityId": getRand()
					}
					,
					{
						"active": true,
						"entityId": getRand()
					}
					,
					{
						"active": true,
						"entityId": getRand()
					}
				]
			},
			expected: /[a-zA-Z0-9]+/

		}
	]
	smokeTests.forEach(function (testcase) {
		nsBookingService.modelQuery.accountId = testcase.args.accountId

		before("Delete All", function () {
			var allBookingsRsp = nsBookingService.getAll()
			allBookingsRsp.forEach(function (item) {
				nsBookingService.delete(item)
			})
		})
// Idea finaical growth
// on creation of an asset
// on creation of an activity project revue for year! on provision side! - fincial reports
		describe('Booking Module: Feature - Booked Out', function () {

// Prime Booking Service / Asset
// Service dependency injection
// 1. BizHours (if bizhrs id empty )
			nsBookingService.serviceLayer.forEach(function (service) {
				// if status false
				if (service.status === false && service.time === "preCreate") {
					// Executing service requests.
					var rst = eval(service.name + "." + service.action + "(" + service.args + ")")
					// update its id
					service.id = getRand();
					service.status = true
					console.log("INF: Executing service (" + service.name + ")")
					// Update service layer with Ids!!!
					//nsBookingService.update();
				}
			})

//
//
// Before I create a booking
// 1. What species am i dealing with (booking Item)
			nsBookingService.modelItem.entityId = testcase.args.productId
			nsBookingService.modelQuery.assetId = testcase.args.assetId

			capacity: {
				var rsp = getDbRequestQuery("capacitymgt", {"productId": testcase.args.assetId})[0]
				nsBookingService.maxNumSlotsAvailable = rsp.levels.units_total
				rsp = getDbRequestQuery("capacitymgt", {"productId": testcase.args.productId})[0]
				nsBookingService.maxNumSlotsAvailable += rsp.levels.units_total
			}

//
//
// 2. What target is requested. (only one account Id / assetId no joint ownership)
			nsBookingService.accountId = testcase.args.accountId;
			nsBookingService.assetId = testcase.args.assetId;
//
//
// 3. What Times is requested
// Schedule : 9:00 to 9:30 AM
// Schedule : 9:00 to 9:30 AM
			nsBookingService.startDateTime = testcase.args.startDateTime
			nsBookingService.duration = testcase.args.duration

			context('make booking reservation, in the morning time', function () {
				testcase.args.bookings.forEach(function (bookingItem) {
//  Open for biziness
					nsBizHoursService.modelQuery.accountId = testcase.args.accountId
					nsBizHoursService.modelQuery.productId = testcase.args.assetId
					if (nsBizHoursService.setReservationDate(testcase.args.startDateTime).setDuration(testcase.args.duration).isOpen(testcase.args.assetId)) {

						it("Schedule, Start Time: " + testcase.args.startDateTime + ", End Time: " + testcase.args.duration + "::: ", function (done) {


							if (nsBookingService.hasSlot()) {
								//
								// Booking Time
								//
								console.log("Slot Available.(" + nsBookingService.currentNumSlotsRemaining + ")");
								if (nsBookingService.isFirstBooking) {
									nsBookingService.items.push(bookingItem)
									var rsp = nsBookingService.create()
									nsBookingService.numSlotsTaken = 1
									this._runnable.title = this._runnable.title + "New booking created (" + rsp._id + ")";
									chai.expect(rsp._id).to.match(/[a-zA-Z0-9]+/);
								} else {
									nsBookingService.bookingObject.items.push(bookingItem)
									var rsp = nsBookingService.update()
									this._runnable.title = this._runnable.title + "New booking added (" + rsp._id + ")";
									chai.expect(rsp._id).to.match(/[a-zA-Z0-9]+/);
								}


							} else {
								// List Next Booking here...
								// Add this feature to provisioning portal...
								// 1. multibook, 2. Next Booking suggestion 3....
								this._runnable.title = this._runnable.title + "No booking space available (" + nsBookingService.currentNumSlotsRemaining + ")";
								// Get next booking
								console.log("No Slots Available.(" + nsBookingService.currentNumSlotsRemaining + ")");
// 1. Update : Analytics lost rev no slots available
							}
							done()
						})

					} else {
						// update analtyics
						console.log("Biziness closed at this time.(" + nsBizHoursService.list() + ")");
					}
					// End Of Booking Times
				});
			});
		})
	})


});
//# sourceURL=api_booking_test.js