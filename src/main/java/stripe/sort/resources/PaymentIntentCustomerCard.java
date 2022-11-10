/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.sort.resources;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
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
 * @author ennisa A PaymentIntent guides you through the process of collecting a
 * payment from your customer. We recommend that you create exactly one
 * PaymentIntent for each order or customer session in your system. You can
 * reference the PaymentIntent later to see the history of payment attempts for
 * a particular session.
 *
 * A PaymentIntent transitions through multiple statuses throughout its lifetime
 * as it interfaces with Stripe.js to perform authentication flows and
 * ultimately creates at most one successful charge
 *
 * After the PaymentIntent is created, attach a payment method and confirm to
 * continue the payment. You can read more about the different payment flows
 * available via the Payment Intents API here.
 *
 * When confirm=true is used during creation, it is equivalent to creating and
 * confirming the PaymentIntent in the same call. You may use any parameters
 * available in the confirm API when confirm=true is supplied.
 *
 */
@WebServlet(name = "PaymentIntentCardByCustomer", urlPatterns = {"/PaymentIntentCardByCustomer"})
public class PaymentIntentCustomerCard extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadPaymentIntentByCustomer uxPayload;
	String responseLoad;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	ArrayList<String> paymentMethodTypes = new ArrayList<>();
	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX"; 	// Test : Connect Account - Works
	String accountIdPlatform = "";				// Test : Connect Account - No Tested
	String accountId = accountIdConnect;
	String customerIdConnect = "cus_FFqRXWdDWU7Uhj";					// Test: Works.
	String customerIdPlatform = "";					// Test: No Tested
	String customerId = customerIdConnect;					// Test:
	PaymentIntent entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadPaymentIntentByCustomer.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			System.out.println("INF: Processed Payment Intent(X) Starting");
// https://stripe.com/docs/api/customers/create
			entityParams.clear();
			entityParams.put("description", "Customer for jenny.rosen@example.com");
			entityParams.put("amount", 200);
			entityParams.put("currency", "eur");
			entityParams.put("customer", customerId);
			paymentMethodTypes.add("card");
			entityParams.put("payment_method_types", paymentMethodTypes);

			entity = PaymentIntent.create(entityParams, auth);
			responseLoad = entity.toJson();
			response.getOutputStream().print(responseLoad);

			System.out.println("INF: Processed Payment Intent(X) Completed");
		} catch (StripeException ex) {
			response.getOutputStream().print("{ "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
			Logger.getLogger(PaymentIntentCustomerCard.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new UXPayloadPaymentIntentByCustomer();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadPaymentIntentByCustomer {

	String id;
	String reason;
	int amount;

}

/*

{
amount: 200,
amount_capturable: 0,
amount_received: 0,
application: "ca_CaZVaBQTyeoq9ZaikzUoYmS9s9LKibOT",
application_fee_amount: null,
canceled_at: null,
cancellation_reason: null,
capture_method: "automatic",
charges: {
object: "list",
data: [ ],
has_more: false,
total_count: 0,
url: "/v1/charges?payment_intent=pi_1EqeuyEUIbzLqhwXa93u1XUk",
count: null,
request_options: null,
request_params: null,
},
client_secret: "pi_1EqeuyEUIbzLqhwXa93u1XUk_secret_mRCpMPbJACB8hLJppOfz8I8zf",
confirmation_method: "automatic",
created: 1561808432,
currency: "eur",
customer: "cus_FFqRXWdDWU7Uhj",
description: "Customer for jenny.rosen@example.com",
id: "pi_1EqeuyEUIbzLqhwXa93u1XUk",
invoice: null,
last_payment_error: null,
livemode: false,
metadata: { },
next_action: null,
object: "payment_intent",
on_behalf_of: null,
payment_method: null,
payment_method_types: [
"card"
],
receipt_email: null,
review: null,
shipping: null,
source: null,
statement_descriptor: null,
status: "requires_payment_method",
transfer_data: null,
transfer_group: null,
}

 */
