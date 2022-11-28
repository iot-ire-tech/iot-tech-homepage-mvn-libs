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
//		$('#save').attr('disabled', true);
//	} else {
//		$('#save').removeAttr('disabled');
//	}
});


function validateMe(that) {
    var isValid = that[0].checkValidity();
    if (isValid) {
        $("#save").attr("disabled", false);
    } else {
        $("#save").attr("disabled", true);
    }

}

// Company Profile
var businessNameLtd = false
$(document).on(" change", "#businessNameLtd", function () {
    businessNameLtd = true
    // The company’s legal name.
    modelContext.company.name = $(this).val();
//	validateMe($(this))
});
var businessPhoneLtd = false
$(document).on(" change", "#businessPhoneLtd", function () {
    businessPhoneLtd = true
    // The company’s legal name.
    var tmp;
    tmp = $(this).val().charAt(0);
    if (tmp === "0")
        tmp = $(this).val().substring(1);
    else
        tmp = $(this).val();

    modelContext.company.phone = "+353" + tmp;

//	validateMe($(this))
});

// tax
var taxId = false
$(document).on(" change", "#taxId", function () {
    taxId = true
    modelContext.company.taxId = $(this).val();
});
var vatId = false
$(document).on(" change", "#vatId", function () {
    vatId = true
    modelContext.company.vatId = $(this).val();
});

// Legal Address
var address1Ltd = false
$(document).on(" change", "#address1Ltd", function () {
    address1Ltd = true
    modelContext.company.address.addressLine1 = $(this).val();
});
var cityLtd = false
$(document).on(" change", "#cityLtd", function () {
    cityLtd = true
    modelContext.company.address.city = $(this).val();
});
var postalCodeLtd = false
$(document).on(" change", "#postalCodeLtd", function () {
    postalCodeLtd = true
    modelContext.company.address.postalCode = $(this).val();
});
var countryLtd = false
$(document).on(" change", "#countryLtd", function () {
    countryLtd = true
    modelContext.company.address.country = $(this).val();
});
var stateLtd = false
$(document).on(" change", "#stateLtd", function () {
    stateLtd = true
    modelContext.company.address.state = $(this).val();
});





///////////////////////////////////
// Biz Profile
///////////////////////////////////
var businessName = false
$(document).on(" change", "#businessName", function () {
    // The customer-facing business name.
    businessName = true
    modelContext.businessProfile.name = $(this).val();
//	validateMe($(this))
});
var mcc = false
$(document).on(" change", "#mcc", function () {
    mcc = true
    modelContext.businessProfile.mcc = $(this).val();
});


var description = false
$(document).on(" change", "#description", function () {
    description = true
    modelContext.businessProfile.productDescription = $(this).val();
});
var supportNumber = false
$(document).on("change", "#supportPhone", function () {
    supportNumber = true

    var tmp;
    tmp = $(this).val().charAt(0);
    if (tmp === "0")
        tmp = $(this).val().substring(1);
    else
        tmp = $(this).val();

    modelContext.businessProfile.supportPhone = "+353" + tmp;
//	validateMe($(this))
});

var supportUrl = false
$(document).on(" change", "#supportUrl", function () {
    supportUrl = true
    modelContext.businessProfile.supportUrl = $(this).val();
});

var url = false
$(document).on(" change", "#url", function () {
    url = true
    modelContext.businessProfile.url = $(this).val();
});


///////////////////////////////////////////////////
// Directory
///////////////////////////////////////////////////


// Legal Entity
var fname = false
$(document).on(" change", "#fname", function () {
    fname = true
    modelContext.rep.firstName = $(this).val();
});
var lname = false
$(document).on(" change", "#lname", function () {
    lname = true
    modelContext.rep.lastName = $(this).val();
});
var email = false
$(document).on(" change", "#email", function () {
    email = true
    modelContext.rep.email = $(this).val();
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

    modelContext.rep.phone = "+353" + tmp;
});

var dobyear = false
$(document).on(" change", "#dobyear", function () {
    dobyear = true
    modelContext.rep.dob.year = $(this).val();
});
var dobmonth = false
$(document).on(" change", "#dobmonth", function () {
    dobmonth = true
    modelContext.rep.dob.month = $(this).val();
});
var dobday = false
$(document).on(" change", "#dobday", function () {
    dobday = true
    modelContext.rep.dob.day = $(this).val();
});

// Legal Address
var addressLine1 = false
$(document).on(" change", "#addressLine1", function () {
    addressLine1 = true
    modelContext.rep.address.addressLine1 = $(this).val();
});
var addressLine2 = false
$(document).on(" change", "#address2", function () {
    addressLine2 = true
    modelContext.rep.address.addressLine2 = $(this).val();
});
var city = false
$(document).on(" change", "#city", function () {
    city = true
    modelContext.rep.address.city = $(this).val();
});
var postalCode = false
$(document).on(" change", "#postalCode", function () {
    postalCode = true
    modelContext.rep.address.postalCode = $(this).val();
});
var country = false
$(document).on(" change", "#country", function () {
    country = true
    modelContext.rep.address.country = $(this).val();
});
var state = false
$(document).on(" change", "#state", function () {
    state = true
    modelContext.rep.address.state = $(this).val();
});




// Toc
var agree = false
$(document).on(" change", "#agree", function () {
    agree = true
    modelContext.agree = $(this).val();
});

//# sourceURL=onboarding_legal_biz_change.js