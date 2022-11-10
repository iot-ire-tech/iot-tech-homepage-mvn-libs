/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// This needs to be global as its referenced in HTML!!

var mySlideShow = new slideShow("mySlides")
$(document).ready(function () {
	var slideIndex = 1;
	mySlideShow.addSlide('<img src="enterprise.svg" style="width:100%">')
	mySlideShow.addSlide('<img src="individual.svg" style="width:100%">')
	mySlideShow.addSlide('<img src="space.jpg" style="width:100%">')
	$("#slideShowTime").html(mySlideShow.getSlideShow())
	mySlideShow.showDivs(slideIndex)

	$("#rightBtn").on("click", function () {
		mySlideShow.plusDivs(1)
	});
	$("#leftBtn").on("click", function () {
		mySlideShow.plusDivs(-1)
	});

});

//	setTimeout(function () { }, 1000)
//
//$(document).ready(function () {
//});