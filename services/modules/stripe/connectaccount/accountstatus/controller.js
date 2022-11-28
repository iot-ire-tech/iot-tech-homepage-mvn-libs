/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('click', '#save', function () {

	redirectMe2({"alocation": location.origin + contextPath + "/index.jsp", "where": "_self", "delay": 3000});

});
//# sourceURL=onboarding_account_status_ctrl.js
