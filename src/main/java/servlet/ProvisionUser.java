/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utils.restclient.RestClient;

/**
 *
 * @author ae
 */
@WebServlet(name = "ProvisionUser", urlPatterns = {"/ProvisionUser"})
public class ProvisionUser extends HttpServlet {

	RestClient jr;
	Gson gson = new Gson();
//	SerializeDto ss = new SerializeDto();

	String basePath;
	String query;
	String s;
	String jsonPatron;

	StringBuilder sb;
	Patron uxPayload;
	Patron meCtrl = new Patron();
	String transmission = "create";
	PropsReader pr = new PropsReader();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		// Parse Data
		// Read Request From Client!!!
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		// SB is a JSON String

		// Send To Server
		String hostname = pr.setKey("proto").getVal() + pr.setKey("hostname").getVal() + ":" + pr.setKey("restPort").getVal();
		basePath = hostname + "/patron";

		jr = new RestClient(basePath);

		switch (transmission) {
			case "create":
				query = basePath;
				System.out.println("INF: Trans Create");
				System.out.println("INF: Query String (" + query + ")");

				jr.updateRequestSource(query);
//				meCtrl.setJr(jr).setJson(sb.toString()).postMe().isSent();
				response.getOutputStream().print("{ \"result\" : \"Success\", \"message\" : \"New User Posted To Server\" }");
				break;
			case "modify":
				System.out.println("INF: Trans Modify");
				//	query = basePath + "/" + uxPayload.getId();
				jr.updateRequestSource(query);

				System.out.println("INF: Query String (" + query + ")");
				response.getOutputStream().print("{ \"result\" : \"Success\", \"message\" : \"New User Modified On Server\" }");
				break;
			case "query":
				System.out.println("INF: Trans Query");
				//	query = basePath + "/" + uxPayload.getId();
				jr.updateRequestSource(query);
				System.out.println("INF: Query String (" + query + ")");

				response.getOutputStream().print("{ \"result\" : \"Success\", \"message\" : \"New User Posted To Server\" }");
				break;
			case "delete":
				System.out.println("INF: Trans Delete");
//				query = basePath + "/" + uxPayload.getId();
				//		jr.updateRequestSource(query);

				System.out.println("INF: Query String (" + query + ")");
				response.getOutputStream().print("{ \"result\" : \"Success\", \"message\" : \"Existing User Deleted To Server\" }");
				break;
			default:
				response.getOutputStream().print("{ \"result\" : \"Error\", \"message\" : \"Transmission Type Not Recognised\" }");
				System.out.println("ERR: No Transmission Match (" + transmission + ")");
				break;
		}
		response.getOutputStream().flush();

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		processRequest(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		processRequest(request, response);
	}

	@Override
	public void init() throws ServletException {

		// Base Classs
		pr.init("env.comms.properties");
	}

	@Override
	public String getServletInfo() {
		return "Short description";
	}// </editor-fold>
}

class Patron {
}
