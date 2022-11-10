/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package security.jwt;

/**
 *
 * @author ennisa
 */
class JwtPayload {

	String iss = "LQaEKVkxSO2EuFczf2XI8Q";
	String exp = "1496091964000";

	public String getIss() {
		return iss;
	}

	public void setIss(String iss) {
		this.iss = iss;
	}

	public String getExp() {
		return exp;
	}

	public void setExp(String exp) {
		this.exp = exp;
	}

}
