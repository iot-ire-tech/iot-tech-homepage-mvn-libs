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
public class EntDocument {

	EntProof front;
	EntProof back;

	public EntProof getFront() {
		return front;
	}

	public void setFront(EntProof front) {
		this.front = front;
	}

	public EntProof getBack() {
		return back;
	}

	public void setBack(EntProof back) {
		this.back = back;
	}

}
