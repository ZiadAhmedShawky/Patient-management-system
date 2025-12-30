package com.patient.mangement_system.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.patient.mangement_system.entity.Appointment;

public interface AppointmentService {
	public void saveAppointment(Appointment appointment);
	public List<Appointment>findAppointmentsForPatient(Long patientId);
	public void deleteAppointmentById(Long id);
	public Page<Appointment> getAllAppointments(int page,int size,String sortBy,String sortDir);
	public Appointment updateAppointment(Long id, Appointment appointment);
	public Appointment getAppointmentById(Long id);

}
