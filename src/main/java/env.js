// Origin : Local Developer Workspace

deployment = "local"
channel = "iot-base"
environment(deployment, channel);
var basePathApp = new urlBuilder(protoServ, hostServ, portServ);
var urlApp = basePathApp.init().getBase();

