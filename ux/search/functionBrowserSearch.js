

function uxSearchDataTable() {
	var html = ""
	html += "<br>"
	html += "<br>"
	html += "<div class='w3-center w3-boarder'>"
	html += '<table cellpadding="3" cellspacing="0" border="0" style="width: 25%; margin: 0 auto 2em auto;">'
	html += '<thead class=w3-light-gray>'
	html += '<tr>'
	html += '<th>!Go Compare!</th>'
	html += '</tr>'
	html += '</thead>'
	html += '<tbody>'
	html += '<tr id="filter_global">'
	html += '<td align="center">Enter Search Item -> <input type="text" class="global_filter" id="global_filter"></td>'
	html += '</tr>'
	html += '</tbody>'
	html += '</table>'
	html += "</div>"
	html += "</div>"
	return html;
}

function uxSearchDataTableOrg() {
	var html = ""
	html += "<br>"
	html += "<br>"
	html += "<div class='w3-center w3-boarder'>"
	html += '<table cellpadding="3" cellspacing="0" border="1" style="width: 50%; margin: 0 auto 2em auto;">'
	html += '<thead class=w3-light-gray>'
	html += '<tr>'
	html += '<th>!Go Compare!</th>'
	html += '<th>Search text</th>'
	html += '<th>Use smart search</th>'
	html += '</tr>'
	html += '</thead>'
	html += '<tbody>'
	html += '<tr id="filter_global">'
	html += '<td>Global search</td>'
	html += '<td align="center"><input type="text" class="global_filter" id="global_filter"></td>'
	html += '<td align="center"><input disabled type="checkbox" class="global_filter" id="global_smart" checked="checked"></td>'
	html += '</tr>'
	html += '</tbody>'
	html += '</table>'
	html += "</div>"
	html += "</div>"
	return html;
}


function filterGlobal() {
	$('.display').DataTable().search(
		$('#global_filter').val(),
		$('#global_regex').prop('checked'),
		$('#global_smart').prop('checked')
		).draw();
}

//# sourceURL=stripe_business_search.js