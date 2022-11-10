/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.membership;

import entities.EntMailSubscriptions;
import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailCustomerMembershipUx extends Mailer {

	StringBuilder b = new StringBuilder();
	String urlApp;

	String endPointHomepage;
	String endPointPayments;
	String endPointSupport;

	String ts;
	String title;
	String endPointPaymentsCARD;
	EntMailSubscriptions source;

	public static void main(String[] args) {

	}

	public MailCustomerMembershipUx(String to, String from, String fromAlias, String subject, String msgbody) {
		super(to, from, fromAlias, subject, msgbody);
	}

	public MailCustomerMembershipUx(String to, String from, String fromAlias, String subject) {
		super(to, from, fromAlias, subject);
	}

	/**
	 *
	 */
	public MailCustomerMembershipUx() {
		super();

	}

	public String generateHTML() {
		String tmp = "";

		b = new StringBuilder();
		b.append("<html>");
		b.append("<head>");
		b.append("<title></title>");
		b.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
		b.append("<style>");
		b.append("#header,#footer { background-color:CornflowerBlue; }");
		b.append("h1 { color:black; text-align: center; }");

		b.append("\n"
			+ "  table {\n"
			+ "    border-collapse: collapse;\n"
			+ "  }\n"
			+ "  th, td {\n"
			+ "    border: 1px solid black;\n"
			+ "    padding: 10px;\n"
			+ "    text-align: left;\n"
			+ "  }\n"
			+ "");
		b.append("</style>");
		b.append("</head>");
		b.append("<body>");

		b.append("<br>");
		b.append("<hr>");
		b.append("<b><center>Automated Subscription Details</center></b>");
		b.append("<hr>");
		b.append("<br>").append("<br>");

		b.append("<center>" + getSource().getSubscriptionTable() + "</center>").append("<br>");

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

	public String getEndPointPayments() {
		return endPointPayments;
	}

	public void setEndPointPayments(String endPointPayments) {
		this.endPointPayments = endPointPayments;
	}

	public String getEndPointSupport() {
		return endPointSupport;
	}

	public void setEndPointSupport(String endPointSupport) {
		this.endPointSupport = endPointSupport;
	}

	public String getEndPointPaymentsCARD() {
		return endPointPaymentsCARD;
	}

	public void setEndPointPaymentsCARD(String endPointPaymentsCARD) {
		this.endPointPaymentsCARD = endPointPaymentsCARD;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public EntMailSubscriptions getSource() {
		return source;
	}

	public void setSource(EntMailSubscriptions source) {
		this.source = source;
	}

}
