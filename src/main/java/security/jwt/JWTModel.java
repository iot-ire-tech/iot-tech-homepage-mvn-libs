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
public class JWTModel {

	String secret = "5NhNDqMOJR1o5HXYTU1wNIzYw2bTH3fZXdts";
	String apikey = "LQaEKVkxSO2EuFczf2XI8Q";
	JwtHeader header = new JwtHeader();
	JwtPayload payload = new JwtPayload();
	JwtSignature signature = new JwtSignature();

	public String getApikey() {
		return apikey;
	}

	public void setApikey(String apikey) {
		this.apikey = apikey;
	}

	public String getSecret() {
		return secret;
	}

	public void setSecret(String secret) {
		this.secret = secret;
	}

	public JwtHeader getHeader() {
		return header;
	}

	public void setHeader(JwtHeader header) {
		this.header = header;
	}

	public JwtPayload getPayload() {
		return payload;
	}

	public void setPayload(JwtPayload payload) {
		this.payload = payload;
	}

	public JwtSignature getSignature() {
		return signature;
	}

	public void setSignature(JwtSignature signature) {
		this.signature = signature;
	}

}
