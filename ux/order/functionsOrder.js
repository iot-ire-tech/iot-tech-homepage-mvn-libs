var widgetOrdered = function () {
    this.counter = 0;
    this.data = [];
    this.html = "";
    this.id = "";

    this.init = function (title1, msg1, title2, msg2, title3, msg3, title4, msg4) {

        this.html = "<div class='ui ordered steps'>"

        this.html += "<div class='completed step'>"
        this.html += "<div class='content'>"
        this.html += "<div class='title'>" + title1 + "</div>"
        this.html += "<div class='description'>" + msg1 + "</div>"
        this.html += "</div>"
        this.html += "</div>"


        this.html += "<div class='completed step'>"
        this.html += "<div class='content'>"
        this.html += "<div class='title'>" + title2 + "</div>"
        this.html += "<div class='description'>" + msg2 + "</div>"
        this.html += "</div>"
        this.html += "</div>"


        this.html += "<div class='completed step'>"
        this.html += "<div class='content'>"
        this.html += "<div class='title'>" + title3 + "</div>"
        this.html += "<div class='description'>" + msg3 + "</div>"
        this.html += "</div>"
        this.html += "</div>"


        if (title4 !== undefined) {
            this.html += "<div class='completed step'>"
            this.html += "<div class='content'>"
            this.html += "<div class='title'>" + title4 + "</div>"
            this.html += "<div class='description'>" + msg4 + "</div>"
            this.html += "</div>"
            this.html += "</div>"

        }

        this.html += "</div>"

        return this.html;
    };
};
//# sourceURL=stripe_business_ux_ordered.js"