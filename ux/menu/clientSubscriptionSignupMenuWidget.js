function UxClientSubscriptionMenuWidget() {
    this.html = ""
    this.init = function () {
        this.html = "<div class='w3-container'>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray userHome' style='width:40%'><i class='fa fa-home'></i>Home</a>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray dashboardHome' style='width:40%'><i class='fa fa-sign-out'></i>Return</a>"
        this.html += ""
        this.html += "</div>"
        return this.html;
    }
}