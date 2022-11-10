/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// 30 [mins] costs 0.07 [bpd]
// "unitTime=1__costs=10__currency=EUR__annotate=(best price)__inc=hr__bestprice=true"


function ttbService(productId) {

// Load payload
	var numTimeSlots = uxTbbDialog.getIds().length;

	if (numTimeSlots > 0) {
		uxTbbDialog.getIds().forEach(function (item) {
			// Unbox TBB
			console.log(item)

			var modelTbbItem = {
				"unitTime": parseFloat($("#" + item.timeId).val()).toFixed(2),
				"cost": parseFloat($("#" + item.costId).val()).toFixed(2),
				"currency": $("#" + item.currencyId).val(),
				"inc": $("select[id=" + item.incId + "] option:selected").attr("incId"),
				"bestprice": $("#" + item.bestpriceId).val(),
				"comment": $("#" + item.annotateId).val(),
			};
			modelTbb.items.push(modelTbbItem);
		});

		var rsp = ttbServiceGet(accountId, productId)

// Does it already exist
		if (rsp.length === 0) {
// New
			rsp = ttbServiceCreate(accountId, productId, modelTbb)
		} else {
// Existing
			rsp = ttbServiceUpdate(rsp[0])
		}
	}

	return rsp;
}
function ttbServiceGet(accountId, productId) {

	var query = {
		"accountId": accountId,
		"productId": productId
	}
	var rsp = getDbRequestQuery("tbbmgt", query)

	return rsp;
}

function ttbServiceGetListX(accountId, productId) {
	var productsGetTimebasedRevenueObj = {
		"mins": "",
		"cost": "",
		"currency": ""
	}

	payload = {
		"accountId": accountId,
		"productId": productId
	}
	productsGetTimebasedRevenueObj = postRequest("productsGetTimebasedRevenueList", payload);
	return productsGetTimebasedRevenueObj;
}






//# sourceURL=api_ttb_service.js