/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {


//	$('#btnGetStarted').on("click", function () {
//
////		$("[name=getStarted]").click()
//
//	});

    $('#meMenu').bind('DOMSubtreeModified', function (e) {
        //	alert('class changed');
    });

    var demoMsg = "mailto:admin@iottech.ie?"
    demoMsg += "subject=Demo Request&"
    demoMsg += "body=Hello!!!"
    demoMsg += "%0A"
    demoMsg += "Thank you for showing interest in our products, in order to best serve you, please complete the form below, and we will get back to you asap."
    demoMsg += "%0A"
    demoMsg += "%0A"
    demoMsg += "Name: "
    demoMsg += "%0A"
    demoMsg += "Contact Number: "
    demoMsg += "%0A"
    demoMsg += "Your Business Problem: "
    demoMsg += "%0A"
    demoMsg += "Your Business Objective: "
    demoMsg += "%0A"
    demoMsg += "Employee Count: "
    demoMsg += "%0A"
    demoMsg += "Customer Base: "
    demoMsg += "%0A"
    demoMsg += "%0A"

    $('.demoMailAnchor').attr("href", demoMsg)
    $('.demoMailAnchor').attr("target", "_blank")
    $('.demoMailAnchor').attr("style", "text-decoration:none; ")


//	$('#PageLoaded').removeClass("w3-hide")
//	$('#PageLoaded').addClass("w3-show")

});
$(window).resize(function () {
//	alert($('header').width())
//	alert($('header').height())


//	window.console.log($('header').width())
//	if ($('header').width() <= 600) {
//
//		// is mobile device
//		$('#meMenu').removeClass("w3-display-topmiddle")
//
//	} else {
//		$('#meMenu').addClass("w3-display-topmiddle")
//	}

});



//# sourceURL=homepage_init.js


