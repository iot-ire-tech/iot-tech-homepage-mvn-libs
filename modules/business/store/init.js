/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var htmlBanner;

function initStore() {

    checkOnMessages()

    htmlBanner = '<div class="w3-container w3-text w3-center w3-border-red">'
    htmlBanner += '<br>'
    htmlBanner += '<h2> Shopping Zone</h2>'
    htmlBanner += "<span><i> brought to you by... </i></span>"
    htmlBanner += "<h5><i id=platformName> </i></h5>"
    htmlBanner += '<br>'
    htmlBanner += '</div>'

    htmlBanner = '<div class="w3-padding-large">'
    htmlBanner += "<h3 class=\"ui header\">"
    htmlBanner += "<div class=\"w3-tag w3-dark-gray\">Shopping Zone</div>"
    htmlBanner += '<br>'
    htmlBanner += "<span>Brought to you by <i id=platformName> </i>!!!</span>"
    htmlBanner += "</h3>"
    htmlBanner += '</div>'
    htmlBanner += '</div>'

    htmlBanner = '<div class="w3-container w3-text w3-center w3-border-red">'
    htmlBanner += '<br>'
    htmlBanner += '<h2>Shopping Zone</h2>'
    htmlBanner += "<span><i>brought to you by... </i></span>"
    htmlBanner += "<h5><i id=platformName> </i></h5>"
    htmlBanner += '<br>'
    htmlBanner += '</div>'
    return htmlBanner
}


//# sourceURL=stripe_store_init.js


