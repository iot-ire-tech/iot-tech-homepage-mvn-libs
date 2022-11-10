/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package servlet;

import uxmail.MailBusinessRequestAcceptedUx;
import com.google.gson.Gson;
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
public class PatronValidation extends HttpServlet {

	String basePath;
	String query;
	String s;
	String jsonPatron;
	Gson gson;

	StringBuilder sb;
	MailPatronValidation mailer;
	UXPayloadPatronValidation uxPayload;

	PropsReader pr = new PropsReader();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		// Map JSON data to Array Of Bookings Object!!!
		uxPayload = gson.fromJson(sb.toString(), UXPayloadPatronValidation.class);
//  Build Endpoints
// http://localhost:8084/iot-base/services/userManagement/userValidate.jsp?clientId=673859&patronId=787833&patronDbId=5c619aae1f6e4f18ee119d42
//   http://localhost:8084/iot-base/services/userManagement/userValidate.jsp
//   tps://www.iot-social.com/green/services/userManagement/userValidate.jsp&clientId=673859&patronId=841113&patronDbId=5c619aae1f6e4f18ee119d42
		String endPointLogin = pr.setKey("proto").getVal()
			+ pr.setKey("hostnameHomePage").getVal()
			+ pr.setKey("appServPort").getVal()
			+ pr.setKey("contextPath").getVal()
			+ pr.setKey("endPointLoginValidation").getVal()
			+ "?clientId=" + uxPayload.getClientId()
			+ "&patronId=" + uxPayload.getPatronId()
			+ "&patronDbId=" + uxPayload.getPatronDbId();

		// Really need to create a mail instance for each reciptient!!!
		mailer.setEndPointPatronValidation(endPointLogin);

		mailer.setClientId(uxPayload.getClientId());
		mailer.setPatronId(uxPayload.getPatronId());
		mailer.setSendersName(uxPayload.getName());

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
		mailer = new MailPatronValidation();
		mailer.setSubject("INF: Account Activation");
		mailer.setFrom("registar@mybusinesspal.com");
		mailer.setFromAlias("IOT Business Development");

		// Derived Class
		//	mailer.setTitle("MyBusinessPal.Com - Business Growth & Developement");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new UXPayloadPatronValidation();

		// Properties
		pr.init("env.comms.properties");
	}

}

class UXPayloadPatronValidation {

	String name;
	String email;
	String patronId;
	String patronDbId;
	String clientId;

	UXPayloadPatronValidation() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPatronId() {
		return patronId;
	}

	public void setPatronId(String patronId) {
		this.patronId = patronId;
	}

	public String getPatronDbId() {
		return patronDbId;
	}

	public void setPatronDbId(String patronDbId) {
		this.patronDbId = patronDbId;
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
