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
//@WebServlet(name = "Authenticate", urlPatterns = {"/pages/Authenticate"})
public class Authenticate extends HttpServlet {

	RestClient jr;
	Gson gson = new Gson();

	String basePath;
	String query;
	String s;
	String jsonPatron;

	StringBuilder sb;
	PropsReader pr = new PropsReader();
	UXPayloadAuthenticate uxPayload;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		// Parse Data
		// Read Request From Client!!!
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		// Map JSON data to Array Of Resources Object!!!
		uxPayload = gson.fromJson(sb.toString(), UXPayloadAuthenticate.class);

		// Got the user, lets get his details, or not as the case may be!!!!
		basePath = pr.setKey("proto").getVal() + pr.setKey("hostname").getVal() + ":" + pr.setKey("restPort").getVal();
		System.out.println("INF: BasePath (" + basePath + ")");
		query = basePath + "/patrons?account.username=" + uxPayload.getUsername() + "&account.password=" + uxPayload.getPassword();
		System.out.println("INF: Query String (" + query + ")");

		jr = new RestClient(query);
		jr.init();
		jr.sendGetRequest();
		String payload = jr.getPayload();
		System.out.println("INF: Payload Returned (" + payload + ")");

//		if (meCtrl.setJr(jr).queryMe().isSent()) {
//			response.getOutputStream().print(meCtrl.getJson());
//		} else {
//			response.getOutputStream().print("{\"error\":\"in the house\"}");
//		}
		response.getOutputStream().flush();
	}

	@Override
	public void init() throws ServletException {

		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new UXPayloadAuthenticate();

		// Properties
		pr.init("env.comms.properties");
	}

}

class UXPayloadAuthenticate {

	String username;
	String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
