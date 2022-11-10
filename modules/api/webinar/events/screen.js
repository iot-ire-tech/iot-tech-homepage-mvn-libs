/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click ", ".addWebinarSettings", function () {

    nsWebinarService.items.push(nsWebinarService.modelItem)
    $(this).attr("disabled", true)
    // reset Item
    // nsWebinarService.modelItem
});

$(document).on("change  ", "#host_video", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.host_video = true
    } else {
        nsWebinarService.modelItem.settings.host_video = false
    }
});
$(document).on("change  ", "#hd_video", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.hd_video = true
    } else {
        nsWebinarService.modelItem.settings.hd_video = false
    }
});

$(document).on("change  ", "#panelists_video", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.panelists_video = true
    } else {
        nsWebinarService.modelItem.settings.panelists_video = false
    }
});
$(document).on("change  ", "#practice_session", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.practice_session = true
    } else {
        nsWebinarService.modelItem.settings.practice_session = false
    }
});

$(document).on("change  ", "#approval_type", function () {
    nsWebinarService.modelItem.settings.approval_type = parseInt($(this).val())
});
$(document).on("change  ", "#registration_type", function () {
    nsWebinarService.modelItem.settings.registration_type = parseInt($(this).val())
});
$(document).on("change  ", "#close_registration", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.close_registration = true
    } else {
        nsWebinarService.modelItem.settings.close_registration = false
    }
});
$(document).on("change  ", "#registrants_email_notification", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.registrants_email_notification = true
    } else {
        nsWebinarService.modelItem.settings.registrants_email_notification = false
    }
});

$(document).on("change  ", "#audio", function () {
    nsWebinarService.modelItem.settings.audio = $(this).val()
});
$(document).on("change  ", "#auto_recording", function () {
    nsWebinarService.modelItem.settings.auto_recording = $(this).val()
});

$(document).on("change  ", "#alternative_hosts", function () {
    nsWebinarService.modelItem.settings.alternative_hosts = $(this).val();
});
$(document).on("change  ", "#show_share_button", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.show_share_button = true
    } else {
        nsWebinarService.modelItem.settings.show_share_button = false
    }
});
$(document).on("change  ", "#allow_multiple_devices", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.allow_multiple_devices = true
    } else {
        nsWebinarService.modelItem.settings.allow_multiple_devices = false
    }
});


$(document).on("change  ", "#enforce_login", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.enforce_login = true
    } else {
        nsWebinarService.modelItem.settings.enforce_login = false
    }
});
$(document).on("change  ", "#enforce_login_domains", function () {
    if (this.checked) {
        nsWebinarService.modelItem.settings.enforce_login_domains = true
    } else {
        nsWebinarService.modelItem.settings.enforce_login_domains = false
    }
});


//# sourceURL=api_webinar_events.js
