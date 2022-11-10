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

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java
@WebServlet(name = "AccountAddCompanyCard", urlPatterns = {"/AccountAddCompanyCard"})
public class AccountAddCompanyCard extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadAccountAddCompanyCard uxPayload;

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

		uxPayload = gson.fromJson(sb.toString(), UXPayloadAccountAddCompanyCard.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		accountParams.clear();
//		account = Account.retrieve(uxPayload.getId());
//		System.out.println("INF: Account Id (" + uxPayload.getId() + ")");
		account = Account.retrieve("acct_1FCspbAD1O5WKXxM");

// https://stripe.com/docs/api/accounts/object#account_object-external_accounts-data-account
		data.put("object", "card");
		data.put("name", "Anto Ennis(US-DebitCardNumber)");
//		data.put("number", "4000056655665556");	// US - Visa Debit
//		data.put("number", "5200828282828210");	// US - Master Debit
		data.put("number", "4000058260000005");	// Non US Card - GB (Visa-Debit)
		data.put("currency", "GB");

//		data.put("currency", "usd");  // external_account.currency CUSTOM ONLY Required when adding a card to an account (not applicable to customers or recipients). The card (which must be a debit card) can be used as a transfer destination for funds in this currency. Currently, the only supported currency for debit card transfers is usd.  data.put("exp_month", 8);
		data.put("exp_year", 2020);
		data.put("last4", "0005");
		data.put("cvc", "314");

		// Custom Only
//		data.put("default_for_currency", true);
//  com.stripe.exception.InvalidRequestException:
// You must supply either a card, customer, PII data, bank account, or account legal entity to create a token.
// If you're making this request with a library, be sure to pass all of the required parameters for creating a token. If you're making this request manually, be sure your POST parameters begin with the token type. For example, a PII token would require `pii[personal_id_number]`, while an account token would require a parameter beginning with `account[legal_entity]`. See the API reference for more information: https://stripe.com/docs/api#token_object; code: parameter_missing
// Supply Card!!
		tokenParams.put("card", data);

		token = Token.create(tokenParams);
//  com.stripe.exception.InvalidRequestException: `usd` is not a supported currency for sending payouts to this debit card. `usd` is the only currently supported currency.
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
			Logger.getLogger(AccountAddCompanyCard.class
				.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompanyCard.class
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
		uxPayload = new UXPayloadAccountAddCompanyCard();

		// Properties
		pr.init("env.comms.properties");

	}
}

class UXPayloadAccountAddCompanyCard {

	String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
