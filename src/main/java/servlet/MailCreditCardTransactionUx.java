/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package servlet;

/**
 *
 * @author ae
 */
public class MailCreditCardTransactionUx extends Mailer {

	StringBuilder b;
	String title;
	String name;
	String email;
	String ccStatus;
	String ccAmount;
	String ccDesc;
	String ccRef;
	String ccChargeId;
	String ccOrderId;
	String ccDate;
	String ccCustomerId;

	public MailCreditCardTransactionUx() {
		super();
		b = new StringBuilder();
	}

	public String generateHTML() {

		b.append("<html>");
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
		b.append("<center>Transation Credit Card Details</center>");
		b.append("<hr>");
		b.append("<br>");
		b.append("<br>");
		b.append("<b>Transaction Details</b>");
		b.append("<br>");
		b.append("Charge Id: " + getCcChargeId());
		b.append("<br>");
		b.append("Amount: " + getCcAmount());
		b.append("<br>");
		b.append("Date: " + getCcDate());
		b.append("<br>");
		b.append("Description: " + getCcDesc());
		b.append("<br>");
		b.append("Charge Status: " + getCcStatus());
		b.append("<br>");
		b.append("<br>");
		b.append("<br>");
		b.append("This is an automated email from MyBusinessPal.Com. Please do not reply to this email.");
		b.append("<br>");
		b.append("<br>");
		b.append("<span>Kind Regards,</span><br>");
		b.append("<span>IOT Tech</span><br>");
		b.append("<br>");

		b.append("</body>");
		b.append("</html>");

		return b.toString();

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public StringBuilder getB() {
		return b;
	}

	public void setB(StringBuilder b) {
		this.b = b;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCcAmount() {
		return ccAmount;
	}

	public void setCcAmount(String ccAmount) {
		this.ccAmount = ccAmount;
	}

	public String getCcDate() {
		return ccDate;
	}

	public void setCcDate(String ccDate) {
		this.ccDate = ccDate;
	}

	public String getCcCustomerId() {
		return ccCustomerId;
	}

	public void setCcCustomerId(String ccCustomerId) {
		this.ccCustomerId = ccCustomerId;
	}

	public String getCcDesc() {
		return ccDesc;
	}

	public void setCcDesc(String ccDesc) {
		this.ccDesc = ccDesc;
	}

	public String getCcRef() {
		return ccRef;
	}

	public void setCcRef(String ccRef) {
		this.ccRef = ccRef;
	}

	public String getCcOrderId() {
		return ccOrderId;
	}

	public void setCcOrderId(String ccOrderId) {
		this.ccOrderId = ccOrderId;
	}

	public String getCcStatus() {
		return ccStatus;
	}

	public void setCcStatus(String ccStatus) {
		this.ccStatus = ccStatus;
	}

	public String getCcChargeId() {
		return ccChargeId;
	}

	public void setCcChargeId(String ccChargeId) {
		this.ccChargeId = ccChargeId;
	}

}
