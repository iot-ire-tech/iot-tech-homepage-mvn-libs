/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var convo = "";
$(document).ready(function () {

	var Obj = {
		hdr: "Its good to talk!!!!",
		check: "Weekly NewsLetter",
		id: 1,
		tdr: ""
	}
	$("#testHook").html(chatIt(Obj));


	$("#chat1").on("click", function () {
		id = $(this).attr("id");
		tmp = id.split("_")[1];

		$("input").before(addChat({cnt: convo}));

		$(".input").val("");
	});
	$(".input").on("blur change", function () {
		convo = $(this).val()

	});
});

var counter = 0;
function addChat(Obj) {

	var html = "";
	if (counter % 2)
		html = "<div class=\"w3-container w3-grey w3-padding-8\" >";
	else
		html = "<div class=\"w3-container w3-light-grey w3-padding-8\" >";

	html += "<p>" + Obj.cnt + "</p>";
	html += "</div>";
	counter++;
	return html;
}

function body(Obj) {

	var html = "";
	html = "<div class=\"w3-container \" style=\"overflow-y:auto; height:300px\">";
	html += "<input type=text class=\"input w3-input\" ></input>";
	html += "</div>";
	return html;
}

function header(Obj) {
	var html = "";
	html += "<div class=\"w3-container w3-light-grey \">";
	html += "<p>" + Obj.hdr + "</p>";
	html += "</div>";
	return html;
}



function trailer(Obj) {
	var html = "";
	html += "<div class=\"w3-container w3-light-grey w3-padding-16\">";
	html += "<button id=\"chat" + Obj.id + "\" class=\"chat w3-button w3-right w3-" + btnColor + "\">Send</button>";
	html += "</div>";
	return html;
}

function chatIt(Obj) {
	var html;

	html = header(Obj);
	html += body(Obj);
	html += trailer(Obj);

	return html;
}