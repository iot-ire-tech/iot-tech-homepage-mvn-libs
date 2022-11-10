/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package servlet;

import uxmail.MailBusinessRequestRejectedUx;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ae
 */
public class BusinessRequestRejected extends HttpServlet {

	String basePath;
	String query;
	String s;
	String jsonPatron;
	Gson gson;

	StringBuilder sb;
	MailBusinessRequestRejectedUx mailer;
	UXPayloadRequestRejection uxPayload;

	PropsReader pr = new PropsReader();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		// Map JSON data to Array Of Bookings Object!!!
		uxPayload = gson.fromJson(sb.toString(), UXPayloadRequestRejection.class);
//  Build Endpoints
		String hostnameHome = pr.setKey("proto").getVal() + pr.setKey("hostnameHomePage").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
		String hostnamePortal = pr.setKey("proto").getVal() + pr.setKey("hostnamePortal").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
		String hostnameEndUser = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();

		// Really need to create a mail instance for each reciptient!!!
		mailer.reason = uxPayload.getReason();
		mailer.notes = uxPayload.getComment();
		mailer.sendersName = uxPayload.getSndName();
		mailer.recipientsName = uxPayload.getRepName();

		mailer.setMsgbody(mailer.generateHTML());
		mailer.setTo(uxPayload.getRepEmail());
		mailer.init();

		response.getOutputStream().print("{ \"name\" : \"Anto\", \"grade\" : \"A\" }");
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
		mailer = new MailBusinessRequestRejectedUx();
		mailer.setSubject("INF: Affiliate Business Request");
		mailer.setFrom("registar@mybusinesspal.com");
		mailer.setFromAlias("IOT Business Development");

		// Derived Class
		//	mailer.setTitle("MyBusinessPal.Com - Business Growth & Developement");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new UXPayloadRequestRejection();

		// Properties
		pr.init("env.comms.properties");
	}

}

class UXPayloadRequestRejection {

	String id;
	String reason;
	String comment;
	String repEmail;
	String repName;
	String sndName;

	public String getSndName() {
		return sndName;
	}

	public void setSndName(String sndName) {
		this.sndName = sndName;
	}

	public String getRepEmail() {
		return repEmail;
	}

	public void setRepEmail(String repEmail) {
		this.repEmail = repEmail;
	}

	public String getRepName() {
		return repName;
	}

	public void setRepName(String repName) {
		this.repName = repName;
	}

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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

}
