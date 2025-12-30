package com.patient.mangement_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.patient.mangement_system.entity.Appointment;
import com.patient.mangement_system.entity.Patient;
import com.patient.mangement_system.repository.AppointmentRepository;
import com.patient.mangement_system.repository.PatientRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService{
	

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;
    
	@Autowired
    private EmailService emailService;

	@Override
	public void notifyPatientByEmail(Long patientId,Long appointmentId, String subject, String message) {
	    Patient patient = patientRepository.findById(patientId).get();
	    
	    Appointment appointment = appointmentRepository.findById(appointmentId).get();
        if (patient.getEmail() == null || patient.getEmail().isBlank()) {
            throw new RuntimeException("Patient email is missing");
        }
        
        message = buildAppointmentMessage(patient, appointment);


        emailService.sendEmail(patient.getEmail(),subject,message);
		
	}
	
	   private String buildAppointmentMessage(Patient patient, Appointment appointment) {

	        String date = appointment.getAppointmentDate().toLocalDate().toString();
	        String time = appointment.getAppointmentDate().toLocalTime().toString();

	        return """
	                عزيزي/عزيزتي %s،

	                نود إعلامكم بتفاصيل موعد الكشف الخاص بكم:

	                🗓 التاريخ: %s
	                ⏰ الوقت: %s
	                📌 سبب الزيارة: %s
	                🔔 الحالة: %s

	                يرجى الحضور قبل الموعد بـ 10 دقائق.

	                مع تمنياتنا لكم بدوام الصحة.
	                """.formatted(
	                patient.getFirstName(),
	                date,
	                time,
	                appointment.getReason(),
	                appointment.getStatus()
	        );
	    }
	
    
    
}
