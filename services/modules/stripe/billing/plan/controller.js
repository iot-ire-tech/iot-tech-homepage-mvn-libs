/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//# sourceURL=stripe_person_controller.js

$(document).on('click', '#save', function () {



	url = location.origin + contextPath + "/" + "PlanAdd";
	modelPlanRsp = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
		.setPayload(modelContext).post().getResponse();

	if (modelPlanRsp.id.toString().length > 0)
		console.log("INF: Good")



});
//# sourceURL=stripe_plan_ctrl.js