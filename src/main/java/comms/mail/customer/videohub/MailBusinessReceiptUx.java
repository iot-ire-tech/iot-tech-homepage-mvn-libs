/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.customer.videohub;

import com.models.db.mm.EntMm;
import com.models.db.mm.MmItems;
import com.models.enterprise.checkout.EntPurchase;
import com.models.enterprise.checkout.EntPurchaseItem;
import com.models.enterprise.endpoints.EntEndpoints;
import entities.EntMailShoppingReceipt;
import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import servlet.Mailer;

import java.util.ArrayList;

/**
 * @author ae
 */
public class MailBusinessReceiptUx extends Mailer {

    StringBuilder b = new StringBuilder();
    String urlApp;

    String endPointHomepage;
    String endPointDispute;
    String endPointSupport;

    String ts;
    String htmlImg = "";
    String title;
    ArrayList<EntPurchase> source;
    int counter = 0;
    EntEndpoints ep = new EntEndpoints();
    String url = "http://localhost:8084/resources/media/clients/acct/video/photoId";

    public static void main(String[] args) {

    }

    public MailBusinessReceiptUx(String to, String from, String fromAlias, String subject, String msgbody) {
        super(to, from, fromAlias, subject, msgbody);
    }

    public MailBusinessReceiptUx(String to, String from, String fromAlias, String subject) {
        super(to, from, fromAlias, subject);
    }

    /**
     *
     */
    public MailBusinessReceiptUx() {
        super();

    }

    public String generateHTML() {
        String tmp = "";

        b = new StringBuilder();
        b.append("<html>");
        b.append("<head>");
//        b.append("<title>" + getTitle() + "</title>");
        b.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
        b.append("<style>");
        b.append("#header,#footer { background-color:CornflowerBlue; }");
        b.append("h1 { color:black; text-align: center; }");
        b.append("</style>");
        b.append("</head>");
        b.append("<body>");


        b.append("<br>");
        b.append("<hr>");
        b.append("<b><center>Automated Confirmation Detail</center></b>");
        b.append("<hr>");
        b.append("Thank you for your purchase, " + getSource().get(0).getName() + ", details are listed below, if you have an issue, click on the dispute link below, and we will follow-up on it asap.");

        b.append("<br>");
        b.append("<hr><hr>");
        b.append("<b><center>VideoHub Details</center></b>").append("<br>");
        b.append("<hr><hr>");
        b.append("<br>");

        b.append("Account Id: " + getSource().get(0).getAccountId()).append("<br>");
        b.append("Customer Id: " + getSource().get(0).getCustomerId()).append("<br>");
        b.append("<br>");

        for (EntPurchase purchase : getSource()) {

            for (EntPurchaseItem purchaseItem : purchase.getItems()) {
                counter=0;
                b.append("Series Title: " + purchaseItem.getTitle()).append("<br>");
                HttpResponse<EntMm> mmItems = Unirest.get(ep.dbMm + "/" + purchaseItem.getLinks().getMmId())
                        .header("accept", "application/json")
                        .header("x-apikey", ep.key)
                        .header("Access-Control-Allow-Headers", "*")
                        .asObject(EntMm.class);
                for (MmItems mmItem : mmItems.getBody().getItems()) {
                    String media = url + "/" + mmItem.getMedia().getLink();
                    media = mmItem.getMedia().getLink();
                    if (mmItem.getMedia().getType().contains("video"))
                        b.append("Media Link#" + ++counter + ": <a target='_blank' href=" + media + ">" + mmItem.getTab().getTitle() + "</a>").append("<br>");
                }
                b.append("<br><br>");
            }

        }
        // Payment Dispute Link

        b.append("<br>");
        tmp = "href=" + getEndPointDispute();

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

    public String getUrlApp() {
        return urlApp;
    }

    public void setUrlApp(String urlApp) {
        this.urlApp = urlApp;
    }

    public String getEndPointHomepage() {
        return endPointHomepage;
    }

    public void setEndPointHomepage(String endPointHomepage) {
        this.endPointHomepage = endPointHomepage;
    }

    public String getEndPointDispute() {
        return endPointDispute;
    }

    public void setEndPointDispute(String endPointDispute) {
        this.endPointDispute = endPointDispute;
    }

    public String getEndPointSupport() {
        return endPointSupport;
    }

    public void setEndPointSupport(String endPointSupport) {
        this.endPointSupport = endPointSupport;
    }

    public String getTs() {
        return ts;
    }

    public void setTs(String ts) {
        this.ts = ts;
    }

    public String getHtmlImg() {
        return htmlImg;
    }

    public void setHtmlImg(String htmlImg) {
        this.htmlImg = htmlImg;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ArrayList<EntPurchase> getSource() {
        return source;
    }

    public void setSource(ArrayList<EntPurchase> source) {
        this.source = source;
    }
}
