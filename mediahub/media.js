/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var base;

function fullScreenIt(id) {

    var elem = document.getElementById(id);

    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

}

function filterFilename(filename) {
    var tmp = "";
    //console.log("INF:" + filename)
    if (filename !== "") {
        tmp = filename.split("\\")[2];
        //console.log("INF: x" + tmp)
//		tmp = tmp.split(".")[0];
//		//console.log("INF: x" + tmp)
    }
    return tmp;
}


function updateMedia(name, client, resourceName, progressRef) {
    var filename;
    filename = tmp.split("\\")[2];
    $("#" + name).attr("src", contextPath + "/media/client/" + client + "_" + resourceName + "_" + filename);
    // http://localhost:8084/prototype_maven/media/sportsco-logo.png
//	$("#"+name).attr("src", "http://localhost:8084/prototype_maven/media/client/"+client +"_" + resourceName+"_"+filename);
}


function uploadUx(formId, clientId, targetId, tag, type, htmlId) {
    url = location.origin + contextPath + "/UploadFileImages" + "?id=" + clientId + "_" + targetId + "&item=" + tag + "&mediaType=" + type;
    var formData = new FormData(document.getElementById(formId))
    response = uploadFile(url, formData)

    return response;
}


function uploadUx2(formId, clientId, targetId, tag, type, htmlId) {
    var intervalId;
    var img1 = ""
// Upload Server
//	http://localhost:8084/UploadFileImages?id=acct_1GRdJxF6KR5nnzB2_acct_1GRdJxF6KR5nnzB2&item=photoId&mediaType=image
    url = location.origin + contextPath + "/UploadFileImages" + "?id=" + clientId + "_" + targetId + "&item=" + tag + "&mediaType=" + type;
    var formData = new FormData(document.getElementById(formId))
    response = uploadFile(url, formData)

    intervalId = setTimeout(function () {
        clearTimeout(intervalId)
// <img id="currentPhoto" src="SomeImage.jpg" onerror="this.onerror=null; this.src='Default.jpg'" alt="" width="100" height="120">
// https://stackoverflow.com/questions/29814721/access-files-outside-the-webcontent-folder
        if (response.filename !== undefined) {
//             var filename = ""
//             try {
//                 filename = response.filename.toString().split("/") [3].toString()
//             } catch (e) {
//                 filename = response.filename + "." + response.ext
//             }
//
//             if (type === "image" && tag !== "org") {
//                 $(htmlId).attr("alt", "Media Uploaded (" + filename + ")");
//                 img1 = location.origin + contextPath + "/resources/media/clients/acct/image/" + tag + "/" + filename
//                 $(htmlId).attr("src", img1);
//                 $(htmlId).attr("width", "200px");
//                 $(htmlId).attr("height", "200px");
//             } else if (type === "image" && tag === "org") {
//                 $(htmlId).attr("alt", "Media Uploaded (" + filename + ")");
//                 img1 = location.origin + contextPath + "/resources/media/clients/acct/image/" + tag + "/" + filename
// //				img1.replace("_cantResizeVid", "")
//                 $(htmlId).attr("src", img1);
//                 $(htmlId).attr("width", "200px");
//                 $(htmlId).attr("height", "200px");
//             } else {
// //				var img1 = location.origin + contextPath + "/resources/media/clients/acct/video/photoId/" + filename
//                 // Play now
//             }
            response.absolutefilename = img1
            return response.filename + "." + response.ext;
        } else {
            alert("Problem Uploading media, contact support asap!");
            return null;
        }
    }, 5000);
}

function uploadFile(url, formData) {

    var myResponseData;
    //console.log("INF: URL (" + url + ")")

    var request = $.ajax({
        // Your server script to process the upload
        url: url,
        type: 'post',
        async: false,
        // Form data
        // data: new FormData($('form')[0]),
        data: formData,
        // Tell jQuery not to process data or worry about content-type
        // You *must* include these options!
        cache: false,
        contentType: false,
        processData: false,
        // Custom XMLHttpRequest
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                // For handling the progress of the upload
                myXhr.upload.addEventListener('imgHdrProgress', function (e) {
                    //console.log("INF: total " + e.total)
                    sleep(1000)
                    if (e.lengthComputable) {
                        //console.log("INF: total " + e.total)
                        $("#imgHdrProgress").attr({
                            value: e.loaded,
                            max: e.total
                        });
                    }
                }, false);
            }
            return myXhr;
        }

    });
//	http://api.jquery.com/jquery.ajax/
    request.done(function (responseData, textStatus, jqXHR) {
        //	$("#log").html(msg);
        myResponseData = responseData;
        //console.log("INF: responseData " + myResponseData);
        //console.log("INF: textStatus " + textStatus);
        //console.log("INF: jqXHR " + jqXHR);
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
        //console.log("INF: responseText " + jqXHR.responseText);
        //console.log("INF: textStatus " + textStatus);
        //console.log("INF: errorThrown " + errorThrown);
    });
    if (myResponseData === undefined) {
        alert("ERR: Uploading to server interrupted")
        //console.log("ERR: Uploading to server interrupted")
    }
    return myResponseData;
}

//  downloadPic(clientId, "resourceName", $('#resource_name').val());
function downloadPic(client, resourceName, url) {

    if (url === undefined)
        url = location.origin + contextPath + "/UploadServlet?client=" + client + "&resourceName=" + resourceName;
    $.ajax({
        // Your server script to process the upload
        url: url,
        type: 'get',
        // Tell jQuery not to process data or worry about content-type
        // You *must* include these options!
        cache: false,
        contentType: false,
        processData: false,
        // Custom XMLHttpRequest
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                // For handling the progress of the upload
                myXhr.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) {
                        $('progress').attr({
                            value: e.loaded,
                            max: e.total,
                        });
                    }
                }, false);
            }
            return myXhr;
        }
    });
}

//# sourceURL=mediahub_media.js