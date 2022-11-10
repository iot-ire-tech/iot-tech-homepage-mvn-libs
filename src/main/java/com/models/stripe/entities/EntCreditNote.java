/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;
import com.models.stripe.charge.EntTransaction;

/**
 *
 * @author ennisa To charge a credit card or other payment source, you create a Charge object. Rule If your API key is in test mode, the supplied payment source (e.g., card) won’t actually be charged, although everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).
 */
public class EntCreditNote extends EntIds {

	String memo;
	String reason;
	int creditAmount = 0;
	int refundAmount = 0;
	EntTransaction transaction;

	public EntCreditNote() {

	}

	@Override
	public String toString() {
		System.out.println("INF: accountId: " + this.accountId);
		System.out.println("INF: customerId: " + this.customerId);
		System.out.println("INF: source: " + this.sourceId);
		// Transations
//		System.out.println("INF: amount: " + transaction.amount);
//		System.out.println("INF: currency: " + transaction.currency);
		return super.toString(); //To change body of generated methods, choose Tools | Templates.
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public int getCreditAmount() {
		return creditAmount;
	}

	public void setCreditAmount(int creditAmount) {
		this.creditAmount = creditAmount;
	}

	public int getRefundAmount() {
		return refundAmount;
	}

	public void setRefundAmount(int refundAmount) {
		this.refundAmount = refundAmount;
	}

	public EntTransaction getTransaction() {
		return transaction;
	}

	public void setTransaction(EntTransaction transaction) {
		this.transaction = transaction;
	}

}
