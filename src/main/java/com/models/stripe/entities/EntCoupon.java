/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;

import java.math.BigDecimal;
import java.util.Map;

/**
 *
 * @author ennisa
 */
public class EntCoupon extends EntIds {

	Long amountOff = 0L;
	BigDecimal percentageOff = new BigDecimal(0);
	Long created = 0L;
	String currency = "";
	Boolean deleted = false;
	String duration = "";
	Long durationInMonths = 0L;
	Boolean livemode = false;
	Long maxRedemptions = 0L;
	Map<String, String> metadata;
	String name = "";
	Long redeemBy = 0L;
	Long timesRedeemed = 0L;

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Long getAmountOff() {
		return amountOff;
	}

	public void setAmountOff(Long amountOff) {
		this.amountOff = amountOff;
	}

	public Long getCreated() {
		return created;
	}

	public void setCreated(Long created) {
		this.created = created;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Long getDurationInMonths() {
		return durationInMonths;
	}

	public void setDurationInMonths(Long durationInMonths) {
		this.durationInMonths = durationInMonths;
	}

	public Boolean getLivemode() {
		return livemode;
	}

	public void setLivemode(Boolean livemode) {
		this.livemode = livemode;
	}

	public Long getMaxRedemptions() {
		return maxRedemptions;
	}

	public void setMaxRedemptions(Long maxRedemptions) {
		this.maxRedemptions = maxRedemptions;
	}

	public Map<String, String> getMetadata() {
		return metadata;
	}

	public void setMetadata(Map<String, String> metadata) {
		this.metadata = metadata;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getRedeemBy() {
		return redeemBy;
	}

	public void setRedeemBy(Long redeemBy) {
		this.redeemBy = redeemBy;
	}

	public Long getTimesRedeemed() {
		return timesRedeemed;
	}

	public void setTimesRedeemed(Long timesRedeemed) {
		this.timesRedeemed = timesRedeemed;
	}

	public BigDecimal getPercentageOff() {
		return percentageOff;
	}

	public void setPercentageOff(BigDecimal percentageOff) {
		this.percentageOff = percentageOff;
	}

}
