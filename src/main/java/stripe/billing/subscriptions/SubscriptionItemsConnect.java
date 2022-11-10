/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.subscriptions;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.SubscriptionItem;
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
 * SubscriptionItemsConneS
 */
@WebServlet(name = "SubscriptionItemsConnect", urlPatterns = {"/SubscriptionItemsConnect"})
public class SubscriptionItemsConnect extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadSubscription uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> item = new HashMap<>();
	Map<String, Object> items = new HashMap<>();
	Map<String, Object> subParams = new HashMap<>();
	SubscriptionItem sub;

	// https://dashboard.stripe.com/acct_1ElKMUEUIbzLqhwX/test/plans/plan_FFqVhKhNpHW83L
	// https://dashboard.stripe.com/acct_1ElKMUEUIbzLqhwX/test/subscriptions/sub_FG828uhaLeOudf
	// https://dashboard.stripe.com/acct_1ElKMUEUIbzLqhwX/test/subscriptions/sub_FG7pMMHE7k2Xqy
	String connectAccountId = "acct_1ElKMUEUIbzLqhwX";
	String subscriptionId = "sub_FG828uhaLeOudf";
	//  com.stripe.exception.InvalidRequestException: Cannot add multiple subscription items with the same plan: plan_FFqVhKhNpHW83L
	String planId = "plan_FFqVhKhNpHW83L";
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadSubscription.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			auth = RequestOptions.builder().setStripeAccount(connectAccountId).build();
			System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
			System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
			System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

// https://stripe.com/docs/connect/subscriptions
			System.out.println("INF: Processing Connect Subscriptions");
			subParams.put("subscription", subscriptionId);
			subParams.put("plan", planId);
			subParams.put("quantity", 2);

			sub = SubscriptionItem.create(subParams, auth);

			System.out.println("INF: Id (" + sub.getId() + ")");

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + sub.getId() + "\", "
				+ "\"status\": \"succeeded\" "
				+ "}");

			System.out.println("INF: Processing Connect Subscriptions Completed");
		} catch (StripeException ex) {
			Logger.getLogger(SubscriptionItemsConnect.class.getName()).log(Level.SEVERE, null, ex);

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + sub.getId() + "\", "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
		}
		response.getOutputStream().flush();
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
		uxPayload = new UXPayloadSubscription();

		// Properties
		pr.init("env.comms.properties");
	}
}
