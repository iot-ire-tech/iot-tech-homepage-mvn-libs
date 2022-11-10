/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var slideShow = function (id, className) {
	this.className = className;
	this.id = id;
	this.slideCounter = 0;
	this.nextPrevTag = "";
// Static
	htmlHdr = '<div class="w3-content w3-display-container">'

	this.htmlbtnLeft = "<button  id=\"leftBtn" + this.id + "\" class=\"w3-button  w3-display-topleft\" >Previous " + this.nextPrevTag + " &#10094;</button>"
	this.htmlbtnLeftNone = "<button  id=\"leftBtn" + this.id + "\" class=\"w3-disabled w3-button  w3-display-topleft\" >Previous " + this.nextPrevTag + " &#10094;</button>"
	this.htmlbtnRight = "<button id=\"rightBtn" + this.id + "\" class=\"w3-button  w3-display-topright\">&#10095; Next " + this.nextPrevTag + "</button>"
	this.htmlbtnRightNone = "<button  id=\"rightBtn" + this.id + "\" class=\"w3-disabled w3-button  w3-display-topright\">&#10095; Next " + this.nextPrevTag + "</button>"




	this.slides = [];
	this.slides = "";
	this.htmlSlide = "";
	this.htmlSlideShow = "";
	this.addSlide = function (slide) {
		htmlSlide = "<div class=\"w3-content w3-display-container " + this.className + "\" style=\"display:none; margin-left: 10%; width: 80% ; margin-right: 10%;\">"
		htmlSlide += slide
		htmlSlide += "</div>"
//		this.slides.push(htmlSlide)
		this.slides += htmlSlide
		this.slideCounter++;
		return this.htmlSlide;
	}
	this.getSlideShow = function () {
		this.htmlSlideShow = '<div class="w3-content w3-display-container">'
		this.htmlSlideShow = '<div class="w3-content w3-display-container w3-padding-large" style=\"margin-left: 10%; width: 80% ; margin-right: 10%;\">'
		this.htmlSlideShow = '<div class="w3-content w3-display-container w3-padding-large" >'
		if (this.slideCounter === 1) {
			this.htmlSlideShow += this.htmlbtnLeftNone;
			this.htmlSlideShow += this.htmlbtnRightNone;
		} else {
			this.htmlSlideShow += this.htmlbtnLeft;
			this.htmlSlideShow += this.htmlbtnRight;

		}
		this.htmlSlideShow += this.slides;
		this.htmlSlideShow += "</div>"
		return this.htmlSlideShow;

	}

	this.getId = function () {
		//console.log("INF: ID (" + this.id + ")")
		return this.id;
	}
	this.setTag = function (tag) {
		this.nextPrevTag = tag;
		this.htmlbtnLeft = "<button  id=\"leftBtn" + this.id + "\" class=\"w3-button  w3-display-topleft\" >Previous " + this.nextPrevTag + " &#10094;</button>"
		this.htmlbtnLeftNone = "<button  id=\"leftBtn" + this.id + "\" class=\"w3-disabled w3-button  w3-display-topleft\" >Previous " + this.nextPrevTag + " &#10094;</button>"
		this.htmlbtnRight = "<button id=\"rightBtn" + this.id + "\" class=\"w3-button  w3-display-topright\">&#10095; Next " + this.nextPrevTag + "</button>"
		this.htmlbtnRightNone = "<button  id=\"rightBtn" + this.id + "\" class=\"w3-disabled w3-button  w3-display-topright\">&#10095; Next " + this.nextPrevTag + "</button>"

	}

	var slideIndex = 1;
	this.plusDivs = function (n) {
		this.showDivs(slideIndex += n);
	}
	this.showDivs = function (n) {
		var i;
		var x = document.getElementsByClassName(this.className);
		if (n > x.length) {
			slideIndex = 1
		}
		if (n < 1) {
			slideIndex = x.length
		}
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";
		}
		x[slideIndex - 1].style.display = "block";
	}
}

//var mySlideShow = new slideShow("mySlides")
//
//var slideIndex = 1;
//mySlideShow.showDivs(slideIndex)
//mySlideShow.plusDivs()
//mySlideShow.addSlide('<img src="enterprise.svg" style="width:100%">')
//mySlideShow.addSlide('<img src="individual.svg" style="width:100%">')
//mySlideShow.addSlide('<img src="space.svg" style="width:100%">')
//mySlideShow.getSlideShow()

