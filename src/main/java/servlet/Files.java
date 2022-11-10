/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.filefilter.WildcardFileFilter;
import org.apache.commons.lang3.StringUtils;

/**
 *
 * @author ennisa
 */
public class Files extends HttpServlet {

	private String filePath;
	File file;
	PropsReader pr = new PropsReader();
	String mediaHolderDir = "/src/main/webapp/resources/media/clients/";
	String runTimeDir;

	public void init() {
		// Get the file location where it would be stored.
		pr.init("env.comms.properties");
		String path = getServletContext().getRealPath("/");
		filePath = pr.setKey("appDir").getVal();
		System.out.println("INF: filePath (" + filePath + ")");
		filePath += mediaHolderDir;
		System.out.println("INF: filePath (" + filePath + ")");

	}

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		String src = request.getParameter("src[name]");
		src = request.getParameter("src");
		System.out.println("INF: File to delete (" + src + ")");

		String id = request.getParameter("id");
		System.out.println("INF: File Id to delete (" + id + ")");

		String glob = id + "*";
		System.out.println("INF: Files to delete (" + glob + ")");

		StringUtils str = new StringUtils();
		int x = str.indexOf(src, id);
		String rootDir = str.left(src, x);

//		String rootDir = src.(id)[0];
		System.out.println("INF: Files to delete (" + rootDir + ")");
		runTimeDir = filePath + rootDir;
		System.out.println("INF: Files Dir to delete (" + runTimeDir + ")");
		try {
//			file = new File(filePath + glob);
//			if (file.exists()) {
//				file.delete();
//			}

			File dir = new File(runTimeDir);
			FileFilter fileFilter = new WildcardFileFilter(glob);
			File[] files = dir.listFiles(fileFilter);
			for (int i = 0; i < files.length; i++) {
				System.out.println(files[i]);
				files[i].delete();
			}

		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}

		String jsonResponseData = new Gson().toJson("Success");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsonResponseData);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		processRequest(request, response);
	}

}
