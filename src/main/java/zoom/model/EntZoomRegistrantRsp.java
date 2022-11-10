/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoom.model;

/**
 *
 * @author ennisa
 */
public class EntZoomRegistrantRsp {

	private long id;
	private String join_url;
	private String registrant_id;
	private String start_time;
	private String topic;

	// Getter Methods
	public float getId() {
		return id;
	}

	public String getJoin_url() {
		return join_url;
	}

	public String getRegistrant_id() {
		return registrant_id;
	}

	public String getStart_time() {
		return start_time;
	}

	public String getTopic() {
		return topic;
	}

	// Setter Methods
	public void setId(long id) {
		this.id = id;
	}

	public void setJoin_url(String join_url) {
		this.join_url = join_url;
	}

	public void setRegistrant_id(String registrant_id) {
		this.registrant_id = registrant_id;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}
}
