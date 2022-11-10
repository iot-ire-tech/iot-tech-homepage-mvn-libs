/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.stripe.charge.EntCharge;

/**
 *
 * @author ennisa To charge a credit card or other payment source, you create a Charge object. Rule If your API key is in test mode, the supplied payment source (e.g., card) won’t actually be charged, although everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).
 *
 * Errors com.stripe.exception.InvalidRequestException: You have insufficient funds in your Stripe account. One likely reason you have insufficient funds is that your funds are automatically being paid out; try enabling manual payouts by going to https://dashboard.stripe.com/account/payouts.; code: balance_insufficient com.stripe.exception.InvalidRequestException: Insufficient funds in Stripe account. In test mode, you can add funds to your available balance (bypassing your pending balance) by creating a charge with 4000 0000 0000 0077 as the card number. You can use the the /v1/balance endpoint to view your Stripe balance (for more details, see stripe.com/docs/api#balance).; code: balance_insufficient
 */
public class EntChargeDestination extends EntCharge {

	EntTransferData transferData = new EntTransferData();

	public EntTransferData getTransferData() {
		return transferData;
	}

	public void setTransferData(EntTransferData transferData) {
		this.transferData = transferData;
	}

}
