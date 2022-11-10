/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");
//
// DEV TESTS - Mock Endpoints use Tokens!!!
//


var accountId = ""
var customerId = "cus_FqYn874GYachJ9"

var accountIdConnect = "acct_1FG0S6L4EJM4TcRu"
var customerIdConnect = "cus_FqXXNhXF3OPzE0"
var currency = "usd"

//////////////////////////
// Service Dependency
//////////////////////////
var modelPlanRsp = {}
var modelPlanRsp200 = {}
var modelPlanLogic = {}
var modelProduct = {
	"logic": modelProductLogic,
	"pname": "T-Shirts",
	"ptype": "good",
	"description": "this is one"
}

//////////////////////////
// Service Under Test
//////////////////////////
var modelPlanRsp = {}
var modelPlanRsp200 = {}
var modelPlanLogic = {}

var modelPlan = {
	"logic": modelPlanLogic,
	"product": {
		"pid": getRand().toString(),
		"pname": "test product"
	},
	"schedule": {
		// Specifies billing frequency. Either day, week, month or year.
		"interval": "month"
	},
	"transaction": {
		// Three-letter ISO currency code, in lowercase. Must be a supported currency.
		"currency": "eur",
		// A positive integer in cents (or 0 for a free plan) representing how much to charge on a recurring basis.
		"amount": 101
	},
	// optional: Default number of trial days when subscribing a customer to this plan using trial_from_plan=true.
	"trial_period_days": 1,
	//optional:  Configures how the quantity per period should be determined, can be either metered or licensed.
	//           licensed will automatically bill the quantity set for a plan when adding it to a subscription,
	//           metered will aggregate the total usage based on usage records.
	//           Defaults to licensed.
	"usage_type": "licensed"
}

// Use TOKENS stubs were possible!!!!
// Plans define the base price, currency, and billing cycle for subscriptions.
// For example, you might have a €5/month plan that provides limited access to your products, and a €15/month plan that allows full access.

var intervals = ["day", "week", "month", "year"]

describe("Platform Account", function () {
	this.timeout(10000)

	modelPlan.accountId = accountId;

	// A plan needs a product

	beforeEach(function () {
		id = postRequest("ProductAdd", modelProduct).id;
		assert.match(id, /pln_[a-zA-Z0-9]+/, 'Valid Plan Created');
		modelPlan.product.pid = id;
	});



	intervals.forEach(function (interval) {

		describe("Create Plans By Billing Cycle", function () {

			it("one where interval(" + interval + ") increments...", function (interval) {
				modelPlan.schedule.interval = interval;
				assert.match(postRequest("PlanAdd", modelPlan).id, /pln_[a-zA-Z0-9]+/, 'Valid Plan Created');
			});
		});
	})

});

function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

//# sourceURL=stripe_plan_unit.js


