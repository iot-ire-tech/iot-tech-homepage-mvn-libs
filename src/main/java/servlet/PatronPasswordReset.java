/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package servlet;

import uxmail.MailBusinessRequestAcceptedUx;
import com.google.gson.Gson;
import uxmail.MailPatronPasswordReset;
import uxmail.MailPatronValidation;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ae
 */
public class PatronPasswordReset extends HttpServlet {

	String basePath;
	String query;
	String s;
	String jsonPatron;
	Gson gson;

	StringBuilder sb;
	MailPatronPasswordReset mailer;
	UXPayloadPasswordReset uxPayload;

	PropsReader pr = new PropsReader();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		// Map JSON data to Array Of Bookings Object!!!
		uxPayload = gson.fromJson(sb.toString(), UXPayloadPasswordReset.class);
//  Build Endpoints
		String endPoint = pr.setKey("proto").getVal()
			+ pr.setKey("hostnameHomePage").getVal()
			+ pr.setKey("appServPort").getVal()
			+ pr.setKey("contextPath").getVal()
			+ pr.setKey("endPointPasswordReset").getVal()
			+ "?clientId=" + uxPayload.getClientId()
			+ "&patronId=" + uxPayload.getPatronId();

		// Really need to create a mail instance for each reciptient!!!
		mailer.setEndPointPasswordReset(endPoint);

		mailer.setClientId(uxPayload.getClientId());
		mailer.setPatronId(uxPayload.getPatronId());

		mailer.setMsgbody(mailer.generateHTML());
		mailer.setTo(uxPayload.getEmail());
		mailer.init();

		response.getOutputStream().print("{ \"status\" : \"mail sent\", \"sender\" : \"br mail acceptance server\" }");
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
		mailer = new MailPatronPasswordReset();
		mailer.setSubject("INF: Account Management");
		mailer.setFrom("registar@mybusinesspal.com");
		mailer.setFromAlias("IOT Business Development");

		// Derived Class
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new UXPayloadPasswordReset();

		// Properties
		pr.init("env.comms.properties");
	}

}

class UXPayloadPasswordReset {

	String email;
	String patronId;
	String clientId;

	UXPayloadPasswordReset() {
	}

	public String getPatronId() {
		return patronId;
	}

	public void setPatronId(String patronId) {
		this.patronId = patronId;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
