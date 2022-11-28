/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("change", "#hdr", function () {

//	var empty = false;
//	$('form#hdr  .w3-input').each(function () {
//		if ($(this).val() == '') {
//			empty = true;
////			$(this).css("border-width", "5px");
////			$(this).css("border-bottom-color", "red");
////			$(this).css("border-bottom-style", "dotted");
//		} else {
////			$(this).css("background-color", "white");
////			$(this).css("border-width", "1px");
////			$(this).css("border-bottom-color", "gray");
////			$(this).css("border-bottom-style", "solid");
//		}
//	});
//
//	if (empty) {
//		$('#saveRegistration').attr('disabled', true);
//	} else {
//		$('#saveRegistration').removeAttr('disabled');
//	}
});


function validateMe(that) {
    var isValid = that[0].checkValidity();
    if (isValid) {
        $("#saveRegistration").attr("disabled", false);
        that.css("background-color", "white");
        that.css("border-width", "1px");
        that.css("border-bottom-color", "gray");
        that.css("border-bottom-style", "solid");
    } else {
        $("#saveRegistration").attr("disabled", true);
        that.css("border-width", "5px");
        that.css("border-bottom-color", "red");
        that.css("border-bottom-style", "dotted");
    }

}

// Biz Profile
var businessName = false
$(document).on("change", "#businessName", function () {
    businessName = true
    modelContext.businessProfile.name = $(this).val();
    validateMe($(this))
});

var mcc = false
$(document).on("blur change", "#mcc", function () {
    mcc = true
    modelContext.businessProfile.mcc = $(this).val();
    validateMe($(this))
});

var description = false
$(document).on("change", "#description", function () {
    description = true
    modelContext.businessProfile.productDescription = $(this).val();
//	validateMe($(this))
});
var supportUrl = false
$(document).on("change", "#supportUrl", function () {
    supportUrl = true
    modelContext.businessProfile.supportUrl = $(this).val();
    validateMe($(this))
});
var supportUrl = false
$(document).on("change", "#url", function () {
    supportUrl = true
    modelContext.businessProfile.url = $(this).val();
    validateMe($(this))
});
var supportPhone = false
$(document).on("change", "#supportPhone", function () {
    supportPhone = true
    modelContext.businessProfile.supportPhone = $(this).val();
    validateMe($(this))
});

// Addres


// Legal Doc
var idNumber = false
$(document).on("change", "#idNumber", function () {
    idNumber = true
    modelContext.individual.idNumber = $(this).val();
    validateMe($(this))
});



// $(document).on("change", "#input[name=back_2]", function () {
// 	back_2 = true
// 	var tmp = uploadUx("frmBrandingFavIcon", accountId, accountId, "default", "image", "#brandingFavIconImg")
// 	$("#brandingFavIconImg").attr("width", "100px").attr("height", "100px").attr("border", "1").attr('src', mediapath + tmp.filename + "." + tmp.ext)
// 	nsMultimediaService.modelItem.tab.title = "Favicon"
// 	nsMultimediaService.modelItem.media.tag = "icon"
// 	nsMultimediaService.modelItem.media.type = "icon"
// 	nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext
//
// 	nsBrandingService.modelItem.media.favIcon.name = nsMultimediaService.modelItem.media.link
// });


// Legal Entity
var gender = false
$(document).on(" change", "#gender", function () {
    gender = true
    modelContext.individual.gender = $(this).val();
    validateMe($(this))
});
var fname = false
$(document).on(" change", "#fname", function () {
    fname = true
    modelContext.individual.firstName = $(this).val();
    validateMe($(this))
});
var lname = false
$(document).on(" change", "#lname", function () {
    lname = true
    modelContext.individual.lastName = $(this).val();
    validateMe($(this))
});
var email = false
$(document).on(" change", "#email", function () {
    email = true
    modelContext.individual.email = $(this).val();
    validateMe($(this))
});
var phone = false
$(document).on(" change", "#phone", function () {
    phone = true
    var tmp;
    tmp = $(this).val().charAt(0);
    if (tmp === "0")
        tmp = $(this).val().substring(1);
    else
        tmp = $(this).val();

    modelContext.individual.phone = "+353" + tmp;
    validateMe($(this))
});

var dobyear = false
$(document).on(" change", "#dobyear", function () {
    dobyear = true
    modelContext.individual.dob.year = $(this).val();
    validateMe($(this))
});
var dobmonth = false
$(document).on(" change", "#dobmonth", function () {
    dobmonth = true
    modelContext.individual.dob.month = $(this).val();
    validateMe($(this))
});
var dobday = false
$(document).on(" change", "#dobday", function () {
    dobday = true
    modelContext.individual.dob.day = $(this).val();
    validateMe($(this))
});

// Legal Address
var addressLine1 = false
$(document).on(" change", "#addressLine1", function () {
    addressLine1 = true
    modelContext.individual.address.addressLine1 = $(this).val();
    validateMe($(this))
});
var addressLine2 = false
$(document).on(" change", "#addressLine2", function () {
    addressLine2 = true
    modelContext.individual.address.addressLine2 = $(this).val();
    validateMe($(this))
});
var town = false
$(document).on(" change", "#town", function () {
    town = true
    modelContext.individual.address.town = $(this).val();
    validateMe($(this))
});
var city = false
$(document).on(" change", "#city", function () {
    city = true
    modelContext.individual.address.city = $(this).val();
    validateMe($(this))
});
var postalCode = false
$(document).on(" change", "#postalCode", function () {
    postalCode = true
    modelContext.individual.address.postalCode = $(this).val();
    validateMe($(this))
});
var country = false
$(document).on("blur change", "#country", function () {
    country = true
    modelContext.individual.address.country = $(this).val();
    validateMe($(this))
});
var state = false
$(document).on(" change", "#state", function () {
    state = true
    modelContext.individual.address.state = $(this).val();
    validateMe($(this))
});


// Toc
var agree = false
$(document).on(" change", "#agree", function () {
    agree = true
    modelContext.agree = $(this).val();
});

//# sourceURL=onboarding_legal_indi_change.js