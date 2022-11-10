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
import com.models.stripe.entities.EntSourceSepa;

/**
 */
@WebServlet(name = "AddSourceSepa", urlPatterns = {"/AddSourceSepa"})
public class SourceSepa extends HttpServlet {

	String s;
	Gson gson;

	PropsReader pr = new PropsReader();
	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntSourceSepa uxPayload;

	LinkedHashMap<String, Object> entityParams = new LinkedHashMap<>();
	LinkedHashMap<String, Object> sepaParams = new LinkedHashMap<>();
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
		uxPayload = gson.fromJson(sb.toString(), EntSourceSepa.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		if (uxPayload.getAccountId().length() > 0) {
			auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
			System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
			System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
			System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

		}
		// https://stripe.com/docs/api/sources/create
		System.out.println("INF: Processing  SEPA Debit Payment Starting");
		entityParams.clear();
		sepaParams.clear();
		ownerParams.clear();

		// https://stripe.com/docs/sources/sepa-debit
		// Source
		entityParams.put("type", "sepa_debit");
		entityParams.put("statement_descriptor", "iot-tech");

//		entityParams.put("amount", uxPayload.getTransaction().getAmount());
		if (uxPayload.getTokenId().length() > 0) {
			entityParams.put("token", uxPayload.getTokenId());
		} else {
			sepaParams.put("iban", uxPayload.getBank().getAccountNumber());
			entityParams.put("sepa_debit", sepaParams);
		}

		ownerParams.put("name", uxPayload.getPerson().getFullName());
		ownerParams.put("email", uxPayload.getPerson().getEmail());
		entityParams.put("currency", "eur");
		entityParams.put("owner", ownerParams);

// Additional Params - but not needed
//		acceptance.put("status", "accepted");
//		mandate.put("acceptance", acceptance);
//		mandate.put("notification_method", "email");
//		entityParams.put("mandate", mandate);
//		entityParams.put("flow", uxPayload.getCc().getFlow());
//		entityParams.put("usage", uxPayload.getCc().getUsage());
		try {
			if (uxPayload.getAccountId().length() > 0) {
				// Connect Account, SEPA Payment
				entity = Source.create(entityParams, auth);
			} else {
				// Platform Account, SEPA Payment
				entity = Source.create(entityParams);
			}
		} catch (StripeException ex) {
			System.out.println("ERR: Error Message: " + ex.getMessage());
			System.out.println("ERR: Payload: " + gson.toJson(uxPayload));
			Logger.getLogger(SourceSepa.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new EntSourceSepa();

		// Properties
		pr.init("env.comms.properties");
	}
}
