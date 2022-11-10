/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

_visible = false;
$(document).on("change", '#uxviz', function () {

	_visible = $(this).val();
	if (_visible === "true")
		_visible = true;
	else
		_visible = false;

});

