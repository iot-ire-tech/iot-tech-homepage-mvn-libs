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

public class UploadServlet extends HttpServlet {

	private boolean isMultipart;
	private String filePath;
//	private int maxFileSize = 500 * 1024;
//	private int maxMemSize = 4 * 1024;
	private File file;
	PropsReader pr = new PropsReader();
	String mediaHolderDir = "/src/main/webapp/resources/media/clients";

	public void init() {
		// Get the file location where it would be stored.
		filePath = getServletContext().getInitParameter("file-upload");
		ServletContext ctx = getServletContext();
		pr.init("env.comms.properties");
		String path = getServletContext().getRealPath("/");
		filePath = pr.setKey("appDir").getVal();
		filePath += mediaHolderDir;
	}

	protected void doPostProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// Check that we have a file upload request
		isMultipart = ServletFileUpload.isMultipartContent(request);
		response.setContentType("text/html");
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

// More Control : https://commons.apache.org/proper/commons-fileupload/using.html
		DiskFileItemFactory factory = new DiskFileItemFactory();

		// maximum size that will be stored in memory
		factory.setSizeThreshold(Integer.parseUnsignedInt(pr.setKey("maxMemSize").getVal()));

		// Location to save data that is larger than maxMemSize.
		// Configure a repository (to ensure a secure temp location is used)
		ServletContext servletContext = this.getServletConfig().getServletContext();
		File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
		factory.setRepository(repository);
		// /home/ae/.netbeans/8.2/apache-tomcat-8.0.27.0_base/work/Catalina/localhost/prototype_maven
		out.println("Uploaded Dir: " + repository.getAbsolutePath() + "<br>");
		//factory.setRepository(new File("/tmp"));

		// Create a new file upload handler
		ServletFileUpload upload = new ServletFileUpload(factory);

		// maximum file size to be uploaded.
		upload.setSizeMax(Integer.parseInt(pr.setKey("maxFileSize").getVal()));

		try {
			// Parse the request to get file items.
			List fileItems = upload.parseRequest(request);

			// Process the uploaded file items
			Iterator i = fileItems.iterator();

			while (i.hasNext()) {
				FileItem fi = (FileItem) i.next();
				if (!fi.isFormField()) {
					// Get the uploaded file parameters
					String fieldName = fi.getFieldName();
					String fileName = fi.getName();
					String contentType = fi.getContentType();
					boolean isInMemory = fi.isInMemory();
					long sizeInBytes = fi.getSize();

					// Write the file
					if (fileName.lastIndexOf("\\") >= 0) {
						file = new File(filePath + "/" + client + "_" + resourceName + "_" + fileName.substring(fileName.lastIndexOf("\\")));
					} else {
						file = new File(filePath + "/" + client + "_" + resourceName + "_" + fileName.substring(fileName.lastIndexOf("\\") + 1));
					}
					fi.write(file);
//					out.println("Uploaded Filename: " + file.getAbsoluteFile() + "<br>");
//					out.println("Uploaded Filename: " + fileName + "<br>");
				}

				String filename = file.getName().split("\\.")[0];
				String tmp = pr.setKey("appDir").getVal() + mediaHolderDir + filename;
				filename = tmp;
				System.out.println("INF: Filename (" + filename + ")");
				String ext = file.getName().split("\\.")[1];
				System.out.println("INF: Ext (" + ext + ")");

				if (!ext.contains("m")) {
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
					sb4.append(filename + "_thumbnail." + ext);
					System.out.println("INF: Executing Command (" + sb4.toString() + ")");
					proc = Runtime.getRuntime().exec(sb4.toString());
					proc.waitFor();
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

	protected void doGetProcessX(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String url = URLDecoder.decode(request.getQueryString(), "UTF-8");
//		String partClient = url.split("&")[0];
//		String partResource = url.split("&")[1];
//		String client = partClient.split("=")[1];

		ServletContext ctx = getServletConfig().getServletContext();

		String filename = "/img/logo-iot.png";
		String original_filename = "x_" + "logo-iot.png";
		File f = new File(filename);
		int length = 0;
		String mimetype = ctx.getMimeType(filename);
		response.setContentType((mimetype != null) ? mimetype : "application/octet-stream");
		response.setContentLength((int) f.length());
		response.setHeader("Content-Disposition", "attachment; filename=\"" + original_filename + "\"");

		// /src/main/webapp
		//	InputStream is =  ctx.getResourceAsStream(new FileInputStream(f));
		int read = 0;
		byte[] bytes = new byte[BYTES_DOWNLOAD];
		OutputStream os = response.getOutputStream();

//		while ((read = is.read(bytes)) != -1) {
//			os.write(bytes, 0, read);
//		}
		os.flush();
		os.close();
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

	protected void doGetProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

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

		// /src/main/webapp
		InputStream is = ctx.getResourceAsStream("/img/logo-iot.png");

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
