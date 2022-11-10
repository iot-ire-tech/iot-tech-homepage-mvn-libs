/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.subscriptions;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Subscription;
import com.stripe.model.SubscriptionCollection;
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
import com.models.stripe.entities.EntSubscription;

/**
 */
@WebServlet(name = "SubscriptionList", urlPatterns = {"/SubscriptionList"})
public class SubscriptionList extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntSubscription uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> subParams = new HashMap<>();
	SubscriptionCollection entity;

// Create a subscription on a connected account by performing a standard create subscription call while authenticated as the connected account.
// Again, both the customer and the plan must be defined on the connected account for this to work.
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		uxPayload = gson.fromJson(sb.toString(), EntSubscription.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		if (uxPayload.getAccountId().length() > 0) {
			auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
			System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
			System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
			System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

		}
		System.out.println("INF: Processing Connect Subscriptions");
		// Lets not consider status

//Possible values are incomplete, incomplete_expired, trialing, active, past_due, canceled, or unpaid.
//For collection_method=charge_automatically a subscription moves into incomplete if the initial payment attempt fails.
// A subscription in this state can only have metadata and default_source updated.
// Once the first invoice is paid, the subscription moves into an active state.
// If the first invoice is not paid within 23 hours, the subscription transitions to incomplete_expired.
// This is a terminal state, the open invoice will be voided and no further invoices will be generated.
//A subscription that is currently in a trial period is trialing and moves to active when the trial period is over.
//If subscription collection_method=charge_automatically it becomes past_due when payment to renew it fails and canceled or unpaid (depending on your subscriptions settings) when Stripe has exhausted all payment retry attempts.
//If subscription collection_method=send_invoice it becomes past_due when its invoice is not paid by the due date, and canceled or unpaid if it is still not paid by an additional deadline after that. Note that when a subscription has a status of unpaid, no subsequent invoices will be attempted (invoices will be created, but then immediately automatically closed). After receiving updated payment information from a customer, you may choose to reopen and pay their closed invoices.
		if (uxPayload.getStatus().length() > 0) {
			subParams.put("status", uxPayload.getStatus());
		}

		subParams.put("limit", uxPayload.getLimit());

		
		if (uxPayload.getCustomerId().length() > 0) {
			subParams.put("customer", uxPayload.getCustomerId());
		}

		try {
			if (uxPayload.getAccountId().length() > 0) {
				entity = Subscription.list(subParams, auth);
			} else {
				entity = Subscription.list(subParams);
			}

		} catch (StripeException ex) {
			String err1 = "Invalid status: must be one of active, past_due, unpaid, canceled, incomplete, incomplete_expired, trialing, all, or ended";
			response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
			response.getOutputStream().flush();
			Logger.getLogger(CustomerAdd.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		System.out.println("INF: " + uxPayload.toString());
		System.out.println("INF: " + entity.toJson());
		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processing Connect Subscriptions Completed");
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
		uxPayload = new EntSubscription();

		// Properties
		pr.init("env.comms.properties");
	}
}
