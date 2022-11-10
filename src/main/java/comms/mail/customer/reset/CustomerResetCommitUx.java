/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.customer.reset;

import com.models.stripe.entities.EntCustomer;
import servlet.Mailer;

/**
 * @author ae
 */
public class CustomerResetCommitUx extends Mailer {

    StringBuilder b = new StringBuilder();
    String endPointUsers;
    String endPointLoginHomepage;
    String endPointSupport;
    String endPointHomepage;
    String endPointPasswordResetCommit;
    String endPointLoginEndUser;

    String title;
    EntCustomer source;
    String ts;

    String accountId;

    public static void main(String[] args) {

    }

    public CustomerResetCommitUx(String to, String from, String fromAlias, String subject, String msgbody) {
        super(to, from, fromAlias, subject, msgbody);
    }

    public CustomerResetCommitUx(String to, String from, String fromAlias, String subject) {
        super(to, from, fromAlias, subject);
    }

    /**
     *
     */
    public CustomerResetCommitUx() {
        super();

    }

    public String generateHTML() {
        String tmp = "";

        b = new StringBuilder();
        b.append("<html>");
        b.append("<head>");
        b.append("<title>" + getTitle() + "</title>");
        b.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
        b.append("<style>");
        b.append("#header,#footer { background-color:CornflowerBlue; }");
        b.append("h1 { color:black; text-align: center; }");
        b.append("</style>");
        b.append("</head>");
        b.append("<body>");

        b.append("<br>");
        b.append("<hr>");
        b.append("<b><center>Automated Notification</center></b>");
        b.append("<hr>");
        b.append("<br>");

        b.append("<b><center>Account Details</center></b>").append("<br>");
        b.append("UserName: " + getSource().getPerson().getEmail()).append("<br>");
        b.append("Has a password reset completed</b>").append("<br>");
        tmp = "href=" + getEndPointLoginEndUser();
        b.append("Account Login Link: <a target='_blank'" + tmp + " >Open</a>").append("<br>");

        b.append("<br>");
        b.append("<br>");
        b.append("<br>");
        b.append("This is an automated email from MyBusinessPal.Com. Please do not reply to this email. Instead use support links below");
        b.append("<br>");
        b.append("<br>");
        b.append("<span>Kind Regards,</span><br>");
        b.append("<span>MyBusinessPal.Com</span><br>");
        b.append("<br>");
        tmp = "href=" + getEndPointHomepage();
        b.append("MyBusinessPal.Com Homepage: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
//		tmp = "href=" + getEndPointSupport() + clientId;
        b.append("Online Support: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
        tmp = "href=tel:016602353";
        b.append("Telephone Support: <a" + tmp + ">+353 1 254 2326</a>").append("<br>");
        b.append("<br>");

        b.append("</body>");
        b.append("</html>");

        return b.toString();

    }

    public StringBuilder getB() {
        return b;
    }

    public void setB(StringBuilder b) {
        this.b = b;
    }

    public String getEndPointUsers() {
        return endPointUsers;
    }

    public void setEndPointUsers(String endPointUsers) {
        this.endPointUsers = endPointUsers;
    }

    public String getEndPointLoginHomepage() {
        return endPointLoginHomepage;
    }

    public void setEndPointLoginHomepage(String endPointLoginHomepage) {
        this.endPointLoginHomepage = endPointLoginHomepage;
    }

    public String getEndPointSupport() {
        return endPointSupport;
    }

    public void setEndPointSupport(String endPointSupport) {
        this.endPointSupport = endPointSupport;
    }

    public String getEndPointHomepage() {
        return endPointHomepage;
    }

    public void setEndPointHomepage(String endPointHomepage) {
        this.endPointHomepage = endPointHomepage;
    }


    public String getEndPointLoginEndUser() {
        return endPointLoginEndUser;
    }

    public void setEndPointLoginEndUser(String endPointLoginEndUser) {
        this.endPointLoginEndUser = endPointLoginEndUser;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public EntCustomer getSource() {
        return source;
    }

    public void setSource(EntCustomer source) {
        this.source = source;
    }

    public String getTs() {
        return ts;
    }

    public void setTs(String ts) {
        this.ts = ts;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getEndPointPasswordResetCommit() {
        return endPointPasswordResetCommit;
    }

    public void setEndPointPasswordResetCommit(String endPointPasswordResetCommit) {
        this.endPointPasswordResetCommit = endPointPasswordResetCommit;
    }
}
