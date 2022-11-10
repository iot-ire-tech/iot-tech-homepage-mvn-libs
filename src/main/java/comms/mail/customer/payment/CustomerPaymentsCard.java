/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package comms.mail.customer.payment;

import com.google.gson.Gson;
import entities.EntMailCard;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servlet.PropsReader;
import java.util.Date;
import javax.servlet.annotation.WebServlet;

/**
 *
 * @author ae
 */
@WebServlet(name = "MailerCustomerPaymentsCard", urlPatterns = {"/MailerCustomerPaymentsCard"})
public class CustomerPaymentsCard extends HttpServlet {

	String basePath;
	String query;
	String s;
	String jsonPatron;
	Gson gson;

	StringBuilder sb;
	MailCustomerPaymentsCardsUx mailer;
	EntMailCard uxPayload;

	PropsReader pr = new PropsReader();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		// Map JSON data to Array Of Bookings Object!!!
		uxPayload = gson.fromJson(sb.toString(), EntMailCard.class);
//  Build Endpoints
		String hostnameHome = pr.setKey("proto").getVal() + pr.setKey("hostnameHomePage").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
		String hostnameEndUser = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();

		// Mail Details
		mailer.setTs(new Date().toGMTString());
		mailer.setSource(uxPayload);

		// EndPoints...
		// Maybe add the sepa payment now?
		mailer.setEndPointPaymentsSEPA(hostnameEndUser + pr.setKey("endPointPaymentsBankCustomer").getVal()
			+ "?accountId=&customerId="
			+ uxPayload.getCustomerId());

		// Welcome Back anthony, look at whats new
		mailer.setEndPointHomepage(hostnameEndUser + pr.setKey("endPointHome").getVal() + "?accountId=" + uxPayload.getAccountId());
		// So you need help
		mailer.setEndPointSupport(hostnameEndUser + pr.setKey("endPointSupport").getVal() + "?accountId=" + uxPayload.getAccountId());
		// Derived
		mailer.setMsgbody(mailer.generateHTML());

		//
		//
		// Base
		//
		//
		mailer.setTo(uxPayload.getPerson().getEmail());
		mailer.init();

		response.getOutputStream().print(gson.toJson(uxPayload));
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
		mailer = new MailCustomerPaymentsCardsUx();
		mailer.setSubject("INF: MyBusinessPal.Com Payments Onboarding");
		mailer.setFrom("registar@mybusinesspal.com");
		mailer.setFromAlias("IOT Payments");
		// Derived Class
		mailer.setTitle("MyBusinessPal.Com - Card Payments");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new EntMailCard();

		// Properties
		pr.init("env.comms.properties");
	}

}
