/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

/**
 *
 * @author ennisa
 */
public class EntCompanyBizInfo {

	String accountId;
	String name;
	String phone;
	String tax_id;
	String vat_id;
	String owners_provided;
	String directors_provided;
	EntAddress address;

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getTax_id() {
		return tax_id;
	}

	public void setTax_id(String tax_id) {
		this.tax_id = tax_id;
	}

	public String getVat_id() {
		return vat_id;
	}

	public void setVat_id(String vat_id) {
		this.vat_id = vat_id;
	}

	public String getOwners_provided() {
		return owners_provided;
	}

	public void setOwners_provided(String owners_provided) {
		this.owners_provided = owners_provided;
	}

	public String getDirectors_provided() {
		return directors_provided;
	}

	public void setDirectors_provided(String directors_provided) {
		this.directors_provided = directors_provided;
	}

	public EntAddress getAddress() {
		return address;
	}

	public void setAddress(EntAddress address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return super.toString(); //To change body of generated methods, choose Tools | Templates.
	}

}
