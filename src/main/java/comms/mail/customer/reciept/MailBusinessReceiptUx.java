/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.customer.reciept;

import entities.EntMailShoppingReceipt;
import java.util.ArrayList;
import servlet.Mailer;

/**
 *
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
	String bcfile;
	String title;
	ArrayList<EntMailShoppingReceipt> source;

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
		b.append("Thank you for your purchase, " + getSource().get(0).getFullName() + ", details are listed below, if you have an issue, click on the dispute link below, and we will follow-up on it asap.");
		b.append("<br>");

		for (EntMailShoppingReceipt receipt : getSource()) {

			boolean skip = false;

			b.append("<br><br>");
			b.append("<hr><hr>");
			b.append("<b><center>E-Receipt Details</center></b>").append("<br>");
			b.append("<hr><hr>");
			b.append("<br><br>");

			if (getTo().contains("yahoo") || getTo().contains("hotmail")) {
				// Base64 Embedded
				bcfile = receipt.getBarcode().getImgString();
			} else {
				// Linked Image Embedded
				// Link must be available via internet not local - duh!!
				bcfile = "http://localhost:8084/resources/media/clients/524281_139537_qr_auth.png";
				bcfile = "https://freshinbox.com/images/ext/rogueone-600-playbtn.jpg";
			}
			htmlImg = "<center><img src=" + bcfile + " width=600 style=\"width:600px;display:block\" border=0></center>";
			b.append(htmlImg).append("<br>");
			b.append("Issue Date: " + getTs()).append("<br>");
			b.append("Name: " + receipt.getShoppingItem().getName()).append("<br>");
			b.append("Description: " + receipt.getShoppingItem().getDescription()).append("<br>");
			b.append("Cost: " + receipt.getShoppingItem().getCost()).append("<br>");
			b.append("<br>");
			b.append("Account Id: " + receipt.getAccountId()).append("<br>");
			b.append("Charge Id: " + receipt.getChargeId()).append("<br>");
			b.append("Product Id: " + receipt.getProductId()).append("<br>");
			b.append("Customer Id: " + receipt.getCustomerId()).append("<br>");


			webinar:
			{
				if (receipt.getWebinarData().length() > 0) {
					b.append("<br><hr>");
					b.append("Your webinar bundle is available here.").append("<br>");
					String[] webinarData = receipt.getWebinarData().split(",");
//					zoomWebinarRsp.join_url + "," + zoomWebinarRsp.registrant_id + "," + zoomWebinarRsp.start_time + "," + zoomWebinarRsp.topic
					b.append("Topic: " + webinarData[3]).append("<br>");
					b.append("Registrant Id: " + webinarData[1]).append("<br>");
					b.append("Start Time: " + webinarData[2]).append("<br>");
					b.append("Join Url: <a target='_blank' href=" + webinarData[0] + ">" + webinarData[0] + "</a>").append("<br>");

					b.append("<br><br>");
					b.append("Please note you will additionally receive an email from Zoom, with further details including password(if required).").append("<br>");
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

	public ArrayList<EntMailShoppingReceipt> getSource() {
		return source;
	}

	public void setSource(ArrayList<EntMailShoppingReceipt> source) {
		this.source = source;
	}

}
