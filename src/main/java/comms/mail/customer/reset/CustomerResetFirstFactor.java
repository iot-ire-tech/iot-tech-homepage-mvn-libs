/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package comms.mail.customer.reset;

import com.google.gson.Gson;
import com.models.stripe.entities.EntCustomer;
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
@WebServlet(name = "CustomerResetFirstFactor", urlPatterns = {"/CustomerResetFirstFactor"})
public class CustomerResetFirstFactor extends HttpServlet {

    String basePath;
    String query;
    String s;
    String jsonPatron;
    Gson gson;

    StringBuilder sb;
    CustomerFirstFactorUx mailer;
    EntCustomer uxPayload;

    PropsReader pr = new PropsReader();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");


        sb = new StringBuilder();

        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        // Map JSON data to Array Of Bookings Object!!!
        uxPayload = gson.fromJson(sb.toString(), EntCustomer.class);
//  Build Endpoints
        String hostnameHome = pr.setKey("proto").getVal() + pr.setKey("hostnameHomePage").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
        String hostnameEndUser = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();

        mailer.setSource(uxPayload);

        mailer.setEndPointHomepage(hostnameHome + pr.setKey("endPointHome").getVal());
        mailer.setEndPointSupport(hostnameHome + pr.setKey("endPointSupport").getVal());
        mailer.setEndPointPasswordResetCommit(hostnameHome + pr.setKey("endPointPasswordResetCommit").getVal() +
                "?accountId=" + uxPayload.getAccountId() + "&" +
                "accountIdP=" + uxPayload.getAccountId() + "&" +
                "email=" + uxPayload.getPerson().getEmail() + "&" +
                "accountIdC=" + "&" +
                "originId=resetAccount"
        );
        mailer.setEndPointLoginEndUser(hostnameEndUser + pr.setKey("endPointLogin").getVal() + "?accountId=" + uxPayload.getAccountId());

        // Derived
        mailer.setMsgbody(mailer.generateHTML());
        // Base
        mailer.setTo(uxPayload.getPerson().getEmail());
        mailer.init();

        response.getOutputStream().print(gson.toString());
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
        mailer = new CustomerFirstFactorUx();
        mailer.setSubject("INF: MyBusinessPal.Com - Account Request Update");
        mailer.setFrom("security@mybusinesspal.com");
        mailer.setFromAlias("MyBusinessPal.Com Security Alert");

        // Derived Class
        mailer.setTitle("MyBusinessPal.Com - Account Request Update");
        gson = new Gson();
        sb = new StringBuilder();
        uxPayload = new EntCustomer();

        // Properties
        pr.init("env.comms.properties");
    }

}
