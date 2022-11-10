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
public class EntZoomWebinarResponse {

	private String agenda;
	private String created_at;
	private int duration;
	private String host_id;
	private long id;
	private String join_url;
	private String password;
	private String registration_url;
	SettingsRsp settings;
	private String start_time;
	private String start_url;
	private String timezone;
	private String topic;
	private int type;
	private String uuid;

	public String getAgenda() {
		return agenda;
	}

	public void setAgenda(String agenda) {
		this.agenda = agenda;
	}

	public String getCreated_at() {
		return created_at;
	}

	public void setCreated_at(String created_at) {
		this.created_at = created_at;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public String getHost_id() {
		return host_id;
	}

	public void setHost_id(String host_id) {
		this.host_id = host_id;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getJoin_url() {
		return join_url;
	}

	public void setJoin_url(String join_url) {
		this.join_url = join_url;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRegistration_url() {
		return registration_url;
	}

	public void setRegistration_url(String registration_url) {
		this.registration_url = registration_url;
	}

	public SettingsRsp getSettings() {
		return settings;
	}

	public void setSettings(SettingsRsp settings) {
		this.settings = settings;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getStart_url() {
		return start_url;
	}

	public void setStart_url(String start_url) {
		this.start_url = start_url;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

}

class SettingsRsp {

	private boolean allow_multiple_devices;
	private String alternative_hosts;
	private int approval_type;
	private String audio;
	private String auto_recording;
	private boolean close_registration;
	private String contact_email;
	private String contact_name;
	private boolean enforce_login;
	private String enforce_login_domains;
	ArrayList< Object> global_dial_in_countries = new ArrayList< Object>();
	ArrayList< Object> global_dial_in_numbers = new ArrayList< Object>();
	private boolean hd_video;
	private boolean host_video;
	private boolean meeting_authentication;
	private boolean on_demand;
	private boolean panelists_video;
	private boolean post_webinar_survey;
	private boolean practice_session;
	private boolean question_answer;
	private boolean registrants_confirmation_email;
	private boolean registrants_email_notification;
	private int registrants_restrict_number;
	private boolean show_share_button;

	public boolean isAllow_multiple_devices() {
		return allow_multiple_devices;
	}

	public void setAllow_multiple_devices(boolean allow_multiple_devices) {
		this.allow_multiple_devices = allow_multiple_devices;
	}

	public String getAlternative_hosts() {
		return alternative_hosts;
	}

	public void setAlternative_hosts(String alternative_hosts) {
		this.alternative_hosts = alternative_hosts;
	}

	public int getApproval_type() {
		return approval_type;
	}

	public void setApproval_type(int approval_type) {
		this.approval_type = approval_type;
	}

	public String getAudio() {
		return audio;
	}

	public void setAudio(String audio) {
		this.audio = audio;
	}

	public String getAuto_recording() {
		return auto_recording;
	}

	public void setAuto_recording(String auto_recording) {
		this.auto_recording = auto_recording;
	}

	public boolean isClose_registration() {
		return close_registration;
	}

	public void setClose_registration(boolean close_registration) {
		this.close_registration = close_registration;
	}

	public String getContact_email() {
		return contact_email;
	}

	public void setContact_email(String contact_email) {
		this.contact_email = contact_email;
	}

	public String getContact_name() {
		return contact_name;
	}

	public void setContact_name(String contact_name) {
		this.contact_name = contact_name;
	}

	public boolean isEnforce_login() {
		return enforce_login;
	}

	public void setEnforce_login(boolean enforce_login) {
		this.enforce_login = enforce_login;
	}

	public String getEnforce_login_domains() {
		return enforce_login_domains;
	}

	public void setEnforce_login_domains(String enforce_login_domains) {
		this.enforce_login_domains = enforce_login_domains;
	}

	public ArrayList<Object> getGlobal_dial_in_countries() {
		return global_dial_in_countries;
	}

	public void setGlobal_dial_in_countries(ArrayList<Object> global_dial_in_countries) {
		this.global_dial_in_countries = global_dial_in_countries;
	}

	public ArrayList<Object> getGlobal_dial_in_numbers() {
		return global_dial_in_numbers;
	}

	public void setGlobal_dial_in_numbers(ArrayList<Object> global_dial_in_numbers) {
		this.global_dial_in_numbers = global_dial_in_numbers;
	}

	public boolean isHd_video() {
		return hd_video;
	}

	public void setHd_video(boolean hd_video) {
		this.hd_video = hd_video;
	}

	public boolean isHost_video() {
		return host_video;
	}

	public void setHost_video(boolean host_video) {
		this.host_video = host_video;
	}

	public boolean isMeeting_authentication() {
		return meeting_authentication;
	}

	public void setMeeting_authentication(boolean meeting_authentication) {
		this.meeting_authentication = meeting_authentication;
	}

	public boolean isOn_demand() {
		return on_demand;
	}

	public void setOn_demand(boolean on_demand) {
		this.on_demand = on_demand;
	}

	public boolean isPanelists_video() {
		return panelists_video;
	}

	public void setPanelists_video(boolean panelists_video) {
		this.panelists_video = panelists_video;
	}

	public boolean isPost_webinar_survey() {
		return post_webinar_survey;
	}

	public void setPost_webinar_survey(boolean post_webinar_survey) {
		this.post_webinar_survey = post_webinar_survey;
	}

	public boolean isPractice_session() {
		return practice_session;
	}

	public void setPractice_session(boolean practice_session) {
		this.practice_session = practice_session;
	}

	public boolean isQuestion_answer() {
		return question_answer;
	}

	public void setQuestion_answer(boolean question_answer) {
		this.question_answer = question_answer;
	}

	public boolean isRegistrants_confirmation_email() {
		return registrants_confirmation_email;
	}

	public void setRegistrants_confirmation_email(boolean registrants_confirmation_email) {
		this.registrants_confirmation_email = registrants_confirmation_email;
	}

	public boolean isRegistrants_email_notification() {
		return registrants_email_notification;
	}

	public void setRegistrants_email_notification(boolean registrants_email_notification) {
		this.registrants_email_notification = registrants_email_notification;
	}

	public int getRegistrants_restrict_number() {
		return registrants_restrict_number;
	}

	public void setRegistrants_restrict_number(int registrants_restrict_number) {
		this.registrants_restrict_number = registrants_restrict_number;
	}

	public boolean isShow_share_button() {
		return show_share_button;
	}

	public void setShow_share_button(boolean show_share_button) {
		this.show_share_button = show_share_button;
	}

}
