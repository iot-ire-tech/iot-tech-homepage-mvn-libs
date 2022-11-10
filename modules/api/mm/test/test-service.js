/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var productId = parsedUrl.searchParams.get("productId");
var accountId = parsedUrl.searchParams.get("accountId");
var assetId = parsedUrl.searchParams.get("assetId");


var mydb = "multimedia"

var payload = {
    "accountId": accountId,
    "productId": productId
}
//billing statement...billing statement...billing statement...billing statement...billing statement...billing statement...billing statement...billing statement.
var contextPath = ""
var mediaLinkSocialFb = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=true&appId"


var payloadItemYouTube = {
    "tab": {
        "position": "0",
        "title": "A YT",
        "icon": "youtube",
        "header": "youtube hdr",
        "desc": "this is one"
    },
    "media": {
        "type": "youtube",
        "link": "https://www.youtube.com/embed/tgbNymZ7vqY",
        "alt": "",
        "dimensions": {
            "height": "100px",
            "width": "200px"
        }
    }
}
var payloadItemFacebook = {
    "tab": {
        "position": "1",
        "title": "A FB",
        "icon": "facebook",
        "header": "fb hdr",
        "desc": "this is a fb header"
    },
    "media": {
        "type": "facebook",
        "link": mediaLinkSocialFb,
        "alt": "",
        "dimensions": {
            "height": "300px",
            "width": "300px"
        }
    }
}
var payloadItemVid = {
    "tab": {
        "position": "1",
        "title": "A Video",
        "icon": "video",
        "header": "vid hdr",
        "desc": "this is a vid header"
    },
    "media": {
        "type": "video",
        "link": location.origin + contextPath + "/resources/media/vids/vid1.mp4",
        "alt": "",
        "dimensions": {
            "height": "200px",
            "width": "300px"
        }
    }
}

var payloadItemHtml = {
    "tab": {
        "position": "1",
        "title": "A Html",
        "icon": "html",
        "header": "html hdr",
        "desc": "this is a html header"
    },
    "media": {
        "type": "html",
        "link": "<h1>This is my html header</h1>",
        "alt": "",
        "dimensions": {
            "height": "200px",
            "width": "300px"
        }
    }
}

var payloadItemAudio = {
    "tab": {
        "position": "1",
        "title": "A Audio",
        "icon": "audio",
        "header": "Audio hdr",
        "desc": "this is a Audio header"
    },
    "media": {
        "type": "audio",
        "link": "https://www.w3schools.com/html/horse.mp3",
        "alt": "",
        "dimensions": {
            "height": "200px",
            "width": "300px"
        }
    }
}
// https://www.w3schools.com/html/html5_svg.asp
// https://www.w3schools.com/html/pic_trulli.jpg
var payloadItemImage = {
    "tab": {
        "position": "1",
        "title": "A image",
        "icon": "image",
        "header": "image hdr",
        "desc": "this is a image header"
    },
    "media": {
        "type": "image",
        "link": "https://www.w3schools.com/html/pic_trulli.jpg",
        "alt": "",
        "dimensions": {
            "height": "200px",
            "width": "300px"
        }
    }
}
// http://localhost:8084/services/modules/api/mm/test/test-create.jsp?accountId=acct_1GRdJxF6KR5nnzB2&productId=prod_HIqrrSdRkT5srg%20&customerId=cus_GzcZjg8K4BliTA
var payloadQueury = {
    "accountId": accountId,
    "productId": productId
}
var payloadQueuryTs = {
    "accountId": accountId,
    "productId": productId
}

var testSuite = [{
    args: [
        {
            "accountId": accountId,
            "offering": "event",
            "assetId": assetId,
            "productId": productId,
            "mmItem": payloadItemYouTube
        }
        ,
        {
            "accountId": accountId,
            "offering": "event",
            "assetId": assetId,
            "productId": productId,
            "mmItem": payloadItemImage
        }
        ,
        {
            "accountId": accountId,
            "offering": "event",
            "assetId": assetId,
            "productId": productId,
            "mmItem": payloadItemAudio
        }
        ,
        {
            "accountId": accountId,
            "offering": "event",
            "assetId": assetId,
            "productId": productId,
            "mmItem": payloadItemHtml
        }
        ,
        {
            "accountId": accountId,
            "offering": "event",
            "assetId": assetId,
            "productId": productId,
            "mmItem": payloadItemVid
        }
        ,
        {
            "accountId": accountId,
            "offering": "event",
            "assetId": assetId,
            "productId": productId,
            "mmItem": payloadItemFacebook
        }
    ],
    expected: /[a-zA-Z0-9]+/
}
]



describe('Provision MultiMedia', function () {


    this.timeout(1000000);
    this.slow(300000)

    // TODO add javascript confirm here...
    before("Delete All", function () {
        nsMultimediaService.accountId = accountId
        nsMultimediaService.getAll()
        nsMultimediaService.objs.forEach(function (item) {
            nsMultimediaService.dbId = item._id
            nsMultimediaService.delete()
        })
    })

    testSuite[0].args.forEach(function (testcase) {

        it('MM item provisioned', function (done) {
            nsMultimediaService.accountId = testcase.accountId
            nsMultimediaService.productId = testcase.productId
            nsMultimediaService.modelItem = testcase.mmItem
            nsMultimediaService.items.push(testcase.mmItem)
            nsMultimediaService.create()
            chai.expect(nsMultimediaService.dbId, /[a-zA-Z0-9]+/, 'New MM Item Created')
            done()
        });

    })

});

describe('Query provisionMultiMedia', function () {

    this.timeout(1000000);
    this.slow(300000)
    it('based on account, product', function () {
      nsMultimediaService.get()
        chai.expect(nsMultimediaService.dbId, /[a-zA-Z0-9]+/, 'New MM Item Query')
    });

});
describe('Ux Tabs MultiMedia', function () {

    this.timeout(1000000);
    this.slow(300000)
    it('based on account, product', function () {

        nsMultimediaService.get()
        var ux = uxMultiMediaWidgetInline(nsMultimediaService.obj.items, "myTabs")
        var html = ux.build().getHtml()
        $("#ux").html(html)

        if ($('body').tabs) {
            $(".myTabs").tabs({
                active: 0
            });
        } else {
            var repeatTabs = setInterval(function () {
                if ($('body').tabs) {
                    clearInterval(repeatTabs)
                    $(".myTabs").tabs({
                        active: 0
                    });
                }
            }, 10)
        }

        // Activate Tabs
        chai.expect(uxMultiMediaWidgetInline.dbId, /[a-zA-Z0-9]+/, 'New MM Item Created')
    });

});
//# sourceURL=api_multimedia_test.js