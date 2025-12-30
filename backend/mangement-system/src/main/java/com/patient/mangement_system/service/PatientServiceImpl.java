package com.patient.mangement_system.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.patient.mangement_system.entity.Patient;
import com.patient.mangement_system.repository.PatientRepository;

@Service
@Transactional
public class PatientServiceImpl implements PatientService{
	
	private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$",Pattern.CASE_INSENSITIVE);
	 private static final Pattern PHONE_PATTERN = Pattern.compile("^\\+?[0-9]{8,15}$");
	@Autowired
	private PatientRepository patientRepository;

	@Override
	public void savePatient(Patient patient) {
		validatePatient(patient);
		patientRepository.save(patient);
	}

	@Override
	public Patient getPatientById(Long id) {
		return patientRepository.findById(id).get();
	}

	@Override
	public Patient updatePatient(Long id, Patient patient) {
		Patient existingPatient=patientRepository.findById(id).get();
		
		   if (patient.getFirstName() != null) {
		        existingPatient.setFirstName(patient.getFirstName());
		    }
		    if (patient.getLastName() != null) {
		        existingPatient.setLastName(patient.getLastName());
		    }
		    if (patient.getPhone() != null) {
		        existingPatient.setPhone(patient.getPhone());
		    }
		    if (patient.getEmail() != null) {
		        existingPatient.setEmail(patient.getEmail());
		    }
		    if (patient.getDateOfBirth() != null) {
		        existingPatient.setDateOfBirth(patient.getDateOfBirth());
		    }
		
		return patientRepository.save(existingPatient);
		
	}

	@Override
	public Page<Patient> getAllPatients(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return patientRepository.findAll(pageable);
	}

	@Override
	public void deletePatient(Long id) {
		patientRepository.deleteById(id);	
	}
	
	private void validatePatient(Patient patient) {
		if (patient.getEmail() == null || patient.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email must not be null or empty.");
        }
		
        if (!EMAIL_PATTERN.matcher(patient.getEmail()).matches()) {
            throw new IllegalArgumentException("Email format is invalid.");
        }
        
        if (patient.getPhone() == null || patient.getPhone().trim().isEmpty()) {
            throw new IllegalArgumentException("Phone must not be null or empty.");
        }
        
        if (!PHONE_PATTERN.matcher(patient.getPhone()).matches()) {
            throw new IllegalArgumentException("Phone format is invalid. Use digits only (optional +), length 8-15.");
        }
        
        if(patient.getDateOfBirth()==null) {
            throw new IllegalArgumentException("Date of birth must not be null.");
        }
        
        LocalDate dobLocal = patient.getDateOfBirth().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        LocalDate today = LocalDate.now();
        
        if (dobLocal.isAfter(today)) {
            throw new IllegalArgumentException("Date of birth cannot be in the future.");
        }
	}
	
	@Override
	 public Page<Patient> search(String firstName, String lastName,Integer pageNumber,Integer pageSize) {

		
		Pageable pageable= PageRequest.of(pageNumber, pageSize);
	        return patientRepository.search(
	        		firstName,
	        		lastName,
	                pageable
	        );
	    }
}
