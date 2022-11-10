

$(document).ready(function () {
$("#mgtSeatingGrades").on("click" , function(){

    $.get("test-service.js", function (response) {
        rt = eval (response.toString())
    })

})
})

//# sourceURL=api_seating_test_enduser.js
