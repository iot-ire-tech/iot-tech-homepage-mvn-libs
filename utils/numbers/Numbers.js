/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function getRand() {
	return Math.floor(Math.random() * 1000000);
}
function getRandInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertNumberToDecimalPlaces(number, fixed) {
	var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
	return number.toString().match(re)[0];
}
