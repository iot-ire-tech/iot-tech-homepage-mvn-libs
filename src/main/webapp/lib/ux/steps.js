/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function stepsProvisioning() {

	html = "<div class=\"ui ordered steps\">";
	html += "  <div class=\"completed step\">";
	html += "    <div class=\"content\">";
	html += "      <div class=\"title\">1. Users</div>";
	html += "      <div class=\"description\">Load Users Into The System</div>";
	html += "    </div>";
	html += "  </div>";

	html += "  <div class=\"completed step\">";
	html += "    <div class=\"content\">";
	html += "      <div class=\"title\">2. Assets</div>";
	html += "      <div class=\"description\">Identify Business Assets</div>";
	html += "    </div>";
	html += "  </div>";

	html += "  <div class=\"completed step\">";
	html += "    <div class=\"content\">";
	html += "      <div class=\"title\">3. Events</div>";
	html += "      <div class=\"description\">Associate Events With Assets</div>";
	html += "    </div>";
	html += "  </div>";

	html += "  <div class=\"completed step\">";
	html += "    <div class=\"content\">";
	html += "      <div class=\"title\">4. Activities</div>";
	html += "      <div class=\"description\">Associate Activities With Events</div>";
	html += "    </div>";
	html += "  </div>";

	html += "  <div class=\"completed step\">";
	html += "    <div class=\"content\">";
	html += "      <div class=\"title\">5. Repeat Steps 1-4 </div>";
	html += "      <div class=\"description\">Build Up Your Portfolio</div>";
	html += "    </div>";
	html += "  </div>";

	html += "</div>";
	html += "<br>";
	return html;
}