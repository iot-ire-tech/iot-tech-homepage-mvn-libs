package servlet;

import java.io.*;
import java.net.URLDecoder;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@WebServlet(name = "UploadFormFiles", urlPatterns = {"/UploadFormFiles"})
public class UploadFormFiles extends HttpServlet {

	private boolean isMultipart;
	private String filePath;
	File file;
	String fileName;
	PropsReader pr = new PropsReader();
	private static final int BYTES_DOWNLOAD = 1024;

	public void init() {
		// Get the file location where it would be stored.
		pr.init("env.comms.properties");
		String path = getServletContext().getRealPath("/");
		filePath = pr.setKey("appDir").getVal();
		System.out.println("INF: filePath (" + filePath + ")");
		String mediaHolderDir = "/src/main/webapp/resources/media/clients/";
		filePath += mediaHolderDir;
		System.out.println("INF: filePath (" + filePath + ")");
	}

	protected void doPostProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// Check that we have a file upload request
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(Integer.parseUnsignedInt(pr.setKey("maxMemSize").getVal()));
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setSizeMax(Integer.parseInt(pr.setKey("maxFileSize").getVal()));

		try {
			List fileItems = upload.parseRequest(request);
			// This will iterate for each input item on the FORM[0]
			Iterator i = fileItems.iterator();
			while (i.hasNext()) {
				FileItem item = (FileItem) i.next();

				String fileName = item.getFieldName();

				String root = getServletContext().getRealPath("/");
				File path = new File(root + "/uploads");
				if (!path.exists()) {
					boolean status = path.mkdirs();
				}

				File uploadedFile = new File(path + "/" + fileName);
				System.out.println(uploadedFile.getAbsolutePath());
				item.write(uploadedFile);

			}

		} catch (Exception ex) {
			System.out.println(ex);
		}
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

}
