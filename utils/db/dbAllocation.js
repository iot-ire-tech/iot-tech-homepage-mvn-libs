/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

 # Leading Motivatoins for concept

 new client joins - what to do...
 * from the pool of preconfigure database of which first one is  company, update config
 * get card details
 * get subscription details
 * billing portions, and frequency

 client leaves - what to do...

 # Roles
 client - notified of leave, inactivity, : analytics
 patron - notified of join, activity : analtyis


 # Model

 var
 # Workflow

 */

// when i create a new client, I will read from this list of preconfigured dbs
var clientDb = {

	"clientId": -1,
	"proto": "https",
	"host": "api.mlab.com",
	"port": "",

	"name": "unknown",
	"users": [
		{"name": "ennisa", "accessLevel": "admin", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"},
		{"name": "ennisa", "accessLevel": "member", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"}
	]
}
var clientDbCollection = [
	{

		"clientId": -1,
		"name": "iottech",
		"users": [
			{"name": "ennisa", "accessLevel": "admin", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"},
			{"name": "ennisa", "accessLevel": "member", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"}
		]
	},
	{

		"clientId": -1,
		"name": "client_a",
		"users": [
			{"name": "ennisa", "accessLevel": "admin", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"},
			{"name": "ennisa", "accessLevel": "member", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"}
		]
	}
	,
	{
		"clientId": -1,
		"name": "client_b",
		"users": [
			{"name": "ennisa", "accessLevel": "admin", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"},
			{"name": "ennisa", "accessLevel": "member", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"}
		]
	}
	,
	{
		"clientId": -1,
		"name": "client_c",
		"users": [
			{"name": "ennisa", "accessLevel": "admin", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"},
			{"name": "ennisa", "accessLevel": "member", "key": "wChTxY0-md5fAEFEIM3tAAGFpwZwgw-q"}
		]
	}

]



class clientDbUtil extends crudIt {

	constructor(ctrl, msg) {
		super(ctrl, msg)
		this.db;
		this.dbs = []
		this.connectionStr = {
			"name": "",
			"user": "",
			"key": ""
		}

	}
	create() {
//

	}
	updateConnectionString() {


	}
	updateDb() {
// you have taken a db for use, not update list of that.
	}

	addUser() {

	}
	setDbAsTaken(dbResponseObj, id) {
		return super.setPayload(dbResponseObj).putById(id)

	}
	getAllDbs() {
		this.dbs = super.queryAll()
		return this
	}
	getMyDb() {
		try {
			var that = this;
			this.dbs.forEach(function (db) {

				if (db.clientId === that.clientId) {
					that.db = db;
					throw "DB Found"
				}

			});
			throw "No DB Found"

		} catch (exception) {

			switch (exception.message) {
				case "DB Found":
					break;

				case "No DB Found":
					break;

				default:

					break;
			}
		}
		return this

	}
	getNextAvailableDb() {
		return super.setPayload("{\"clientId\":-1}").query()[0]
	}
	setEmail() {
		this.email = email;
		return this;
	}
	setClientId() {
		this.clientId = clientId;
		return this;
	}
	getClientDbObj() {
		return super.setPayload("{\"clientId\":" + this.clientId + "}").query()[0]
	}

}
// Info is in iot db, which is not the run time db.

//# sourceURL=db_init.js