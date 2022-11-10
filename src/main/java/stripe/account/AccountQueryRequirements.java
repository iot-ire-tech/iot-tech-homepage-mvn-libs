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
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;
import com.models.stripe.entities.connect.EntAccount;

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
@WebServlet(name = "AccountQueryRequirements", urlPatterns = {"/AccountQueryRequirements"})
public class AccountQueryRequirements extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntAccount uxPayload;
	Verification verf = new Verification();

	PropsReader pr = new PropsReader();
	Account account = null;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		uxPayload = gson.fromJson(sb.toString(), EntAccount.class);
		System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
		Stripe.apiKey = pr.setKey("key").getVal();

		try {
			account = Account.retrieve(uxPayload.getAccountId());
			System.out.println("INF: Account Id (" + account.getId() + ")");

			boolean pastDue = false;
			boolean currentDue = false;
			boolean pendingDue = false;
			for (String outstanding : account.getRequirements().getPastDue()) {
				System.out.println("INF: Past Due (" + outstanding + ")");
				pastDue = true;
			}
			boolean companyVerificationDue = false;
			for (String outstanding : account.getRequirements().getCurrentlyDue()) {
				System.out.println("INF: Currently Due (" + outstanding + ")");
				if (outstanding.contains("company")) {
					companyVerificationDue = true;
				}
				currentDue = true;
			}
			for (String outstanding : account.getRequirements().getPendingVerification()) {
				System.out.println("INF: Pending Verification (" + outstanding + ")");
				pendingDue = true;
			}

			if (pastDue == true || currentDue == true || pendingDue == true) {
			}

		} catch (Exception ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		response.getOutputStream().print(account.getRequirements().toJson());
		response.getOutputStream().flush();

		System.out.println("INF: Processed Account Requirments Query Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountQueryRequirements.class
				.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountQueryRequirements.class
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
		uxPayload = new EntAccount();

		// Properties
		pr.init("env.comms.properties");
	}

}
