/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.sources;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Source;
import com.stripe.net.RequestOptions;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;
import stripe.tokens.TokenCard;
import com.models.stripe.entities.EntBankAch;

/**
 */
@WebServlet(name = "AddSourceACH", urlPatterns = {"/AddSourceACH"})
public class SourceACH extends HttpServlet {

	String s;
	Gson gson;

	PropsReader pr = new PropsReader();
	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntBankAch uxPayload;

	LinkedHashMap<String, Object> entityParams = new LinkedHashMap<>();
	LinkedHashMap<String, Object> bankParams = new LinkedHashMap<>();
	LinkedHashMap<String, Object> ownerParams = new LinkedHashMap<>();
	LinkedHashMap<String, Object> mandate = new LinkedHashMap<>();
	LinkedHashMap<String, Object> acceptance = new LinkedHashMap<>();

	Source entity = new Source();
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		uxPayload = gson.fromJson(sb.toString(), EntBankAch.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		if (uxPayload.getAccountId().length() > 0) {
			auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
			System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
			System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
			System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

		}
		// https://stripe.com/docs/api/sources/create
		System.out.println("INF: Processing  ACH Payment Starting");
		entityParams.clear();
		bankParams.clear();
		ownerParams.clear();

		entityParams.put("type", "ach_credit_transfer");

//		bankParams.put("account_holder_name", uxPayload.getAccountHolderName());
//		bankParams.put("account_holder_type", uxPayload.getAccountHolderType());	// Works
		// BIC
//		bankParams.put("routing_number", uxPayload.getRoutingNumber());
//		bankParams.put("account_number", uxPayload.getAccountNumber());
//		entityParams.put("bank_account", bankParams);
		entityParams.put("currency", "usd");
		ownerParams.put("name", uxPayload.getPerson().getFullName() + " with OrderEnforced");
		ownerParams.put("email", uxPayload.getPerson().getEmail());
		entityParams.put("owner", ownerParams);

		acceptance.put("status", "accepted");
		mandate.put("acceptance", acceptance);
		mandate.put("notification_method", "email");
		entityParams.put("mandate", mandate);

		try {
			if (uxPayload.getAccountId().length() > 0) {
				// Connect Account, SEPA Payment
				entity = Source.create(entityParams, auth);
			} else {
				// Platform Account, SEPA Payment
				entity = Source.create(entityParams);
			}
		} catch (StripeException ex) {
//ERR: Error Message: When creating or updating a Source with mandate[notification_method] `email`
// ERR: Error Message: Invalid currency: eur. The payment method `ach_credit_transfer` only supports the following currencies: usd.
// ERR: Error Message: The payment method `ach_credit_transfer` requires the parameter: currency.
			System.out.println("ERR: Error Message: " + ex.getMessage());
			response.getOutputStream().print(entity.toJson());
			Logger.getLogger(TokenCard.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processed SEPA Debit Payment Completed");
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
		uxPayload = new EntBankAch();

		// Properties
		pr.init("env.comms.properties");
	}
}
