/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package comms.mail.customer.booking.email;

//import com.google.common.reflect.TypeToken;

import com.google.gson.Gson;
import com.models.enterprise.mail.EntMailBookingPayload;
import servlet.PropsReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author ae
 */
@WebServlet(name = "MailBookingAlert", urlPatterns = {"/MailBookingAlert"})
public class MailBookingAlert extends HttpServlet {

    String basePath;
    String query;
    String s;
    String jsonPatron;
    Gson gson;

    StringBuilder sb;
    MailBookingAlertUx mailer;
    EntMailBookingPayload uxPayload;

    PropsReader pr = new PropsReader();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();

        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        // Map JSON data to Array Of Bookings Object!!!
        uxPayload = gson.fromJson(sb.toString(), EntMailBookingPayload.class);
//  Build Endpoints
        String hostnameHome = pr.setKey("proto").getVal() + pr.setKey("hostnameHomePage").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
        String hostnameEndUser = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();

        // Mail Details
        mailer.setSource(uxPayload);

        // EndPoints...
        mailer.setTo("tonyennis@yahoo.com");
        mailer.setMsgbody(mailer.generateHTML());

        //
        //
        // Base
        //
        //
        mailer.init();

        response.getOutputStream().print("{}");
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
        mailer = new MailBookingAlertUx();
        mailer.setSubject("INF: MyBusinssPal Booking Alert");
        mailer.setFrom("alerts@mybusinesspal.com");
        mailer.setFromAlias("MyBusinssPal Booking Service");
        // Derived Class
        mailer.setTitle("MyBusinssPal - Booking Alert");
        gson = new Gson();
        sb = new StringBuilder();
        uxPayload = new EntMailBookingPayload();

        // Properties
        pr.init("env.comms.properties");
    }

}
