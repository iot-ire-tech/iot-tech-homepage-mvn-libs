/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.alerts;

import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailBusinessInventoryAlertUx extends Mailer {

	StringBuilder b = new StringBuilder();
	String urlApp;

	String endPointHomepage;
	String endPointDispute;
	String endPointSupport;

	String title;
	String ts;
	EntMailBusinessInventoryAlert source;

	public static void main(String[] args) {

	}

	public MailBusinessInventoryAlertUx(String to, String from, String fromAlias, String subject, String msgbody) {
		super(to, from, fromAlias, subject, msgbody);
	}

	public MailBusinessInventoryAlertUx(String to, String from, String fromAlias, String subject) {
		super(to, from, fromAlias, subject);
	}

	/**
	 *
	 */
	public MailBusinessInventoryAlertUx() {
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
		b.append("<b><center>Automated Alert Notification</center></b>");
		b.append("<hr>");
		b.append("An inventory threshold level, has been met, please take action to resolve.");
		b.append("<br>");

		b.append("<b><center>Alert Details</center></b>").append("<br>");
		b.append("Issue Date: " + getSource().getTs()).append("<br>");
		b.append("Name: " + getSource().getProductName()).append("<br>");
		b.append("Alert Level: " + getSource().getLevel()).append("<br>");
		b.append("Overflow Setting: " + getSource().getOverflow()).append("<br>");
		b.append("<br>");
		b.append("Product Id: " + getSource().getProductId()).append("<br>");
		b.append("Account Id: " + getSource().getAccountId()).append("<br>");
		b.append("<br><br>");

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

	public EntMailBusinessInventoryAlert getSource() {
		return source;
	}

	public void setSource(EntMailBusinessInventoryAlert source) {
		this.source = source;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
