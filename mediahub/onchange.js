/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





// ux : Rich Content
$(document).on("change", "#tagLine", function () {
	modelContent.name = $(this).val()
	workFlowMonitor(workflowProgression.wfChkC3 = true);
});
$(document).on("change", "input[name=iconName]", function () {
	modelContent.visual.icon.name = uploadUx(
		"frmIcon",
		clientId, triageId,
		"photoId",
		"image",
		"#iconImg"
		, bs).filename
	modelContent.visual.icon.tag = modelContent.pk.type
	modelContent.visual.icon.tag = triageId;
});
$(document).on("change", "input[name=picName]", function () {
	modelContent.visual.pic.name = uploadUx(
		"frmPic",
		clientId, triageId,
		"photoId",
		"image",
		"#picImg"// UX Id to be updated by timer!
		, bs).filename
	modelContent.visual.pic.tag = modelContent.pk.type
	modelContent.visual.pic.tag = triageId;
});
$(document).on("change", "input[name=vidName]", function () {
	modelContent.visual.vid.name = uploadUx(
		"frmVid",
		clientId, triageId,
		"na",
		"video",
		"#vid"// UX Id to be updated by timer!
		, bs).filename
	modelContent.visual.vid.tag = triageId;
});
// UX - Social

$(document).on("change", "#tagSocialMedia", function () {
	modelContent.name = $(this).val()
});
$(document).on("change", 'utubeVisible', function () {
	modelContent.social.youtube.slideshow = $(this).val();
});
$(document).on("change", '#utube', function () {
	modelContent.social.youtube.name = $(this).val()
	$("#utubeTarget").attr("src", $(this).val());
});
$(document).on("change", 'facebookVisible', function () {
	modelContent.social.facebook.slideshow = $(this).val();
});
$(document).on("change", '#facebook', function () {
	modelContent.social.facebook.name = $(this).val()
	$("#facebookTarget").attr("src", $(this).val());
});

//# sourceURL=mediahub_onchange.js