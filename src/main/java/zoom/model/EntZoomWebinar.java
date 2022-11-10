/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package zoom.model;


import com.models.enterprise.EntIds;

import java.util.ArrayList;

/**
 * @author ennisa
 */
public class EntZoomWebinar extends EntIds {

    public ArrayList<EntZoom> items = new ArrayList<EntZoom>();
    private String ts;

    public String getTs() {
        return ts;
    }

    public ArrayList<EntZoom> getItems() {
        return items;
    }

    public void setItems(ArrayList<EntZoom> items) {
        this.items = items;
    }

    public void setTs(String ts) {
        this.ts = ts;
    }
}


class Settings {

    private String host_video;
    private String panelists_video;
    private String practice_session;
    private String hd_video;
    private int approval_type;
    private int registration_type;
    private String audio;
    private String auto_recording;
    private String enforce_login;
    private String close_registration;
    private String show_share_button;
    private String allow_multiple_devices;
    private String global_dial_in_countries;
    private String contact_name;
    private String contact_email;

    public int getApproval_type() {
        return approval_type;
    }

    public void setApproval_type(int approval_type) {
        this.approval_type = approval_type;
    }

    public int getRegistration_type() {
        return registration_type;
    }

    public void setRegistration_type(int registration_type) {
        this.registration_type = registration_type;
    }

    // Getter Methods
    public String getHost_video() {
        return host_video;
    }

    public String getPanelists_video() {
        return panelists_video;
    }

    public String getPractice_session() {
        return practice_session;
    }

    public String getHd_video() {
        return hd_video;
    }

    public String getAudio() {
        return audio;
    }

    public String getAuto_recording() {
        return auto_recording;
    }

    public String getEnforce_login() {
        return enforce_login;
    }

    public String getClose_registration() {
        return close_registration;
    }

    public String getShow_share_button() {
        return show_share_button;
    }

    public String getAllow_multiple_devices() {
        return allow_multiple_devices;
    }

    public String getGlobal_dial_in_countries() {
        return global_dial_in_countries;
    }

    public String getContact_name() {
        return contact_name;
    }

    public String getContact_email() {
        return contact_email;
    }

    // Setter Methods
    public void setHost_video(String host_video) {
        this.host_video = host_video;
    }

    public void setPanelists_video(String panelists_video) {
        this.panelists_video = panelists_video;
    }

    public void setPractice_session(String practice_session) {
        this.practice_session = practice_session;
    }

    public void setHd_video(String hd_video) {
        this.hd_video = hd_video;
    }

    public void setAudio(String audio) {
        this.audio = audio;
    }

    public void setAuto_recording(String auto_recording) {
        this.auto_recording = auto_recording;
    }

    public void setEnforce_login(String enforce_login) {
        this.enforce_login = enforce_login;
    }

    public void setClose_registration(String close_registration) {
        this.close_registration = close_registration;
    }

    public void setShow_share_button(String show_share_button) {
        this.show_share_button = show_share_button;
    }

    public void setAllow_multiple_devices(String allow_multiple_devices) {
        this.allow_multiple_devices = allow_multiple_devices;
    }

    public void setGlobal_dial_in_countries(String global_dial_in_countries) {
        this.global_dial_in_countries = global_dial_in_countries;
    }

    public void setContact_name(String contact_name) {
        this.contact_name = contact_name;
    }

    public void setContact_email(String contact_email) {
        this.contact_email = contact_email;
    }
}

class Recurrence {

    private int type;
    private int repeat_interval;
    private String end_date_time;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getRepeat_interval() {
        return repeat_interval;
    }

    public void setRepeat_interval(int repeat_interval) {
        this.repeat_interval = repeat_interval;
    }

    public String getEnd_date_time() {
        return end_date_time;
    }

    public void setEnd_date_time(String end_date_time) {
        this.end_date_time = end_date_time;
    }

}
