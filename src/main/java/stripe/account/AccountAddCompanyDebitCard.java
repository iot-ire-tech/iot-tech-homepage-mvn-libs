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
import com.stripe.model.Token;
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
import stripe.connect.paymentsmethods.externalaccounts.BankAccountIndividual;
import com.models.stripe.entities.EntCard;
import com.models.stripe.entities.EntCompany;

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java
@WebServlet(name = "AccountAddCompanyDebitCard", urlPatterns = {"/AccountAddCompanyDebitCard"})
public class AccountAddCompanyDebitCard extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadAccountAddCompanyDebitCard uxPayload;

	PropsReader pr = new PropsReader();
	Token token;
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> external_account = new HashMap<String, Object>();
	Map<String, Object> data = new HashMap<String, Object>();
	Map<String, Object> tokenParams = new HashMap<String, Object>();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		Account account = null;

		uxPayload = gson.fromJson(sb.toString(), UXPayloadAccountAddCompanyDebitCard.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		accountParams.clear();

		account = Account.retrieve(uxPayload.getId());
		System.out.println("INF: Account Id (" + uxPayload.getId() + ")");

// https://stripe.com/docs/api/accounts/object#account_object-external_accounts-data-account
		data.put("object", "card");
		// US Card
//		data.put("number", "4000056655665556");	// Works - US Card - (Visa-Debit)
		// GB Card : Fails -> "This card doesn't appear to be issued from a bank in the United States."
//		data.put("number", "5200828282828210");	// Works - US Card - (Mastercard-Debit)
//		data.put("number", "5200828282828210");	// Works - US Card - (Mastercard-Debit)
//		data.put("currency", "usd");
		data.put("number", uxPayload.getCard().getNumber());
		data.put("currency", uxPayload.getCard().getCurrency());
		data.put("exp_year", uxPayload.getCard().getYear());
		data.put("exp_month", uxPayload.getCard().getMonth());
		data.put("default_for_currency", uxPayload.isDefault_for_currency()); // Customer Accounts!
		// opts
//		data.put("cvc", "314");
//		data.put("name", "Anto Ennis(US-DebitCardNumber)");
		tokenParams.put("card", data);
		token = Token.create(tokenParams);
// { "errorMsg": "Requests made on behalf of a connected account must use card tokens from Stripe.js,
// but card details were directly provided.", "obj":
// Implies you can use	accountParams.put("external_account", data);
		accountParams.put("external_account", token.getId());

		try {
			account.update(accountParams);

			System.out.println("INF: Processed External Accounts(Bank) Completed");
		} catch (StripeException ex) {
			response.getOutputStream().print("{ "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"obj\": \"" + account.toJson() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
			Logger.getLogger(BankAccountIndividual.class.getName()).log(Level.SEVERE, null, ex);
		}

		response.getOutputStream()
			.print(account.toJson());
		response.getOutputStream()
			.flush();

		System.out.println(
			"INF: Processed Account Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			response.getOutputStream().print("{ "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
			Logger.getLogger(AccountAddCompanyDebitCard.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompanyDebitCard.class
				.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new UXPayloadAccountAddCompanyDebitCard();

		// Properties
		pr.init("env.comms.properties");

	}
}

class UXPayloadAccountAddCompanyDebitCard {

	String id;
	EntCompany company;
	EntCard card;
	boolean default_for_currency;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean isDefault_for_currency() {
		return default_for_currency;
	}

	public void setDefault_for_currency(boolean default_for_currency) {
		this.default_for_currency = default_for_currency;
	}

	public EntCompany getCompany() {
		return company;
	}

	public void setCompany(EntCompany company) {
		this.company = company;
	}

	public EntCard getCard() {
		return card;
	}

	public void setCard(EntCard card) {
		this.card = card;
	}

}
