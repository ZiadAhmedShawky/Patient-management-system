package com.patient.mangement_system.service;

public interface NotificationService {
	 public void notifyPatientByEmail(Long patientId,Long appointmentId, String subject, String message);
}
