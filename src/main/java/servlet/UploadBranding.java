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

public class UploadBranding extends HttpServlet {

	private boolean isMultipart;
	private String filePath;
//	private int maxFileSize = 500 * 1024;
//	private int maxMemSize = 4 * 1024;
	private File file;
	PropsReader pr = new PropsReader();
	String rtFilename = "";
	String mediaHolderDir = "/src/main/webapp/resources/media/clients/";

	public void init() {
		// Get the file location where it would be stored.
		filePath = getServletContext().getInitParameter("file-upload");
		System.out.println("INF: filePath (" + filePath + ")");

		ServletContext ctx = getServletContext();
		pr.init("env.comms.properties");
		String path = getServletContext().getRealPath("/");
		filePath = pr.setKey("appDir").getVal();
		System.out.println("INF: filePath (" + filePath + ")");
		filePath += mediaHolderDir;
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
		String resourceName = partResource.split("=")[1];
		resourceName = resourceName.replace(" ", "");

		java.io.PrintWriter out = response.getWriter();
		if (!isMultipart) {
			return;
		}

		DiskFileItemFactory factory = new DiskFileItemFactory();

		factory.setSizeThreshold(Integer.parseUnsignedInt(pr.setKey("maxMemSize").getVal()));

		ServletContext servletContext = this.getServletConfig().getServletContext();
		File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
		factory.setRepository(repository);
		System.out.println("Uploaded Dir: " + repository.getAbsolutePath() + "<br>");
		//factory.setRepository(new File("/tmp"));

		ServletFileUpload upload = new ServletFileUpload(factory);

		upload.setSizeMax(Integer.parseInt(pr.setKey("maxFileSize").getVal()));

		try {
			// Parse the request to get file items.
			List fileItems = upload.parseRequest(request);

			// Process the uploaded file items
			// This will iterate for each input item on the FORM[0]
			Iterator i = fileItems.iterator();
			String fieldName = "";
			while (i.hasNext()) {
				FileItem fi = (FileItem) i.next();
				if (!fi.isFormField()) {
					// Get the uploaded file parameters
					fieldName = fi.getFieldName();
					System.out.println("INF: fieldName (" + fieldName + ")");
					String fileName = fi.getName();
					String contentType = fi.getContentType();
					boolean isInMemory = fi.isInMemory();
					long sizeInBytes = fi.getSize();
					System.out.println("Uploaded Filename: " + fileName);

					// Write the file
					System.out.println("INF: filePath (" + filePath + ")");
					if (fileName.lastIndexOf("\\") >= 0) {
						file = new File(filePath + "/" + client + "_" + resourceName + "_" + fileName.substring(fileName.lastIndexOf("\\")));
					} else {
						file = new File(filePath + "/" + client + "_" + resourceName + "_" + fileName.substring(fileName.lastIndexOf("\\") + 1));
					}
					fi.write(file);
					System.out.println("Uploaded Filename: " + file.getAbsoluteFile() + "<br>");
					System.out.println("Uploaded Filename: " + fileName);
				}

				String filename = file.getName().split("\\.")[0];
				String tmp = pr.setKey("appDir").getVal() + mediaHolderDir + filename;

				System.out.println("INF: file (" + file.getName() + ")");
				filename = tmp;
				filename += "_header";
				System.out.println("INF: Filename (" + filename + ")");
				String ext = file.getName().split("\\.")[1];
				System.out.println("INF: Ext (" + ext + ")");

				/*
				Send back a response to client, with location!!!
				 */
				if (!ext.contains("m") && fieldName.toLowerCase().contains("image") == true) {
					StringBuilder sb = new StringBuilder();
					sb.append("convert ");
					sb.append("-resize 50% ");
					sb.append(file + " ");
					sb.append(filename + "_half." + ext);
					System.out.println("INF: Executing Command (" + sb.toString() + ")");
					Process proc = Runtime.getRuntime().exec(sb.toString());
					proc.waitFor();

					StringBuilder sb2 = new StringBuilder();
					sb2.append("convert ");
					sb2.append("-resize 640x500 ");
					sb2.append(file + " ");
					sb2.append(filename + "_large." + ext);
					System.out.println("INF: Executing Command (" + sb2.toString() + ")");
					proc = Runtime.getRuntime().exec(sb2.toString());
					proc.waitFor();

					StringBuilder sb3 = new StringBuilder();
					sb3.append("convert ");
					sb3.append("-resize 300x300 ");
					sb3.append(file + " ");
					sb3.append(filename + "_medium." + ext);
					System.out.println("INF: Executing Command (" + sb3.toString() + ")");
					proc = Runtime.getRuntime().exec(sb3.toString());
					proc.waitFor();

					StringBuilder sb4 = new StringBuilder();
					sb4.append("convert ");
					sb4.append("-resize 150x150 ");
					sb4.append(file + " ");

					rtFilename = "/iot-base/resources/media/clients/" + file.getName();
					sb4.append(rtFilename);
					System.out.println("INF: Executing Command (" + sb4.toString() + ")");
					proc = Runtime.getRuntime().exec(sb4.toString());
					proc.waitFor();

					response.setContentType("application/json");
					//response.setContentType("text/plain");
					out = response.getWriter();
					out.print(
						"{"
						+ "\"path\": \"" + rtFilename + "\","
						+ "\"thumbNail\": \"" + rtFilename + "\","
						+ "\"small\": \"" + rtFilename + "\","
						+ "\"medium\": \"" + rtFilename + "\","
						+ "\"large\": \"" + rtFilename + "\""
						+ "}"
					);
					out.flush();
				} else {
					rtFilename = "/iot-base/resources/media/clients/" + file.getName();
//					rtFilename = "/iot-base/resources/media/vid1.mp4";
					response.setContentType("application/json");
					out = response.getWriter();
					out.print(
						"{"
						+ "\"path\": \"" + rtFilename + "\""
						+ "}"
					);
					out.flush();
				}

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

	protected void doGetProcessX(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = URLDecoder.decode(request.getQueryString(), "UTF-8");
//		String partClient = url.split("&")[0];
//		String partResource = url.split("&")[1];
//		String client = partClient.split("=")[1];

		ServletContext ctx = getServletContext();

		String filename = "/img/logo-iot.png";
		String filename_browser = "x_" + "logo-iot.png";
		File f = new File(filename);
		String mimetype = ctx.getMimeType(filename);

		response.setContentType((mimetype != null) ? mimetype : "application/octet-stream");
		response.setContentLength((int) f.length());
		response.setHeader("Content-Disposition", "attachment; filename=\"" + filename_browser + "\"");
		//	response.setHeader("Content-Disposition", "filename=\"hoge.txt\"");

		// /src/main/webapp
		String absolutFil = "/src/main/webapp/resources/media/calendar.gif";
		absolutFil = "/WEB-INF/calendar.gif"; // works
		//	absolutFil = "/resources/media/calendar.gif";
		InputStream is = ctx.getResourceAsStream(absolutFil);

		int read = 0;
		byte[] bytes = new byte[BYTES_DOWNLOAD];
		OutputStream os = response.getOutputStream();

		while ((read = is.read(bytes)) != -1) {
			os.write(bytes, 0, read);
		}
		os.flush();
		os.close();
	}
}
