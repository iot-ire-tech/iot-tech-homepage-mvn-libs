/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


frontEnd:{
    $(document).on("change", "#xxx", function () {
        nsPrimaryAccountMembersService.modelCreate.fname = $(this).val()
    })
}
backEnd:{

}

//# sourceURL=api_primary_account_members_events.js


