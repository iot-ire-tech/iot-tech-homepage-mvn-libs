/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package start;

/**
 *
 * @author ae
 */
public class UxSession {

	String session_id;
	String session_idOrg;
	String 	user_fname;
	String 	user_name;	

	public UxSession() {
	}

	public String getSession_id() {
		return session_id;
	}

	public void setSession_id(String session_id) {
		this.session_id = session_id;
	}

	public String getSession_idOrg() {
		return session_idOrg;
	}

	public void setSession_idOrg(String session_idOrg) {
		this.session_idOrg = session_idOrg;
	}

	public String getUser_fname() {
		return user_fname;
	}

	public void setUser_fname(String user_fname) {
		this.user_fname = user_fname;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public void showDetail() {

		System.out.println("\n********* UxSession Details ************");
		System.out.println("INF: getSession_id (" + getSession_id()+")");
		System.out.println("INF: getSession_idOrg (" + getSession_idOrg()+")");
		System.out.println("INF: getUser_fname (" + getUser_fname()+")");
		System.out.println("INF: getUser_name (" + getUser_name()+")");
	}
	
}
