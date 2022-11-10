/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package comms.mail.customer.videohub;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.models.enterprise.checkout.EntPurchase;
import servlet.PropsReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

/**
 * @author ae
 */
@WebServlet(name = "MailBusinessVideoHub", urlPatterns = {"/MailBusinessVideoHub"})
public class MailBusinessReceipt extends HttpServlet {

    String basePath;
    String query;
    String s;
    String jsonPatron;
    Gson gson;

    StringBuilder sb;
    MailBusinessReceiptUx mailer;
    ArrayList<EntPurchase> uxPayload;
//	EntPurchase uxPayload;

    PropsReader pr = new PropsReader();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();

        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        // Map JSON data to Array Of Bookings Object!!!
        uxPayload = gson.fromJson(sb.toString(), new TypeToken<ArrayList<EntPurchase>>() {
        }.getType());


//  Build Endpoints
        String hostnameHome = pr.setKey("proto").getVal() + pr.setKey("hostnameHomePage").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
        String hostnameEndUser = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();

        // Mail Details
        mailer.setTs(new Date().toGMTString());
        mailer.setSource(uxPayload);

        // EndPoints...
        mailer.setEndPointDispute(hostnameEndUser + pr.setKey("endPointSignup").getVal() + "?accountId=" + uxPayload.get(0).getAccountId());
        // Maybe add the card payment now?
        // Welcome Back anthony, look at whats new
        mailer.setEndPointHomepage(hostnameEndUser + pr.setKey("endPointHome").getVal() + "?accountId=" + uxPayload.get(0).getAccountId());
        // So you need help
        mailer.setEndPointSupport(hostnameEndUser + pr.setKey("endPointSupport").getVal() + "?accountId=" + uxPayload.get(0).getAccountId());
        // Derived
        System.out.println("INF: Mailing too: " + uxPayload.get(0).getEmail());
        mailer.setTo(uxPayload.get(0).getEmail());
//        mailer.setTo("tonyennis@yahoo.com");
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
        mailer = new MailBusinessReceiptUx();
        mailer.setSubject("MyBusinessPal VideoHub");
        mailer.setFrom("service@mybusinesspal.com");
        mailer.setFromAlias("MyBusinessPal VideoHub Service");
        // Derived Class
        mailer.setTitle("MyBusinessPal.Com");
        gson = new Gson();
        sb = new StringBuilder();
        uxPayload = new ArrayList<EntPurchase>();

        // Properties
        pr.init("env.comms.properties");
    }

}
