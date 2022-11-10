/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var _ownerName = {};
$(document).on("change", '#ownerName', function () {

	id = $(this).val();
	queryPatronById(id);
	_ownerName = {
		"name": tmpObj[0].name,
		"email": tmpObj[0].email,
		"mobile": tmpObj[0].mobile
	};

});
