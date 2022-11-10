/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils.maths;

import java.util.Random;

/**
 *
 * @author ae
 */
public class RandomInts {

	int min=1, max=10000000;
	int randomInt;

	public RandomInts(int min, int max) {
		this.min = min;
		this.max = max;
		gen();
	}

	public RandomInts() {
		gen();
	}

	
	private RandomInts gen() {

		if (min >= max) {
			throw new IllegalArgumentException("max must be greater than min");
		}

		Random r = new Random();
		setRandomInt(r.nextInt((max - min) + 1) + min);
		return this;

	}

	public int getMin() {
		return min;
	}

	public void setMin(int min) {
		this.min = min;
	}

	public int getMax() {
		return max;
	}

	public void setMax(int max) {
		this.max = max;
	}

	public int getInt() {
		return randomInt;
	}

	public void setRandomInt(int randomInt) {
		this.randomInt = randomInt;
	}

	

}
