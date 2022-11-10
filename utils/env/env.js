// Origin : Local Developer Workspace

var urlLocation; // location is a reserved word!!!
urlLocation = "gcloud";
urlLocation = "local";

var channel;
channel = "green";
channel = "";

var protoRest
var hostRest;
var portRest;

var protoServ;
var hostServ;
var portServ;
var contextPath;

function environment(urlLocation, channel) {

// Local Context
	if (urlLocation === "local") {
		protoRest = "http";
		hostRest = "localhost";
		portRest = "3000";

		protoServ = "http";
		hostServ = "localhost";
		portServ = "8084";
		contextPath = "/iot-base";
	}

	if (urlLocation === "stage") {
		protoRest = "http";
		hostRest = "localhost";
		portRest = "3000";

		protoServ = "http";
		hostServ = "localhost";
		portServ = "8084";
		contextPath = "";
	}
// Gcloud Context
	if (urlLocation === "gcloud") {
// Traffice in from browser - if traffic in from app server, hard code is locally
		protoRest = "https";
		hostRest = "www.iot-social.com";
		portRest = "3000";

		protoServ = "http";
		hostServ = "localhost";
		portServ = "3001";
		contextPath = channel;
	}
}

environment(urlLocation, channel);
