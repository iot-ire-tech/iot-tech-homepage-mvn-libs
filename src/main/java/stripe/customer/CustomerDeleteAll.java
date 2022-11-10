/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.customer;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
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
import com.models.stripe.entities.EntCustomer;

/**
 * @author ennisa Customer objects allow you to perform recurring charges to track multiple charges, that are associated with the same customer.
 *
 * The API allows you to create, delete, and update your customers.
 *
 * You can retrieve individual customers as well as a list of all your customers
 *
 */
@WebServlet(name = "CustomerDeleteAll", urlPatterns = {"/CustomerDeleteAll"})
public class CustomerDeleteAll extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntCustomer uxPayload = new EntCustomer();
	String responseLoad;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	CustomerCollection entitys;
	Customer entity;
	int rt = 0;
	Customer last = null;
	Customer previousN_1 = null;
	RequestOptions auth;
	Account account = null;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			Stripe.apiKey = pr.setKey("key").getVal();

			Map<String, Object> entityParams = new HashMap<>();
			entityParams.put("limit", 3);

			while (true) {

				entitys = Customer.list(entityParams);
// Do we have more customer to check

				if (entitys.getData().size() == 0) {
					System.out.println("INF: List Exhausted....All customers deleted");
					return;
				}
				previousN_1 = entitys.getData().get(0);
				for (Customer next : entitys.getData()) {
					next.delete();
					last = next;
				}
			}
// No Match Found

		} catch (StripeException ex) {
			response.getOutputStream().print(gson.toJson(entitys));
			response.getOutputStream().flush();
			Logger.getLogger(CustomerDeleteAll.class.getName()).log(Level.SEVERE, null, ex);
		}
		System.out.println("INF: " + uxPayload.toString());
//		response.getOutputStream().print(gson.toJson(last));
//		response.getOutputStream().flush();

		System.out.println("INF: Processed Customer(X) Completed");
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
		uxPayload = new EntCustomer();

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
