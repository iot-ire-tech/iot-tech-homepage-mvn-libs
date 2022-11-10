/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Workflow
/* New Client
 * Want to create new client obj, - go ahead
 * follow up the clientDb creation (open for extenstion)
 */

// what if the db list is exhaused
// what if iot-db-list doest match actually dbs created

iotDbObj = new clientDbUtil(iotDbCtrt, "Retrieving Available DB from master DB")
var dbResponseObj = iotDbObj.getNextAvailableDb()
if (dbResponseObj !== undefined) {
	id = dbResponseObj._id.$oid;
	delete dbResponseObj._id;	// Otherwise two Ids

// Set Db As Taken = give it an Client Id!!
	dbResponseObj.clientId = 123
	var modifiedResponse = iotDbObj.setDbAsTaken(dbResponseObj, id)

	//console.assert(dbResponseObj.clientId === 123, "ERR: Name not same %s != %s", dbResponseObj.clientId, 123)
	//console.assert(dbResponseObj.name.match(/client.*/) === true, "ERR: Name not same %s != %s", dbResponseObj.name, "client_a")
	//console.assert(dbResponseObj.users[0].name === "ennisa", "ERR: Key not same %s != %s", dbResponseObj.users[0].name, "ennisa")
	//console.assert(dbResponseObj.users[0].accessLevel === "admin", "ERR: Key not same %s != %s", dbResponseObj.users[0].accessLevel, "admin")
	//console.assert(dbResponseObj.users[0].key === key, "ERR: Key not same %s != %s", dbResponseObj.users[0].key, key)




// Integration Test
// Update clientDB with connection string and client ID!!
	clientDb.proto = dbResponseObj.proto
	clientDb.host = dbResponseObj.host
	clientDb.port = dbResponseObj.port

	clientDb.name = dbResponseObj.name
	clientDb.users = dbResponseObj.users
	clientDb.clientId = 123
	clientDbCtrl.setDb(clientDb.name).init()	// As we are working off bootstap setting which is defaulted to IoTTech!!
	var clientDbResponseObj = new crudIt(clientDbCtrl, "Adding Client DB").setPayload(clientDb).post()

// Integration Test
// Bootstrap
// Where : Every Pay - This is a new bootStrap
	clientDbResponseObj = new crudIt(clientDbCtrl, "Retrieving Client DB Settings").setPayload("{\"clientId\":" + clientDb.clientId + "}").query()[0]
	proto = clientDbResponseObj.proto
	host = clientDbResponseObj.host
	port = clientDbResponseObj.port

	db = clientDbResponseObj.name
	key = clientDbResponseObj.users[0].key
	users = clientDbResponseObj.users
	//console.log("INF: proto : %s", proto)
	//console.log("INF: host : %s", host)
	//console.log("INF: port : %s", port)
	//console.log("INF: db : %s", db)
	//console.log("INF: key : %s", key)
	//console.log("INF: users : %s", users)

// Now initalize all the end points.

//	clientDbResponseObj = new crudIt(clientDbCtrl, "Retrieving Client Billing Settings").setPayload("{\"clientId\":"+clientId+"}").query()
//	clientDbResponseObj = new crudIt(clientDbCtrl, "Retrieving Client Subscriptions Settings").setPayload("{\"clientId\":"+clientId+"}").query()


} else {
	alert("ERR: No DB available to provision new client - contact support immediatly")
}