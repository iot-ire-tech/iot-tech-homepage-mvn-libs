function UxCovidMenuWidget() {
    this.html = ""
    this.init = function () {
        this.html += "<div class='w3-container  '>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray userHome' style='width:50%'><i class='fa fa-home'></i>Home</a>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray userLogout' style='width:50%'><i class='fa fa-sign-in'></i>Return</a>"
        this.html += "</div>"
        return this.html;
    }
}