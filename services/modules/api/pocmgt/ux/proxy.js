/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


let validatorPoc = {
	set: function (obj, prop, value) {
		if (prop === 'fullName') {
//			if (!Number.isInteger(value)) {
//				throw new TypeError('The age is not an integer');
//			}
//			if (value > 200) {
//				throw new RangeError('The age seems invalid');
//			}
			if (value.length < 2) {
				throw new RangeError('The email seems invalid');
			}
		}
		if (prop === 'email') {
			if (value.length < 10) {
				throw new RangeError('The email seems invalid');
			}
		}
		if (prop === 'phone') {
			if (value.length < 10) {
				throw new RangeError('The phone seems invalid');
			}
		}
		// The default behavior to store the value
		obj[prop] = value;

		// Indicate success
		return true;
	}
};
const pocProxy = new Proxy(modelPoc, validatorPoc);


// Push UX (Edit)
function validateDataPoc(modelPoc) {

	modelPoc.fullName = $(this).val();
	modelPoc.email = $(this).val();
	modelPoc.phone = $(this).val();

}

// Push UX (Edit)
function updatePoc(modelPoc) {

	modelPoc.fullName = $(this).val();
	modelPoc.email = $(this).val();
	modelPoc.phone = $(this).val();

}
function resetPoc(modelPoc) {

	modelPoc.fullName = "";
	modelPoc.email = "";
	modelPoc.phone = "";

}
//# sourceURL=api_poc_proxy.js