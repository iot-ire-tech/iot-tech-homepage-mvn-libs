/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Array.prototype.insert = function (index, item) {
	this.splice(index, 0, item);
};

Number.prototype.round = function (p) {
	p = p || 10;
	return parseFloat(this.toFixed(p));
};