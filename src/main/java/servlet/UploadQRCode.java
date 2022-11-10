package servlet;

import com.google.gson.Gson;
import java.io.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utils.os.CmdGenQRCode;

public class UploadQRCode extends HttpServlet {

	private boolean isMultipart;
	private String filePath;
	PropsReader pr = new PropsReader();
	String qrDir = "/src/main/webapp/resources/media/clients/";

	public void init() {
		// Get the file location where it would be stored.
		pr.init("env.comms.properties");
		String path = getServletContext().getRealPath("/");
		filePath = pr.setKey("appDir").getVal();
		filePath += qrDir;
		System.out.println("INF: QR Dir (" + filePath + ")");
	}

	protected void doPostProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

// Request URL Decompose
		Gson gson = new Gson();
		String s;
		response.setContentType("application/json;charset=UTF-8");
		StringBuilder sb = new StringBuilder();

		// Parse Data
		// Read Request From Client!!!
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		// Map JSON data to Array Of Resources Object!!!
		UXUserAuth uxPayload = gson.fromJson(sb.toString(), UXUserAuth.class);

		// Process The Files
		java.io.PrintWriter out = response.getWriter();
		out = response.getWriter();
		response.setContentType("application/json");
		CmdGenQRCode processImages = new CmdGenQRCode(uxPayload.getClientId(), uxPayload.getPatronId(), filePath);
		processImages.init();
		processImages.createUserValidationCode();
		out.print(
			"{"
			+ "\"authToken\": \"" + processImages.getToken() + "\","
			+ "\"clientId\": \"" + uxPayload.getClientId() + "\","
			+ "\"patronId\": \"" + uxPayload.getPatronId() + "\""
			+ "}"
		);
		out.flush();
	}

	protected void doGetProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		doGetProcess(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		doPostProcess(request, response);
	}

	private static class UXUserAuth {

		String clientId;
		String patronId;

		public UXUserAuth() {

		}

		public String getClientId() {
			return clientId;
		}

		public void setClientId(String clientId) {
			this.clientId = clientId;
		}

		public String getPatronId() {
			return patronId;
		}

		public void setPatronId(String patronId) {
			this.patronId = patronId;
		}

	}

}
