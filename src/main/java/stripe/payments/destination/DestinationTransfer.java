/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.payments.destination;

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
import com.models.stripe.entities.EntBank;

/**
 * @author ennisa https://stripe.com/docs/connect/account-debits
 */
@WebServlet(name = "DebitTransferConnectAccount", urlPatterns = {"/DebitTransferConnectAccount"})
public class DestinationTransfer extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntBank uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> account = new HashMap<>();
	Map<String, Object> chargeParams = new HashMap<>();
	Transfer trans;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), EntBank.class);
			Stripe.apiKey = pr.setKey("key").getVal();

			String connectAccountId = "acct_1EjN3GBlHr3zBhsO";
			String platformAccountId = "acct_1EjN3GBlHr3zBhsO";
			System.out.println("INF: Processing DebitConnectAccount");
			RequestOptions requestOptions = RequestOptions.builder().setStripeAccount(connectAccountId).build();

			chargeParams.put("amount", 110);
			chargeParams.put("currency", "eur");
			chargeParams.put("destination", connectAccountId);

			trans = Transfer.create(chargeParams, requestOptions);

			System.out.println("INF: Id (" + trans.getId() + ")");

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + trans.getId() + "\", "
				+ "\"status\": \"succeeded\" "
				+ "}");

			System.out.println("INF: Processing DebitConnectAccount Completed");
		} catch (StripeException ex) {
			Logger.getLogger(DestinationTransfer.class.getName()).log(Level.SEVERE, null, ex);

			response.getOutputStream().print("{ "
				+ "\"id\": \"" + trans.getId() + "\", "
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
		uxPayload = new EntBank();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadDebitTransfer {

	String id;
	String reason;
	int amount;

}
