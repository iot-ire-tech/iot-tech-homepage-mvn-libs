/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package zoom;

import com.google.gson.Gson;
import com.models.enterprise.zoom.EntZoomRegistrant;
import comms.mail.customer.reciept.MailBusinessReceiptUx;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import zoom.model.EntZoomRegistrantMin;
import security.jwt.JWTSevice;
import servlet.PropsReader;
import javax.servlet.annotation.WebServlet;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

/**
 *
 * @author ae
 */
@WebServlet(name = "ZoomWebinarRegistrant", urlPatterns = {"/ZoomWebinarRegistrant"})
public class ZoomWebinarRegistrantCreate extends HttpServlet {

	String basePath;
	String query;
	String s;
	String jsonPatron;
	Gson gson;

	StringBuilder sb;
	MailBusinessReceiptUx mailer;
	EntZoomRegistrant uxPayload;
	EntZoomRegistrantMin uxPayloadMin = new EntZoomRegistrantMin();
	PropsReader pr = new PropsReader();
	JWTSevice myservice = new JWTSevice();
	HttpResponse<JsonNode> responseJson;
	HttpResponse<String> responseStr;
	JsonNode jsonNodeObj;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		// Map JSON data to Array Of Bookings Object!!!
		uxPayload = gson.fromJson(sb.toString(), EntZoomRegistrant.class);

		try {
			String user = pr.setKey("keyUser").getVal();
			String jwt = myservice.getJWT("");
			String webinarId = uxPayload.getWebinarId();

			responseStr = Unirest.post("https://api.zoom.us/v2/webinars/" + webinarId + "/registrants")
				.header("content-type", "application/json")
				.header("authorization", "Bearer " + jwt).body(uxPayload).asString();

		} catch (Exception ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");

			Logger.getLogger(ZoomWebinarRegistrantCreate.class.getName()).log(Level.SEVERE, null, ex);
			response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
			response.getOutputStream().flush();
			return;
		}
		response.getOutputStream().print(responseStr.getBody());
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
		mailer = new MailBusinessReceiptUx();
		mailer.setSubject("MybusinessPal.Com Customer Receipt");
		mailer.setFrom("billing@mybusinesspal.com");
		mailer.setFromAlias("MybusinessPal.Com Billing");
		// Derived Class
		mailer.setTitle("MyBusinessPal.Com - Billing");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new EntZoomRegistrant();

		// Properties
		pr.init("env.comms.properties");
	}

}
