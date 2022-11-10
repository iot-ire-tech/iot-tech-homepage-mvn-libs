/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoom.model;

import java.util.ArrayList;

/**
 *
 * @author ennisa
 */
public class EntZoomRegistrantMin {

	private String email = "";
	private String first_name = "";
	private String address = "";
	private String city = "";
	private String comments = "";
	private String country = "";
	ArrayList< Object> custom_questions = new ArrayList< Object>();
	private String industry = "";
	private String job_title = "";
	private String last_name = "";
	private String no_of_employees = "";
	private String org = "";
	private String phone = "";
	private String purchasing_time_frame = "";
	private String role_in_purchase_process = "";
	private String state = "";
	private String zip = "";

	// Getter Methods
	public String getEmail() {
		return email;
	}

	public String getFirst_name() {
		return first_name;
	}

	public String getAddress() {
		return address;
	}

	public String getCity() {
		return city;
	}

	public String getComments() {
		return comments;
	}

	public String getCountry() {
		return country;
	}

	public String getIndustry() {
		return industry;
	}

	public String getJob_title() {
		return job_title;
	}

	public String getLast_name() {
		return last_name;
	}

	public String getNo_of_employees() {
		return no_of_employees;
	}

	public String getOrg() {
		return org;
	}

	public String getPhone() {
		return phone;
	}

	public String getPurchasing_time_frame() {
		return purchasing_time_frame;
	}

	public String getRole_in_purchase_process() {
		return role_in_purchase_process;
	}

	public String getState() {
		return state;
	}

	public String getZip() {
		return zip;
	}

	// Setter Methods
	public void setEmail(String email) {
		this.email = email;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public void setJob_title(String job_title) {
		this.job_title = job_title;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public void setNo_of_employees(String no_of_employees) {
		this.no_of_employees = no_of_employees;
	}

	public void setOrg(String org) {
		this.org = org;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setPurchasing_time_frame(String purchasing_time_frame) {
		this.purchasing_time_frame = purchasing_time_frame;
	}

	public void setRole_in_purchase_process(String role_in_purchase_process) {
		this.role_in_purchase_process = role_in_purchase_process;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	@Override
	public String toString() {
		return "{" + "email=" + email + ", first_name=" + first_name + "}";
	}

}
