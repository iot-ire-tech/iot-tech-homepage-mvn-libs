/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.customer;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentSourceCollection;
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
@WebServlet(name = "CustomerUpdate", urlPatterns = {"/CustomerUpdate"})
public class CustomerPut extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntCustomer uxPayload;
	String responseLoad;

	PaymentSourceCollection psc = new PaymentSourceCollection();

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	Map<String, Object> billingAddressParams = new HashMap<>();
	Map<String, Object> addressParms = new HashMap<>();
	Map<String, Object> shippingParams = new HashMap<>();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> invoicePaymentParams = new HashMap<>();
	Customer entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), EntCustomer.class);
			Stripe.apiKey = pr.setKey("key").getVal();
// Account Magic

			if (uxPayload.getAccountId().length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
// Builder
			System.out.println("INF: Processed Customer(X) Starting");
			if (uxPayload.getAccountId().length() > 0) {
				entity = Customer.retrieve(uxPayload.getCustomerId(), auth);
			} else {
				entity = Customer.retrieve(uxPayload.getCustomerId());
			}
			entityParams.clear();
			addressParms.clear();
			// Common Updates

			// Billling
			if (uxPayload.getBilling().getCity().length() > 0) {
				addressParms.put("city", uxPayload.getBilling().getCity());
				addressParms.put("country", uxPayload.getBilling().getCountry());
				addressParms.put("line1", uxPayload.getBilling().getAddressLine1());
				addressParms.put("line2", uxPayload.getBilling().getAddressLine2());
				addressParms.put("postal_code", uxPayload.getBilling().getPostalCode());
				addressParms.put("state", uxPayload.getBilling().getState());
				entityParams.put("address", addressParms);
			}

			// Postal Address
			if (uxPayload.getShipping().getCity().length() > 0) {
				addressParms.put("city", uxPayload.getShipping().getCity());
				addressParms.put("country", uxPayload.getShipping().getCountry());
				addressParms.put("line1", uxPayload.getShipping().getAddressLine1());
				addressParms.put("line2", uxPayload.getShipping().getAddressLine2());
				addressParms.put("postal_code", uxPayload.getShipping().getPostalCode());
				addressParms.put("state", uxPayload.getShipping().getState());
				shippingParams.put("address", addressParms);
				shippingParams.put("name", "iot-tech: " + entity.getName());
				entityParams.put("shipping", shippingParams);
			}

			Map<String, Object> userAccountMap = new HashMap<>();
			if (uxPayload.getUserAccount().getUser().length() > 0) {
				userAccountMap.put("role", uxPayload.getUserAccount().getRole());
				userAccountMap.put("username", uxPayload.getUserAccount().getUser());
				userAccountMap.put("password", uxPayload.getUserAccount().getPass());
				entityParams.put("metadata", userAccountMap);
			}

			if (uxPayload.getPerson().getFullName().length() > 1) {
				entityParams.put("name", uxPayload.getPerson().getFullName());
			}
			if (uxPayload.getPerson().getPhone().length() > 0) {
				entityParams.put("phone", uxPayload.getPerson().getPhone());
			}
			if (uxPayload.getPerson().getEmail().length() > 0) {
				entityParams.put("email", uxPayload.getPerson().getEmail());
			}

// Revenue
			if (uxPayload.getBalance() > 0) {
				entityParams.put("balance", uxPayload.getBalance());
			}
			if (uxPayload.getCouponId().length() > 0) {
				entityParams.put("coupon", uxPayload.getCouponId());
			}

// A Token’s or a Source’s ID, as returned by Elements
			if (uxPayload.getSourceId().length() > 0) {
				entityParams.put("source", uxPayload.getSourceId());
			} else if (uxPayload.getTokenId().length() > 0) {
				entityParams.put("source", uxPayload.getTokenId());
			}
			// Failse
			if (uxPayload.getDefaultSource().length() > 0) {
				invoicePaymentParams.put("default_payment_method", uxPayload.getDefaultSource());
				entityParams.put("invoice_settings", invoicePaymentParams);
			}

			if (uxPayload.getAccountId().length() > 0) {
				entity = entity.update(entityParams, auth);
			} else {
				entity = entity.update(entityParams);
			}

		} catch (StripeException ex) {
			System.out.println("ERR: " + ex.getMessage());
			System.out.println("INF: " + gson.toJson(uxPayload));
			Logger.getLogger(CustomerPut.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		System.out.println("INF: " + uxPayload.toString());
		System.out.println("INF: " + entity.toJson());

		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
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
