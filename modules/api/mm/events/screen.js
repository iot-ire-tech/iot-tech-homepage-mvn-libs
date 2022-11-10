/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/////////////////////////////
// Capacity Alerting Planning Management
/////////////////////////////


initUx:{


}
uxModification: {

    var basePath = location.origin + contextPath + "/resources/media/clients/"
    var mediapath = location.origin + contextPath + "/resources/media/clients/acct/image/default/"
    var tmp = ""
    /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    $(document).on("change", ".mmHdr", function () {
        nsMultimediaService.modelItem.tab.title = ""
        nsMultimediaService.modelItem.tab.header = $(this).val()
    });
    $(document).on("change", ".mmDesc", function () {
        nsMultimediaService.modelItem.tab.desc = $(this).val()
    });
    var mmCounter = 0;
    $(document).on("click", ".addMmItem", addMmItem)

    function addMmItem() {
        // integrate with MS
        nsMultimediaService.items.push({
            "tab": {
                "position": nsMultimediaService.modelItem.tab.position,
                "title": nsMultimediaService.modelItem.tab.title,
                "icon": nsMultimediaService.modelItem.tab.icon,
                "header": nsMultimediaService.modelItem.tab.header,
                "desc": nsMultimediaService.modelItem.tab.desc
            },
            "media": {
                "type": nsMultimediaService.modelItem.media.type,
                "tag": nsMultimediaService.modelItem.media.tag,
                "link": nsMultimediaService.modelItem.media.link,
                "alt": "",
                "dimensions": {
                    "height": nsMultimediaService.modelItem.media.dimensions.height,
                    "width": nsMultimediaService.modelItem.media.dimensions.width
                }
            }
        })
        // Reset payload
        $(this).attr("disabled", true)

        // remove spinner
        //  $("#imgiconName1Video")

    };

    function loadImg(selector, file) {
        // var i = setInterval(function () {
        //     clearInterval(i)
        //     $(selector)
        //         .attr("width", "200px")
        //         .attr("height", "200px")
        //         .attr("border", "1")
        //         .attr("alt", "File Uploaded!")
        //         .attr('src', file)
        // }, 4000);
        loadImgDefault(selector, file)
    }

    function loadImgDefault(selector, file) {

        var i = setInterval(function () {
            clearInterval(i)
            $(selector)
                .attr("title", file)
                .attr("width", "200px")
                .attr("height", "200px")
                .attr("border", "1")
                .attr("alt", "file uploaded")
                .attr('src', "/resources/logo.jpg")
        }, 1000);
    }


    $(document).on('error, onerror', 'source', function () {
        $(this)
            .attr("width", "200px")
            .attr("height", "200px")
            .attr("alt", "media uploaded")
            .attr('src', "/resources/default.mp4")
            .css("border", "3px solid red");
        alert("video error defected ")
    })
    $(document).on('error, onerror', 'video', function () {
        $(this)
            .attr("width", "200px")
            .attr("height", "200px")
            .attr("alt", "media uploaded")
            .attr('src', "/resources/default.mp4")
            .css("border", "3px solid red");
        alert("video error defected ")
    })

    $(document).on('error', 'img', function () {

        $(this)
            .attr("width", "200px")
            .attr("height", "200px")
            .attr("border", "1")
            .attr("alt", "file uploaded")
            .attr('src', "/resources/logo.jpg")
        alert("defected error")
    })
    // $(document).on('load', 'img', function () {
    //
    //     $(this)
    //         .attr("width", "200px")
    //         .attr("height", "200px")
    //         .attr("border", "1")
    //         .attr("alt", "file uploaded")
    //         .attr('src', "/resources/logo.jpg")
    //     alert("defected error")
    // })

    // $('img').preload({
    //     placeholder: "/resources/logo.jpg",
    //     notFound: "/resources/logo.jpg"
    // });


    $(document).on("dblclick", ".addMmItem", function () {
        // quick test..
        nsMultimediaService.create()
    });

    indiReg:{

        var front_1 = false
        $(document).on("change", "input[name=frontIndi_1]", function () {
//	modelContext.individual.verfification.document.front = $(this).val();
            front_1 = true
            var tmp = uploadUx("frmDocFront", accountId, accountId, "default", "image", "#imgDocFront")

            loadImgDefault("#imgDocFront", mediapath + tmp.filename + "." + tmp.ext)
            modelContext.individual.verification.document.front.file = tmp.filename + "." + tmp.ext
            $(this).attr("disabled", true)
            $("input[name=backIndi_1]").attr("disabled", false)
        });

        var back_1 = false
        $(document).on("change", "input[name=backIndi_1]", function () {
            back_1 = true

            var tmp = uploadUx("frmDocBack", accountId, accountId, "default", "image", "#imgDocBack")
            loadImgDefault("#imgDocBack", mediapath + tmp.filename + "." + tmp.ext)
            modelContext.individual.verification.document.back.file = tmp.filename + "." + tmp.ext
            $(this).attr("disabled", true)
            $("input[name=frontIndi_2]").attr("disabled", false)
        });

        var front_2 = false
        $(document).on("change", "input[name=frontIndi_2]", function () {
            front_2 = true

            var tmp = uploadUx("frmAddDocFront", accountId, accountId, "default", "image", "#imgAddDocFront")
            loadImgDefault("#imgAddDocFront", mediapath + tmp.filename + "." + tmp.ext)
            modelContext.individual.verification.additionaDocument.front.file = tmp.filename + "." + tmp.ext

            $(this).attr("disabled", true)
            $("input[name=backIndi_2]").attr("disabled", false)
        });

        var back_2 = false
        $(document).on("change", "input[name=backIndi_2]", function () {
            back_2 = true
            var tmp = uploadUx("frmAddDocBack", accountId, accountId, "default", "image", "#imgAddDocBack")
            loadImgDefault("#imgAddDocBack", mediapath + tmp.filename + "." + tmp.ext)
            modelContext.individual.verification.additionaDocument.back.file = tmp.filename + "." + tmp.ext
            $(this).attr("disabled", true)
//	$(this).attr("disabled", true)
        });

    }

    companyReg:{
        var front_1 = true
        $(document).on("change", "input[name=front_1]", function () {
//	modelContext.company.verfification.document.front = $(this).val();
            front_1 = true
            var tmp = uploadUx("frmDocDirectorFront", accountId, accountId, "default", "image", "#imgDocDirectorFront")
            loadImgDefault("#imgDocDirectorFront", mediapath + tmp.filename + "." + tmp.ext)

            modelContext.rep.verification.document.front.file = mediapath + tmp.filename + "." + tmp.ext
//	alert("Please wait till uploaded image is displayed, before proceeding to next image upload, typically 5 seconds")
            $("input[name=back_1]").attr("disabled", false)
        });

        var back_1 = true
        $(document).on("change", "input[name=back_1]", function () {
            back_1 = true
            // var tmp = uploadUx( "frmDocDirectorBack", accountId, accountId, "photoId", "image", "#imgDocDirectorBack", "#imgDocDirectorBack" ).filename
            var tmp = uploadUx("frmDocDirectorBack", accountId, accountId, "default", "image", "#imgDocDirectorBack")
            loadImgDefault("#imgDocDirectorBack", mediapath + tmp.filename + "." + tmp.ext)

            modelContext.rep.verification.document.back.file = mediapath + tmp.filename + "." + tmp.ext
            $("input[name=front_2]").attr("disabled", false)
        });


/////////////////////////////////////

        var front_2 = false
        $(document).on("change", "input[name=front_2]", function () {
            front_2 = true
            // var tmp = uploadUx( "frmAddDocDirectorFront", accountId, accountId, "photoId", "image", "#imgAddDocDirectorFront", "#imgAddDocDirectorFront" ).filename
            var tmp = uploadUx("frmAddDocDirectorFront", accountId, accountId, "default", "image", "#imgAddDocDirectorFront")
            loadImgDefault("#imgAddDocDirectorFront", mediapath + tmp.filename + "." + tmp.ext)


            modelContext.rep.verification.additionaDocument.front.file = mediapath + tmp.filename + "." + tmp.ext


            $("input[name=back_2]").attr("disabled", false)
        });
        var back_2 = false
        $(document).on("change", "input[name=back_2]", function () {
            back_2 = true
            // var tmp = uploadUx( "frmAddDocDirectorBack", accountId, accountId, "photoId", "image", "#imgAddDocDirectorBack", "#imgAddDocDirectorBack" ).filename
            var tmp = uploadUx("frmAddDocDirectorBack", accountId, accountId, "default", "image", "#imgAddDocDirectorBack")
            loadImgDefault("#imgAddDocDirectorBack", mediapath + tmp.filename + "." + tmp.ext)

            modelContext.rep.verification.additionaDocument.back.file = mediapath + tmp.filename + "." + tmp.ext
//	$(this).attr("disabled", true)
        });


        ProofIncorporation:{
            var front_ltd_1 = false
            $(document).on("change", "input[name=front_ltd_1]", function () {
                front_ltd_1 = true
                // var tmp = uploadUx( "frmDocLtdFront", accountId, accountId, "photoId", "image", "#imgDocLtdFront", "#imgDocLtdFront" ).filename
                var tmp = uploadUx("frmDocLtdFront", accountId, accountId, "default", "image", "#imgDocLtdFront")
                loadImgDefault("#imgDocLtdFront", mediapath + tmp.filename + "." + tmp.ext)

                modelContext.company.verification.document.front.file = mediapath + tmp.filename + "." + tmp.ext
                modelContext.company.verification.document.front.purpose = "additional_verification";
                $("input[name=back_ltd_1]").attr("disabled", false)
            });
            var back_ltd_1 = false
            $(document).on("change", "input[name=back_ltd_1]", function () {
                back_ltd_1 = true
                // var tmp = uploadUx( "frmDocLtdBack", accountId, accountId, "photoId", "image", "#imgDocLtdBack", "#imgDocLtdBack" ).filename
                var tmp = uploadUx("frmDocLtdBack", accountId, accountId, "default", "image", "#imgDocLtdBack")
                loadImgDefault("#imgDocLtdBack", mediapath + tmp.filename + "." + tmp.ext)

                modelContext.company.verification.document.back.file = mediapath + tmp.filename + "." + tmp.ext
                modelContext.company.verification.document.back.purpose = "additional_verification";
            });
        }
    }

    branding:{


        $(document).on("change", "#brandingFavIcon", function () {

            var tmp = uploadUx("frmBrandingFavIcon", accountId, accountId, "default", "image", "#brandingFavIconImg")

            // $("#brandingFavIconImg").attr("width", "100px").attr("height", "100px").attr("border", "1").attr('src', mediapath + tmp.filename + "." + tmp.ext)
            nsMultimediaService.modelItem.tab.title = "Favicon"
            nsMultimediaService.modelItem.media.tag = "icon"
            nsMultimediaService.modelItem.media.type = "icon"
            nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext

            loadImg("#brandingFavIconImg", mediapath + tmp.filename + "." + tmp.ext)

            nsBrandingService.modelItem.media.favIcon.name = nsMultimediaService.modelItem.media.link
        });

        $(document).on("change", "#brandingHdr", function () {
            tryout:{

//https://stackoverflow.com/questions/27120757/failed-to-execute-createobjecturl-on-url
                const mediaStream = new MediaStream();
                // const video = document.getElementById('video-player');
                // video.srcObject = mediaStream;
            }


            var file = $(this)[0].files[0];
            img = new Image();
            var _URL = window.URL || window.webkitURL;
            img.src = _URL.createObjectURL(file);
            img.onload = function () {
                if (this.width < 1900 || this.height < 120)
                    alert("INF: This width is not supported. Width:" + this.width + "   Height: " + this.height);
                else {
                    var tmp = uploadUx("frmBrandingHdr", accountId, accountId, "default", "image", "#brandingHdrImg")

                    loadImg("#brandingHdrImg", mediapath + tmp.filename + "." + tmp.ext)
                    nsMultimediaService.modelItem.tab.title = "banner"
                    nsMultimediaService.modelItem.media.tag = "header"
                    nsMultimediaService.modelItem.media.type = "image"
                    nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext

                    nsBrandingService.modelItem.media.picHeader.name = nsMultimediaService.modelItem.media.link
                }
            };

        });

        $(document).on("change", "#brandingTdr", function () {
            var tmp = uploadUx("frmBrandingTdr", accountId, accountId, "default", "image", "#brandingTdrImg")
            loadImg("#brandingTdrImg", mediapath + tmp.filename + "." + tmp.ext)
            nsMultimediaService.modelItem.tab.title = "footer"
            nsMultimediaService.modelItem.media.tag = "footer"
            nsMultimediaService.modelItem.media.type = "image"
            nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext
            nsBrandingService.modelItem.media.picFooter.name = nsMultimediaService.modelItem.media.link
        });

    }

    webinar :{
        $(document).on("click", "#iconName1Webinar", function () {
            $("#frmIcon1WebinarSpinner").html('<i id=frmIcon1WebinarSpinner class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });

        $(document).on("change", "#iconName1Webinar", function () {
            tmp = uploadUx("frmIcon1Webinar", accountId, accountId, "default", "image", "#imgiconName1Webinar")

            $("#frmIcon1WebinarSpinner").remove();
            loadImgDefault("#imgiconName1Webinar", mediapath + tmp.filename + "." + tmp.ext)

            nsMultimediaService.modelItem.tab.title = "Intro"
            nsMultimediaService.modelItem.media.tag = "profile"
            nsMultimediaService.modelItem.media.type = "image"
            nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext

        });


        $(document).on("click", "#iconName2Webinar", function () {
            $("#frmIcon2WebinarSpinner").html('<i id=frmIcon2WebinarSpinner class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName2Webinar", function () {
            var tmp = uploadUx("frmIcon2Webinar", accountId, accountId, "photoId", "video", "#imgiconName2Webinar").filename

            $("#frmIcon2WebinarSpinner").remove();
            var video = $("#imgiconName2Webinar")[0];
            var source = $("#imgiconName2WebinarOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            nsMultimediaService.modelItem.tab.title = "Preview"
            nsMultimediaService.modelItem.media.tag = "preview"
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp

        });
    }


    subscriptions :{
        $(document).on("change", "#subscriptionVideoUpload", function () {

            var tmp = uploadUx("frmDocFrontMembership", accountId, accountId, "photoId", "video", "#imgDocFront").filename
            $("#iconName2VideoIcon").remove();

            var video = $("#membershipVideoUpload")[0];
            var source = $("#membershipVideoUploadOutput").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            nsMultimediaService.modelItem.tab.title = "Preview"
            nsMultimediaService.modelItem.media.tag = "preview"
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp

            $("div[id=tabsMedia-1]  button").click()
        });
        $(document).on("dblclick", "#subscriptionFacebookUpload", function () {
            $(this).val("https://www.facebook.com/facebook/videos/10153231379946729/")
        });
        $(document).on("change", "#subscriptionFacebookUpload", function () {
            var src = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=true&width=734&height=502&appId"
            src = encodeURI("https://www.facebook.com/plugins/video.php?href=" + $(this).val() + "&show_text=true&width=734&height=502&appId")

            $("#subscriptionFacebookUploadOutput").attr('src', src);

            nsMultimediaService.modelItem.tab.title = "#1"
            nsMultimediaService.modelItem.media.tag = "intro"
            nsMultimediaService.modelItem.media.type = "facebook"
            nsMultimediaService.modelItem.media.link = src

            $("div[id=tabsMedia-2]  button").click()
        });

        $(document).on("dblclick", "#subscriptionYouTubeUpload", function () {
            $(this).val("https://www.youtube.com/DBXH9jJRaDk")
        });
        $(document).on("change", "#subscriptionYouTubeUpload", function () {
            var fullUrl = $(this).val();
            tmp = fullUrl.split("/")[0]
            tmp = fullUrl.split("/")[1]
            tmp = fullUrl.split("/")[2]
            tmp = fullUrl.split("/")[3]
            tmp = fullUrl.split("/")[4]

            src = encodeURI("https://www.youtube.com/embed/" + fullUrl.split("/")[3] + "?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://mybusinesspal.com")
            $("#subscriptionYouTubeUploadOutput").attr('src', src);

            nsMultimediaService.modelItem.tab.title = "#2"
            nsMultimediaService.modelItem.media.tag = "intro"
            nsMultimediaService.modelItem.media.type = "youtube"
            nsMultimediaService.modelItem.media.link = src
            $("div[id=tabsMedia-3]  button").click()
        });

        $(document).on("change", "#subscriptionPicsUpload", function () {
            modelContext.subscription.media.pics.push($(this).val());
        });
    }


    VideoHub: {

        $(document).on("click", "#iconName1Video", function () {
            $("#imgiconName1Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change", "#iconName1Video", function () {
            tmp = uploadUx("frmIcon1Video", accountId, accountId, "default", "image", "#imgiconName1Video")
            loadImgDefault("#imgiconName1Video", mediapath + tmp.filename + "." + tmp.ext)

            nsMultimediaService.modelItem.tab.title = "Intro"
            nsMultimediaService.modelItem.media.tag = "profile"
            nsMultimediaService.modelItem.media.type = "image"
            nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext

            $("#iconName1VideoIcon").remove();
            $("div[id=tabsMediaVideo-1]  button").click()
        })
        ;

        $(document).on("click", "#iconName2Video", function () {
            $("#imgiconName2Video").after('<i id=iconName2VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });

        $(document).on("change  ", "#iconName2Video", function () {
            var tmp = uploadUx("frmIcon2Video", accountId, accountId, "photoId", "video", "#imgiconName2Video").filename
            $("#iconName2VideoIcon").remove();

            try {
                var video = $("#imgiconName2Video")[0];
                var source = $("#imgiconName2VideoOutPut").attr('src', basePath + tmp);
                video.append(source);
                video.load();
            } catch (errMsg) {
                alert("vid err (" + errMsg + ")")
                var source = $("#imgiconName2VideoOutPut").attr('src', "/resources/default.mp4");
            }
            $("video").attr("width", "400px").attr("height", "250px")
            //
            // var vidEvents = $._data(video, 'events');
            // var srcEvents = $._data(sourceX, 'events');

            // video.play();
            nsMultimediaService.modelItem.tab.title = "Preview"
            nsMultimediaService.modelItem.media.tag = "preview"
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp


            // $("div[id=tabsMediaVideo-2]  button").click()
        });
        $(document).on("click", "#iconName3Video", function () {
            $("#imgiconName3Video").after('<i id=iconName3VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName3Video", function () {
            var tmp = uploadUx("frmIcon3Video", accountId, accountId, "photoId", "video", "#imgiconName3Video").filename
            $("#iconName3VideoIcon").remove();

            var video = $("#imgiconName3Video")[0];
            var source = $("#imgiconName3VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.tab.title = "#1"
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp


            // $("div[id=tabsMediaVideo-3]  button").click()
        });
        $(document).on("click", "#iconName4Video", function () {
            $("#imgiconName4Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName4Video", function () {

            var tmp = uploadUx("frmIcon4Video", accountId, accountId, "photoId", "video", "#imgiconName4Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName4Video")[0];
            var source = $("#imgiconName4VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.tab.title = "#2"
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp


        //   $("div[id=tabsMediaVideo-4]  button").click()
        });
        $(document).on("click", "#iconName5Video", function () {
            $("#imgiconName5Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName5Video", function () {
            var tmp = uploadUx("frmIcon5Video", accountId, accountId, "photoId", "video", "#imgiconName5Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName5Video")[0];
            var source = $("#imgiconName5VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp


      //      $("div[id=tabsMediaVideo-5]  button").click()
        });
        $(document).on("click", "#iconName6Video", function () {
            $("#imgiconName6Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName6Video", function () {
            var tmp = uploadUx("frmIcon6Video", accountId, accountId, "photoId", "video", "#imgiconName6Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName6Video")[0];
            var source = $("#imgiconName6VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp

      //      $("div[id=tabsMediaVideo-6]  button").click()

        });
        $(document).on("click", "#iconName7Video", function () {
            $("#imgiconName7Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName7Video", function () {
            var tmp = uploadUx("frmIcon7Video", accountId, accountId, "photoId", "video", "#imgiconName7Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName7Video")[0];
            var source = $("#imgiconName7VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp

      //      $("div[id=tabsMediaVideo-7]  button").click()

        });
        $(document).on("click", "#iconName8Video", function () {
            $("#imgiconName8Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName8Video", function () {
            var tmp = uploadUx("frmIcon8Video", accountId, accountId, "photoId", "video", "#imgiconName8Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName8Video")[0];
            var source = $("#imgiconName8VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp


     //       $("div[id=tabsMediaVideo-8]  button").click()
        });
        $(document).on("click", "#iconName9Video", function () {
            $("#imgiconName9Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName9Video", function () {
            var tmp = uploadUx("frmIcon9Video", accountId, accountId, "photoId", "video", "#imgiconName9Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName9Video")[0];
            var source = $("#imgiconName9VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            //  video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp


    //        $("div[id=tabsMediaVideo-9]  button").click()
        });
        $(document).on("click", "#iconName10Video", function () {
            $("#imgiconName10Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName10Video", function () {
            var tmp = uploadUx("frmIcon10Video", accountId, accountId, "photoId", "video", "#imgiconName10Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName10Video")[0];
            var source = $("#imgiconName10VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp


   //         $("div[id=tabsMediaVideo-10]  button").click()
        });
        $(document).on("click", "#iconName11Video", function () {
            $("#imgiconName11Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName11Video", function () {
            var tmp = uploadUx("frmIcon11Video", accountId, accountId, "photoId", "video", "#imgiconName11Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName11Video")[0];
            var source = $("#imgiconName11VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp


    //        $("div[id=tabsMediaVideo-11]  button").click()
        });
        $(document).on("click", "#iconName12Video", function () {
            $("#imgiconName12Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName12Video", function () {
            var tmp = uploadUx("frmIcon12Video", accountId, accountId, "photoId", "video", "#imgiconName12Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName12Video")[0];
            var source = $("#imgiconName12VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp

//
    //        $("div[id=tabsMediaVideo-12]  button").click()
        });
        $(document).on("click", "#iconName13Video", function () {
            $("#imgiconName13Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName13Video", function () {
            var tmp = uploadUx("frmIcon13Video", accountId, accountId, "photoId", "video", "#imgiconName13Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName13Video")[0];
            var source = $("#imgiconName13VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp


   //         $("div[id=tabsMediaVideo-13]  button").click()
        });
        $(document).on("click", "#iconName14Video", function () {
            $("#imgiconName14Video").after('<i id=iconName1VideoIcon class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
        });
        $(document).on("change  ", "#iconName14Video", function () {
            var tmp = uploadUx("frmIcon14Video", accountId, accountId, "photoId", "video", "#imgiconName14Video").filename
            $("#iconName1VideoIcon").remove();

            var video = $("#imgiconName14Video")[0];
            var source = $("#imgiconName14VideoOutPut").attr('src', basePath + tmp);
            video.append(source);
            video.load();
            // video.play();
            $("video").attr("width", "400px").attr("height", "250px")
            nsMultimediaService.modelItem.media.type = "video"
            nsMultimediaService.modelItem.media.link = basePath + tmp

   //         $("div[id=tabsMediaVideo-14]  button").click()
        });

    }


    MediaEvents: {

        image1: {
            $(document).on("change", "#iconName1Event", function () {
                tmp = uploadUx("frmIcon1Event", accountId, accountId, "default", "image", "#imgiconName1Event")
                // $("#imgiconName1Event").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName1Event", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = "Intro"
                nsMultimediaService.modelItem.media.tag = "profile"
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext

            });
        }
        image1: {
            $(document).on("change", "#iconName2Event", function () {

                tmp = uploadUx("frmIcon2Event", accountId, accountId, "default", "image", "#imgiconName2Event")
                // $("#imgiconName2Event").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName2Event", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = "#2"
                nsMultimediaService.modelItem.media.tag = "profile"
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext

            });
        }

        image1: {
            $(document).on("change", "#iconName3Event", function () {
                tmp = uploadUx("frmIcon3Event", accountId, accountId, "default", "image", "#imgiconName3Event")
                // $("#imgiconName3Event").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName3Event", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = "#3"
                nsMultimediaService.modelItem.media.tag = "profile"
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext
            });
        }


        image1: {
            $(document).on("change", "#eventVideoUpload", function () {
                var tmp = uploadUx("frmDocFrontEvent", accountId, accountId, "photoId", "video", "#imgDocFront").filename

                var video = $("#eventVideo")[0];
                var source = $("#eventVideoUploadOutput").attr('src', basePath + tmp).attr("title", basePath + tmp);
                video.append(source);
                video.load();
                $("video").attr("width", "400px").attr("height", "250px").attr("title", basePath + tmp);
                // video.play();
                nsMultimediaService.modelItem.tab.title = "Promotional"
                nsMultimediaService.modelItem.media.tag = "preview"
                nsMultimediaService.modelItem.media.type = "video"
                nsMultimediaService.modelItem.media.link = basePath + tmp
            });
        }

        // TODO , defect with social and image
        image1: {
            $(document).on("dblclick", "#eventFacebookUpload", function () {
                $(this).val("https://www.facebook.com/facebook/videos/10153231379946729/")
                $("#eventFacebookUpload").change()
            });
        }

        image1: {
            $(document).on("change", "#eventFacebookUpload", function () {
                var src = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=true&width=734&height=502&appId"
                src = encodeURI("https://www.facebook.com/plugins/video.php?href=" + $(this).val() + "&show_text=true&width=734&height=502&appId")
                $("#eventFacebookUploadOutput").attr('src', src);

                nsMultimediaService.modelItem.tab.title = "Social Media"
                nsMultimediaService.modelItem.media.tag = "preview"
                nsMultimediaService.modelItem.media.type = "facebook"
                nsMultimediaService.modelItem.media.link = src
            });
        }
    }


    activity: {

        image1:{
            $(document).on("change", "#iconName1Activity", function () {
                tmp = uploadUx("frmIcon1Activity", accountId, accountId, "default", "image", "#imgiconName1Activity")
                // $("#imgiconName1Activity").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName1Activity", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = "Intro"
                nsMultimediaService.modelItem.media.tag = "profile"
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext
            });
        }

        image1:{
            $(document).on("change", "#iconName2Activity", function () {

                tmp = uploadUx("frmIcon2Activity", accountId, accountId, "default", "image", "#imgiconName2Activity")
                // $("#imgiconName2Activity").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName2Activity", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = "Pic#1"
                nsMultimediaService.modelItem.media.tag = "profile"
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext

            });
        }
        image1:{
            $(document).on("change", "#iconName3Activity", function () {
                tmp = uploadUx("frmIcon3Activity", accountId, accountId, "default", "image", "#imgiconName3Activity")
                // $("#imgiconName3Activity").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName3Activity", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = "Pic#2"
                nsMultimediaService.modelItem.media.tag = "profile"
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext

            });
        }

        video:{


            $(document).on("change", "#activityVideoUpload", function () {
                var tmp = uploadUx("frmDocFrontActivity", accountId, accountId, "photoId", "video", "#imgDocFront").filename

                var video = $("#activityVideo")[0];
                var source = $("#activityVideoUploadOutput").attr('src', basePath + tmp);
                video.append(source);
                video.load();
                // video.play();
                $("video").attr("width", "400px").attr("height", "250px").attr("title", basePath + tmp)


                nsMultimediaService.modelItem.tab.title = "Video"
                nsMultimediaService.modelItem.media.tag = "intro"
                nsMultimediaService.modelItem.media.type = "video"
                nsMultimediaService.modelItem.media.link = basePath + tmp
            });
        }

        facebook:{
            $(document).on("change", "#activityFacebookUpload", function () {
                var src = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=true&width=734&height=502&appId"
                src = encodeURI("https://www.facebook.com/plugins/video.php?href=" + $(this).val() + "&show_text=true&width=734&height=502&appId")

                $("#activityFacebookUploadOutput").attr('src', src);

                nsMultimediaService.modelItem.tab.title = "Facebook"
                nsMultimediaService.modelItem.media.tag = "intro"
                nsMultimediaService.modelItem.media.type = "facebook"
                nsMultimediaService.modelItem.media.link = src

            });
            $(document).on("dblclick", "#activityFacebookUpload", function () {
                $(this).val("https://www.facebook.com/facebook/videos/10153231379946729/").change()
            });
        }

    }

    MediaShop: {

        image1:{

            $(document).on("click", "#x", function () {
                // $("#frmIcon1WebinarSpinner").html('<i id=frmIcon1WebinarSpinner class="fa fa-spinner fa-spin fa-1x fa-fw"></i>');
            });
            $(document).on("change", "#iconName1Store", function () {
                tmp = uploadUx("frmIcon1Store", accountId, accountId, "default", "image", "#imgiconName1Store")
                // $("#frmIcon1WebinarSpinner").remove();
                loadImg("#imgiconName1Store", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = "Intro"
                nsMultimediaService.modelItem.media.tag = "profile"
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext
            });
            $(document).on("change", "#iconName2Store", function () {
                tmp = uploadUx("frmIcon2Store", accountId, accountId, "default", "image", "#imgiconName2Store")
                // $("#imgiconName2Store").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName2Store", mediapath + tmp.filename + "." + tmp.ext)
                nsMultimediaService.modelItem.tab.title = ""
                nsMultimediaService.modelItem.media.tag = ""
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext
            });
            $(document).on("change", "#iconName3Store", function () {
                tmp = uploadUx("frmIcon3Store", accountId, accountId, "default", "image", "#imgiconName3Store")
                // $("#imgiconName3Store").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName3Store", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = ""
                nsMultimediaService.modelItem.media.tag = ""
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext
            });
            $(document).on("change", "#iconName4Store", function () {
                tmp = uploadUx("frmIcon4Store", accountId, accountId, "default", "image", "#imgiconName4Store")
                // $("#imgiconName4Store").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName4Store", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = ""
                nsMultimediaService.modelItem.media.tag = ""
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext
            });
            $(document).on("change", "#iconName5Store", function () {
                tmp = uploadUx("frmIcon5Store", accountId, accountId, "default", "image", "#imgiconName5Store")
                // $("#imgiconName5Store").attr("width", "200px").attr("height", "200px").attr('src', mediapath + tmp.filename + "." + tmp.ext)
                loadImg("#imgiconName5Store", mediapath + tmp.filename + "." + tmp.ext)

                nsMultimediaService.modelItem.tab.title = ""
                nsMultimediaService.modelItem.media.tag = ""
                nsMultimediaService.modelItem.media.type = "image"
                nsMultimediaService.modelItem.media.link = tmp.filename + "." + tmp.ext
            });


        }
    }


}

exitUx: {

}

dataIn:{

}

dataSave:{

}

dataDelete:{

}


//# sourceURL=api_mm_events.js