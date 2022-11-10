var slideShowFunc = function () {
    this.counter = 0;
    this.data = [];
    this.html = "";
    this.id = "";

    this.init = function (id, content, title) {
        this.id = id;
        this.data = content;
        this.html = '<h2 style="text-align:center">Slideshow G</h2>'
        this.html = ''
        return this;
    };
    this.addHeader = function (myId) {
//		this.html += '<div class="container">'
//		this.html += '<div class="mySlides">'
        this.html += "<div class=" + myId + ">"
        // this.html += "<div class=\"w3-center " + myId + "\">"
        return this;
    };

    this.addSlides = function () {
        var that = this;
        this.data.forEach(function (image) {
            var img = location.origin + contextPath + "/resources/media/clients/acct/image/default/" + image.media.link;
            that.html += "<div >"
            // that.html += "<img width=" + image.media.dimensions.width + " height=" + image.media.dimensions.height + " src=" + img + " alt=\"Sourcing images...\" >"
            // that.html += "<img  width='100%' src=" + img + " alt=\"Sourcing images...\" >"
            that.html += "<img  width='100%' src=" + img + " alt=\"Sourcing images...\" >"
            // that.html += "<img  width='300px' height='300px' src=" + img + " alt=\"Sourcing images...\" >"
            that.html += "</div>"
        })
        this.html = that.html;
        return this;
    };
    // this.addContent = function () {
    //     var that = this;
    //     this.data.forEach(function (content) {
    //         that.html += "<div>"
    //         that.html += content
    //         that.html += "</div>"
    //     })
    //     this.html = that.html;
    //     return this;
    // };
    this.addFooter = function () {
        this.html += "</div>"
//		this.html += "</div>"
        return this;
    };


    this.getSlideShow = function () {
        return this.html;
    };


};


//# sourceURL=stripe_business_funcs_slideshow.js