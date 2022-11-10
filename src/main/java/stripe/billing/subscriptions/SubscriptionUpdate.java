/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.subscriptions;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Subscription;
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
@WebServlet(name = "SubscriptionUpdate", urlPatterns = {"/SubscriptionUpdate"})
public class SubscriptionUpdate extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntSubscription uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> item = new HashMap<>();
	Map<String, Object> items = new HashMap<>();
	Map<String, Object> subParams = new HashMap<>();
	Charge charge;
	Subscription entity;

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
		// Updatables!!
		if (uxPayload.isCancelAtPeriodEnd()) {
			subParams.put("cancel_at_period_end", uxPayload.isCancelAtPeriodEnd());
		} else {
			subParams.put("collection_method", uxPayload.isCancelAtPeriodEnd());
		}

		if (uxPayload.getCouponId() == null) {
		} else {
			subParams.put("coupon", uxPayload.getCouponId());
		}
		if (uxPayload.getCollectionMethod() == null) {
		} else {
			subParams.put("collection_method", uxPayload.getCollectionMethod());
		}
		if (uxPayload.getDueDateDays() != 0) {
		} else {
			subParams.put("collection_method", uxPayload.getDueDateDays());
		}

		try {
			entity = Subscription.retrieve(uxPayload.getSubscriptionId());
			if (uxPayload.getAccountId().length() > 0) {
				entity = entity.update(subParams, auth);
			} else {
				entity = entity.update(subParams);
			}

		} catch (StripeException ex) {
			System.out.println("INF: Ex=> " + ex.getMessage());
			System.out.println("INF: Payload => " + uxPayload.toString());
			response.sendError(HttpServletResponse.SC_ACCEPTED, ex.getMessage());
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
