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
import com.models.stripe.entities.*;

/**
 */
@WebServlet(name = "AddTokenBankSepa", urlPatterns = {"/AddTokenBankSepa"})
public class TokenBankSepa extends HttpServlet {

	String s;
	Gson gson;

	PropsReader pr = new PropsReader();
	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntBank uxPayload;

	Map<String, Object> tokenParams = new HashMap<>();
	Map<String, Object> entityParams = new HashMap<>();

	Token entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		uxPayload = gson.fromJson(sb.toString(), EntBank.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		if (uxPayload.getAccountId().length() > 0) {
			auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
			System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
			System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
			System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");
		}
		System.out.println("INF: Processing Bank Tokens Starting");

		tokenParams.clear();
		entityParams.clear();

		// Create Token
		tokenParams.put("country", uxPayload.getCountry());
		tokenParams.put("currency", uxPayload.getTransaction().getCurrency());

		tokenParams.put("account_holder_name", uxPayload.getAccountHolderName());
		tokenParams.put("account_holder_type", uxPayload.getAccountHolderType());
		tokenParams.put("account_number", uxPayload.getAccountNumber());
		entityParams.put("bank_account", tokenParams);

		// Attach Token To Customer (X)
		if (uxPayload.getCustomerId().length() > 0) {
			entityParams.put("customer", uxPayload.getCustomerId());
		}

		try {
			if (uxPayload.getAccountId().length() > 0) {
				entity = Token.create(entityParams, auth);
			} else {
				entity = Token.create(entityParams);
			}

		} catch (StripeException ex) {
			System.out.println("ERR: Error Message: " + ex.getMessage());
			System.out.println("ERR: Payload: " + gson.toJson(entityParams));
			response.getOutputStream().print(gson.toJson(entityParams));
			response.getOutputStream().flush();
			Logger.getLogger(EntBankSepa.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processed Bank Token Completed");
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
		uxPayload = new EntBank();

		// Properties
		pr.init("env.comms.properties");
	}
}
