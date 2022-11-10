/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package servlet;

import uxmail.MailBusinessRequestUx;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ae
 */
public class BusinessRequest extends HttpServlet {

	String basePath;
	String query;
	String s;
	String jsonPatron;
	Gson gson;

	StringBuilder sb;
	MailBusinessRequestUx mailer;
	UXPayloadBusinessRequest uxPayload;

	PropsReader pr = new PropsReader();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();

		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		// Map JSON data to Array Of Bookings Object!!!
		uxPayload = gson.fromJson(sb.toString(), UXPayloadBusinessRequest.class);
//  Build Endpoints
		String hostnameHome = pr.setKey("proto").getVal() + pr.setKey("hostnameHomePage").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
		String hostnamePortal = pr.setKey("proto").getVal() + pr.setKey("hostnamePortal").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
		String hostnameEndUser = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();

		// Really need to create a mail instance for each reciptient!!!
		for (int i = 0; i < uxPayload.recipitients.size(); i++) {

			mailer.requestId = uxPayload.getTrade().getBusinessRequestId();

			mailer.assetId = uxPayload.getAssetId();
			mailer.type = uxPayload.getAssetType();
			mailer.sendersName = uxPayload.getOwner().getName();
			mailer.clientKey = uxPayload.getOwner().getId();

			mailer.recipientsId = uxPayload.getRecipitients().get(i).getId();
			mailer.recipientsName = uxPayload.getRecipitients().get(i).getName();

			mailer.resourceId = uxPayload.getOfferingPreview().getResourceId();
			mailer.eventId = uxPayload.getOfferingPreview().getEventId();
			mailer.subEventId = uxPayload.getOfferingPreview().getSubEventId();

			mailer.recipientsEmail = uxPayload.getRecipitients().get(i).getEmail();
			mailer.blackList = uxPayload.getBlacklist();
			mailer.reason = uxPayload.getReason();
			mailer.alias = uxPayload.getShareName();
			mailer.category = uxPayload.getCategory();

			mailer.start = uxPayload.getTrade().getDuration().getStart();
			mailer.end = uxPayload.getTrade().getDuration().getEnd();
			mailer.reshare = uxPayload.getTrade().getReshare();
			mailer.cost = uxPayload.getTrade().getCost();
			mailer.notes = uxPayload.getTrade().getComment();

			//	mailer.setEndPointHomePage(hostnameHome + pr.setKey("endPointHome").getVal());
			//	mailer.setEndPointSupport(hostnameHome + pr.setKey("endPointSupport").getVal());
			// Admin
			// EndEuser
			//	mailer.setEndPointLoginEndUser(hostnameEndUser + pr.setKey("endPointLogin").getVal() + "?clientId=" + uxPayload.getId());
			// Derived
			mailer.setMsgbody(mailer.generateHTML());
			// Base
//		String dl = "";
//		for (int i = 0; i < uxPayload.recipitients.size(); i++) {
//
//			System.out.println("INF: Email (" + uxPayload.recipitients.get(i).getEmail() + ")");
//			if (i == 0) {
//				dl = uxPayload.recipitients.get(i).getEmail();
//			} else {
//				dl += "," + uxPayload.recipitients.get(i).getEmail();
//			}
//			System.out.println("INF: DL (" + dl + ")");
//
//		}
			mailer.setTo(uxPayload.recipitients.get(i).getEmail());
			mailer.init();
		}

		response.getOutputStream().print("{ \"name\" : \"Anto\", \"grade\" : \"A\" }");
		response.getOutputStream().flush();

	}

	// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
	/**
	 * Handles the HTTP <code>GET</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * Handles the HTTP <code>POST</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
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
		mailer = new MailBusinessRequestUx();
		mailer.setSubject("INF: Affiliate Business Request");
		mailer.setFrom("registar@mybusinesspal.com");
		mailer.setFromAlias("IOT Business Development");

		// Derived Class
		//	mailer.setTitle("MyBusinessPal.Com - Business Growth & Developement");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new UXPayloadBusinessRequest();

		// Properties
		pr.init("env.comms.properties");
	}

}

class Duration {

	String start;
	String end;

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
	}

}

class Trade {

	String ts;
	String status;
	String businessRequestId;
	String comment;
	String cost;
	String reshare;
	String releasedate;
	Duration duration = new Duration();

	public Duration getDuration() {
		return duration;
	}

	public void setDuration(Duration duration) {
		this.duration = duration;
	}

	public String getTs() {
		return ts;
	}

	public void setTs(String ts) {
		this.ts = ts;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getBusinessRequestId() {
		return businessRequestId;
	}

	public void setBusinessRequestId(String businessRequestId) {
		this.businessRequestId = businessRequestId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}

	public String getReshare() {
		return reshare;
	}

	public void setReshare(String reshare) {
		this.reshare = reshare;
	}

	public String getReleasedate() {
		return releasedate;
	}

	public void setReleasedate(String releasedate) {
		this.releasedate = releasedate;
	}

}

class Recipitients {

	String id;
	String name;
	String email;

	public Recipitients() {
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}

class Owner {

	String id;
	String name;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}

class OfferingPreview {

	String resourceId;
	String eventId;
	String subEventId;

	public String getResourceId() {
		return resourceId;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}

	public String getEventId() {
		return eventId;
	}

	public void setEventId(String eventId) {
		this.eventId = eventId;
	}

	public String getSubEventId() {
		return subEventId;
	}

	public void setSubEventId(String subEventId) {
		this.subEventId = subEventId;
	}

}

class UXPayloadBusinessRequest {

	String id;
	String info;
	String routing;
	String assetType;
	String assetId;
	String subEventId;
	Owner owner = new Owner();
	List<Recipitients> recipitients = new ArrayList<>();
	String shareName;
	List<String> blacklist = new ArrayList<>();
	String category;
	List<String> reason = new ArrayList<>();
	;
	String subject;
	OfferingPreview offeringPreview = new OfferingPreview();

	Trade trade = new Trade();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getAssetId() {
		return assetId;
	}

	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}

	public String getRouting() {
		return routing;
	}

	public void setRouting(String routing) {
		this.routing = routing;
	}

	public String getAssetType() {
		return assetType;
	}

	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}

	public String getSubEventId() {
		return subEventId;
	}

	public void setSubEventId(String subEventId) {
		this.subEventId = subEventId;
	}

	public Owner getOwner() {
		return owner;
	}

	public void setOwner(Owner owner) {
		this.owner = owner;
	}

	public List<Recipitients> getRecipitients() {
		return recipitients;
	}

	public void setRecipitients(List<Recipitients> recipitients) {
		this.recipitients = recipitients;
	}

	public String getShareName() {
		return shareName;
	}

	public void setShareName(String shareName) {
		this.shareName = shareName;
	}

	public List<String> getBlacklist() {
		return blacklist;
	}

	public void setBlacklist(List<String> blacklist) {
		this.blacklist = blacklist;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public List<String> getReason() {
		return reason;
	}

	public void setReason(List<String> reason) {
		this.reason = reason;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public OfferingPreview getOfferingPreview() {
		return offeringPreview;
	}

	public void setOfferingPreview(OfferingPreview offeringPreview) {
		this.offeringPreview = offeringPreview;
	}

	public Trade getTrade() {
		return trade;
	}

	public void setTrade(Trade trade) {
		this.trade = trade;
	}

}
