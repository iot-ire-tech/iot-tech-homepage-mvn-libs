/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function uxSearchableResourcePoolByClientId(id, clientId) {
	tmpObj = [];
	url = urlRest + resourceEndpoint + "?clientId=" + clientId;
	resourceObj = nw.setUrl(url).setMessage("INF: Retrieving Resources for Client ID " + clientId).getMe().getResult();
	uxSearchableResourcePoolBuilder(resourceObj, id);
}

function queryClientLocationsByType(id, type) {
	url = urlRest + clientLocationListsEndpoint + "?clientId=" + id + "&type=" + type;
	query(url, "Client Location Type List", "INF: No locations associated with this asset, please add");
}

function queryMembersList(id, type) {
	url = urlRest + membersListEndpoint + "?clientId=" + id + "&type=" + type;
	query(url, "Members Type List", "INF: No members associated with this client/type please add");
}
function queryPatronAddress(id) {
	url = urlRest + patronAddressEndpoint + "?clientId=" + id + "&patronId=" + patronId;
	query(url, "Member Address List", "");
}


function queryPatronByClientId(id) {
	// http://localhost:3000/client/71917/patrons
	url = urlRest + clientEndpoint + "/" + id + patronEndpoint;
	url = urlRest + patronEndpoint + "?clientId=" + id;
	query(url, "Client Patron List", "INF: No users found for this client, please add");
}
