/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var parsedUrl = new URL(window.location.href);
var accountId = parsedUrl.searchParams.get("accountId");

$(document).on("click", '#saveBranding', function () {
    nsBrandingService.accountId = accountId
    nsBrandingService.items.push(nsBrandingService.modelItem)
    nsBrandingService.create()

    $("#msgConfirmation").fadeIn("now").html("<br>New corporate branding uploading (" + nsBrandingService.dbId + ")").delay(5000).fadeOut("slow")

    $(this).attr("disabled", true)

});

$(document).on("change", '.tagLine', function () {
    nsBrandingService.modelItem.tagLine = $(this).val();
});
$(document).on("change", '.title', function () {
    nsBrandingService.modelItem.title = $(this).val();
});
$(document).on("change", '.publishDate', function () {
    nsBrandingService.modelItem.timings.startDateTime = new Date($(this).val()).toISOString();
    nsBrandingService.modelItem.timings.endDateTime = new Date($(this).val()).toISOString();
});


// Ux Addition
$(document).on("change", '#colorPicker', function () {
    modelBranding.font.color = $(this).val();
    $(".ref").attr("class", "ref " + $(this).val());
});
$(document).on("change", '#fontPicker', function () {
    modelBranding.font.family = $(this).val();
    $(".ref").css("font-family", $(this).val());
});
$(document).on("change", '#textPicker', function () {
    $(".ref").text($(this).val());
});

//# sourceURL=api_branding_events.js


