/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package stripe;

import com.google.gson.Gson;
import com.stripe.Stripe;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;
import utils.maths.RandomInts;
import utils.stripe.Benefactor;
import utils.stripe.ChargeByCustomer;
import utils.stripe.ChargeResponse;
import utils.stripe.ClientCardDetails;

/**
 *
 * @author ae
 */
public class PaymentByCustomerId extends HttpServlet {

	String basePath;
	String query;
	String s;
	String jsonPatron;
	Gson gson;

	String x;
	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadBooking uxPayload;

	PropsReader pr = new PropsReader();
	ClientCardDetails client;
	Benefactor bene;

	public void sendPayment() {

	}

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		// Map JSON data to Array Of Bookings Object!!!
		uxPayload = gson.fromJson(sb.toString(), UXPayloadBooking.class);
		// sk_test_PWxKayhQchfhGUlEaMT6DE8x
		Stripe.apiKey = pr.setKey("key").getVal();
		// Collect Client info to gen token
//// Retrieve Bene
//		Benefactor bene = new Benefactor();
//		bene.setId(uxPayload.getCustomerId()).loadCustomer();
//		System.out.println("INF : Customer ID: (" + bene.getId() + ")");

// Charge customer
		ChargeByCustomer p = new ChargeByCustomer();

		p.setAmount(Integer.parseInt(uxPayload.getAmount()));
		p.setCurrency("EUR");
		mailer.setCcAmount(Float.parseFloat(uxPayload.getAmount()) / 100 + " " + p.getCurrency());
//		p.setDescription("Booking Event");
		mailer.setCcDesc(uxPayload.getDescription());
		p.setReference("Ref: ");
		p.setOrderId(new RandomInts(10000, 1000000) + "");
//		mailer.setCcOrderId(p.getOrderId());

		p.setCustomerId(uxPayload.getCustomerId());
		mailer.setCcCustomerId(p.getCustomerId());
		if (!uxPayload.getCustomerId().contentEquals("-1")) {
			p.create();
			System.out.println("INF: Charge ID (" + p.getId() + ")");
			ChargeResponse cr = new ChargeResponse(p.getCharge());
			System.out.println(cr.getStatus());
			mailer.setCcChargeId(cr.getChargeId());
			mailer.setCcStatus(cr.getStatus());
			mailer.setTo("tonyennis@yahoo.com");
			mailer.setTo(uxPayload.getEmail());
			mailer.setMsgbody(mailer.generateHTML());
			mailer.init();

			response.getOutputStream().print("{ "
				+ "\"Id\": \"" + cr.getId() + "\", "
				+ "\"customerId\": \"" + cr.getLivemode() + "\", "
				+ "\"chargeId\": \"" + cr.getChargeId() + "\", "
				+ "\"status\": \"" + cr.getStatus() + "\" "
				+ "}");
			response.getOutputStream().flush();
		} else {

			response.getOutputStream().print("{ \"status\" : \"Invalid Customer ID. This customer has not billing setup\"}");
			response.getOutputStream().flush();
		}
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		processRequest(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		System.out.println("I am");
		processRequest(request, response);

	}

	@Override
	public String getServletInfo() {
		return "Short description";
	}// </editor-fold>

	@Override
	public void init() throws ServletException {

		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		System.out.println(dateFormat.format(date)); //2016/11/16 12:08:43

		// Base Classs
		mailer = new MailCreditCardTransactionUx();
		mailer.setCcDate(dateFormat.format(date));
		mailer.setSubject("INF: Credit Card Transaction Details");
		mailer.setFrom("billing@mybusinesspal.com");
		mailer.setFromAlias("MyBusinessPal.Com");

		// Derived Class
		mailer.setTitle("MyBusinessPal.Com - Billing Services");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new UXPayloadBooking();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadBooking {

	String customerId;
	String amount;
	String email;
	String description;

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
