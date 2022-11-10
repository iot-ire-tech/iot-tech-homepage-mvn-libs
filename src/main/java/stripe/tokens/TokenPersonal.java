/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.tokens;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Token;
import com.stripe.net.RequestOptions;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;

/**
 */
@WebServlet(name = "AddTokenPerson", urlPatterns = {"/AddTokenPerson"})
public class TokenPersonal extends HttpServlet {

	String s;
	Gson gson;

	PropsReader pr = new PropsReader();
	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadTokenPerson uxPayload;

	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX";		// worked
	String accountIdPlatform = "";					// worked
	String accountId = accountIdPlatform;

	Map<String, Object> tokenParams = new HashMap<>();
	Map<String, Object> individualParams = new HashMap<>();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> entityParams = new HashMap<>();

	Token entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadTokenPerson.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");
			}
			System.out.println("INF: Processing Person Tokens Starting");

//  https://stripe.com/docs/api/persons/create
			tokenParams.put("first_name", "Jane");
			tokenParams.put("last_name", "Doe");

			accountParams.put("individual", tokenParams);
			accountParams.put("tos_shown_and_accepted", true);
			entityParams.put("account", accountParams);
			entity = Token.create(entityParams);

			System.out.println("INF: Processed  Person Tokens Completed");
			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"status\": \"succeeded\" "
				+ "}");
			response.getOutputStream().flush();

		} catch (StripeException ex) {
			Logger.getLogger(TokenPersonal.class.getName()).log(Level.SEVERE, null, ex);
			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
		}
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);

	}

	@Override
	public void init() throws ServletException {

		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		System.out.println(dateFormat.format(date)); //2016/11/16 12:08:43

		// Base Classs
		mailer = new MailCreditCardTransactionUx();
		mailer.setCcDate(dateFormat.format(date));
		mailer.setSubject("INF: Credit Services, Top Up Details");
		mailer.setFrom("billing@mybusinesspal.com");
		mailer.setFromAlias("IOT-Client-Admin");

		// Derived Class
		mailer.setTitle("MyBusinessPal.Com");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new UXPayloadTokenPerson();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadTokenPerson {

	String id;
	String reason;
	int amount;

}
