/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.connect.paymentsmethods.methods;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentMethod;
import com.stripe.net.RequestOptions;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
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
import com.models.stripe.entities.EntSepaDirect;

/**
 * @author ennisa
 *
 * PaymentMethod objects represent your customer's payment instruments.
 *
 * They can be used with 1. PaymentIntents to collect payments or 2. saved to Customer objects to store instrument details for future payments.
 *
 */
@WebServlet(name = "PayoutMethodBySepa", urlPatterns = {"/PayoutMethodBySepa"})
public class PaymentMethodBySepaDirect extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntSepaDirect uxPayload;
	String responseLoad;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	Map<String, Object> paymentmethodParams = new HashMap<String, Object>();
	Map<String, Object> paramsBilling = new HashMap<String, Object>();
	Map<String, Object> paramsSepa = new HashMap<String, Object>();

	PaymentMethod entity;
	RequestOptions auth;

	LinkedHashMap<String, Object> transferDataParams = new LinkedHashMap<>();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {

			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				System.out.println("INF: JSON S  (" + s + ")");
				sb.append(s);
			}
			System.out.println("INF: JSON SB (" + sb + ")");
			uxPayload = gson.fromJson(sb.toString(), EntSepaDirect.class);
			Stripe.apiKey = pr.setKey("key").getVal();

			System.out.println("INF: Processing Direct Charges On Account(" + uxPayload.getAccountId() + ") Starting");
			if (uxPayload.getAccountId().length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}

			paymentmethodParams.clear();
			paramsBilling.clear();
			paramsSepa.clear();
			System.out.println("INF: Processed PaymentMethod(SEPA) Starting");

			paymentmethodParams.put("type", "sepa_debit");
			// Billing Details
			paramsBilling.put("name", "Anthony Ennis");
			paramsBilling.put("email", "tonyennis@yahoo.com");
			paramsBilling.put("phone", "0877461070");
			paymentmethodParams.put("billing_details", paramsBilling);
			// Sepa
			paramsSepa.put("iban", "IE71IPBS99062612653802");
			paymentmethodParams.put("sepa_debit", paramsSepa);

			if (uxPayload.getAccountId().length() > 0) {
				entity = PaymentMethod.create(paymentmethodParams, auth);
			} else {
				entity = PaymentMethod.create(paymentmethodParams);
			}

		} catch (StripeException ex) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			Logger.getLogger(PaymentMethodBySepaDirect.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		response.getOutputStream().print(gson.toJson(entity));
		response.getOutputStream().flush();
		System.out.println("INF: Processed (X) Completed");
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
		uxPayload = new EntSepaDirect();

		// Properties
		pr.init("env.comms.properties");
	}
}
