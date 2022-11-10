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
import com.models.stripe.entities.EntBankSepa;

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java
@WebServlet(name = "AccountAddAccountSepa", urlPatterns = {"/AccountAddAccountSepa"})
public class AccountAddBankAccountSepa extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntBankSepa uxPayload;
	Account entity = null;

	PropsReader pr = new PropsReader();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> external_account = new HashMap<>();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		uxPayload = gson.fromJson(sb.toString(), EntBankSepa.class);

		Stripe.apiKey = pr.setKey("key").getVal();
		accountParams.clear();

		System.out.println("INF: Processed External Accounts(Bank) Completed");
		entity = Account.retrieve(uxPayload.getAccountId());
		System.out.println("INF: Account Id (" + entity.getId() + ")");

		external_account.put("object", "bank_account");
		external_account.put("country", uxPayload.getCountry());
		external_account.put("currency", "eur");
		external_account.put("account_holder_name", uxPayload.getAccountHolderName());
		external_account.put("account_holder_type", uxPayload.getAccountHolderType());
		external_account.put("account_number", uxPayload.getAccountNumber());
		accountParams.put("external_account", external_account);

		try {
			entity.update(accountParams);
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(AccountAddBankAccountSepa.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}

		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();

		System.out.println("INF: Processed Account Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddBankAccountSepa.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddBankAccountSepa.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new EntBankSepa();

		// Properties
		pr.init("env.comms.properties");
	}
}
