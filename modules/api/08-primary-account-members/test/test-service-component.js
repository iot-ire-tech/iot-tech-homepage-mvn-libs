/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var platformId = "acct_1CBNZCFOjjfpNUIx"
var hostId = parsedUrl.searchParams.get("hostId");
var accountId = parsedUrl.searchParams.get("accountId");
var accountId2 = parsedUrl.searchParams.get("accountId2");
var contextPath = "";
var module = "PrimaryServiceModel";
var sut = nsPrimaryAccountMembersService;

nsPrimaryAccountMembersService.mydb = "primary-account-members-qa"

describe(module + ' Module', function () {
    this.timeout(100000);
    this.slow(300000)

// Tests
    describe(module + ' : Feature - Primary Accounts .....', function () {
        context('Context - Functional Tests', function () {

            it("New client signup entry ", function (done) {
                sut.modelCreate.accountId = hostId
                sut.create()
                chai.expect(sut.obj._id, /[a-zA-Z0-9]+/, 'New client signs up')
                done()
            });
        });

        context('Context - Functional Tests: Invitee', function () {
            it("Query Newly Created Account Member Record", function (done) {
                // 1. Return Members
                sut.modelQuery = {
                    "platformId": platformId,
                    "accountId": hostId
                };
                sut.getByQuery()
                // Return a zero lenght array...
                // Return a object lenght array...
                chai.expect(sut.obj.items.length).to.have.eq(0)
                // else has members
                done()
            });

            it("Add Invitee ", function (done) {
                // Retrieve account members
                sut.modelQuery = {
                    "platformId": platformId,
                    "accountId": hostId
                };
                sut.getByQuery()
                // will always add member with default status
                sut.obj.items.push({
                    "ts": new Date().toISOString(),
                    "payments": false,
                    "payouts": false,
                    "accountId": accountId
                })
                sut.update()
                chai.expect(sut.obj._id, /[a-zA-Z0-9]+/, 'New Member Added To Primary Account List')

                done()
            });
        });

        context('Context - Functional Tests: Query New Addition', function () {
            it("Query Newly Added Member", function (done) {
                // 1. Return Members
                sut.modelQuery = {
                    "platformId": platformId,
                    "accountId": hostId
                };
                sut.getByQuery()
                // if zero, nothing to do...
                chai.expect(sut.obj.items.length).to.have.eq(1)
                // else has members
                done()
            });
        });

        context('Context - Functional Tests: Get Real', function () {
            it("Add Second Account Member To List ", function (done) {
                sut.modelQuery = {
                    "platformId": platformId,
                    "accountId": hostId
                };
                sut.getByQuery()
                sut.obj.items.push({
                    "ts": new Date().toISOString(),
                    "payments": false,
                    "payouts": false,
                    "accountId": accountId2
                })
                sut.update()
                chai.expect(sut.obj._id, /[a-zA-Z0-9]+/, 'New Member Added To Primary Account List')
                done()
            });

            it("Update First Account Member Status", function (done) {
                //
                sut.modelQuery = {
                    "platformId": platformId,
                    "accountId": hostId
                };
                sut.getByQuery()

                // update account payouts
                sut.obj.items.forEach(function (memberItem) {
                    if (memberItem.accountId === accountId) {
                        memberItem.payouts = true
                    }
                }.bind(this));

                // update account payments
                sut.obj.items.forEach(function (memberItem) {
                    if (memberItem.accountId === accountId) {
                        memberItem.payments = true
                    }
                }.bind(this));

                sut.update()

                chai.expect(sut.obj._id, /[a-zA-Z0-9]+/, 'New Member Added To Primary Account List')
                done()
            });


            it("Get Compliant Account Members", function (done) {
                //
                var compliantAccounts = []
                sut.modelQuery = {
                    "platformId": platformId,
                    "accountId": hostId
                };
                sut.getCompliantAccounts()
                chai.expect(sut.accountIds.length).to.have.eq(1)
                done()
            });


        });
    });


});
//# sourceURL=api_primary_account_members_test.js
