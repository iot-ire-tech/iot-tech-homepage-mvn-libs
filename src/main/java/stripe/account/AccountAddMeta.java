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
import com.models.stripe.entities.EntMap;
import com.models.stripe.entities.EntMeta;

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
@WebServlet(name = "AccountAddMeta", urlPatterns = {"/AccountAddMeta"})
public class AccountAddMeta extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntMeta uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> metaParams = new HashMap<String, Object>();
	Account entity = null;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		uxPayload = gson.fromJson(sb.toString(), EntMeta.class);
		Stripe.apiKey = pr.setKey("key").getVal();

		accountParams.clear();
		System.out.println("INF: Account Id (" + uxPayload.getAccountId() + ")");
		entity = Account.retrieve(uxPayload.getAccountId());

		if (uxPayload.getMetadata().size() > 0) {
			metaParams.clear();
			// Default
			// metaParams.put("cost", uxPayload.getCost());

			// Add Additional Meta
			for (EntMap metaMap : uxPayload.getMetadata()) {
				metaParams.put(metaMap.getKey(), metaMap.getValue());
			}
			accountParams.put("metadata", metaParams);
		}

		try {
			entity.update(accountParams);
		} catch (StripeException ex) {
			System.out.println("ERR: " + ex.getMessage());
			System.out.println("ERR: " + gson.toJson(uxPayload));
			response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
			response.getOutputStream().flush();
			Logger.getLogger(EntMeta.class.getName()).log(Level.SEVERE, null, ex);
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
			Logger.getLogger(AccountAddMeta.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddMeta.class.getName()).log(Level.SEVERE, null, ex);
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
		mailer.setSubject("INF: Account Services, Account Details Updated");
		mailer.setFrom("billing@mybusinesspal.com");
		mailer.setFromAlias("IOT-Client-Admin");

		// Derived Class
		mailer.setTitle("MyBusinessPal.Com");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new EntMeta();

		// Properties
		pr.init("env.comms.properties");
	}
}
