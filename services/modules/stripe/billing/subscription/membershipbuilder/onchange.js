/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Plan Change Model

//Usage type: Recurring usage
//Currency: EUR
//Interval: Every 3 months
//Price per unit: €99.00
// Products




//
// media :{
// 	var subscriptionVideoUpload = false
// //	$(document).on("change", "input[name=front_1]", function () {
// 	$(document).on("change", "#subscriptionVideoUpload", function () {
//
// 		subscriptionVideoUpload = true
//
// 		var tmp = uploadUx(
// 			"frmDocFront",
// 			accountId, accountId,
// 			"photoId",
// 			"video",
// 			"#imgDocFront",
// 			"#imgDocFront"
// 			).filename
//
// 		modelContext.subscription.media.vids.push(tmp)
// 		$("#subscriptionVideoUpload").attr("disabled", false)
//
// 		var basePath = location.origin + contextPath + "/resources/media/clients/"
// 		var video = $("video")[0];
// 		var source = $("source").attr('src', basePath + tmp);
// 		video.append(source);
// 		video.load();
// 		video.play();
//
// //	setTimeout(function () {
// //		video.pause();
// //		source.attr('src', 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4');
// //		video.load();
// //		video.play();
// //	}, 3000);
//
//
// 	});
// 	$(document).on("dblclick", "#subscriptionFacebookUpload", function () {
// 		$(this).val("https://www.facebook.com/facebook/videos/10153231379946729/")
// 	});
// 	$(document).on("change", "#subscriptionFacebookUpload", function () {
// //	https://www.facebook.com/facebook/videos/10153231379946729/
// //	var basePath = location.origin + contextPath + "/resources/media/clients/"
//
// 		var src = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=true&width=734&height=502&appId"
// 		src = encodeURI("https://www.facebook.com/plugins/video.php?href=" + $(this).val() + "&show_text=true&width=734&height=502&appId")
// 		$("#subscriptionFacebookUploadOutput").attr('src', src);
//
// 		modelContext.subscription.media.facebook.push(src)
// 	});
//
// 	$(document).on("dblclick", "#subscriptionYouTubeUpload", function () {
// 		$(this).val("https://www.youtube.com/DBXH9jJRaDk")
// 	});
// 	$(document).on("change", "#subscriptionYouTubeUpload", function () {
// 		// https://www.youtube.com/embed/DBXH9jJRaDk
// 		// https://www.youtube.com/DBXH9jJRaDk
// 		// src="https://www.youtube.com/embed/DBXH9jJRaDk?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://mybusinesspal.com"
// 		var fullUrl = $(this).val();
// 		tmp = fullUrl.split("/")[0]
// 		tmp = fullUrl.split("/")[1]
// 		tmp = fullUrl.split("/")[2]
// 		tmp = fullUrl.split("/")[3]
// 		tmp = fullUrl.split("/")[4]
//
// 		src = encodeURI("https://www.youtube.com/embed/" + fullUrl.split("/")[3] + "?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://mybusinesspal.com")
// 		$("#subscriptionYouTubeUploadOutput").attr('src', src);
// 		modelContext.subscription.media.youtube.push(src)
// 	});
//
// 	$(document).on("change", "#subscriptionPicsUpload", function () {
// 		modelContext.subscription.media.pics.push($(this).val());
// 	});
// }


//# sourceURL=stripe_membership_builder_change.js