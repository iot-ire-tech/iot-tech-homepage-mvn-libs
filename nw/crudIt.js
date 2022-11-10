/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class crudIt {

	constructor(ctrl, msg) {
		this.ctrl = ctrl;
		this.msg = msg;
	}

	setPayload(payload) {

		if (payload instanceof Object) {
			this.payload = JSON.stringify(payload);
		} else
			this.payload = payload;
		return this;
	}
	delByQuery() {
		////console.groupCollapsed(this.msg);
		////console.table(this.payload);
		try {
			this.url = this.ctrl.delsUrl.setQuery(this.payload).build().get();
			this.ctrl.http.setUrl(this.url).del();

//			alert("INF: Deleted By Query (" + this.msg + ") ");
			////console.log("INF: Deleted By Query " + this.msg);

		} catch (e) {
			alert("ERR: Couldnt Delete " + this.msg)
			////console.log("ERR: Stack Error " + e.message)
			////console.log("ERR: Couldnt Delete  " + this.msg)
			return;
		}
		////console.groupEnd()
		return this.response
	}

	delByOId(oid) {
		////console.groupCollapsed(this.msg);
		////console.table(this.payload);
		try {
			this.url = this.ctrl.delUrl.setId(oid).build().get();
			this.ctrl.http.setUrl(this.url).setPayload(this.payload).del()

//			alert("INF: Deleted (" + this.msg + ") ");
		} catch (e) {
			alert("ERR: Couldnt Delete " + this.msg)
			////console.log("ERR: Stack Error " + e.message)
			////console.log("ERR: Couldnt Delete  " + this.msg)
			return;
		}
		////console.groupEnd()
		return this.response
	}
	query() {
		////console.groupCollapsed(this.msg)
		try {
			this.url = this.ctrl.getsUrl.setQuery(this.payload).build().get();
			this.response = this.ctrl.http.setUrl(this.url).get().getResponse();
			////console.table(this.response)
		} catch (e) {
			alert("ERR: Couldnt Query " + this.msg)
			////console.log("ERR: Stack Error " + e.message)
			////console.log("ERR: Couldnt Query  " + this.msg)
			return;
		}
		////console.groupEnd()
		return this.response
	}
	queryAll() {
		////console.groupCollapsed(this.msg)
		try {
			this.url = this.ctrl.getssUrl.build().get();
			this.response = this.ctrl.http.setUrl(this.url).get().getResponse();
			////console.table(this.response)
		} catch (e) {
			alert("ERR: Couldnt Query " + this.msg)
			////console.log("ERR: Stack Error " + e.message)
			////console.log("ERR: Couldnt Query  " + this.msg)
			return;
		}
		////console.groupEnd()
		return this.response
	}
	post() {
		////console.groupCollapsed(this.msg)
		////console.table(this.payload)

		try {
			this.url = this.ctrl.postUrl;
			this.response = this.ctrl.http.setUrl(this.url).setPayload(this.payload).post().getResponse();
			this.id = this.response._id.$oid;
//			alert("INF: New (" + this.msg + ") Created")
			////console.log("INF: New " + this.msg + " Create: %s", this.id)

		} catch (e) {
			alert("ERR: Couldnt Create New " + this.msg)
			////console.log("ERR: Stack Error " + e.message)
			////console.log("ERR: Couldnt Create New  " + this.msg)
			return;
		}
		////console.groupEnd()
		return this.response
	}

	// Insert or Modify!!!
// MOD By Mongo Id
	put() {
		////console.groupCollapsed(this.msg)
		////console.table(this.payload)
		try {
			this.url = this.ctrl.putUrl;
			this.response = this.ctrl.http.setUrl(this.url).setPayload(this.payload).put().getResponse();
			this.id = this.response._id.$oid;
//			alert("INF: Existing (" + this.msg + ") Modified")
			////console.log("INF: New " + this.msg + " Create: %s", this.id)

		} catch (e) {
			alert("ERR: Couldnt Create New " + this.msg)
			////console.log("ERR: Stack Error " + e.message)
			////console.log("ERR: Couldnt Create New  " + this.msg)
			return;
		}
		////console.groupEnd()
	}
	putById(id) {
		////console.groupCollapsed(this.msg)
		////console.table(this.payload)
		try {
			this.url = this.ctrl.putUrl.setId(id).build().get();
			this.response = this.ctrl.http.setUrl(this.url).setPayload(this.payload).put().getResponse();
			this.id = this.response._id.$oid;
//			alert("INF: Existing (" + this.msg + ") Modified")
			////console.log("INF: Existing " + this.msg + " Modified: %s", this.id)

		} catch (e) {
			alert("ERR: Couldnt Create New " + this.msg)
			////console.log("ERR: Stack Error " + e.message)
			////console.log("ERR: Couldnt Create New  " + this.msg)
			return;
		}
		////console.groupEnd()
	}

	putByQuery() {
		////console.groupCollapsed(this.msg)
		////console.table(this.payload)
		try {
			this.url = this.ctrl.putsUrl.setQuery(this.payload).build().get();
			this.response = this.ctrl.http.setUrl(this.url).setPayload(this.payload).put().getResponse();
			this.id = this.response._id.$oid;
//			alert("INF: Existing (" + this.msg + ") Modified By Query")
			////console.log("INF: Existing " + this.msg + " Modified: %s", this.id)

		} catch (e) {
			alert("ERR: Couldnt Create New " + this.msg)
			////console.log("ERR: Stack Error " + e.message)
			////console.log("ERR: Couldnt Create New  " + this.msg)
			return;
		}
		////console.groupEnd()
	}

}