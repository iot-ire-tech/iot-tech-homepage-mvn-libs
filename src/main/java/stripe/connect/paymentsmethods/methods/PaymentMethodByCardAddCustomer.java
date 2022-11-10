/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.connect.paymentsmethods.methods;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.model.Payout;
import com.stripe.net.RequestOptions;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
 * @author ennisa
 *
 * PaymentMethod objects represent your customer's payment instruments.
 *
 * They can be used with 1. PaymentIntents to collect payments or 2. saved to
 * Customer objects to store instrument details for future payments.
 *
 */
@WebServlet(name = "PayoutMethodByCardAddCustomer", urlPatterns = {"/PayoutMethodByCardAddCustomer"})
public class PaymentMethodByCardAddCustomer extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadPaymentMethodAddCustomer uxPayload;
	String responseLoad;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	ArrayList<String> paymentMethodTypes = new ArrayList<>();
	// https://dashboard.stripe.com/acct_1ElKMUEUIbzLqhwX/test/customers/cus_FFqRXWdDWU7Uhj
	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX"; 	// Test : Connect Account -
	String accountId = accountIdConnect;

	String destinationIdCard = "card_1Em3ylEUIbzLqhwX5Si0byjV";
	String destinationIdBank = "ba_1Em3ZgEUIbzLqhwXWozjvhxx"; // TSB Account
	String paymentMethodId = "pm_1ErqBsEUIbzLqhwX6IyexdjF";
	String customerId = "cus_FFqRXWdDWU7Uhj";

	PaymentMethod entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadPaymentMethodAddCustomer.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			System.out.println("INF: Processed PaymentMethod(Card) To Customer Starting");
// https://stripe.com/docs/api/payment_methods/attach

			entity = PaymentMethod.retrieve(paymentMethodId, auth);
			entityParams.clear();
			entityParams.put("customer", customerId);
			entity = entity.attach(entityParams, auth);

			responseLoad = entity.toJson();
			response.getOutputStream().print(responseLoad);

			System.out.println("INF: Processed PaymentMethod(Card) To Customer Completed");
		} catch (StripeException ex) {
			response.getOutputStream().print("{ "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
			Logger.getLogger(PaymentMethodByCardAddCustomer.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new UXPayloadPaymentMethodAddCustomer();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadPaymentMethodAddCustomer {

	String id;
	String reason;
	int amount;

}

/*

 */
