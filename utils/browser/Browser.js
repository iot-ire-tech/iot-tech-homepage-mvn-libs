/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvas;
var context;
var video;

// Autofocus, is important with scanner, so such a device much have. Close up objects will appear blurred, henceing scanning will be error prone.
function clipboardCopy(el) {
    var copyText = $(el)[0]

    copyText.select();
    copyText.setSelectionRange(0, 99999) // mobile!
    // alert("Copied the text: " + copyText.value);
    $(el + "Msg").fadeIn("now").html("your HTML is copied to clipboard!").delay(5000).fadeOut("slow")
    return document.execCommand("copy", true);
}

function loadCamera() {

// Grab elements, create settings, etc.
    video = document.getElementById('video');

// Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });

        navigator.ondevicechange = function (event) {
//			updateDeviceList();
            alert("Device Changed")
        }
    }
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

}

function redirectMe(alocation, delay, where) {
    // similar behavior as an HTTP redirect
    //window.location.replace("userPortal.jsp");
    // similar behavior as clicking on a link
    //window.location.href = "/";
    if (delay === undefined) {
        window.setTimeout(function () {
            //window.location.reload(alocation);
//			window.location = alocation;
            window.open(alocation, "_blank").focus();
        }, 1000);
    } else {
        window.setTimeout(function () {
            //window.location.reload(alocation);
//			window.location = alocation;
            window.open(alocation, where).focus();
        }, delay);
    }
}

function redirectMe2({alocation = "", delay = 1000, where = "_blank"} = {}) {
    // similar behavior as an HTTP redirect
    //window.location.replace("userPortal.jsp");
    // similar behavior as clicking on a link
    //window.location.href = "/";
    var win;
    var to;
    if (delay === undefined) {
        var to = window.setTimeout(function () {
            clearTimeout(to)
            //window.location.reload(alocation);
//			window.location = alocation;
            win = window.open(alocation, where, height = 300);
        }, 500);
    } else {
        var to = window.setTimeout(function () {
            clearTimeout(to)
            //window.location.reload(alocation);
//			window.location = alocation;
            win = window.open(alocation, where);
        }, delay);
    }
    return win;
}

function browserBookmarkMe() {
// https://stackoverflow.com/questions/3024745/cross-browser-bookmark-add-to-favorites-javascript

    if (window.sidebar) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(location.href, document.title, "");
    } else if (chrome) { // IE Favorite
        alert("INF: Bookmark this ULR for reference, press keys CTRL+D");
//		chrome.bookmarks.create({'parentId': extensionsFolderId, 'title': 'Extensions doc', 'url': 'http://code.google.com/chrome/extensions'});
    } else if (window.external) { // IE Favorite
        window.external.AddFavorite(location.href, document.title);
    } else if (window.opera && window.print) { // Opera Hotlist
        this.title = document.title;
        return true;
    }

}

function browserBookmark(title, url) {

    if (document.all) { // ie
        window.external.AddFavorite(url, title);
    } else if (window.sidebar) { // firefox
        window.sidebar.addPanel(title, url, "");
    } else if (window.opera && window.print) { // opera
        var elem = document.createElement('a');
        elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click(); // this.title=document.title;
    }
}

var localStorageUtil = function (Key, Obj) {
    this.key = Key;
    this.obj = Obj;
    this.payload;

    this.setIt = function () {
        //console.log('payloadIn: ', JSON.stringify(this.obj));
        localStorage.setItem(this.key, JSON.stringify(this.obj));
        return this;
    };

    this.getPayload = function (key) {
        //console.log('payloadOut: ', JSON.parse(localStorage.getItem(key)));
        this.payload = JSON.parse(localStorage.getItem(key));

        return this.payload;
    };
    this.removeIt = function (key) {
        localStorage.removeItem(this.key);
    };

    return this;
};


