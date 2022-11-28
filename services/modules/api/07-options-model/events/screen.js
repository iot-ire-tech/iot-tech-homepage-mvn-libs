/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


frontEnd:{


    $(document).on("change", "#fname", function () {
        nsContactUsService.modelCreate.fname = $(this).val()
    })
    $(document).on("change", "#lname", function () {
        nsContactUsService.modelCreate.lname = $(this).val()
    })
    $(document).on("change", "#email", function () {
        nsContactUsService.modelCreate.email = $(this).val()
    })
    $(document).on("change", "#priority", function () {
        nsContactUsService.modelCreate.priority = $(this).val()
    })
    $(document).on("change", "#phone", function () {
        nsContactUsService.modelCreate.phone = $(this).val()
    })
    $(document).on("change", "#url", function () {
        nsContactUsService.modelCreate.url = $(this).val()
    })
    $(document).on('change', '#comms', function () {

        if ($(this).val() === "phone")
            nsContactUsService.modelCreate.comms.phone = true
        else
            nsContactUsService.modelCreate.comms.phone = false

        if ($(this).val() === "email")
            nsContactUsService.modelCreate.comms.email = true
        else
            nsContactUsService.modelCreate.comms.email = false

        if ($(this).val() === "either") {
            nsContactUsService.modelCreate.comms.phone = true
            nsContactUsService.modelCreate.comms.email = true
        } else {
            nsContactUsService.modelCreate.comms.phone = false
            nsContactUsService.modelCreate.comms.email = false
        }

    })
    $(document).on("change", "#query", function () {
        nsContactUsService.modelCreate.query = $(this).val()
    })

    $(document).on("change", "#purpose", function () {
        nsContactUsService.modelCreate.purpose = $(this).val()
    })


    $(document).on('click', '.saveContactUs', function () {
        // nsCovidService.mydb = "covid"
        nsContactUsService.create();

        $("#msgContactUs").html("Thank you, " + +" for your interest, we will contact you as soon as possible").delay(5000).fadeOut("slow")
        // $(this).attr("disabled", true)

    })

}
backEnd:{

}

//# sourceURL=api_contactus_events.js


