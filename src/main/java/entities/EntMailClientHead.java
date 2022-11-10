/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import com.models.enterprise.EntIds;
import com.models.stripe.entities.EntCustomer;
import com.models.stripe.entities.connect.EntAccount;

/**
 * @author ennisa
 */
public class EntMailClientHead extends EntIds {

    String ts;
    String businessType;
    //	String businessPlan;
    String hostname;
    String customerIdPlatform;
    String customerIdConnect;
    EntCustomer customer = new EntCustomer();
    EntAccount account = new EntAccount();

    public String getTs() {
        return ts;
    }

    public void setTs(String ts) {
        this.ts = ts;
    }

    public EntCustomer getCustomer() {
        return customer;
    }

    public void setCustomer(EntCustomer customer) {
        this.customer = customer;
    }

    public EntAccount getAccount() {
        return account;
    }

    public void setAccount(EntAccount account) {
        this.account = account;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getCustomerIdPlatform() {
        return customerIdPlatform;
    }

    public void setCustomerIdPlatform(String customerIdPlatform) {
        this.customerIdPlatform = customerIdPlatform;
    }

    public String getCustomerIdConnect() {
        return customerIdConnect;
    }

    public void setCustomerIdConnect(String customerIdConnect) {
        this.customerIdConnect = customerIdConnect;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }
}
