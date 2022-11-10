/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelPlanRsp = {}
var modelPlanRsp200 = {}

var modelPlan = {
	"logic": modelPlanLogic,
	"product": {
		"pid": getRand().toString(),
		"pname": "test product"
	},
	"schedule": {
		"interval": "month"
	},
	"transaction": {
		"currency": "eur",
		"amount": 101
	}
}

var modelPlanLogic = {

}
//# sourceURL=stripe_plan_model.js