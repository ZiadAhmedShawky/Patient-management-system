package com.patient.mangement_system.service;

public interface EmailService {
	public void sendEmail(String to, String subject, String body);
}
