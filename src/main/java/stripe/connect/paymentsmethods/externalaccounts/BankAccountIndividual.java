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
import com.stripe.model.Customer;
import com.stripe.model.PaymentSource;
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

/**
 * @author ennisa
 */
@WebServlet(name = "ExternalAccountBankIndividual", urlPatterns = {"/ExternalAccountBankIndividual"})
public class BankAccountIndividual extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadBankAccountIndivual uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> bankDictionary = new HashMap<>();
	Map<String, Object> tokenParams = new HashMap<>();
	Map<String, Object> entityParams = new HashMap<>();

	// https://stripe.com/docs/connect/testing
// TETSCAE :	https://dashboard.stripe.com/test/connect/accounts/acct_1ElKMUEUIbzLqhwX
// TESTCASE : 	https://dashboard.stripe.com/acct_1ElKMUEUIbzLqhwX/test/customers/cus_FFqRXWdDWU7Uhj
	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX";
	String accountIdPlatform = "";
	String accountId = accountIdConnect;
	String customerId = "cus_FFqmhd5hqKvwj6";					// Test:

	RequestOptions auth;
	String accountType = "bank_account";
	Customer customer;
//	Account entity;
	PaymentSource source;
	PaymentSourceCollection sources;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadBankAccountIndivual.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");
			}

			System.out.println("INF: Processed External Accounts(Bank) Starting");
			bankDictionary.clear();
			bankDictionary.put("object", accountType);
			bankDictionary.put("country", "US");
			bankDictionary.put("currency", "usd");
			bankDictionary.put("account_holder_name", "Anthony Ennis(US)");
			bankDictionary.put("account_holder_type", "individual"); //
			bankDictionary.put("account_number", "000123456789");
			bankDictionary.put("routing_number", "110000000");

			tokenParams.put("country", "US");
			tokenParams.put("currency", "usd");
			tokenParams.put("account_holder_name", "Anthon Ennis");
			tokenParams.put("account_holder_type", "individual");	// Works
			tokenParams.put("routing_number", "110000000");
			tokenParams.put("account_number", "000123456789");
			entityParams.put("bank_account", tokenParams);
			Token tok = Token.create(entityParams);

			// https://stripe.com/docs/api/external_account_bank_accounts/create
			customer = Customer.retrieve(customerId, auth);
			entityParams.clear();
			entityParams.put("source", tok.getId());
			sources = customer.getSources();
			// /v1/customers/cus_FFqmhd5hqKvwj6/sources
			// Count = 0
			sources.create(entityParams);

//			Account.retrieve(accountId, auth).getExternalAccounts().create(entityParams);
			response.getOutputStream().print("{ "
				+ "\"status\": \"succeeded\" "
				+ "}");

			System.out.println("INF: Processed External Accounts(Bank) Completed");
		} catch (StripeException ex) {
			response.getOutputStream().print("{ "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
			Logger.getLogger(BankAccountIndividual.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new UXPayloadBankAccountIndivual();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadBankAccountIndivual {

	String id;
	String reason;
	int amount;

}
