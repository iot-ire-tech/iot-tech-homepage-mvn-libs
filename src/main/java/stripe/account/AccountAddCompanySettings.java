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
import com.stripe.model.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
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
@WebServlet(name = "AccountAddCompanySettings", urlPatterns = {"/AccountAddCompanySettings"})
public class AccountAddCompanySettings extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	AccountAddCompanySetting uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> external_account = new HashMap<String, Object>();
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

		uxPayload = gson.fromJson(sb.toString(), AccountAddCompanySetting.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		accountParams.clear();
		account = Account.retrieve(uxPayload.getId());
		System.out.println("INF: Account Id (" + uxPayload.getId() + ")");

// Update!!!
// https://stripe.com/docs/api/accounts/object#account_object-external_accounts-data-account
		settings_card_payments_declineOn.put("avs_failure", false);
		settings_card_payments_declineOn.put("cvc_failure", false);
		settings_card_payments.put("decline_on", settings_card_payments_declineOn);
		settings.put("card_payments", settings_card_payments);
		accountParams.put("settings", settings);

// https://stripe.com/docs/connect/updating-accounts#tos-acceptance
		tos_acceptance.put("date", (long) System.currentTimeMillis() / 1000L);
		tos_acceptance.put("ip", "79.97.73.251"); // request.getRemoteAddr()
		accountParams.put("tos_acceptance", tos_acceptance);

		account.update(accountParams);
// https://stripe.com/docs/api/accounts/create

		response.getOutputStream().print("{ "
			+ "\"id\": \"" + account.getId() + "\", "
			+ "\"country\": \"" + account.getCountry() + "\", "
			+ "\"email\": \"" + account.getEmail() + "\", "
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
			Logger.getLogger(AccountAddCompanySettings.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompanySettings.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new AccountAddCompanySetting();

		// Properties
		pr.init("env.comms.properties");
	}
}

class AccountAddCompanySetting {

	String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
