/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;
import com.models.stripe.entities.connect.EntPerson;

/**
 * @author ennisa
 */
public class EntCustomer extends EntIds {

    // Get All
    int limit = 0;
    // Create
    EntPerson person = new EntPerson();
    EntAddress billing = new EntAddress();
    EntAddress shipping = new EntAddress();
    String meta = "";
    String role = "";
    String defaultSource = "";
    String paymentMethod = "";
    String description = "";
    int balance = 0;
    EntUserAccount userAccount = new EntUserAccount();

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public EntPerson getPerson() {
        return person;
    }

    public void setPerson(EntPerson person) {
        this.person = person;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public String getMeta() {
        return meta;
    }

    public void setMeta(String meta) {
        this.meta = meta;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EntAddress getShipping() {
        return shipping;
    }

    public void setShipping(EntAddress shipping) {
        this.shipping = shipping;
    }

    public EntAddress getBilling() {
        return billing;
    }

    public void setBilling(EntAddress billing) {
        this.billing = billing;
    }

    public EntUserAccount getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(EntUserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public String getDefaultSource() {
        return defaultSource;
    }

    public void setDefaultSource(String defaultSource) {
        this.defaultSource = defaultSource;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
