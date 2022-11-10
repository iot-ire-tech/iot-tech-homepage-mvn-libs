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
@WebServlet(name = "PayoutMethodByCard", urlPatterns = {"/PayoutMethodByCard"})
public class PaymentMethodByCard extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadPaymentMethod uxPayload;
	String responseLoad;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	ArrayList<String> paymentMethodTypes = new ArrayList<>();
	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX"; 	// Test : Connect Account - Works
	String accountId = accountIdConnect;

	String destinationIdCard = "card_1Em3ylEUIbzLqhwX5Si0byjV";
	String destinationIdBank = "ba_1Em3ZgEUIbzLqhwXWozjvhxx"; // TSB Account /
	String destinationId = destinationIdCard;
	PaymentMethod entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadPaymentMethod.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			System.out.println("INF: Processed PaymentMethod(Card) Starting");
// https://stripe.com/docs/api/payment_methods/create

			Map<String, Object> paymentmethodParams = new HashMap<String, Object>();

			entityParams.clear();
			paymentmethodParams.put("type", "card");
			entityParams.put("number", "4242424242424242");
			entityParams.put("exp_month", 7);
			entityParams.put("exp_year", 2020);
			entityParams.put("cvc", "314");
			paymentmethodParams.put("card", entityParams);

			entity = PaymentMethod.create(paymentmethodParams, auth);

			responseLoad = entity.toJson();
			response.getOutputStream().print(responseLoad);

			System.out.println("INF: Processed PaymentMethod(Card) Completed");
		} catch (StripeException ex) {
			response.getOutputStream().print("{ "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
			Logger.getLogger(PaymentMethodByCard.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new UXPayloadPaymentMethod();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadPaymentMethod {

	String id;
	String reason;
	int amount;

}

/*

{
billing_details: {
address: {
city: null,
country: null,
line1: null,
line2: null,
postal_code: null,
state: null,
},
email: null,
name: null,
phone: null,
},
card: {
brand: "visa",
checks: {
address_line1_check: null,
address_postal_code_check: null,
cvc_check: "unchecked",
},
country: "US",
description: null,
exp_month: 7,
exp_year: 2020,
fingerprint: "aGsl5tKO8Gk4lIQy",
funding: "credit",
iin: null,
issuer: null,
last4: "4242",
three_d_secure_usage: {
supported: true
},
wallet: null,
},
card_present: null,
created: 1562090092,
customer: null,
id: "pm_1ErqBsEUIbzLqhwX6IyexdjF",
livemode: false,
metadata: { },
object: "payment_method",
type: "card",
}

 */
