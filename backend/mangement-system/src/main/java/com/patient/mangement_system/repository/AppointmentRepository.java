package com.patient.mangement_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.patient.mangement_system.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
	
	List<Appointment> findByPatientId(Long patientId);
}
