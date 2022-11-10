/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;

import java.util.ArrayList;

/**
 *
 * @author ennisa
 */
public class EntProduct extends EntIds {

	String upstreamProductId = "";
	String upstreamAccountId = "";
	// events / activites / shop
	ArrayList<String> scope = new ArrayList<>();
	// public or available to other account holders.
	ArrayList<String> whitelistAccountHolder = new ArrayList<>();
	boolean active;
	String businessMode = "";
	String type = "";
	String mode = "";

	String name = "";
	String url = "";
	EntAvailability availability = new EntAvailability();

	String emailInventory = "";
	String smsInventory = "";
	boolean alertInventory = false;
	boolean stockLevel1 = false;
	boolean stockLevel2 = false;
	boolean stockLevel3 = false;
	int alertReminderCap = 0;
	String alertSchedule = "";
	double bufferoverflow = 0.0;

	int unitsTotal = 0;
	int units = 0;
	double unitsLower = 0.0;
	double unitsUpper = 0.00;

//	ArrayList<EntBooking> bookings = new ArrayList<>();
	String urlShop = "";
	String urlSocialFb = "";
	String urlSocialYt = "";
	String promoVideo = "";
	String image1 = "";
	String image2 = "";
	String image3 = "";
	String image4 = "";
	String image5 = "";

	String description = "";

	float discount = (float) 0.00;
	float cost = (float) 0.00;
	float tbbFee = (float) 0.00;
	boolean sellable = false;
	ArrayList<EntMap> attributes = new ArrayList<>();
	ArrayList<EntMap> metadata = new ArrayList<>();
	ArrayList<String> images = new ArrayList<>();
	String tnc = "";
	String dateTimeStart = "";
	String dateTimeEnd = "";
	String location = "";

	String fullName = "";
	String emailPoc = "";
	String phonePoc = "";

	ArrayList<EntKeyValuePair> timemanagement = new ArrayList<>();
	ArrayList<EntRevenue> moneymanagement = new ArrayList<>();
	ArrayList<EntSeating> seatingGrades = new ArrayList<>();
	ArrayList<EntVolumeBasedBilling> vbb = new ArrayList<>();

	boolean shippable = false;
	ArrayList<EntPostNPackageCosts> pnpCosts = new ArrayList<>();
	ArrayList<EntPostNPackageCosts> pnpVendorSelection = new ArrayList<>();
	boolean pnpOptIn = false;

// GET
	int limit = 0;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public ArrayList<EntMap> getMetadata() {
		return metadata;
	}

	public void setMetadata(ArrayList<EntMap> metadata) {
		this.metadata = metadata;
	}

	public ArrayList<EntMap> getAttributes() {
		return attributes;
	}

	public void setAttributes(ArrayList<EntMap> attributes) {
		this.attributes = attributes;
	}

	public ArrayList<String> getImages() {
		return images;
	}

	public void setImages(ArrayList<String> images) {
		this.images = images;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrlShop() {
		return urlShop;
	}

	public void setUrlShop(String urlShop) {
		this.urlShop = urlShop;
	}

	public String getUrlSocialFb() {
		return urlSocialFb;
	}

	public void setUrlSocialFb(String urlSocialFb) {
		this.urlSocialFb = urlSocialFb;
	}

	public String getUrlSocialYt() {
		return urlSocialYt;
	}

	public void setUrlSocialYt(String urlSocialYt) {
		this.urlSocialYt = urlSocialYt;
	}

	public String getTnc() {
		return tnc;
	}

	public void setTnc(String tnc) {
		this.tnc = tnc;
	}

	public String getDateTimeStart() {
		return dateTimeStart;
	}

	public void setDateTimeStart(String dateTimeStart) {
		this.dateTimeStart = dateTimeStart;
	}

	public String getDateTimeEnd() {
		return dateTimeEnd;
	}

	public void setDateTimeEnd(String dateTimeEnd) {
		this.dateTimeEnd = dateTimeEnd;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmailPoc() {
		return emailPoc;
	}

	public void setEmailPoc(String emailPoc) {
		this.emailPoc = emailPoc;
	}

	public String getPhonePoc() {
		return phonePoc;
	}

	public void setPhonePoc(String phonePoc) {
		this.phonePoc = phonePoc;
	}

	public int getUnitsTotal() {
		return unitsTotal;
	}

	public void setUnitsTotal(int unitsTotal) {
		this.unitsTotal = unitsTotal;
	}

	public int getUnits() {
		return units;
	}

	public void setUnits(int units) {
		this.units = units;
	}

	public void setUnitsUpper(int unitsUpper) {
		this.unitsUpper = unitsUpper;
	}

	public String getEmailInventory() {
		return emailInventory;
	}

	public void setEmailInventory(String emailInventory) {
		this.emailInventory = emailInventory;
	}

	public String getSmsInventory() {
		return smsInventory;
	}

	public void setSmsInventory(String smsInventory) {
		this.smsInventory = smsInventory;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public ArrayList<EntKeyValuePair> getTimemanagement() {
		return timemanagement;
	}

	public void setTimemanagement(ArrayList<EntKeyValuePair> timemanagement) {
		this.timemanagement = timemanagement;
	}

	public EntAvailability getAvailability() {
		return availability;
	}

	public void setAvailability(EntAvailability availability) {
		this.availability = availability;
	}

	public String getUpstreamProductId() {
		return upstreamProductId;
	}

	public void setUpstreamProductId(String upstreamProductId) {
		this.upstreamProductId = upstreamProductId;
	}

	public ArrayList<String> getScope() {
		return scope;
	}

	public void setScope(ArrayList<String> scope) {
		this.scope = scope;
	}

	public ArrayList<String> getWhitelistAccountHolder() {
		return whitelistAccountHolder;
	}

	public void setWhitelistAccountHolder(ArrayList<String> whitelistAccountHolder) {
		this.whitelistAccountHolder = whitelistAccountHolder;
	}

	public float getCost() {
		return cost;
	}

	public void setCost(float cost) {
		this.cost = cost;
	}

	public boolean isSellable() {
		return sellable;
	}

	public void setSellable(boolean sellable) {
		this.sellable = sellable;
	}

	public ArrayList<EntSeating> getSeatingGrades() {
		return seatingGrades;
	}

	public void setSeatingGrades(ArrayList<EntSeating> seatingGrades) {
		this.seatingGrades = seatingGrades;
	}

	public double getUnitsLower() {
		return unitsLower;
	}

	public void setUnitsLower(double unitsLower) {
		this.unitsLower = unitsLower;
	}

	public double getUnitsUpper() {
		return unitsUpper;
	}

	public void setUnitsUpper(double unitsUpper) {
		this.unitsUpper = unitsUpper;
	}

	public float getTbbFee() {
		return tbbFee;
	}

	public void setTbbFee(float tbbFee) {
		this.tbbFee = tbbFee;
	}

	public String getUpstreamAccountId() {
		return upstreamAccountId;
	}

	public void setUpstreamAccountId(String upstreamAccountId) {
		this.upstreamAccountId = upstreamAccountId;
	}

	public boolean isAlertInventory() {
		return alertInventory;
	}

	public void setAlertInventory(boolean alertInventory) {
		this.alertInventory = alertInventory;
	}

	public ArrayList<EntVolumeBasedBilling> getVbb() {
		return vbb;
	}

	public void setVbb(ArrayList<EntVolumeBasedBilling> vbb) {
		this.vbb = vbb;
	}

	public ArrayList<EntRevenue> getMoneymanagement() {
		return moneymanagement;
	}

	public void setMoneymanagement(ArrayList<EntRevenue> moneymanagement) {
		this.moneymanagement = moneymanagement;
	}

	public boolean isShippable() {
		return shippable;
	}

	public void setShippable(boolean shippable) {
		this.shippable = shippable;
	}

	public ArrayList<EntPostNPackageCosts> getPnpCosts() {
		return pnpCosts;
	}

	public void setPnpCosts(ArrayList<EntPostNPackageCosts> pnpCosts) {
		this.pnpCosts = pnpCosts;
	}

	public ArrayList<EntPostNPackageCosts> getPnpVendorSelection() {
		return pnpVendorSelection;
	}

	public void setPnpVendorSelection(ArrayList<EntPostNPackageCosts> pnpVendorSelection) {
		this.pnpVendorSelection = pnpVendorSelection;
	}

	public boolean isPnpOptIn() {
		return pnpOptIn;
	}

	public void setPnpOptIn(boolean pnpOptIn) {
		this.pnpOptIn = pnpOptIn;
	}

	public String getBusinessMode() {
		return businessMode;
	}

	public void setBusinessMode(String businessMode) {
		this.businessMode = businessMode;
	}

	public String getImage1() {
		return image1;
	}

	public void setImage1(String image1) {
		this.image1 = image1;
	}

	public String getImage2() {
		return image2;
	}

	public void setImage2(String image2) {
		this.image2 = image2;
	}

	public String getImage3() {
		return image3;
	}

	public void setImage3(String image3) {
		this.image3 = image3;
	}

	public String getImage4() {
		return image4;
	}

	public void setImage4(String image4) {
		this.image4 = image4;
	}

	public String getImage5() {
		return image5;
	}

	public void setImage5(String image5) {
		this.image5 = image5;
	}

	public String getPromoVideo() {
		return promoVideo;
	}

	public void setPromoVideo(String promoVideo) {
		this.promoVideo = promoVideo;
	}

	public float getDiscount() {
		return discount;
	}

	public void setDiscount(float discount) {
		this.discount = discount;
	}

	public boolean isStockLevel1() {
		return stockLevel1;
	}

	public void setStockLevel1(boolean stockLevel1) {
		this.stockLevel1 = stockLevel1;
	}

	public boolean isStockLevel2() {
		return stockLevel2;
	}

	public void setStockLevel2(boolean stockLevel2) {
		this.stockLevel2 = stockLevel2;
	}

	public boolean isStockLevel3() {
		return stockLevel3;
	}

	public void setStockLevel3(boolean stockLevel3) {
		this.stockLevel3 = stockLevel3;
	}

	public int getAlertReminderCap() {
		return alertReminderCap;
	}

	public void setAlertReminderCap(int alertReminderCap) {
		this.alertReminderCap = alertReminderCap;
	}

	public String getAlertSchedule() {
		return alertSchedule;
	}

	public void setAlertSchedule(String alertSchedule) {
		this.alertSchedule = alertSchedule;
	}

	public double getBufferoverflow() {
		return bufferoverflow;
	}

	public void setBufferoverflow(double bufferoverflow) {
		this.bufferoverflow = bufferoverflow;
	}

}
