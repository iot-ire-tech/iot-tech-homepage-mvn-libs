/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.sources;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentSourceCollection;
import com.stripe.model.Token;
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
import com.models.stripe.entities.EntSource;

/**
 * @author ennisa Customer objects allow you to perform recurring charges to track multiple charges, that are associated with the same customer.
 *
 * The API allows you to create, delete, and update your customers.
 *
 * You can retrieve individual customers as well as a list of all your customers
 *
 */
@WebServlet(name = "CustomerSourcesList", urlPatterns = {"/CustomerSourcesList"})
public class CustomerSourcesList extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntSource uxPayload;
	String responseLoad;

	PropsReader pr = new PropsReader();
	Map<String, Object> cardParams = new HashMap<>();
	PaymentSourceCollection mycards;
	Customer entity;
	Token token;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), EntSource.class);
			Stripe.apiKey = pr.setKey("key").getVal();
// Account Magic

			if (uxPayload.getAccountId().length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
// Builder
			System.out.println("INF: Processed Card Starting");
			if (uxPayload.getAccountId().length() > 0) {
				entity = Customer.retrieve(uxPayload.getCustomerId(), auth);
			} else {
				entity = Customer.retrieve(uxPayload.getCustomerId());
			}

			// bank_account, card
			cardParams.put("object", uxPayload.getObject());
			cardParams.put("limit", 3);

			mycards = entity.getSources().list(cardParams);

		} catch (StripeException ex) {
			System.out.println("ERR: " + ex.getMessage());
			System.out.println("INF: " + gson.toJson(uxPayload));
			Logger.getLogger(CustomerSourcesList.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		System.out.println("INF: " + gson.toJson(mycards));
		System.out.println("INF: " + entity.toJson());
		response.getOutputStream().print(mycards.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processed Card Completed");
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
		uxPayload = new EntSource();

		// Properties
		pr.init("env.comms.properties");
	}
}

/*

{
account_balance: 0,
address: null,
created: 1561577886,
currency: null,
default_source: null,
deleted: null,
delinquent: false,
description: "Customer for jenny.rosen@example.com",
discount: null,
email: null,
id: "cus_FKLd1EwLOHnqFT",
invoice_prefix: "ADD028F6",
invoice_settings: {
custom_fields: null,
default_payment_method: null,
footer: null,
},
livemode: false,
metadata: { },
name: null,
object: "customer",
phone: null,
preferred_locales: [ ],
shipping: null,
sources: {
object: "list",
data: [ ],
has_more: false,
total_count: 0,
url: "/v1/customers/cus_FKLd1EwLOHnqFT/sources",
count: null,
request_options: null,
request_params: null,
},
subscriptions: {
object: "list",
data: [ ],
has_more: false,
total_count: 0,
url: "/v1/customers/cus_FKLd1EwLOHnqFT/subscriptions",
count: null,
request_options: null,
request_params: null,
},
tax_exempt: "none",
tax_ids: {
object: "list",
data: [ ],
has_more: false,
total_count: 0,
url: "/v1/customers/cus_FKLd1EwLOHnqFT/tax_ids",
count: null,
request_options: null,
request_params: null,
},
tax_info: null,
tax_info_verification: null,
}
 */
