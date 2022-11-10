/* 
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */


function uxComboBoxClientUsers(id, hook) {

	// uxSelect = function (tmpObj, id, title, aclass, sameName) {
	var users = new uxSelect(queryPatronByClientId(id), "uxClientUsers" + id, "Please Select", "clientUsers");
	html = users.init().getHtml();
	if (hook !== "undefined" || hook !== undefined)
		$("#" + hook).replaceWith(html);
	return html;
}