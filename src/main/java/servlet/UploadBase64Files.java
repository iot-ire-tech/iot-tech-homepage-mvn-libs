package servlet;

import com.google.gson.Gson;
import com.models.stripe.entities.EntDataBase64;
import sun.misc.BASE64Decoder;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

//import sun.misc.BASE64Decoder;
//import sun.misc.BASE64Decoder;

@MultipartConfig
@WebServlet(name = "UploadFilesBase64", urlPatterns = {"/UploadFilesBase64"})
public class UploadBase64Files extends HttpServlet {

    String s;
    Gson gson;
    StringBuilder sb;

    String root;
    File file;
    File path;
    PropsReader pr = new PropsReader();
    EntDataBase64 uxPayload;

    public void init() {
        // Get the file location where it would be stored.
        uxPayload = new EntDataBase64();
        gson = new Gson();
        sb = new StringBuilder();

        pr.init("env.comms.properties");

    }

    protected void doPostProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        root = getServletContext().getRealPath("/");
// Parse Json
        System.out.println("INF: Processing Base 64 Image ");
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        uxPayload = gson.fromJson(sb.toString(), EntDataBase64.class);
// Reciept Dir
        root += uxPayload.getUploadDir();
        path = new File(root);
        if (!path.exists()) {
            boolean status = path.mkdirs();
        }

// File Creation
        String result = "";
        String imgStr = uxPayload.getImgString();
        if (null != imgStr) {
            imgStr = imgStr.substring(imgStr.indexOf(",") + 1);
            Boolean flag = GenerateImage(imgStr, root, uxPayload.getProductId() + "." + uxPayload.getImgExt());
            if (flag) {
                result = root + "/" + uxPayload.getProductId() + "." + uxPayload.getImgExt();
            }
        }
        System.out.println("INF: Barcode (" + result + ")");
        System.out.println("INF: Processing Base 64 Image Completed");

// Return client response
        response.getOutputStream().print(gson.toJson(uxPayload));
        response.getOutputStream().flush();
    }

    public boolean GenerateImage(String imgStr, String filePath, String fileName) {
        try {
            if (imgStr == null) {
                return false;
            }
            BASE64Decoder decoder = new BASE64Decoder();
            byte[] b = decoder.decodeBuffer(imgStr);
            File file = new File(filePath);
            if (!file.exists()) {
                file.mkdirs();
            }
            OutputStream out = new FileOutputStream(filePath + "/" + fileName);
            out.write(b);
            out.flush();
            out.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    protected void doGetProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGetProcess(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPostProcess(request, response);
    }

}
