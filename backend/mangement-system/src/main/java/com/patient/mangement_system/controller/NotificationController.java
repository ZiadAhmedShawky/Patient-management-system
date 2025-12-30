package com.patient.mangement_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patient.mangement_system.dto.EmailRequestDto;
import com.patient.mangement_system.service.NotificationService;

@RestController
@RequestMapping("/notification")
public class NotificationController {
    
	@Autowired
	private NotificationService notificationService;
	
	private final String NOTIFICATION_SUBJECT="بيانات موعد الكشف";
	
	@PostMapping("/{patientId}/{appointmentId}/email")
    public ResponseEntity<String> sendEmailToPatient(@PathVariable Long patientId,@PathVariable Long appointmentId,@RequestBody EmailRequestDto request) {
		
        notificationService.notifyPatientByEmail(patientId,appointmentId,NOTIFICATION_SUBJECT,request.getMessage());
        
        return ResponseEntity.ok("Email sent successfully");
    }
}
