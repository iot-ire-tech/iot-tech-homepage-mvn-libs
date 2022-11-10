/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.connect.paymentsmethods.externalaccounts;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
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
 * @author ennisa
 */
@WebServlet(name = "ExternalAccountBankCompany", urlPatterns = {"/ExternalAccountBankCompany"})
public class BankAccountCompany extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadBankAccount uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> external_account = new HashMap<>();
	Map<String, Object> entityParams = new HashMap<>();

	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX";
	String accountIdPlatform = "";
	String accountId = accountIdConnect;
	Account entity;
	RequestOptions auth;
	String accountType = "bank_account";

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadBankAccount.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			entity = Account.retrieve(accountId, auth);
			System.out.println("INF: Processed External Accounts(Bank) Starting");
// Accepting Account that are custom built
// https://stripe.com/docs/api/accounts/retrieve
			external_account.put("object", accountType);
			external_account.put("country", "IE");
//			external_account.put("country", "US");
			external_account.put("currency", "eur");
//			external_account.put("currency", "usd");
			external_account.put("account_holder_name", "Anthony Ennis(US)");
			external_account.put("account_holder_type", "company"); // or individual

			// https://stripe.com/docs/connect/testing
			// US
//			external_account.put("account_number", "000111111116");
//			external_account.put("routing_number", "110000000");
			// IE
			external_account.put("account_number", "IE89370400440532013000");
			external_account.put("routing_number", "110000000");

			entityParams.put("external_account", external_account);
//  default_for_currency cannot be set to false, instead set a new bank account with the same currency to true
			entityParams.put("default_for_currency", true); // true/false

			// https://stripe.com/docs/api/external_account_bank_accounts/create
			entity.getExternalAccounts().create(entityParams);

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"status\": \"succeeded\" "
				+ "}");

			System.out.println("INF: Processed External Accounts(Bank) Completed");
		} catch (StripeException ex) {
			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
			Logger.getLogger(BankAccountCompany.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new UXPayloadBankAccount();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadBankAccount {

	String id;
	String reason;
	int amount;

}
