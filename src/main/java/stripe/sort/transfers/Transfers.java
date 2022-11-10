/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.sort.transfers;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Transfer;
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
@WebServlet(name = "Transfers", urlPatterns = {"/Transfers"})
public class Transfers extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadTransfers uxPayload;

	PropsReader pr = new PropsReader();
	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX";
	// Destination Accou
	String accountIdConnect2 = "acct_1ElKMAE4fXKZSWpk";
	String accountIdPlatform = "";
	String accountId = accountIdConnect;

	Map<String, Object> entityParams = new HashMap<>();
	Transfer entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadTransfers.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			System.out.println("INF: Processing Transfers");

// A Transfer object is created when you move funds between Stripe accounts as part of Connect.
// To send funds from your Stripe account to a connected account, you create a new entityfer object.
// Your Stripe balance must be able to cover the entityfer amount, or you’ll receive an “Insufficient Funds” error.
			entityParams.clear();
			entityParams.put("amount", 400);
			entityParams.put("currency", "eur");
			entityParams.put("destination", accountIdConnect2);
			entityParams.put("transfer_group", "Interconnect Trans Test");

			entity = Transfer.create(entityParams);

			System.out.println("INF: Id (" + entity.getId() + ")");
			System.out.println("INF: getBalanceTransaction (" + entity.getBalanceTransaction() + ")");
			System.out.println("INF: getSourceTransaction (" + entity.getSourceTransaction() + ")");
			System.out.println("INF: getDestination (" + entity.getDestination() + ")");
			System.out.println("INF: getAmount (" + entity.getAmount() + ")");
			System.out.println("INF: getAmountReversed (" + entity.getAmountReversed() + ")");
			System.out.println("INF: getCreated (" + entity.getCreated() + ")");

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"getBalanceTransaction\": \"" + entity.getBalanceTransaction() + "\", "
				+ "\"getSourceTransaction\": \"" + entity.getSourceTransaction() + "\", "
				+ "\"getDestination\": \"" + entity.getDestination() + "\", "
				+ "\"getAmount\": \"" + entity.getAmount() + "\", "
				+ "\"getAmountReversed\": \"" + entity.getAmountReversed() + "\", "
				+ "\"getCreated\": \"" + entity.getCreated() + "\", "
				+ "\"status\": \"succeeded\" "
				+ "}");

			System.out.println("INF: Processing Transfers Completed");
		} catch (StripeException ex) {
//  com.stripe.exception.InvalidRequestException: You have insufficient funds in your Stripe account. One likely reason you have insufficient funds is that your funds are automatically being paid out; try enabling manual payouts by going to https://dashboard.stripe.com/account/payouts.; code: balance_insufficient

//  com.stripe.exception.InvalidRequestException: Insufficient funds in Stripe account.
// In test mode, you can add funds to your available balance (bypassing your pending balance) by creating a charge with 4000 0000 0000 0077 as the card number.   You can use the the /v1/balance endpoint to view your Stripe balance (for more details, see stripe.com/docs/api#balance).; code: balance_insufficient
			Logger.getLogger(Transfers.class.getName()).log(Level.SEVERE, null, ex);

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
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
		uxPayload = new UXPayloadTransfers();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadTransfers {

	String id;
	String reason;
	int amount;

}
