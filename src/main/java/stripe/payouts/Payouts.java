/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.payouts;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.model.Account;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.Topup;
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
@WebServlet(name = "TopUp", urlPatterns = {"/TopUp"})
public class Payouts extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadTopUp uxPayload;

	Topup topup = null;
	PropsReader pr = new PropsReader();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadTopUp.class);
			Stripe.apiKey = pr.setKey("key").getVal();

//  https://stripe.com/docs/api/topups/object
//			System.out.println("INF: Processing TopUp (" + uxPayload.getId() + ")");
			Map<String, Object> params = new HashMap<>();
			params.put("amount", 999);
			params.put("currency", "usd");
			params.put("source", "btok_us_verified");

			// https://stripe.com/docs/api/topups/object
			topup = Topup.create(params);
//			Account account = Account.retrieve("acct_1Ej62jIJcoLVIYYO", null);
//			account.getExternalAccounts().create(params);

			System.out.println("INF: Id (" + topup.getId() + ")");
			System.out.println("INF: amount (" + topup.getAmount() + ")");
			response.getOutputStream().print("{ "
				+ "\"id\": \"" + topup.getId() + "\", "
				+ "\"amount\": \"" + topup.getAmount() + "\", "
				+ "\"created\": \"" + topup.getCreated() + "\", "
				+ "\"status\": \"" + topup.getStatus() + "\" "
				+ "}");

			response.getOutputStream().print("{\"status\": \"failed\"}");

			response.getOutputStream().flush();
			System.out.println("INF: Processed TopUp Completed");
		} catch (StripeException ex) {
			Logger.getLogger(Payouts.class.getName()).log(Level.SEVERE, null, ex);
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
