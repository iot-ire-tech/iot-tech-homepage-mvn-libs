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
import com.stripe.model.Token;
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
 * @author ennisa
 */
@WebServlet(name = "DebitAccount", urlPatterns = {"/DebitCard"})
public class DebitCard extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadDebitCard uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> tokenParams = new HashMap<String, Object>();
	Map<String, Object> cardParams = new HashMap<String, Object>();
	Map<String, Object> account = new HashMap<>();
	Map<String, Object> external_account = new HashMap<>();
	Map<String, Object> entityParams = new HashMap<>();

	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX";
	String accountIdPlatform = "";
	String accountId = accountIdConnect;
	Account entity;
	Token token;
	RequestOptions auth;
	String accountType = "card";

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadDebitCard.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			entity = Account.retrieve(accountId, auth);
			System.out.println("INF: Processed External Accounts(Debit Card) Starting");

			cardParams.put("object", accountType);
			cardParams.put("name", "Anto Ennis(US-DebitCardNumber");
			cardParams.put("number", "4000056655665556");	// Visa Debit
			cardParams.put("exp_month", 6);
			cardParams.put("exp_year", 2020);
			cardParams.put("cvc", "314");
			cardParams.put("default_for_currency", true);
//  com.stripe.exception.CardException: Invalid currency: us. Stripe currently supports these currencies: usd, aed, afn, all, amd, ang, aoa, ars, aud, awg, azn, bam, bbd, bdt, bgn, bif, bmd, bnd, bob, brl, bsd, bwp, bzd, cad, cdf, chf, clp, cny, cop, crc, cve, czk, djf, dkk, dop, dzd, egp, etb, eur, fjd, fkp, gbp, gel, gip, gmd, gnf, gtq, gyd, hkd, hnl, hrk, htg, huf, idr, ils, inr, isk, jmd, jpy, kes, kgs, khr, kmf, krw, kyd, kzt, lak, lbp, lkr, lrd, lsl, mad, mdl, mga, mkd, mmk, mnt, mop, mro, mur, mvr, mwk, mxn, myr, mzn, nad, ngn, nio, nok, npr, nzd, pab, pen, pgk, php, pkr, pln, pyg, qar, ron, rsd, rub, rwf, sar, sbd, scr, sek, sgd, shp, sll, sos, srd, std, szl, thb, tjs, top, try, ttd, twd, tzs, uah, ugx, uyu, uzs, vnd, vuv, wst, xaf, xcd, xof, xpf, yer, zar, zmw, eek, lvl, svc, vef; code: invalid_currency
			cardParams.put("currency", "eur");
			tokenParams.put("card", cardParams);
			token = Token.create(tokenParams);
//			entityParams.put("external_account", token.getId()); // works
			entityParams.put("external_account", "tok_mastercard_debit"); // 5200828282828210 - works

			entity.getExternalAccounts().create(entityParams);

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + entity.getId() + "\", "
				+ "\"status\": \"succeeded\" "
				+ "}");

			System.out.println("INF: Processing Debit Card Account Completed");
		} catch (StripeException ex) {
			response.getOutputStream().print("{\"status\": \"failed\"}");
			Logger.getLogger(DebitCard.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new UXPayloadDebitCard();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadDebitCard {

	String id;
	String reason;
	int amount;

}
