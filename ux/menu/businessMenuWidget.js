function UxBusinessMenuWidget() {
    this.html = ""
    this.init = function () {
        this.html += "<div >"
        this.html += "<div class='w3-bar w3-light-grey'>"
        this.html += "<div class='w3-dropdown-hover' style='width:15%'>"
        this.html += "	<button class='w3-button'><i class='fa fa-home'></i>Session Information</button>"
        this.html += "	<div class='w3-dropdown-content w3-bar-block w3-card-4'>"
        this.html += "		<span id='metaHook' class='' ></span>"
        this.html += "	</div>"
        this.html += "</div>"
        this.html += ""
        this.html += "<a href='#' class='w3-bar-item w3-button userHome' style='width:35%'><i class='fa fa-home'></i>Home</a>"
        this.html += "<a href='#' class='w3-bar-item w3-button userLogout' style='width:35%'><i class='fa fa-sign-in'></i>Logout</a>"
        this.html += ""
        this.html += ""
        this.html += "<div class='w3-dropdown-hover w3-right' style='width:15%'>"
        this.html += "	<button class='w3-button'><i class='fa fa-home'></i>Shopping Cart</button>"
        this.html += "	<div class='w3-dropdown-content w3-bar-block w3-card-4'>"
        this.html += "		<span id='cartHook' class=''></span>"
        this.html += "	</div>"
        this.html += "</div>"

        this.html += "</div>"

        return this.html;
    }
}