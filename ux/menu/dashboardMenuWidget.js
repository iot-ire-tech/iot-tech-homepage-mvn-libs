function UxDashboardMenuWidget() {
    this.html = ""
    this.init = function () {
        this.html += "<div class='w3-container  '>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray userHome' style='width:30%'><i class='fa fa-home'></i>&nbsp;&nbsp;Home</a>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray userNewCfo2' style='width:30%'><i class='fa fa-sign-in'></i>&nbsp;&nbsp;Add Admin User</a>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray userSubscription2' style='width:30%'><i class='fa fa-sign-in'></i>&nbsp;&nbsp;Subscription Plan</a>"
        this.html += "</div>"
        return this.html;
    }
}