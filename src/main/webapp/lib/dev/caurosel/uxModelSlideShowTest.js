/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var slideShowTest = function (id, className) {
	this.className = className;
	this.id = id;
// Static
	htmlHdr = '<div class="w3-content w3-display-container">'
	htmlbtnLeft = "<button  id=leftBtn" + this.id + " class=\"w3-button w3-black w3-display-left\" >&#10094;</button>"

	htmlbtnRight = "<button id=rightBtn" + this.id + " class=\"w3-button w3-black w3-display-right\" >&#10095;</button>"

	this.slides = [];
	this.htmlSlide = "";
	this.htmlSlideShow = "";
	this.addSlide = function (slide) {
		htmlSlide = "<div class=\"w3-content w3-display-container " + this.className + "\" style=\"display:none;\">"
		htmlSlide += slide
		htmlSlide += "</div>"
		this.slides.push(htmlSlide)
		return this.htmlSlide;
	}
	this.getSlideShow = function () {
		this.htmlSlideShow = '<div class="w3-content w3-display-container">'
		this.htmlSlideShow += this.slides;
		this.htmlSlideShow += htmlbtnLeft;
		this.htmlSlideShow += htmlbtnRight;
		this.htmlSlideShow += "</div>"
		return this.htmlSlideShow;

	}
	this.getId = function () {
		return this.id;
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

