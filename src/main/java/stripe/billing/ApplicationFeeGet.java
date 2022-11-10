/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Refund;
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
import stripe.customer.CustomerAdd;
import com.models.stripe.entities.EntRefund;

/**
 * @author ennisa
 *
 * Creating a new refund will refund a charge that has previously been created but not yet refunded.
 *
 *
 * Funds will be refunded to the credit or debit card that was originally charged. You can optionally refund only part of a charge. You can do so multiple times, until the entire charge has been refunded. Once entirely refunded, a charge can’t be refunded again.
 *
 * This method will throw an error when called on an already-refunded charge, or when trying to refund more money than is left on a charge.
 *
 */
@WebServlet(name = "ApplicationFeeGet", urlPatterns = {"/ApplicationFeeGet"})
public class ApplicationFeeGet extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntRefund uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();

	Refund entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		uxPayload = gson.fromJson(sb.toString(), EntRefund.class);
		Stripe.apiKey = pr.setKey("key").getVal();

		if (uxPayload.getAccountId().length() > 0) {
			auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
			System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
			System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
			System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

		}
		System.out.println("INF: Processed Refund Starting");
		entityParams.put("limit", uxPayload.getChargeId());
		entityParams.put("charge", uxPayload.isReturnAppFee());

		try {
			if (uxPayload.getAccountId().length() > 0) {
				entity = Refund.create(entityParams, auth);
			} else {
				entity = Refund.create(entityParams);
			}

		} catch (StripeException ex) {
			System.out.println("ERR: " + ex.getMessage());
			System.out.println("INF: Payload" + gson.toJson(uxPayload));
			Logger.getLogger(CustomerAdd.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		System.out.println("INF: Payload" + gson.toJson(uxPayload));
		System.out.println("INF: " + entity.toJson());
		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processed Refund Completed");
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
		uxPayload = new EntRefund();

		// Properties
		pr.init("env.comms.properties");
	}
}
