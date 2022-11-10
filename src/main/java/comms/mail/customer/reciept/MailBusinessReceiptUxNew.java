/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.customer.reciept;

import com.models.enterprise.checkout.EntDataBase64;
import com.models.enterprise.checkout.EntPurchaseItem;
import com.models.enterprise.checkout.EntPurchase;
import com.models.enterprise.endpoints.EntEndpoints;
import com.models.enterprise.sms.EntSmsHttpPayload;
import entities.EntMailShoppingReceipt;

import java.util.ArrayList;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import org.apache.commons.codec.binary.BinaryCodec;
import servlet.Mailer;

/**
 * @author ae
 */
public class MailBusinessReceiptUxNew extends Mailer {

    StringBuilder b = new StringBuilder();
    String urlApp;

    String endPointHomepage;
    String endPointDispute;
    String endPointSupport;

    String ts;
    String htmlImg = "";
    String bcfile;
    String title;
    ArrayList<EntPurchase> source;
//	EntPurchase source;

    public static void main(String[] args) {

    }

    public MailBusinessReceiptUxNew(String to, String from, String fromAlias, String subject, String msgbody) {
        super(to, from, fromAlias, subject, msgbody);
    }

    public MailBusinessReceiptUxNew(String to, String from, String fromAlias, String subject) {
        super(to, from, fromAlias, subject);
    }

    /**
     *
     */
    public MailBusinessReceiptUxNew() {
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

        // https://rodriguezcommaj.com/blog/using-images-in-html-email/
        // Embedding Youtube!! - https://www.emailonacid.com/blog/article/email-development/how-to-embed-videos-that-are-playable-in-yahoo-mail/
        // https://sendgrid.com/blog/embedding-images-emails-facts/
        b.append("<br>");
        b.append("<hr>");
        b.append("<b><center>Automated Confirmation Detail</center></b>");
        b.append("<hr>");
        b.append("Thank you for your purchase, " + getSource().get(0).getName() + ", details are listed below, if you have an issue, click on the dispute link below, and we will follow-up on it asap.");
//		b.append("Thank you for your purchase,  details are listed below, if you have an issue, click on the dispute link below, and we will follow-up on it asap.");
        b.append("<br>");

        for (EntPurchase purchase : getSource()) {
            for (EntPurchaseItem item : purchase.getItems()) {

                boolean skip = false;

                b.append("<br><br>");
                b.append("<hr><hr>");
                b.append("<b><center>E-Receipt Details</center></b>").append("<br>");
                b.append("<hr><hr>");
                b.append("<br><br>");

                BinaryCodec:
                {

                    if (getTo().contains("yahoo") || getTo().contains("hotmail")) {
                        // Base64 Embedded
                        bcfile = item.getRevenue().getBarcode();
                    } else {
                        // Linked Image Embedded
                        // Link must be available via internet not local - duh!!
                        bcfile = "http://localhost:8084/resources/media/clients/524281_139537_qr_auth.png";
                        bcfile = "https://freshinbox.com/images/ext/rogueone-600-playbtn.jpg";
                    }
                    bcfile = item.getRevenue().getBarcode();
                   htmlImg = "<center><img src=" + bcfile + " width=600 style=\"width:600px;display:block\" border=0></center>";
                    b.append(htmlImg).append("<br>");
                    b.append("<br><br>");
                }

                b.append("Issue Date: " + getTs()).append("<br>");
                b.append("Name: " + item.getTitle()).append("<br>");
                b.append("Cost: " + item.getRevenue().getCosts().getTransactionDecimal()).append("<br>");
                b.append("<br>");
                b.append("Account Id: " + item.getAccountId()).append("<br>");
                b.append("Charge Id: " + item.getLinks().getChargeId()).append("<br>");
                b.append("Product Id: " + item.getProductId()).append("<br>");
                b.append("Customer Id: " + item.getCustomerId()).append("<br>");

            }
        }
        // Payment Dispute Link

        b.append("<br>");
        tmp = "href=" + getEndPointDispute();
        tmp = "href=https://www.mybusinesspal.com/support.jsp";

        b.append("If you have a dispute about the above: <a target='_blank'" + tmp + " >click here!</a>").append("<br>");

        b.append("<br>");
        b.append("<br>");
        b.append("<hr>");
        b.append("This is an automated email from MyBusinessPal.Com. Please do not reply to this email. Instead use support links below");

        b.append("<br>");
        b.append("<br>");
        b.append("<span>Kind Regards,</span><br>");
        b.append("<span>MyBusinessPal.Com</span><br>");
        b.append("<br>");
        tmp = "href=" + getEndPointHomepage();

        b.append("MyBusinessPal.Com Homepage: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
        tmp = "href=" + getEndPointSupport();

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrlApp() {
        return urlApp;
    }

    public void setUrlApp(String urlApp) {
        this.urlApp = urlApp;
    }

    public String getTs() {
        return ts;
    }

    public void setTs(String ts) {
        this.ts = ts;
    }

    public String getEndPointHomepage() {
        return endPointHomepage;
    }

    public void setEndPointHomepage(String endPointHomepage) {
        this.endPointHomepage = endPointHomepage;
    }

    public String getEndPointSupport() {
        return endPointSupport;
    }

    public void setEndPointSupport(String endPointSupport) {
        this.endPointSupport = endPointSupport;
    }

    public String getEndPointDispute() {
        return endPointDispute;
    }

    public void setEndPointDispute(String endPointDispute) {
        this.endPointDispute = endPointDispute;
    }

    public String getBcfile() {
        return bcfile;
    }

    public void setBcfile(String bcfile) {
        this.bcfile = bcfile;
    }

    public String getHtmlImg() {
        return htmlImg;
    }

    public void setHtmlImg(String htmlImg) {
        this.htmlImg = htmlImg;
    }


    public ArrayList<EntPurchase> getSource() {
        return source;
    }

    public void setSource(ArrayList<EntPurchase> source) {
        this.source = source;
    }
}
