package com.patient.mangement_system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.patient.mangement_system.entity.Appointment;
import com.patient.mangement_system.entity.Patient;
import com.patient.mangement_system.repository.AppointmentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {
	
	@Autowired
	AppointmentRepository appointmentRepository;

	@Override
	public void saveAppointment(Appointment appointment) {
		appointmentRepository.save(appointment);
	}

	@Override
	public List<Appointment> findAppointmentsForPatient(Long patientId) {
		return appointmentRepository.findByPatientId(patientId);
	}

	@Override
	public void deleteAppointmentById(Long id) {
		appointmentRepository.deleteById(id);
	}

	@Override
	public Page<Appointment> getAllAppointments(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return appointmentRepository.findAll(pageable);
	}
	
	@Override
	public Appointment updateAppointment(Long id, Appointment appointment) {
		Appointment existingAppoPatient=appointmentRepository.findById(id).get();
		
		   if (appointment.getAppointmentDate() != null) {
			   existingAppoPatient.setAppointmentDate(appointment.getAppointmentDate());
		    }
		    if (appointment.getReason() != null) {
		    	existingAppoPatient.setReason(appointment.getReason());
		    }
		    if (appointment.getStatus() != null) {
		        existingAppoPatient.setStatus(appointment.getStatus());
		    }

		 
		
		return appointmentRepository.save(existingAppoPatient);
		
	}

	@Override
	public Appointment getAppointmentById(Long id) {
		return appointmentRepository.findById(id).get();
	}
}
