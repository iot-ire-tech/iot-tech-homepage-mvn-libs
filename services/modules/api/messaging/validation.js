/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function validate() {

    $("#msgConfirmation").html("")
    $("#msgError").html("")

    if (addRecipientsPublic === false && addRecipientsUser === false) {
        alert("INF: Cannot commit message unless you select a user(s) ")

    }
    try {
        if (modelUxItem.comms.list.length === 0) {
            $("#msgError").html("ERR: Your distribution list is empty, please select public, or individual users to send communications too")
        }
        if (modelUxItem.timings.publishDate === "" || modelUxItem.timings.expiryDate === "") {
            $("#msgError").html("ERR: You need to mention the publish, and expiry dates for which messages are valid")
        }
        if (modelUxItem.message.importance === "" || modelUxItem.message.scope === "" || modelUxItem.message.headline === "" || modelUxItem.message.content === "") {
            $("#msgError").html("ERR: Message needs to have all input fields filled-in, #importance, scope, headline, and content")
        }

    } catch (errMsg) {
        $("#msgError").html("Apologies, messaging plan, has not been enabled<br>Please contact support asap")
    }


}


//# sourceURL=api_messaging_validations.js