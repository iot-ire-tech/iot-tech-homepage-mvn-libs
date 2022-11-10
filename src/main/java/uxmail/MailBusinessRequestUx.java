/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package uxmail;

import java.util.ArrayList;
import java.util.List;
import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailBusinessRequestUx extends Mailer {

	public StringBuilder b = new StringBuilder();
	public String urlApp;
	public String endPointHomePage;
	public String endPointSupport;

	public String assetId;
	public String type;

	public String sendersName;
	public String recipientsId;
	public String requestId;
	public String alias;

	public List<String> blackList = new ArrayList<>();
	public List<String> reason = new ArrayList<>();
	public String recipientsName;
	public String recipientsEmail;

	public String client;
	public String clientKey;

	public String clientName;
	public String category;
	public String cost;
	public String start;
	public String end;
	public String reshare;
	public String notes;

	public String resourceId;
	public String eventId;
	public String subEventId;

	/**
	 *
	 */
	public MailBusinessRequestUx() {
		super();

	}

	public String generateHTML() {
		String tmp = "";
		//	String clientId = "?clientId=" + getClientKey();

		b = new StringBuilder();
		b.append("<html>");
		b.append("<head>");
		//	b.append("<title>" + getTitle() + "</title>");
		b.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
		b.append("<style>");
		b.append("#header,#footer { background-color:CornflowerBlue; }");
		b.append("h1 { color:black; text-align: center; }");
		b.append("</style>");
		b.append("</head>");
		b.append("<body>");

		b.append("<br>");
		b.append("<hr>");
		b.append("<b><center>Automated Registration Notification</center></b>");
		b.append("<hr>");
		b.append("Congratulations, " + recipientsName + " you have recieved a business request from, " + sendersName + "!<br>");
		b.append("<br>");
		b.append("Review the request details below, is it a good fit for you and your business!!!");
		b.append("<br>").append("<br>");
		b.append("<b><center>Business Request Detail</center></b>").append("<br>");
		b.append("Clients Name: " + sendersName + "<br>");
		b.append("Share Name: " + alias + "<br>");
		b.append("Request Id: " + requestId + "<br>");
		b.append("Category: " + category + "<br>");
		b.append("Reason: " + reason.get(0) + "<br>");
		b.append("BlackListed: " + blackList.get(0) + "<br>");
		b.append("Start Date: " + start + "<br>");
		b.append("Termination Date: " + end + "<br>");
		//	b.append("Renewable: " + end + "<br>");
		b.append("Reshare Possibility: " + reshare + "<br>");
		b.append("Cost: " + cost + "<br>");
		b.append("Notes: " + notes + "<br>");
		b.append("<br>");

		tmp = "href='http://localhost:8084/iot-base/b2b/ux/offeringConfirmation.jsp?";
		tmp += "clientId=" + clientKey;
		tmp += "&resourceId=" + resourceId;
		tmp += "&eventId=" + eventId;
		tmp += "&subEventId=" + subEventId;
		tmp += "&clientName=" + sendersName;
		tmp += "&recipientsId=" + recipientsId;
		tmp += "&recipientsName=" + recipientsName;
		tmp += "&businessRequestId=" + requestId;
		tmp += "&assetId=" + assetId;
		tmp += "&type=" + type;
		tmp += "&alias=" + alias;
		tmp += "&comment=" + notes;
		tmp += "&cost=" + cost;
		tmp += "&reshare=" + reshare;
		tmp += "&start=" + start;
		tmp += "&end=" + end;
		tmp += "'";
		b.append("Access URL: <a target='_blank'" + tmp + " >Review Business Request</a>").append("</br>");
		System.out.println("INF: Access URL Login (" + tmp + ")");

		b.append("<br>");
		b.append("<br>");
		b.append("<br>");
		b.append("This is an automated email from MyBusinessPal.Com. Please do not reply to this email. Instead use support links below");

		b.append("<br>");
		b.append("<br>");
		b.append("<span>Kind Regards,</span><br>");
		b.append("<span>MyBusinessPal.Com</span><br>");
		b.append("<br>");
		//	tmp = "href=" + getEndPointHomePage();
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

	public String getUrlApp() {
		return urlApp;
	}

	public void setUrlApp(String urlApp) {
		this.urlApp = urlApp;
	}

}
