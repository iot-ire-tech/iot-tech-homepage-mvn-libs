/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package comms.mail.pnp;

//import com.google.common.reflect.TypeToken;

import com.google.gson.Gson;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.models.db.pnp.EntPnpMailPayload;
import servlet.PropsReader;

import java.util.Date;
import javax.servlet.annotation.WebServlet;

/**
 * @author ae
 */
@WebServlet(name = "MailPnPNewOrder", urlPatterns = {"/MailPnPNewOrder"})
public class MailPnPNewOrder extends HttpServlet {

    String basePath;
    String query;
    String s;
    String jsonPatron;
    Gson gson;

    StringBuilder sb;
    MailPnPNewOrderUx mailer;
    EntPnpMailPayload uxPayload;

    PropsReader pr = new PropsReader();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();

        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        uxPayload = gson.fromJson(sb.toString(), EntPnpMailPayload.class);
//  Build Endpoint
        String hostnameHome = pr.setKey("proto").getVal() + pr.setKey("hostnameHomePage").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
        String hostnameEndUser = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();

        // Mail Details
        mailer.setTs(new Date().toGMTString());
        mailer.setSource(uxPayload);

        // Derived
        mailer.setTo(uxPayload.getEmail());
        mailer.setMsgbody(mailer.generateHTML());

        //
        //
        // Base
        //
        //
        mailer.init();

        response.getOutputStream().print("{ \"result\" : \"passed\" }");
        response.getOutputStream().flush();

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    @Override
    public void init() throws ServletException {

        // Base Classs
        mailer = new MailPnPNewOrderUx();
        mailer.setSubject("MybusinessPal.Com Shipment Alert");
        mailer.setFrom("alerting@mybusinesspal.com");
        mailer.setFromAlias("MyBusinessPal Shipment Service");
        // Derived Class
        mailer.setTitle("MyBusinessPal Shipment Alert");
        gson = new Gson();
        sb = new StringBuilder();
        uxPayload = new EntPnpMailPayload();

        // Properties
        pr.init("env.comms.properties");
    }

}
