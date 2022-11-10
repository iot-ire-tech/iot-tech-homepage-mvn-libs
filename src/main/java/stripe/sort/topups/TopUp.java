/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.sort.topups;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Topup;
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
 * Top up the balance of an account
 */
@WebServlet(name = "TopUps", urlPatterns = {"/TopUps"})
public class TopUp extends HttpServlet {

	String s;
	Gson gson;

	PropsReader pr = new PropsReader();
	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadTopUp uxPayload;

	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX";
	String accountIdPlatform = "";
	String accountId = accountIdConnect;

	Map<String, Object> entityParams = new HashMap<>();
	Topup entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadTopUp.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			System.out.println("INF: Processing Transfers");

//  https://stripe.com/docs/api/topups/object
			entityParams.put("amount", 999);
			//  com.stripe.exception.InvalidRequestException: Top-up creation is not supported for currency eur.
			entityParams.put("currency", "usd");
//			entityParams.put("source", "btok_us_verified");
			entity = Topup.create(entityParams, auth);
//			Account account = Account.retrieve("acct_1Ej62jIJcoLVIYYO", null);
//			account.getExternalAccounts().create(params);

			System.out.println("INF: Processed TopUp Completed");
			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"amount\": \"" + entity.getAmount() + "\", "
				+ "\"created\": \"" + entity.getCreated() + "\", "
				+ "\"status\": \"" + entity.getStatus() + "\" "
				+ "}");
			response.getOutputStream().flush();

		} catch (StripeException ex) {
			Logger.getLogger(TopUp.class.getName()).log(Level.SEVERE, null, ex);
			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
		}
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
		uxPayload = new UXPayloadTopUp();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadTopUp {

	String id;
	String reason;
	int amount;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

}
