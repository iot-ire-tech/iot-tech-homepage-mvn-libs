/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


frontEnd:{

    $(document).on('click', '#1', function () {
        nsCovidService.modelItem.q1 = $(this).val()
    })

    $(document).on('click', '#datetime', function () {
        nsCovidService.modelItem.datetime = $(this).val()
    })

    $(document).on('click', '#agree', function () {
        nsCovidService.modelItem.agree = $(this).val()
    })


    $(document).on('click', '#saveCovid', function () {

        nsCovidService.mydb = "covid"
        nsCovidService.service();
        $(this).attr("disabled", true)

    })

}
backEnd:{
    $(document).on('click', '.smsMe', function () {
        if (this.checked)
            nsCovidService.modelItemBackend.smsMe = true
        else
            nsCovidService.modelItemBackend.smsMe = false
    })

    $(document).on('click', '.mailMe', function () {
        if (this.checked)
            nsCovidService.modelItemBackend.emailMe = true
        else
            nsCovidService.modelItemBackend.emailMe = false
    })

    $(document).on('click', '.saveCovidAdmin', function () {

        modelPoc.accountId = accountId
        nsPoCService.crudDbOps.mydb = "pocmgt";
        nsPoCService.crudDbOps.payload = modelPoc;
        nsPoCService.crudDbOps.create()

        nsCovidService.accountId = accountId;
        nsCovidService.modelItem = {
            "pocdbId": nsPoCService.crudDbOps.obj._id,
            "emailMe": nsCovidService.modelItemBackend.emailMe,
            "smsMe": nsCovidService.modelItemBackend.smsMe
        }
        nsCovidService.mydb = "covidadmin"
        nsCovidService.service();
        $(this).attr("disabled", true)
    })
}

//# sourceURL=api_covid_events.js


