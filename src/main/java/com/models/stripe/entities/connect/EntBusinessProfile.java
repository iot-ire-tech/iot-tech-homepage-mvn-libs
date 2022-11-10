/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities.connect;

/**
 *
 * @author ennisa
 */
public class EntBusinessProfile {

	String mcc;
	String name;
	String productDescription;
	String supportAddress;
	String supportEmail;
	String supportPhone;
	String supportUrl;
	String url;

	public String getMcc() {
		return mcc;
	}

	public void setMcc(String mcc) {
		this.mcc = mcc;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public String getSupportAddress() {
		return supportAddress;
	}

	public void setSupportAddress(String supportAddress) {
		this.supportAddress = supportAddress;
	}

	public String getSupportEmail() {
		return supportEmail;
	}

	public void setSupportEmail(String supportEmail) {
		this.supportEmail = supportEmail;
	}

	public String getSupportPhone() {
		return supportPhone;
	}

	public void setSupportPhone(String supportPhone) {
		this.supportPhone = supportPhone;
	}

	public String getSupportUrl() {
		return supportUrl;
	}

	public void setSupportUrl(String supportUrl) {
		this.supportUrl = supportUrl;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
