package servlet;

import java.io.*;
import java.net.URLDecoder;
import java.util.*;
import javax.servlet.ServletContext;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import utils.os.CmdConvert;
import utils.os.ParseUrlUploadFile;

@WebServlet(name = "UploadFileImages", urlPatterns = {"/UploadFileImages"})
//@MultipartConfig(fileSizeThreshold = 0, maxFileSize = 314572800, maxRequestSize = 314572800)
public class UploadFileImages extends HttpServlet {

    private boolean isMultipart;
    private String filePath;
    private String filePath2;
    File file;
    File file2;
    String filename;
    String fileName;
    String newfilename;
    String ext;
    PropsReader pr = new PropsReader();
    String rtFilename = "";
    // accessible by webapp
    String mediaHolderDir = "/src/main/webapp/resources/media/clients/";
    // accessible by java
    String mediaHolderDir2 = "/src/main/resources/media/clients/";

    public void init() {
//		mediaHolderDir = "/src/main/resources/media/clients/";
        // Get the file location where it would be stored.
        pr.init("env.comms.properties");
        String path = getServletContext().getRealPath("/");
        filePath = pr.setKey("appDir").getVal();
        filePath2 = pr.setKey("appDir").getVal();
        System.out.println("INF: filePath (" + filePath + ")");
        filePath += mediaHolderDir;
        filePath2 += mediaHolderDir2;
        System.out.println("INF: filePath (" + filePath + ")");
        System.out.println("INF: filePath (" + filePath2 + ")");
    }

    protected void doPostProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // Check that we have a file upload request
        isMultipart = ServletFileUpload.isMultipartContent(request);
// Request URL Decompose

        ParseUrlUploadFile url = new ParseUrlUploadFile(URLDecoder.decode(request.getQueryString(), "UTF-8"));
        url.init();

        java.io.PrintWriter out = response.getWriter();
        if (!isMultipart) {
            return;
        }
        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setSizeThreshold(Integer.parseUnsignedInt(pr.setKey("maxMemSize").getVal()));

        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setSizeMax(Integer.parseInt(pr.setKey("maxFileSize").getVal()));

        try {
            // Parse the request to get file items.
            List fileItems = upload.parseRequest(request);

            // Process the uploaded file items
            // This will iterate for each input item on the FORM[0]
            Iterator i = fileItems.iterator();
            while (i.hasNext()) {
                FileItem fi = (FileItem) i.next();
                if (!fi.isFormField()) {
                    // Get the uploaded file parameters
                    fileName = fi.getName();

                    // Write the file to ClientID Directory!!!
                    String clientDir = filePath + "/" + url.getClientId() + "/" + url.getMediaType() + "/" + url.getItemTag();
                    String clientDir2 = filePath2 + "/" + url.getClientId() + "/" + url.getMediaType() + "/" + url.getItemTag();

// The new Rile, will additonally create a new dir!!!
                    new File(clientDir).mkdirs();
                    new File(clientDir2).mkdirs();

// The New File will creat a new file!!!
                    if (fileName.lastIndexOf("\\") >= 0) {
                        newfilename = url.getClientId() + "_" + url.getItemTag() + "_" + fileName.substring(fileName.lastIndexOf("\\"));
                        file = new File(clientDir + "/" + url.getTargetId() + "_" + fileName.substring(fileName.lastIndexOf("\\")));
                        file2 = new File(clientDir2 + "/" + url.getTargetId() + "_" + fileName.substring(fileName.lastIndexOf("\\")));
                    } else {
                        newfilename = url.getClientId() + "_" + url.getItemTag() + "_" + fileName.substring(fileName.lastIndexOf("\\") + 1);
                        file = new File(clientDir + "/" + url.getTargetId() + "_" + fileName.substring(fileName.lastIndexOf("\\") + 1));
                        file2 = new File(clientDir2 + "/" + url.getTargetId() + "_" + fileName.substring(fileName.lastIndexOf("\\") + 1));
                    }
                    fi.write(file);
//                    fi.write(file2);
                    FileUtils.copyFile(file, file2);

                }

                // Process The Files
                out = response.getWriter();
                response.setContentType("application/json");
                CmdConvert processImages = null;
                processImages = new CmdConvert(file, newfilename);
                processImages.init();

                if (url.getMediaType().equalsIgnoreCase("image") == true) {
                    System.out.println("\n\nINF: Image uploaded\n\n");

                    if (url.getItemTag().equalsIgnoreCase("default") == true) {
                        System.out.println("INF: Processing Icon");

                    } else if (url.getItemTag().equalsIgnoreCase("icon") == true) {
                        System.out.println("INF: Processing Icon");
                        processImages.resize("16x16!", "icon");
                    } else if (url.getItemTag().equalsIgnoreCase("photoId") == true) {
                        processImages.resize("16x16!", "tiny");
                        processImages.resize("16x16!", "small");
                        processImages.resize("150x150!", "medium");
                        processImages.resize("150x150!", "large");
                        processImages.resize("200x200!", "default");
                    } else if (url.getItemTag().equalsIgnoreCase("small") == true) {
                        processImages.resize("50x50!", "small");
                    } else if (url.getItemTag().equalsIgnoreCase("resource") == true
                            || url.getItemTag().equalsIgnoreCase("eventImage") == true
                            || url.getItemTag().equalsIgnoreCase("branding") == true
                            || url.getItemTag().equalsIgnoreCase("subEvent") == true) {
                        processImages.resize("300x300!", "medium");
                    }
                    //https://www.freewebheaders.com/website-header-sizes/
                    else if (url.getItemTag().equalsIgnoreCase("hdr1") == true) {
                        processImages.resize("1920x130!", "header");
                    } else if (url.getItemTag().equalsIgnoreCase("tdr1") == true) {
                        processImages.resize("1920x130!", "footer");
                    } else if (url.getItemTag().equalsIgnoreCase("login") == true) {
                        processImages.resize("1920x130!", "login");
                    }

//					if (url.getItemTag().equalsIgnoreCase("org") == true) {
//						processImages.resize("", "cantResizeVid");
//					}
                    // Send back a response to client, with location!!!
                    // NewFilename is what comes back after resize
                    out.print(
                            "{"
                                    + "\"absoluteFilename\": \"" + file.getPath() + "\","
                                    + "\"filename\": \"" + processImages.getFilename() + "\","
                                    + "\"filenameNew\": \"" + processImages.getNewfilename() + "\","
                                    + "\"base\": \"" + processImages.getBase() + "\","
                                    + "\"ext\": \"" + processImages.getExt() + "\","
                                    + "\"filenameOrg\": \"" + newfilename + "\""
                                    + "}"
                    );
                }

                if (url.getMediaType().equalsIgnoreCase("video") == true) {

                    if (url.getItemTag().equalsIgnoreCase("eventVideo") == true) {

                    }
                    if (url.getItemTag().equalsIgnoreCase("eventVideo") == true) {

                    }

                    processImages.resize("300x300", "cantResizeVid");

                    System.out.println("\n\nINF: Video uploaded\n\n");
                    System.out.println("INF: File Path (" + file.getPath() + ")");
                    out.print(
                            "{"
                                    + "\"absoluteFilename\": \"" + file.getPath() + "\","
                                    + "\"filename\": \"" + file.getPath().split("clients/")[1] + "\","
                                    + "\"filenameOrg\": \"" + newfilename + "\""
                                    + "}"
                    );
                }

                out.flush();
            }

        } catch (Exception ex) {
            System.out.println("ERR: " + ex.getMessage());
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            return;
        }
    }

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

        filename = "/img/logo-iot.png";
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
