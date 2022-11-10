/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.payments.destination;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
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
import com.models.stripe.entities.EntChargeDestination;

/**
 */
@WebServlet(name = "AddDestinationCharge", urlPatterns = {"/AddDestinationCharge"})
public class DestinationCharge extends HttpServlet {

	String s;
	Gson gson;

	PropsReader pr = new PropsReader();
	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntChargeDestination uxPayload;

	LinkedHashMap<String, Object> entityParams = new LinkedHashMap<>();
	LinkedHashMap<String, Object> transferDataParams = new LinkedHashMap<>();

	Charge entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			System.out.println("INF: JSON S  (" + s + ")");
			sb.append(s);
		}
		System.out.println("INF: JSON SB (" + sb + ")");
		uxPayload = gson.fromJson(sb.toString(), EntChargeDestination.class);
		Stripe.apiKey = pr.setKey("key").getVal();

		// Platform Only with connect Id
		System.out.println("INF: Processing Direct Charges On Account(" + uxPayload.getAccountId() + ") Starting");
		entityParams.clear();
// Transaction
		entityParams.put("currency", uxPayload.getTransaction().getCurrency());
		entityParams.put("amount", uxPayload.getTransaction().getAmount());

		entityParams.put("statement_descriptor", uxPayload.getTransaction().getDescription());
		entityParams.put("statement_descriptor_suffix", "iot-product");

// Charge Customer if no customer the charge is on the account!
		if (uxPayload.getCustomerId().length() > 0) {
			entityParams.put("customer", uxPayload.getCustomerId());
		}
//		https://stripe.com/docs/api/charges/create#create_charge-source
		// Payment Source
		if (uxPayload.getAccountId().length() > 0) {
			// Connected Account
			entityParams.put("source", uxPayload.getAccountId());
		} else if (uxPayload.getBankId().length() > 0) {
			// Customer/Acccount BA ?
			entityParams.put("source", uxPayload.getBankId());
		} else if (uxPayload.getSourceId().length() > 0) {
			entityParams.put("source", uxPayload.getSourceId());
		} else if (uxPayload.getTokenId().length() > 0) {
			entityParams.put("source", uxPayload.getTokenId());
		}
//
//
//
		if (uxPayload.getEmailReceipt().length() > 0) {
			entityParams.put("receipt_email", uxPayload.getEmailReceipt());
		}

		try {
			entity = Charge.create(entityParams);

		} catch (StripeException ex) {
			System.out.println("ERR: Payload: " + gson.toJson(uxPayload));
			System.out.println("ERR: Error Message: " + ex.getMessage());
			// Error Catalogue / Failure codes , Responses.
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			response.getOutputStream().print(entity.toJson());
			response.getOutputStream().flush();
			Logger.getLogger(DestinationCharge.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processed Completed");
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
		uxPayload = new EntChargeDestination();

		// Properties
		pr.init("env.comms.properties");
	}
}
