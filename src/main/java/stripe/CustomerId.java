/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package stripe;

import com.google.gson.Gson;
import com.stripe.exception.StripeException;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servlet.PropsReader;
import start.MailCreditCardDetailsUx;
import utils.stripe.Benefactor;
import utils.stripe.ClientCardDetails;

/**
 *
 * @author ae
 */
public class CustomerId extends HttpServlet {

	String basePath;
	String query;
	String s;
	String jsonPatron;
	Gson gson;

	StringBuilder sb;
	MailCreditCardDetailsUx mailer;
	UXPayloadClient uxPayload;

	PropsReader pr = new PropsReader();
	ClientCardDetails client;
	Benefactor bene;

	public void sendPayment() {

	}

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		// Map JSON data to Array Of Bookings Object!!!
		uxPayload = gson.fromJson(sb.toString(), UXPayloadClient.class);

		client = new ClientCardDetails();

		client.setApiKey(pr.setKey("key").getVal());
//		client.setApiKey("sk_test_PWxKayhQchfhGUlEaMT6DE8x");
		client.setNumber(uxPayload.getNumber());
		mailer.setCcNumber(client.getNumber());

		client.setExpMonth(uxPayload.getExpMonth());
		client.setExpYear(uxPayload.getExpYear());
		mailer.setCcDate(client.getExpYear() + "-" + client.getExpMonth());

		client.setCvc(uxPayload.getCsv());
		mailer.setCcCSV(client.getCvc());
		client.setBillingAddressLine1(uxPayload.getAdddress1());
		mailer.setCcStreet1(client.getBillingAddressLine1());

		bene = new Benefactor();
		// Add Meta
		bene.setMfname(uxPayload.getName().split(" ")[0]);
		bene.setMlname(uxPayload.getName().split(" ")[1]);
		mailer.setName(bene.getMfname() + " " + bene.getMlname());
		bene.setMcity(uxPayload.getCity());
		mailer.setCcCity(bene.getMcity());
		bene.addMeta();
		// Add Basic
		bene.setEmail(uxPayload.getEmail());
		mailer.setEmail(bene.getEmail());
		try {
			bene.setSource(client.getToken());
		} catch (StripeException ex) {
			Logger.getLogger(CustomerId.class.getName()).log(Level.SEVERE, null, ex);
		}
		bene.create();
		mailer.setCcCustomerId(bene.getId());

		System.out.println("INF : Customer ID: (" + bene.getId() + ")");
		mailer.setTo("tonyennis@yahoo.com," + bene.getEmail());
		mailer.setTo(bene.getEmail());
		mailer.setMsgbody(mailer.generateHTML());
		if (bene.getId() != null) {
			mailer.init();
		}

		response.getOutputStream().print("{ \"customerId\" : \"" + bene.getId() + "\" }");
		response.getOutputStream().flush();

	}

	// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
	/**
	 * Handles the HTTP <code>GET</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * Handles the HTTP <code>POST</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * Returns a short description of the servlet.
	 *
	 * @return a String containing servlet description
	 */
	@Override
	public String getServletInfo() {
		return "Short description";
	}// </editor-fold>

	@Override
	public void init() throws ServletException {

		// Base Classs
		mailer = new MailCreditCardDetailsUx();
		mailer.setSubject("INF: Credit Card Registration Details");
		mailer.setFrom("billing@mybusinesspal.com");
		mailer.setFromAlias("IOT-Client-Admin");

		// Derived Class
		mailer.setTitle("MyBusinessPal.Com - Billing Services");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new UXPayloadClient();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadClient {

	String number;
	String csv;
	String expYear;
	String expMonth;
	String name;
	String adddress1;
	String adddress2;
	String city;
	String state;
	String zip;
	String country;
	String email;

	public UXPayloadClient() {
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getCsv() {
		return csv;
	}

	public void setCsv(String csv) {
		this.csv = csv;
	}

	public String getExpYear() {
		return expYear;
	}

	public void setExpYear(String expYear) {
		this.expYear = expYear;
	}

	public String getExpMonth() {
		return expMonth;
	}

	public void setExpMonth(String expMonth) {
		this.expMonth = expMonth;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAdddress1() {
		return adddress1;
	}

	public void setAdddress1(String adddress1) {
		this.adddress1 = adddress1;
	}

	public String getAdddress2() {
		return adddress2;
	}

	public void setAdddress2(String adddress2) {
		this.adddress2 = adddress2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
