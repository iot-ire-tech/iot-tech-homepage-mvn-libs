/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


serverSide:{
    // productId=prod_HIqrrSdRkT5srg&assetId=prod_HhQYITA1r08U2j&customerId=cus_GzcZjg8K4BliTA

    tabHeader:{
        user:{
            $(document).on("change", '#user', function () {
                nsMessagingService.target = "users";

                $("#saveUsers").attr("disabled", false)
            });

            $(document).on("change", '.messagingUsers', function () {
                nsMessagingService.modelItem.entityIds = []
                $(this).val().forEach(function (item) {
                    nsMessagingService.modelItem.entityIds.push(item)
                })
            })
        }

        $(document).on("change", '#public', function () {
            nsMessagingService.target = "public";
            nsMessagingService.entityId = "public"
            $("#savePublic").attr("disabled", false)
        });

        $(document).on("change", '#entity', function () {
            nsMessagingService.target = "entities";
            $("#saveEntities").attr("disabled", false)
        });
    }

    $(document).on("click", "#saveUsers, #XsaveEntitiesX, #savePublic", function () {

        // Existing messaging on this entity
        nsMessagingService.accountId = accountId
        // target set
        nsMessagingService.getByTarget();

        $("#msgConfirmation").html("")
        if (nsMessagingService.obj === undefined) {
            nsMessagingService.create()
            $("#msgConfirmation").html("Congratulations, your new messaging had been added to your account: (" + nsMessagingService.dbId + ")")
        } else {
            nsMessagingService.obj.uploads.push(getTs())
            nsMessagingService.obj.items.push(nsMessagingService.modelItem)
            nsMessagingService.update()
            $("#msgConfirmation").html("Congratulations, your new messaging had been added to your account: (" + nsMessagingService.dbId + ")")
        }

// Clean up
        $("#headline").val("")
        $("#content").val("")
        $("#msgError").val("")
        $("#msgError").html("")

        $(this).attr("disabled", true)

    });


    $(document).on("change", '#importance', function () {
        nsMessagingService.modelItem.message.importance = $(this).val();
    });
    $(document).on("change", '#expiryDate', function () {
        // $(this) . value as date , value as number!
        // HH mm ss is converted to 00:00:00
        nsMessagingService.modelItem.timings.endDateTime = new Date($(this).val()).toISOString();
    });
    $(document).on("change", '#publishDate', function () {
        nsMessagingService.modelItem.timings.startDateTime = new Date($(this).val()).toISOString();
    });
    $(document).on("change", '#scope', function () {
        nsMessagingService.modelItem.message.scope = []
        nsMessagingService.modelItem.message.scope = $(this).val();
    });
    $(document).on("change", '#headline', function () {
        nsMessagingService.modelItem.message.headline = $(this).val();
    });
    $(document).on("change", '#content', function () {
        nsMessagingService.modelItem.message.content = $(this).val();
    });


}
clientSide:{

    // Entity Msg Book
    $(document).on("click", '#btnCloseMsg', function () {
        if ($(this).attr("target") === "users") {
            // nsMessagingService.get().delete()
            $("#dialogMsgUser").dialog("close");
        }

        if ($(this).attr("target") === "public") {
            $("#dialogMsg").dialog("close");
        }
        // get value, then close...
    });

}


//# sourceURL=api_messaging_events.js

