/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.account;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
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
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java
@WebServlet(name = "AccountDelete", urlPatterns = {"/AccountDelete"})
public class AccountDelete extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadAccountDelete uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> accountParams = new HashMap<String, Object>();
	Map<String, Object> company = new HashMap<String, Object>();
	Map<String, Object> business_profile = new HashMap<String, Object>();
	Map<String, Object> company_address = new HashMap<String, Object>();
	Map<String, Object> person_address = new HashMap<String, Object>();
	Map<String, Object> external_account = new HashMap<String, Object>();
	Map<String, Object> individual = new HashMap<String, Object>();
	Map<String, Object> individual_address = new HashMap<String, Object>();
	Map<String, Object> dob = new HashMap<String, Object>();
	Map<String, Object> settings = new HashMap<String, Object>();
	Map<String, Object> settings_card_payments = new HashMap<String, Object>();
	Map<String, Object> settings_card_payments_declineOn = new HashMap<String, Object>();
	Map<String, Object> tos_acceptance = new HashMap<String, Object>();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		Account account = null;

		uxPayload = gson.fromJson(sb.toString(), UXPayloadAccountDelete.class);
		Stripe.apiKey = pr.setKey("key").getVal();

		// These are live accounts!!!! need live keys
		account = Account.retrieve("acct_1Gf3pJE40n8epEhe", null).delete();
		account = Account.retrieve("acct_1GenNJJcPa9DsCb2", null).delete();

		response.getOutputStream().print("{ "
			+ "\"id\": \"" + account.getId() + "\", "
			+ "\"type\": \"" + account.getType() + "\" "
			+ "}");
		response.getOutputStream().flush();

		System.out.println("INF: Processed Account Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountDelete.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountDelete.class.getName()).log(Level.SEVERE, null, ex);
		}

	}

	@Override
	public void init() throws ServletException {

		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		System.out.println(dateFormat.format(date)); //2016/11/16 12:08:43

		// Base Classs
		mailer = new MailCreditCardTransactionUx();
		mailer.setCcDate(dateFormat.format(date));
		mailer.setSubject("INF: Payment Services, Account Details");
		mailer.setFrom("billing@mybusinesspal.com");
		mailer.setFromAlias("IOT-Client-Admin");

		// Derived Class
		mailer.setTitle("MyBusinessPal.Com");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new UXPayloadAccountDelete();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadAccountDelete {

	String country;
	String businessUrl;
	String email;

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getBusinessUrl() {
		return businessUrl;
	}

	public void setBusinessUrl(String businessUrl) {
		this.businessUrl = businessUrl;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
