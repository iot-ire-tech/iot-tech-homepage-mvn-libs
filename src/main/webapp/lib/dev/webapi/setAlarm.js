/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var myDate = new Date("May 15, 2012 16:20:00");

// This is arbitrary data pass to the alarm
var data = {
	foo: "bar"
}

// The "honorTimezone" string is what make the alarm honoring it
var request = navigator.mozAlarms.add(myDate, "honorTimezone", data);

request.onsuccess = function () {
	//console.log("The alarm has been scheduled");
};

request.onerror = function () {
	//console.log("An error occurred: " + this.error.name);
};