package servlet;

import java.io.*;
import java.net.URLDecoder;
import java.util.*;
import javax.servlet.ServletContext;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class UploadUsers extends HttpServlet {

	private boolean isMultipart;
	private String filePath;
	private File absoluteFilename;
	String fieldName = "";
	PropsReader pr = new PropsReader();
	String rtFilename = "";
	String serverUploadDir = "/src/main/webapp/resources/data/clients";

	public void init() {
		// Get the file location where it would be stored.
		filePath = getServletContext().getInitParameter("file-upload");
		System.out.println("INF: filePath (" + filePath + ")");

		ServletContext ctx = getServletContext();
		pr.init("env.comms.properties");
		String path = getServletContext().getRealPath("/");
		filePath = pr.setKey("appDir").getVal();
		System.out.println("INF: filePath (" + filePath + ")");
		filePath += serverUploadDir;
		System.out.println("INF: filePath (" + filePath + ")");
	}

	protected void doPostProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// Check that we have a file upload request
		isMultipart = ServletFileUpload.isMultipartContent(request);
		response.setContentType("text/html");

// Request URL Decompose
		String url = URLDecoder.decode(request.getQueryString(), "UTF-8");
		String partClient = url.split("&")[0];
		String partResource = url.split("&")[1];
		String client = partClient.split("=")[1];
		client = client.replace(" ", "");
		String tag = partResource.split("=")[1];
		tag = tag.replace(" ", "");

		java.io.PrintWriter out = response.getWriter();
		if (!isMultipart) {
			return;
		}

		DiskFileItemFactory factory = new DiskFileItemFactory();

		factory.setSizeThreshold(Integer.parseUnsignedInt(pr.setKey("maxMemSize").getVal()));

		ServletContext servletContext = this.getServletConfig().getServletContext();
		File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
		factory.setRepository(repository);
		System.out.println("Uploaded Dir: " + repository.getAbsolutePath());

		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setSizeMax(Integer.parseInt(pr.setKey("maxFileSize").getVal()));

		try {
			List fileItems = upload.parseRequest(request);

			Iterator i = fileItems.iterator();
			while (i.hasNext()) {
				FileItem fi = (FileItem) i.next();
				if (!fi.isFormField()) {
					fieldName = fi.getFieldName();
					System.out.println("INF: fieldName (" + fieldName + ")");
					String fileName = fi.getName();
					System.out.println("Filename to be uploaded: " + fileName);
					String contentType = fi.getContentType();
					boolean isInMemory = fi.isInMemory();
					long sizeInBytes = fi.getSize();

					if (fileName.lastIndexOf("\\") >= 0) {
						absoluteFilename = new File(filePath + "/" + client + "_" + tag + "_" + fileName.substring(fileName.lastIndexOf("\\")));
					} else {
						absoluteFilename = new File(filePath + "/" + client + "_" + tag + "_" + fileName.substring(fileName.lastIndexOf("\\") + 1));
					}
					fi.write(absoluteFilename);
					System.out.println("INF: absoluteFilename: " + absoluteFilename.getAbsoluteFile());
				}

				String filename = absoluteFilename.getName().split("\\.")[0];
				String appDir = pr.setKey("appDir").getVal() + serverUploadDir + filename;
				String ext = absoluteFilename.getName().split("\\.")[1];

				/*
				Send back a response to client, with location!!!
				 */
				rtFilename = "/iot-base/resources/media/clients/" + absoluteFilename.getName();
				response.setContentType("application/json");
				out = response.getWriter();
				out.print(
					"{"
					+ "\"path\": \"" + absoluteFilename + "\""
					+ "}"
				);
				out.flush();
			}

		} catch (Exception ex) {
			System.out.println(ex);
		}
	}

	/**
	 *
	 * Sends a file to the ServletResponse output stream. Typically you want
	 * the browser to receive a different name than the name the file has
	 * been saved in your local database, since your local names need to be
	 * unique.
	 *
	 * @param req The request
	 * @param resp The response
	 * @param filename The name of the file you want to download.
	 * @param original_filename The name the browser should receive.
	 */
	private static final int BYTES_DOWNLOAD = 1024;

	protected void doGetProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

//		https://stackoverflow.com/questions/1442893/implementing-a-simple-file-download-servlet
		String loc = "/home/ennisa/workspace/projects/iot-tech-homepage-mvn/src/main/webapp/WEB-INF";
		String fileName = "calendar.gif";
		String fileType = "image/jpg";
		// for example application/pdf, text/plain, text/html, image/jpg
		response.setContentType(fileType);

		// Make sure to show the download dialog
		response.setHeader("Content-disposition", "attachment; filename=" + fileName);

		// Assume file name is retrieved from database
		// For example D:\\file\\test.pdf
		File my_file = new File(fileName);

		// This should send the file to browser
		OutputStream out = response.getOutputStream();
		FileInputStream in = new FileInputStream(my_file);
		byte[] buffer = new byte[4096];
		int length;
//		while ((read = is.read(bytes)) != -1) {
		while ((length = in.read(buffer)) > 0) {
			out.write(buffer, 0, length);
		}
		in.close();
		out.flush();
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

}
