package com.patient.mangement_system.service;

import org.springframework.data.domain.Page;

import com.patient.mangement_system.entity.Patient;

public interface PatientService {
	
	public void savePatient(Patient patient);
	public Patient getPatientById(Long id);
	public Patient updatePatient(Long id,Patient patient);
	public Page<Patient> getAllPatients(int page,int size,String sortBy,String sortDir);
	public void deletePatient(Long id);
	public Page<Patient>search(String firstName, String lastName,Integer pageNumber,Integer pageSize );
}
