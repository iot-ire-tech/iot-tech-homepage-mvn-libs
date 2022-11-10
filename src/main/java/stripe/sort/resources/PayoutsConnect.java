/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.sort.resources;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Payout;
import com.stripe.net.RequestOptions;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
 *
 * To send funds to your own bank account, you create a new payout object.
 *
 * Your Stripe balance must be able to cover the payout amount, or you’ll
 * receive an “Insufficient Funds” error.
 *
 * If your API key is in test mode, money won’t actually be sent, though
 * everything else will occur as if in live mode.
 *
 * If you are creating a manual payout on a Stripe account that uses multiple
 * payment source types, you’ll need to specify the source type balance that the
 * payout should draw from.
 *
 *
 * The balance object details available and pending amounts by source type.
 *
 */
@WebServlet(name = "PayoutConnect", urlPatterns = {"/PayoutConnect"})
public class PayoutsConnect extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadPayoutPlatform uxPayload;
	String responseLoad;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	ArrayList<String> paymentMethodTypes = new ArrayList<>();
	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX"; 	// Test : Connect Account - Works
	String accountId = accountIdConnect;

	// Function
	// The ID of a bank account or a card to send the payout to.
	// Deposit Rules
	// If no destination is supplied, the default external account for the specified currency will be used.
	// https://dashboard.stripe.com/test/payouts/po_1EqfbYFOjjfpNUIxLfqyLXPl
	// Errors#1
	// errorMsg: "You cannot set 'destination' to an empty string. We interpret empty strings as null in requests. You may set 'destination' to null to delete the property.",
	// Errors#2
	//
	// Default Destination -  ba_1Em3dqEUIbzLqhwXXc991Gqh / eur
	// Next - ba_1Em3ZgEUIbzLqhwXWozjvhxx / usd
	// Next - ba_1Em3ZgEUIbzLqhwXWozjvhxx / usd
	// Next - card_1Em3ylEUIbzLqhwX5Si0byjV
	String destinationIdCard = "card_1Em3ylEUIbzLqhwX5Si0byjV";
	String destinationIdBank = "ba_1Em3ZgEUIbzLqhwXWozjvhxx"; // TSB Account /
	String destinationId = destinationIdCard;
	Payout entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadPayoutPlatform.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			System.out.println("INF: Processed Payout(Connect=>platform) Starting");
// https://stripe.com/docs/api/payouts/create
			entityParams.clear();
			entityParams.put("amount", 111);
			entityParams.put("currency", "eur");
			entityParams.put("description", "Test: deposit entering connect account ");
//			entityParams.put("destination", destinationId);

			entity = Payout.create(entityParams, auth);
			responseLoad = entity.toJson();
			response.getOutputStream().print(responseLoad);

			System.out.println("INF: Processed Payout(Connect=>platform) Completed");
		} catch (StripeException ex) {
			response.getOutputStream().print("{ "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
			Logger.getLogger(PayoutsConnect.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new UXPayloadPayoutPlatform();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadPayoutConnect {

	String id;
	String reason;
	int amount;

}

/*

{
amount: 400,
arrival_date: 1561939200,
automatic: false,
balance_transaction: "txn_1EqfR8EUIbzLqhwXCb54VdYX",
created: 1561810426,
currency: "eur",
description: null,
destination: "ba_1Em3dqEUIbzLqhwXXc991Gqh",
failure_balance_transaction: null,
failure_code: null,
failure_message: null,
id: "po_1EqfR8EUIbzLqhwXt9Mb5dxE",
livemode: false,
metadata: { },
method: "standard",
object: "payout",
source_type: "card",
statement_descriptor: null,
status: "pending",
type: "bank_account",
}

 */
