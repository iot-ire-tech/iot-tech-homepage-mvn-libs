package zoom.model;

public class EntZoom {
    private String topic;
    private String start_time;
    private String duration;
    private String timezone;
    private String password;
    private String agenda;
    private int type;
    Recurrence recurrence;
    Settings settings;

    // Getter Methods
    public String getTopic() {
        return topic;
    }

    public String getStart_time() {
        return start_time;
    }

    public String getDuration() {
        return duration;
    }

    public String getTimezone() {
        return timezone;
    }

    public String getPassword() {
        return password;
    }

    public String getAgenda() {
        return agenda;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    // Setter Methods
    public void setTopic(String topic) {
        this.topic = topic;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAgenda(String agenda) {
        this.agenda = agenda;
    }

    public Recurrence getRecurrence() {
        return recurrence;
    }

    public void setRecurrence(Recurrence recurrence) {
        this.recurrence = recurrence;
    }

    public Settings getSettings() {
        return settings;
    }

    public void setSettings(Settings settings) {
        this.settings = settings;
    }

}