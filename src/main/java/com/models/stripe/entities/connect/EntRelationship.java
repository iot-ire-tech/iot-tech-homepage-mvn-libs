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
public class EntRelationship {

	String title = "";
	boolean executive;
	boolean representative;
	boolean owner;
	boolean director;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isExecutive() {
		return executive;
	}

	public void setExecutive(boolean executive) {
		this.executive = executive;
	}

	public boolean isRepresentative() {
		return representative;
	}

	public void setRepresentative(boolean representative) {
		this.representative = representative;
	}

	public boolean isOwner() {
		return owner;
	}

	public void setOwner(boolean owner) {
		this.owner = owner;
	}

	public boolean isDirector() {
		return director;
	}

	public void setDirector(boolean director) {
		this.director = director;
	}

}
