function UxProvisioningMenuWidget() {
    this.html = ""
    this.init = function () {
        this.html = "<div class='w3-container'>"
        // this.html += "<h2>MyBusinessPal.Com</h2>"
        // this.html += "<p>Bringing valued service to all that use it!</p>"
        // this.html += "<div class='w3-bar w3-light-grey'>"
        // this.html += "<div class='w3-dropdown-hover' style='width:15%'>"
        // this.html += "	<button class='w3-button'><i class='fa fa-home'></i>Session Information</button>"
        // this.html += "	<div class='w3-dropdown-content w3-bar-block w3-card-4'>"
        // this.html += "		<span id='metaHook' class='' ></span>"
        // this.html += "	</div>"
        // this.html += "</div>"
        this.html += ""
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray userHome' style='width:20%'><i class='fa fa-home'></i>Home</a>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray education' style='width:20%'><i class='fa fa-cube'></i>Educational Corner</a>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray meetTeam' style='width:20%'><i class='fa fa-cube'></i>Meet The Team</a>"
        this.html += "<a href='#' class='w3-bar-item w3-button w3-light-gray provisioningHome' style='width:20%'><i class='fa fa-sign-out'></i>Logout</a>"
        this.html += ""
        this.html += "</div>"
        return this.html;
    }
}