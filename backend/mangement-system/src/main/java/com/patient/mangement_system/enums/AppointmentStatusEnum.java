package com.patient.mangement_system.enums;

public enum AppointmentStatusEnum {
    SCHEDULED("Scheduled"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled");
	
	String status;
	
	AppointmentStatusEnum(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}