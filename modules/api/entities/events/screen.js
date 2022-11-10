/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// No items for entity

workflow:{

    $(document).on("click ", ".deleteEntity", function () {
        nsEntitiesService.productId = nsSubsService.productId
        nsEntitiesService.deleteLinks()

        nsEntitiesService.modelCreate.mode = "membership"
        nsEntitiesService.modelCreate.offering = "membership"
        masterList = assetProfolioForDirectProvisionAndAllocation(assetProviderAccountId)
        $("#existingSubs").html(getEntityTypeX(nsEntitiesService.modelCreate.offering));
        nsSubsService.refreshListing()

    });

}


form:{


    $(document).on("change ", ".name", function () {
        nsEntitiesService.modelCreate.name = $(this).val()
    });
    $(document).on("change ", ".description", function () {
        nsEntitiesService.modelCreate.description = $(this).val()
    });
    $(document).on("change  ", ".type", function () {
        nsEntitiesService.modelCreate.type = $(this).val();
    });
    $(document).on("change ", ".category", function () {
        nsEntitiesService.modelCreate.category = $(this).val();
    });
    $(document).on("change  ", ".tag", function () {
        nsEntitiesService.modelCreate.tag = $(this).val();
    });

}

//# sourceURL=api_entities_events.js