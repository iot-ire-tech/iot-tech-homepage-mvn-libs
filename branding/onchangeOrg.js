/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




// Categories
$(document).on("change", '.gender', function () {
	modelContext.target = $(this).val();
});
$(document).on("change", '.age', function () {
	modelContext.target = $(this).val();
});


// Common
$(document).on("change", '.tagLine', function () {
	modelContext.name = $(this).val();
});
$(document).on("change", '.title', function () {
	modelContext.branding.title = $(this).val();
});
$(document).on("change", '.publishDate', function () {
	modelContext.timings.publishDate = new Date($(this).val()).toISOString();
	modelContext.timings.expiryDate = new Date($(this).val()).toISOString();
});


// Site Branding
$(document).on("change", "input[name='brandingFavIcon']", function () {
	modelContext.branding.favIcon.name = uploadUx("frmBrandingFavIcon", clientId, modelContext.pk.id, "icon", "image", "#brandingFavIcon", bs).filename
	modelContext.branding.favIcon.tag = modelContext.id
});
$(document).on("change", "input[name='brandingHdrImg']", function () {
	modelContext.branding.hdr.name = uploadUx("frmBrandingHdrImg", clientId, modelContext.pk.id, "hdr1", "image", "#brandingHdrImg", bs).filename
	modelContext.branding.hdr.tag = modelContext.id
});
$(document).on("change", "input[name='brandingTdrImg']", function () {
	modelContext.branding.tdr.name = uploadUx("frmUploadImgTdr", clientId, modelContext.pk.id, "tdr1", "image", "#brandingTdrImg", bs).filename
	modelContext.branding.tdr.tag = modelContext.id
});


/*
 *   Welecome Branding
 */
$(document).on("change", '.headline', function () {
	modelContext.name = $(this).val();
	modelContext.modal.headline = $(this).val();
});
$(document).on("change", "input[name='welecomeVid']", function () {
	modelContext.modal.vid.name = uploadUx("frmWelecomeVid", clientId, modelContext.pk.id, "welcome", "video", "#welecomeVid", bs).filename
});

$(document).on("change", "input[name='welcomeIcon']", function () {
	modelContext.modal.icon.name = uploadUx("frmWelecomeIcon", clientId, modelContext.pk.id, "icon", "image", "#welcomeIcon", bs).filename
});




/*
 * Branding Offerings.
 */

$(document).on("change", '#enableTargeted', function () {
	offerings.modelBranding.targetAudience = ($(this).val() === "on") ? true : false;
});
$(document).on("change", '#enableMedia', function () {
	offerings.modelBranding.media = ($(this).val() === "on") ? true : false;
});
$(document).on("change", '#enableSocial', function () {
	offerings.modelBranding.social = ($(this).val() === "on") ? true : false;
});
$(document).on("change", '#enableScheduled', function () {
	offerings.modelBranding.publishDate = ($(this).val() === "on") ? true : false;
});


// Ux Addition
$(document).on("change", '#colorPicker', function () {
	modelBranding.font.color = $(this).val();
	$(".ref").attr("class", "ref " + $(this).val());
});
$(document).on("change", '#fontPicker', function () {
	modelBranding.font.family = $(this).val();

	//$(".ref").removeClass("ref");
	//$(".ref").addClass("ref");
	$(".ref").css("font-family", $(this).val());
});
$(document).on("change", '#textPicker', function () {
	modelBranding.headline = $(this).val();

	$(".ref").text($(this).val());
});


//# sourceURL=services_module_branding_onchange.js