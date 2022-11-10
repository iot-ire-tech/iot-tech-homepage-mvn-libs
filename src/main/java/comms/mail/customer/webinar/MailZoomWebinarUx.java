/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.customer.webinar;

import zoom.model.EntZoomWebinarResponse;
import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailZoomWebinarUx extends Mailer {

	StringBuilder b = new StringBuilder();
	String urlApp;

	String endPointHomepage;
	String endPointDispute;
	String endPointSupport;

	String ts;
	String htmlImg = "";
	String bcfile;
	String title;
	EntZoomWebinarResponse source;

	public static void main(String[] args) {

	}

	public MailZoomWebinarUx(String to, String from, String fromAlias, String subject, String msgbody) {
		super(to, from, fromAlias, subject, msgbody);
	}

	public MailZoomWebinarUx(String to, String from, String fromAlias, String subject) {
		super(to, from, fromAlias, subject);
	}

	/**
	 *
	 */
	public MailZoomWebinarUx() {
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
		b.append("<b><center>Automated Confirmaton Detail</center></b>");
		b.append("<hr>");
		b.append("Thank you for your purchase, details are listed below, if you have an issue, click on the dispute link below, and we will follow-up on it asap.");
		b.append("<br>");
		b.append("<br>");
		b.append("<br>");

		b.append("<b><center>Zoom Webinar Host Details</center></b>").append("<br>");
		b.append("<hr>");
		b.append("Issue Date: " + getTs()).append("<br>");
		b.append("Topic: " + getSource().getTopic()).append("<br>");
		b.append("Agenda: " + getSource().getAgenda()).append("<br>");
		b.append("<br>");
		b.append("<br>");
		b.append("<hr>");
		b.append("Start Time: " + getSource().getStart_time()).append("<br>");
		b.append("TimeZone: " + getSource().getTimezone()).append("<br>");
		b.append("Duration[mins]: " + getSource().getDuration()).append("<br>");
		b.append("<br>");
		b.append("<br>");
		b.append("<hr>");
		b.append("Host Id: " + getSource().getHost_id()).append("<br>");
		b.append("Password: " + getSource().getPassword()).append("<br>");
		b.append("<br>");
		b.append("<br>");
		b.append("<hr>");
		tmp = "href=" + getSource().getRegistration_url();
		b.append("Registration Url: <a target='_blank'" + tmp + " >Registration</a>").append("<br>");
		tmp = "href=" + getSource().getJoin_url();
		b.append("Join Url: <a target='_blank'" + tmp + " >Join</a>").append("<br>");
		tmp = "href=" + getSource().getStart_url();
		b.append("Start Url: <a target='_blank'" + tmp + " >Start</a>").append("<br>");

		b.append("<br>");
		tmp = "href=https://support.zoom.us/hc/en-us";
		b.append("Zoom Support Channel: <a target='_blank'" + tmp + " >click here!</a>").append("<br>");

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

	public EntZoomWebinarResponse getSource() {
		return source;
	}

	public void setSource(EntZoomWebinarResponse source) {
		this.source = source;
	}

}
