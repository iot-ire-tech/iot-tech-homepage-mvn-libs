/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.invoices;

import stripe.billing.creditNote.*;
import stripe.billing.coupons.*;
import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Coupon;
import com.stripe.model.CreditNote;
import com.stripe.model.Invoice;
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
 * Invoices are statements of amounts owed by a customer, and are either
 * generated one-off, or generated periodically from a subscription.
 */
@WebServlet(name = "Invoices", urlPatterns = {"/Invoices"})
public class Invoices extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadInvoice uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	Invoice entity;

// Create a subscription on a connected account by performing a standard create subscription call while authenticated as the connected account.
// Again, both the customer and the plan must be defined on the connected account for this to work.
	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX";
	String accountIdPlatform = "";
	String accountId = accountIdConnect;
	String connectPlanId = "plan_FFqVhKhNpHW83L";
	String connectCustId = "cus_FFqRXWdDWU7Uhj";
	String custId = connectCustId;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		System.out.println("INF: Processing Coupon");
		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadInvoice.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			entityParams.put("customer", custId);
			//  com.stripe.exception.InvalidRequestException: Nothing to invoice for customer; code: invoice_no_customer_line_items
			// Need....

			if (accountId.length() > 0) {
				entity = Invoice.create(entityParams, auth);
			} else {
				entity = Invoice.create(entityParams, auth);
			}

			System.out.println("INF: Id (" + entity.getId() + ")");

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"status\": \"succeeded\" "
				+ "}");

			System.out.println("INF: Processing Coupon Completed");
		} catch (StripeException ex) {
			Logger.getLogger(Invoices.class.getName()).log(Level.SEVERE, null, ex);

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
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
		uxPayload = new UXPayloadInvoice();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadInvoice {

	String id;
	String reason;
	int amount;

}
