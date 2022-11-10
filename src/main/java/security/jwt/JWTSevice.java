/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.UnsupportedEncodingException;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import io.jsonwebtoken.*;

import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author ennisa
 *
 * https://marketplace.zoom.us/develop/apps/tdGSDmEGTOKVrgni4b4BQg/credentials
 *
 */
// API Key - LQaEKVkxSO2EuFczf2XI8Q Secret - 5NhNDqMOJR1o5HXYTU1wNIzYw2bTH3fZXdts
// JWT token is generated based on granted API Key, API Secret and configured
// Expiration Time.
// You may go to https://jwt.io/ for token generation as well. Expiration Time -
public class JWTSevice {

	JWTModel mymodel = new JWTModel();

	// Miliseconds
	Date dateNow = new Date();
	Date exp = new Date();

	public String getJWT(String payload) {
		String jwt = "";
		try {
			// Header
			// Payload
			// Signature
			long nowMillis = System.currentTimeMillis();
			nowMillis = dateNow.getTime();
			dateNow = new Date(nowMillis);
			long epoch_secs = (nowMillis / 1000);
			long epoch_plus_min = epoch_secs + 60;
			long epoch_plus_hr = epoch_secs + ((60 * 60) * 5);
			exp = new Date(epoch_plus_hr * 1000);

			System.out.println("INF: Date Now (" + dateNow + ")");
			System.out.println("INF: Date Exp (" + exp + ")");
			// Signature
			String secret = mymodel.getSecret();
			String apiKey = mymodel.getApikey();
			SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
			byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secret);
			Key signingKey = new SecretKeySpec(apiKeySecretBytes, secret);

			JwtBuilder builder = Jwts.builder()
				.setSubject("1234567890")
				.setId("58c4044e-03f0-42d2-a1ae-3eb2e6e56286")
				.setIssuedAt(dateNow)
				.setExpiration(exp)
				.claim("iss", "LQaEKVkxSO2EuFczf2XI8Q")
				.signWith(SignatureAlgorithm.HS256, secret.getBytes("UTF-8"));

			jwt = builder.compact();
			System.out.println("INF: JWT (" + jwt + ")");
		} catch (UnsupportedEncodingException ex) {
			Logger.getLogger(JWTSevice.class.getName()).log(Level.SEVERE, null, ex);
		}
		return jwt;
	}

	public static void main(String[] args) {
		JWTSevice myservice = new JWTSevice();
		String email = "tonyennis@yahoo.com";
		String first_name = "tonyennis";
		String payload = "{" + "email=" + email + ", first_name=" + first_name + "}";
		System.out.println("INF: JWT (" + myservice.getJWT(payload) + ")");

	}

	public void old() {

		long epoch_now = dateNow.getTime();
		long epoch_secs = (epoch_now / 1000);
		long epoch_plus_min = epoch_secs + 60;
		long epoch_plus_hr = epoch_secs + (60 * 60);

		System.out.println("INF: epoch_now (" + epoch_now + ")");
		System.out.println("INF:epoch_secs (" + epoch_secs + ")");
		System.out.println("INF: epoch_plus_min (" + epoch_plus_min + ")");
		System.out.println("INF: epoch_plus_hr (" + epoch_plus_hr + ")");
	}

}
